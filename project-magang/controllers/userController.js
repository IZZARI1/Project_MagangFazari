const User = require("../models/UserModel");
const axios = require("axios"); // import axios di atas
const bcrypt = require("bcrypt");

const loginAttempts = {}; // Simpan status gagal login sementara (in-memory)

exports.showLogin = (req, res) => {
  const now = Date.now();
  const ip = req.ip || req.connection.remoteAddress;
  const attempt = loginAttempts[ip];
  console.log(attempt);
  if (
    typeof attempt !== undefined &&
    attempt &&
    now - attempt.lastAttempt < attempt.delay
  ) {
    const sisa = Math.ceil(
      (attempt.delay - (now - attempt.lastAttempt)) / 1000
    );
    return res.render("login", {
      error: "Terlalu banyak percobaan. Coba lagi dalam " + sisa + " detik.",
      cooldown: true,
      delay: sisa,
    });
  }
  res.render("login", {
    // error: "Email atau password salah.",
    recaptchaSiteKey: process.env.RECAPTCHA_SITE_KEY,
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const now = Date.now();

  // Ambil IP user
  const ip = req.ip || req.connection.remoteAddress;

  const responseKey = req.body["g-recaptcha-response"];
  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${responseKey}`;

  const captchaVerify = await axios.post(verifyUrl);
  if (!captchaVerify.data.success) {
    return res.render("login", {
      error: "Verifikasi reCAPTCHA gagal. Coba lagi.",
      recaptchaSiteKey: process.env.RECAPTCHA_SITE_KEY,
    });
  }

  // Inisialisasi data percobaan
  if (!loginAttempts[ip]) {
    loginAttempts[ip] = { count: 0, lastAttempt: 0, delay: 0 };
  }

  const attempt = loginAttempts[ip];

  // ❌ Jika masih dalam delay cooldown
  if (now - attempt.lastAttempt < attempt.delay) {
    const sisa = Math.ceil(
      (attempt.delay - (now - attempt.lastAttempt)) / 1000
    );
    return res.render("login", {
      error: "Terlalu banyak percobaan. Coba lagi dalam " + sisa + " detik.",
      cooldown: true,
      delay: sisa,
    });
  }

  const user = await User.findByEmail(email);

  // ❌ Jika email atau password salah

  if (!user) {
    return res.render("login", {
      error: "User Tidak Ditemukan",
      recaptchaSiteKey: process.env.RECAPTCHA_SITE_KEY,
    });
  }
  const validPassword = await bcrypt.compare(password, user.password);
  // console.log(!user);
  if (!validPassword) {
    // attempt.count = 9;
    attempt.count += 1;
    attempt.lastAttempt = now;

    // Atur delay
    if (attempt.count === 5) {
      attempt.delay = 60 * 10 * 1000; // 30 detik
    } else if (attempt.count > 5 && attempt.count < 10) {
      const extraDelay = 30 + (attempt.count - 5) * 10;
      attempt.delay = extraDelay * 1000;
    }
    console.log(attempt.count);
    // ❌ Jika sudah 10x gagal
    if (attempt.count > 5) {
      // const existing = await User.findByEmail(email);
      // if (!existing) {
      //   console.log("MASUK ATAS");
      //   // const bcrypt = require("bcrypt");
      //   // const hashed = await bcrypt.hash(password, 10);
      //   await User.create(email, password, "user");
      //   delete loginAttempts[email];
      //   return res.render("signup", {
      //     info: "Akun otomatis dibuat. Silakan login.",
      //   });
      // } else {
      //   delete loginAttempts[email];
      //   return res.redirect("/signup");
      // }
      return res.redirect("/signup");
    }
    return res.render("login", {
      error: "User atau password salah",
      recaptchaSiteKey: process.env.RECAPTCHA_SITE_KEY,
    });
  }

  // ✅ Jika login berhasil
  delete loginAttempts[ip];
  console.log("TEROBOS");

  req.session.user = {
    id: user.id,
    email: user.email,
    role: user.role,
  };
  return res.redirect("/dashboard");
};

exports.signupForm = (req, res) => {
  res.render("signup");
};

exports.signup = async (req, res) => {
  const { email, password } = req.body;
  const existing = await User.findByEmail(email);

  if (existing) {
    return res.render("signup", { error: "Email sudah terdaftar" });
  }

  await User.create(email, password, "user");
  res.redirect("/login");
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};
