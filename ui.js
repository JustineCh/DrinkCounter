class UI {

   softLimitColorChange(){
      document.getElementById("summary-container").classList.add("soft-limit-color")
   }

   hardLimitColorChange(){
      document.getElementById("summary-container").classList.add("hard-limit-color")
   }

   updateTotal(value){
      document.getElementById("summary").innerHTML = value
   }

}