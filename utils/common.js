const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid');
const config = {
  saltRounds: 12
}

const generateBcrypt = async (data) => new Promise ((resolve, reject) => {
  bcrypt.genSalt(config.saltRounds, (err, salt) => {
    if (err) {
      next(new Error(err.message))
    }
    bcrypt.hash(data, salt, (err, hash) => {
      if (err) {
        next(new Error(err.message))
      }
      resolve(hash)
    })
  })
})

const verifyPassword = async (pass, passdb) => {
  let res
  try {
    const check = await bcrypt.compare(pass, passdb)
    res = check
  } catch (err) {
    res = err
  }
  return res
}

const createToken = async (payload) => {
  console.log(process.env.AUTH_TOKEN_EXP)
  let dataToken = {}
  try {
    
    const rawToken = jwt.sign(payload, process.env.JWT_SECRET,{
        expiresIn: process.env.AUTH_TOKEN_EXP,
      })
  
    return rawToken
  } catch (err) {
    console.log(err)
    reject(new Error(err.message))
  }
}

const createRefreshToken = async (user) => {
  const db = require('./../models')
 const {refreshToken : RefreshToken} = db
  let expiredAt = new Date();

  expiredAt.setSeconds(
    expiredAt.getSeconds() + process.env.REFRESH_TOKEN_EXP
  );

  let _token = uuidv4();

  let _object = {
    token: _token,
    user: user.id,
    expires: expiredAt.getTime(),
  };

  let token = await RefreshToken.create(_object)

  return token.token;
}

module.exports = {
  generateBcrypt,
  verifyPassword,
  createToken,
  createRefreshToken
}