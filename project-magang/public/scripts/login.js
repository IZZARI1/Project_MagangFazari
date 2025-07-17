let delay = parseInt(
  document.querySelector(".time").textContent.replace("s", "")
);
const timeEl = document.querySelector(".time");
const coffeeEl = document.querySelector(".coffee");

const interval = setInterval(() => {
  delay--;
  timeEl.textContent = `${delay}s`;

  // Update tinggi kopi agar makin habis
  coffeeEl.style.height = `${Math.max(0, 100 - delay * 4)}%`;

  if (delay <= 0) {
    clearInterval(interval);
    document.getElementById("loginButton").disabled = false;
    document.getElementById("loginButton").innerText = "Login";
    document.getElementById("emailInput").disabled = false;
    document.getElementById("passwordInput").disabled = false;
  } else {
    document.getElementById(
      "loginButton"
    ).innerText = `Login (Cooldown ${delay}s)`;
  }
}, 1000);
