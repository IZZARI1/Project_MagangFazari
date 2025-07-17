const loginAttempts = {}; // In-memory, bisa kamu ganti Redis kalau ingin permanen

module.exports = {
  recordAttempt(email) {
    const now = Date.now();
    if (!loginAttempts[email]) {
      loginAttempts[email] = { count: 1, lastAttempt: now, delay: 0 };
    } else {
      const attempt = loginAttempts[email];
      attempt.count += 1;
      attempt.lastAttempt = now;
      attempt.delay = Math.min(attempt.count * 30000, 10 * 60 * 1000); // max 10 menit
    }
  },

  getAttempt(email) {
    return loginAttempts[email] || null;
  },

  resetAttempt(email) {
    delete loginAttempts[email];
  },
};
