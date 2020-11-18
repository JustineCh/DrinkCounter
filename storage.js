class Storage {
  getDrinks() {
    let drinkList = JSON.parse(localStorage.getItem("drinks"));
    if (drinkList === null) {
      return [];
    } else {
      return drinkList.map(drink => {
        let mlAmount = drink.mlAmount;
        let percentAmount = drink.percentAmount;
        let timeStamp = new Date(drink.timeStamp);
        return new Drink(mlAmount, percentAmount, timeStamp);
      });
    }
  }

  setDrinks(drinks) {
    localStorage.setItem("drinks", JSON.stringify(drinks));
  }
}
