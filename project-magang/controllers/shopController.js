const Product = require("../models/ProductModel");
const Order = require("../models/OrderModel");

exports.getShopPage = async (req, res) => {
  const products = await Product.getAll();
  res.render("shop/index", { products });
};

exports.buyProduct = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const productId = req.params.productId;
    const quantity = parseInt(req.body.quantity, 10);

    if (!quantity || quantity < 1) {
      const products = await Product.getAll();
      return res.render("shop/index", {
        products,
        error: "Jumlah tidak valid",
      });
    }

    const product = await Product.getById(productId);
    if (!product) {
      const products = await Product.getAll();
      return res.render("shop/index", {
        products,
        error: "Produk tidak ditemukan",
      });
    }

    await Order.add(userId, productId, quantity);
    res.redirect("/myorders");
  } catch (err) {
    console.error("❌ Error beli kopi:", err.message);
    res.status(500).send("Terjadi kesalahan di server");
  }
};

exports.getMyOrders = async (req, res) => {
  const userId = req.session.user.id;
  const orders = await Order.getByUser(userId);
  res.render("orders/myorders", { orders });
};

exports.deleteMyOrder = async (req, res) => {
  const userId = req.session.user.id;
  const orderId = req.params.id;

  try {
    const orders = await Order.getByUser(userId);
    const order = orders.find((o) => o.id == orderId);

    if (!order) {
      return res.status(403).send("Tidak diizinkan menghapus pesanan ini.");
    }

    await Order.delete(orderId);
    res.redirect("/myorders");
  } catch (err) {
    console.error("❌ Gagal hapus pesanan:", err.message);
    res.status(500).send("Terjadi kesalahan saat menghapus pesanan");
  }
};
