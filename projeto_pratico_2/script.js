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

// remove item do carrinho =============================
function removeItem(event){
     var buttonClicked = event.target;
     buttonClicked.parentElement.remove();
     updateTotalCartValue()
}
// =====================================================

// altera a quantidade de produtos =========================
function quantityChanged(event){
     const input = event.target;

     if(isNaN(input.value) || input.value <= 0) {
          input.value = 1;
     }

     updateTotalCartValue()
}
// ==========================================================

// atualiza o valor total do carrinho =======================
function updateTotalCartValue(){
     const cartBoxes = document.getElementsByClassName('cart-box'); 

     var total = 0;

     if(cartBoxes.length <= 0) {
          document.getElementsByClassName('cart-total-price')[0].innerHTML = "R$" + 0;
     } else {
          for(var i = 0; i < cartBoxes.length; i++){
               var cartBox = cartBoxes[i];
               var priceElement = cartBox.querySelectorAll('.cart-price')[0]
               var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0]
               var priceWithout$ = priceElement.innerText.replace("R$", "") // remove o R$ do valor do produto
               var price = parseFloat(priceWithout$.replace(",", "."))
               var quantity = quantityElement.value
               total = total + (price * quantity);
     
               total = Math.round(total * 100)/100
     
               document.getElementsByClassName('cart-total-price')[0].innerHTML = "R$" + total;
          }
     }    
}
// =========================================================

function ready() {

     updateTotalCartValue() // atualiza o valor total do carrinho com os items pre inseridos

     const removeCartButton = document.querySelectorAll(".cart-product-remove-icon")
     for(let i = 0; i < removeCartButton.length; i++){
          const button = removeCartButton[i]
          button.addEventListener("click", (event) => removeItem(event))
     }

     // altera a quantidade de produtos no carrinho
     const quatityInputElement = document.getElementsByClassName("cart-quantity")
     for(let i = 0; i < quatityInputElement.length; i++){
          const input = quatityInputElement[i]
          input.addEventListener("change", (event) => quantityChanged(event))
     }
}