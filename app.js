const drinkCounter = new DrinkCounter();
const ui = new UI();
const storage = new Storage();

drinkCounter.drinks = storage.getDrinks();

const refreshUI = function () {
  let sum = drinkCounter.sumOfAlcoholInGrams(this.periodInDays);
  ui.updateTotal(Math.round((sum + Number.EPSILON) * 100) / 100);
  whenSoftLimitCrosses(drinkCounter.isAboveSoftLimit(sum));
  whenHardLimitCrosses(drinkCounter.isAboveHardLimit(sum));
  if (drinkCounter.drinks.length != 0) {
    let lastDrink = drinkCounter.drinks[drinkCounter.drinks.length - 1];
    ui.updateLastDrink(lastDrink);
  }
  console.log(drinkCounter.drinks);
};

refreshUI();
console.log(drinkCounter.drinks);

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
const customDrinkSubmit = document.getElementById("custom-drink-submit");
const lastDrinkBtn = document.getElementById("last");

function whenSoftLimitCrosses(condition) {
  if (condition) {
    ui.softLimitColorChange();
  }
}

function whenHardLimitCrosses(condition) {
  if (condition) {
    ui.hardLimitColorChange();
  }
}

customDrinkSubmit.addEventListener("click", e => {
  let customDrinkMlAmount = Number(document.getElementById("ml").value);
  let customDrinkPercentAmount = Number(
    document.getElementById("percent").value
  );
  drinkCounter.addDrink(
    customDrinkMlAmount,
    customDrinkPercentAmount,
    new Date()
  );
  storage.setDrinks(drinkCounter.drinks);
  refreshUI();
  modalCustomDrink.classList.remove("show-modal");
});

lastDrinkBtn.addEventListener("click", () => {
  if (drinkCounter.drinks.length === 0) {
    drinkCounter.addDrink(50, 40, new Date());
  } else {
    let lastDrink = drinkCounter.drinks[drinkCounter.drinks.length - 1];
    drinkCounter.addDrink(
      lastDrink.mlAmount,
      lastDrink.percentAmount,
      new Date()
    );
  }
  storage.setDrinks(drinkCounter.drinks);
  refreshUI();
});

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
