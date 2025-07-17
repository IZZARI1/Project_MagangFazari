const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");

exports.list = async (req, res) => {
  const users = await UserModel.getAll();
  res.render("users/index", { users });
};

exports.formAdd = (req, res) => {
  res.render("users/add");
};

exports.add = async (req, res) => {
  const { email, password, role } = req.body;
  await UserModel.create(email, password, role);
  res.redirect("/users");
};

exports.formEdit = async (req, res) => {
  const user = await UserModel.getById(req.params.id);
  res.render("users/edit", { user });
};

exports.update = async (req, res) => {
  const { email, password, role } = req.body;
  const user = await UserModel.getById(req.params.id);
  await UserModel.update(req.params.id, email, password, role, user.password);
  res.redirect("/users");
};

exports.delete = async (req, res) => {
  await UserModel.delete(req.params.id);
  res.redirect("/users");
};
