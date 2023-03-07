const cartIcon = document.querySelector('.cart-icon');
const cart = document.querySelector('.cart')
const closeCart = document.querySelector('.btn-close-cart')

if(document.readyState == "loading"){
     document.addEventListener("DOMContentLoad", ready());
} else {
     ready();
}

// open and close the cart =============================
cartIcon.addEventListener('click', () => {
     cart.classList.add('active')
})

closeCart.addEventListener('click', () => {
     cart.classList.remove('active')
})
//  =============================

// Remove Item from the cart =============================

// function removeItem(event, position){
//      const elemtenParent = document.getElementsByClassName('cart-box')
//      console.log(elemtenParent, "position:" + position)
//      if(elemtenParent.length == 0){
//           elemtenParent[0].remove()
//      } else{
//           elemtenParent[position].remove()
//      }
     
// }
function removeItem(event){
     var buttonClicked = event.target;
     // console.log(buttonClicked)
     // console.log(buttonClicked.parentNode)
     buttonClicked.parentElement.remove();
     updateTotalCartValue()
}
// =============================

// change quantity of the product =============================
function quantityChanged(event){
     const input = event.target;

     if(Number.isNaN(input.value) || input.value <= 0) {
          input.value = 1;
     }

     updateTotalCartValue()
}
// =============================

// update total cart value =============================
function updateTotalCartValue(){
     // const cartContent = document.getElementsByClassName('cart-content')[0]; 
     // console.log(cartContent);
     const cartBoxes = document.getElementsByClassName('cart-box'); 
     console.log(cartBoxes);

     var total = 0;

     for(var i = 0; i < cartBoxes.length; i++){
          var cartBox = cartBoxes[i];
          var priceElement = cartBox.querySelectorAll('.cart-price')[0]
          var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0]
          var price = parseFloat(priceElement.innerText.replace("R$", ""))
          var quantity = quantityElement.value
          total = total + (price * quantity);

          console.log(cartBox);
          console.log(price);
          console.log(quantityElement);

          document.getElementsByClassName('cart-total-price')[0].innerHTML = "R$" + total;
     }
}

// =============================

function ready() {
     const removeCartButton = document.querySelectorAll(".cart-product-remove-icon")
     // console.log(removeCartButton)
     for(let i = 0; i < removeCartButton.length; i++){
          const button = removeCartButton[i]
          button.addEventListener("click", (event) => removeItem(event))
     }

     // change the quantity
     const quatityInputElement = document.querySelector(".cart-quantity")
     for(let i = 0; i < quatityInputElement.length; i++){
          const input = quatityInputElement[i]
          input.addEventListener("change", (event) => quantityChanged(event))
     }
}