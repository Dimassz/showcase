const { Sequelize } = require('sequelize');
const sequelize = require('../config/database'); // koneksi dari config/database.js

const CatalogModel = require('./catalogModel');
const UserModel = require('./userModel');

// Inisialisasi model
const Catalog = CatalogModel(sequelize);
const User = UserModel(sequelize);

// Objek untuk menampung semua model
const db = {
  sequelize,
  Sequelize, // bisa digunakan jika perlu tipe data Sequelize di file lain
  Catalog,
  User,
};

// Tes koneksi + sinkronisasi model
(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database berhasil terhubung.');

    

  } catch (error) {
    console.error('❌ Gagal menghubungkan database:', error.message);
  }
})();

module.exports = db;
