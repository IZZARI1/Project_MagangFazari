exports.requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.session.user) {
      return res.redirect("/login");
    }

    const userRole = req.session.user.role;
    if (!roles.includes(userRole)) {
      return res.status(403).send("❌ Akses ditolak: Anda tidak punya izin.");
    }

    next();
  };
};
