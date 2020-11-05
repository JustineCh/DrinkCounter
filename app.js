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

class Drink {
  constructor(mlAmount, percentAmount, timeStamp) {
    this.mlAmount = mlAmount;
    this.percentAmount = percentAmount;
    this.timeStamp = timeStamp;
  }

  getAlcoholInGrams() {
    return (8 * this.mlAmount * this.percentAmount) / 1000;
  }
}

class DrinkCounter {
  constructor(
    periodInDays = 7, 
    softLimit = 12*14, // 12 standard drinks 14g each
    hardLimit = 20*14 // 20 standard drinks 14g each 
    ) {
    this.drinks = [];
    this.periodInDays = periodInDays;
    this.softLimit = softLimit;
    this.hardLimit = hardLimit;
  }

  drinksFromLastDays() {
    let periodInDays = this.periodInDays;
    function drinkCondition(drink) {
      let startDate = new Date();
      startDate.setDate(startDate.getDate() - periodInDays);
      return drink.timeStamp >= startDate;
    }
    return this.drinks.filter(drinkCondition);
  }

  sumOfAlcoholInGrams() {
    const drinksList = this.drinksFromLastDays(this.periodInDays);
    let total = 0;
    drinksList.forEach(drink => {
      total += drink.getAlcoholInGrams();
    });
    return total
  }

  isAboveSoftLimit(sum) {
   return sum <= this.softLimit
  }

  isAboveHardLimit(sum) {
    return sum <= this.hardLimit
   }

  addDrink(mlAmount, percentAmount, timeStamp) {
    let drink = new Drink(mlAmount, percentAmount, timeStamp);
    this.drinks.push(drink);
  }
}

const drinkCounter = new DrinkCounter();

smallAmountBtn.addEventListener("click", () => {
  drinkCounter.addDrink(20, 40, new Date());
  let sum = drinkCounter.sumOfAlcoholInGrams(this.periodInDays)
  drinkCounter.isAboveSoftLimit(sum)
  drinkCounter.isAboveHardLimit(sum)
  console.log(drinkCounter.drinks)
});

mediumAmountBtn.addEventListener("click", () => {
  drinkCounter.addDrink(40, 40, new Date());
  let sum = drinkCounter.sumOfAlcoholInGrams(this.periodInDays)
  drinkCounter.isAboveSoftLimit(sum)
  drinkCounter.isAboveHardLimit(sum)
  console.log(drinkCounter.drinks)
});

largeAmountBtn.addEventListener("click", () => {
  drinkCounter.addDrink(60, 40, new Date());
  let sum = drinkCounter.sumOfAlcoholInGrams(this.periodInDays)
  drinkCounter.isAboveSoftLimit(sum)
  drinkCounter.isAboveHardLimit(sum)
  console.log(drinkCounter.drinks)
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
