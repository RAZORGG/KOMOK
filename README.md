# ☕ KOMOK - Project Base Test Pemrograman Web

## Deskripsi
Aplikasi CRUD sederhana untuk manajemen **Order** (pemesanan) kopi, menggunakan:
- **Frontend:** React + Vite
- **Backend:** PHP (REST API)
- **Database:** MySQL

---

## Fitur
- Tambah, lihat, edit, dan hapus order (CRUD)
- API endpoint standar REST (GET, POST, PUT, DELETE)
- Integrasi frontend-backend (fetch/AJAX)
- Responsive UI (TailwindCSS)
- CORS aktif (bisa diakses frontend)

---

## Struktur Folder
```
backend/
  db.php
  order.php
  order.sql
src/
  components/
    Order.jsx
  App.jsx
  ...
```

---

## Cara Menjalankan

### 1. **Database**
- Jalankan MySQL (XAMPP)
- Buat database, misal: `brew_haven`
- Import `backend/order.sql` ke database

### 2. **Backend**
```sh
cd backend
php -S localhost:8000
```

### 3. **Frontend**
```sh
npm install
npm run dev
```
Buka di browser: [http://localhost:5173](http://localhost:5173)

---

## API Endpoint

| Method | Endpoint                  | Deskripsi         | Body (JSON)                                      |
|--------|---------------------------|-------------------|--------------------------------------------------|
| GET    | `/order.php`              | Ambil semua order | -                                                |
| POST   | `/order.php`              | Tambah order      | `{ "nama": "...", "menu": "...", "jumlah": ... }`|
| PUT    | `/order.php`              | Edit order        | `{ "id": ..., "nama": "...", "menu": "...", "jumlah": ... }` |
| DELETE | `/order.php`              | Hapus order       | `{ "id": ... }`                                  |

---

## Contoh Pengujian API (Postman/Thunder Client)

### GET
- **Request:**  
  `GET http://localhost:8000/order.php`
- **Response:**  
  ```json
  [
    { "id": 1, "nama": "Budi", "menu": "Latte", "jumlah": 2 }
  ]
  ```

### POST
- **Request:**  
  `POST http://localhost:8000/order.php`
  ```json
  { "nama": "Budi", "menu": "Latte", "jumlah": 2 }
  ```
- **Response:**  
  ```json
  { "message": "Order ditambah" }
  ```

### PUT
- **Request:**  
  `PUT http://localhost:8000/order.php`
  ```json
  { "id": 1, "nama": "Budi", "menu": "Espresso", "jumlah": 3 }
  ```
- **Response:**  
  ```json
  { "message": "Order diupdate" }
  ```

### DELETE
- **Request:**  
  `DELETE http://localhost:8000/order.php`
  ```json
  { "id": 1 }
  ```
- **Response:**  
  ```json
  { "message": "Order dihapus" }
  ```

---

## Screenshot Pengujian API
_Sertakan screenshot hasil pengujian GET, POST, PUT, DELETE di Postman/Thunder Client, tunjukkan URL, method, body, response, dan status code._

---

## Author
- Nama: **Farid Fazri Fadilah**
- NIM: **14523214**
- Mata Kuliah: **Pemrograman Web**

---

**Catatan:**  
- Pastikan backend dan frontend berjalan bersamaan.
- Jika ada error koneksi, cek CORS, port, dan setting database di `db.php`.
