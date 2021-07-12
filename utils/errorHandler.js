class errorHandler extends Error {
	constructor(code, success, message) {
		super(message)
		this.code = code
		this.success = success
		this.msg = message
	}
}

module.exports = errorHandler