const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, //Hangi kullanıcıya ait
  categoryName: { type: String, required: true }, //Kategori adı
  categoryCreateAt: { type: Date, default: Date.now }, //Kategorinin oluşturulduğu tarih
  categoryActive: { type: Number, default: 1 },
});

module.exports = mongoose.model("Category", CategorySchema);
