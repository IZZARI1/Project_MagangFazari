// controllers/productController.js
const Product = require("../models/ProductModel");

// Lihat semua produk
exports.list = async (req, res) => {
  const products = await Product.getAll();
  res.render("products/index", { products });
};

// Tampilkan form tambah
exports.formAdd = (req, res) => {
  res.render("products/add");
};

// Proses tambah
exports.add = async (req, res) => {
  const { name, price, description } = req.body;
  await Product.add(name, price, description);
  res.redirect("/products");
};

// Tampilkan form edit
exports.formEdit = async (req, res) => {
  const product = await Product.getById(req.params.id);
  if (!product) {
    return res.status(404).send("❌ Produk tidak ditemukan");
  }
  res.render("products/edit", { product });
};

// Proses edit
exports.update = async (req, res) => {
  const { name, price, description } = req.body;
  await Product.update(req.params.id, name, price, description);
  res.redirect("/products");
};

// Hapus produk
exports.delete = async (req, res) => {
  await Product.delete(req.params.id);
  res.redirect("/products");
};
