# user management service   

NodeJs (Express) User Management API with mongodb

## Feature
1.User Module
    - Register
    - Login
    - Forgot Password
    - Reset Password
2.Role Module (CRUD)
3.Permission Module (CRUD)

todo
implement auth middleware
.....

# Installation
* Run npm install or yarn install melalui 'command-promt' di windows atau terminal
* Buat file .env dari file .env.example, isikan konfigurasi environment 
* Update file role.js in /config sesuai dengan user role yang ingin kamu gunakan
* Update file swagger.js in /config , ubah url server 
* untuk dev bisa dijalankan
    npm run dev jika sudah menginstall nodemon
* untuk mengakses dokumentasi api 
    {{base_url}}/api-docs
    base_url ini diambil dari konfigurasi server pada file /config/swagger.js
