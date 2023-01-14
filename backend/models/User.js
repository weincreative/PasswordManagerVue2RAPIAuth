const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userName: { type: String, required: true, min: 5, max: 50 }, //Kullanıcı adı
  userEmail: { type: String, required: true, min: 6, max: 255, unique: true }, //Kullanıcı mail adresi
  userPassword: { type: String, required: true, min: 6, max: 1024 }, //Kullanıcı şifresi
  userCreateAt: { type: Date, default: Date.now }, //Kullanıcı oluşturulduğu tarih
  userActive: { type: Number, default: 1 }, //Kullanici aktif
});

module.exports = mongoose.model("User", UserSchema);
