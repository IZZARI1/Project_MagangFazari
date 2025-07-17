function isLoggedIn(req, res, next) {
  if (req.session.user) return next();
  res.redirect("/login");
}

function isSuperAdmin(req, res, next) {
  if (req.session.user?.role === "superadmin") return next();
  res.status(403).send("Akses ditolak");
}

function isAdmin(req, res, next) {
  if (["admin", "superadmin"].includes(req.session.user?.role)) return next();
  res.status(403).send("Akses ditolak");
}

function requireRole(roles) {
  return (req, res, next) => {
    if (!req.session.user) return res.redirect("/login");
    if (!roles.includes(req.session.user.role)) {
      return res.status(403).send("❌ Akses ditolak: Anda tidak punya izin.");
    }
    next();
  };
}

module.exports = { isLoggedIn, isSuperAdmin, isAdmin };
