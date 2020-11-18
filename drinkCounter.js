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
    softLimit = 12 * 14, // 12 standard drinks 14g each
    hardLimit = 20 * 14 // 20 standard drinks 14g each
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
    return total;
  }

  isAboveSoftLimit(sum) {
    return sum >= this.softLimit;
  }

  isAboveHardLimit(sum) {
    return sum >= this.hardLimit;
  }

  addDrink(mlAmount, percentAmount, timeStamp) {
    let drink = new Drink(mlAmount, percentAmount, timeStamp);
    this.drinks.push(drink);
  }
}