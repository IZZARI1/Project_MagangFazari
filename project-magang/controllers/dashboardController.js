// controllers/dashboardController.js

exports.redirectByRole = (req, res) => {
  const role = req.session.user.role;

  if (role === "superadmin") return res.redirect("/dashboard/superadmin");
  if (role === "admin") return res.redirect("/dashboard/admin");
  return res.redirect("/dashboard/user");
};

exports.superadminDashboard = (req, res) => {
  res.render("dashboard/superadmin", { user: req.session.user });
};

exports.adminDashboard = (req, res) => {
  res.render("dashboard/admin", { user: req.session.user });
};

exports.userDashboard = (req, res) => {
  res.render("dashboard/user", { user: req.session.user });
};
