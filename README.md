# ethos-interview-be

This project is a backend for the ethos-interview project. It is built with Node.js, Express, MongoDB, and JWT.

## Getting Started

To get started, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/alwi/ethos-interview-be.git
   ```
2. Navigate to the project directory:
   ```bash
   cd ethos-interview-be
   ```
3. Install the required dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory and add the following environment variables:
   ```bash
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority&appName=Cluster0
   PORT=3000
   CLOUDINARY_PUBLISHABLE_KEY=<your-cloudinary-publishable-key>
   CLOUDINARY_SECRET_KEY=<your-cloudinary-secret-key>
   CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
   CURRENCY=IDR
   JWT_SECRET=<your-jwt-secret>
   ```
5. Start the server:
   ```bash
   npm start
   ```

## Flow

The flow of the application is as follows:

#### Admin Sekolah flow:

1. Login → akses dashboard
2. Admin membuat Procurement → memilih buku + quantity → sistem hitung totalPrice otomatis.
3. Redirect ke halaman cart → tampil detail item + total.
4. Submit → redirect ke Xendit untuk pembayaran
5. Setelah sukses → paymentStatus = paid.

#### Administrator flow:

1. Login → akses dashboard
2. Lihat daftar procurement yang sudah paid.
3. Validasi dan aktivasi → isActivated = true.
