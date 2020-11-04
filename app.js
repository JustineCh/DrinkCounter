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
  constructor() {
    this.drinks = [];
  }

  drinksFromLastDays(days) {
    function drinkCondition(drink) {
      let startDate = new Date();
      startDate.setDate(startDate.getDate() - days);
      return drink.timeStamp >= startDate;
    }
    return this.drinks.filter(drinkCondition);
  }

  sumOfAlcoholInGrams(days) {
    const drinksList = this.drinksFromLastDays(days);
    let total = 0;
    drinksList.forEach(drink => {
      total += drink.getAlcoholInGrams();
    });
    if(total <= 238){
      console.log('under the limit')
      return total
    } else {
      console.log('over the limit')
      return total
    }
  }

  addDrink(mlAmount, percentAmount, timeStamp) {
    let drink = new Drink(mlAmount, percentAmount, timeStamp);
    this.drinks.push(drink);
  }
}

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
