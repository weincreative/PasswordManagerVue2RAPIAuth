const mongoose = require("mongoose");

const PasswordSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, //Hangi kullanıcıya ait
  passwordTitle: { type: String, required: true }, //Password Başlığı
  passwordURL: { type: String, required: true }, //Password URL
  passwordCategory: { type: mongoose.Schema.Types.ObjectId, ref: "Category" }, //Password Kategori id
  passwordUsername: { type: String, required: true }, //UserName
  passwordPassword: { type: String, required: true }, //Password
  passwordCreateAt: { type: Date, default: Date.now }, //Passwordun oluşturulduğu tarih
  passwordActive: { type: Number, default: 1 },
});

module.exports = mongoose.model("Password", PasswordSchema);
