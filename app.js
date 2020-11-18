const drinkCounter = new DrinkCounter();
const ui = new UI();
const storage = new Storage();

drinkCounter.drinks = storage.getDrinks();
console.log("drinks: ", drinkCounter.drinks);
let startSum = drinkCounter.sumOfAlcoholInGrams(this.periodInDays);
ui.updateTotal(Math.round((startSum + Number.EPSILON) * 100) / 100);
whenSoftLimitCrosses(drinkCounter.isAboveSoftLimit(startSum));
whenHardLimitCrosses(drinkCounter.isAboveHardLimit(startSum));

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
const smallAmountBtn = document.getElementById("small");
const mediumAmountBtn = document.getElementById("medium");
const largeAmountBtn = document.getElementById("large");
const customDrinkSubmit = document.getElementById("custom-drink-submit");

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

smallAmountBtn.addEventListener("click", () => {
  drinkCounter.addDrink(20, 40, new Date());
  let sum = drinkCounter.sumOfAlcoholInGrams(this.periodInDays);
  ui.updateTotal(Math.round((sum + Number.EPSILON) * 100) / 100);
  whenSoftLimitCrosses(drinkCounter.isAboveSoftLimit(sum));
  whenHardLimitCrosses(drinkCounter.isAboveHardLimit(sum));
  storage.setDrinks(drinkCounter.drinks);
});

mediumAmountBtn.addEventListener("click", () => {
  drinkCounter.addDrink(40, 40, new Date());
  let sum = drinkCounter.sumOfAlcoholInGrams(this.periodInDays);
  ui.updateTotal(Math.round((sum + Number.EPSILON) * 100) / 100);
  whenSoftLimitCrosses(drinkCounter.isAboveSoftLimit(sum));
  whenHardLimitCrosses(drinkCounter.isAboveHardLimit(sum));
  storage.setDrinks(drinkCounter.drinks);
});

largeAmountBtn.addEventListener("click", () => {
  drinkCounter.addDrink(60, 40, new Date());
  let sum = drinkCounter.sumOfAlcoholInGrams(this.periodInDays);
  ui.updateTotal(Math.round((sum + Number.EPSILON) * 100) / 100);
  whenSoftLimitCrosses(drinkCounter.isAboveSoftLimit(sum));
  whenHardLimitCrosses(drinkCounter.isAboveHardLimit(sum));
  storage.setDrinks(drinkCounter.drinks);
});

customDrinkSubmit.addEventListener("click", () => {
  const customDrinkMlAmount = Number(document.getElementById("ml").value);
  const customDrinkPercentAmount = Number(
    document.getElementById("percent").value
  );
  drinkCounter.addDrink(
    customDrinkMlAmount,
    customDrinkPercentAmount,
    new Date()
  );
  storage.setDrinks(drinkCounter.drinks);
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
