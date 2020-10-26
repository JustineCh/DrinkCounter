const open = document.querySelectorAll(".open");
const openSummary = document.getElementById("summary-container");
const openCustomDrink = document.getElementById("open-custom-drink");
const close = document.querySelectorAll(".close");
const closeCustomDrink = document.getElementById("close-custom-drink");
const closeCustomDrinkIMG = document.querySelector("#close-custom-drink img");
const closeSummary = document.getElementById("close-summary");
const closeSummaryIMG = document.querySelector("#close-summary img");
const modalCustomDrink = document.getElementById("modal-custom-drink");
const modalSummary = document.getElementById("modal-summary");
const amountBtn = document.querySelectorAll(".amount-btn");

open.forEach(item => {
  item.addEventListener("click", e => {
    if (e.target.parentElement == openSummary || e.target == openSummary) {
      modalSummary.classList.add("show-modal");
    } else if (e.target == openCustomDrink) {
      modalCustomDrink.classList.add("show-modal");
    }
  });
});

close.forEach(item => {
  item.addEventListener("click", e => {
    if (e.target == closeSummary || e.target.parentElement == closeSummary) {
      modalSummary.classList.remove("show-modal");
    } else if (
      e.target == closeCustomDrink ||
      e.target.parentElement == closeCustomDrink
    ) {
      modalCustomDrink.classList.remove("show-modal");
    }
  });
});

window.addEventListener("click", e => {
  if (e.target == modalSummary) {
    modalSummary.classList.remove("show-modal");
  } else if (e.target == modalCustomDrink) {
    modalCustomDrink.classList.remove("show-modal");
  }
});

amountBtn.forEach(btn => {
  btn.addEventListener("click", addToSummary);
});
