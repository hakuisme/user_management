# momofin-um    

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
