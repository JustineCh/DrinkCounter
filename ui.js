class UI {
  softLimitColorChange() {
    document
      .getElementById("summary-container")
      .classList.add("summary-background-soft-limit");
  }

  hardLimitColorChange() {
    document
      .getElementById("summary-container")
      .classList.add("summary-background-hard-limit");
  }

  updateTotal(value) {
    document.getElementById("summary").innerHTML = value;
  }

  updateLastDrink(lastDrink) {
    document.getElementById(
      "last"
    ).innerHTML = `${lastDrink.mlAmount} ml <br> of <br> ${lastDrink.percentAmount} % alc`;
  }
}
