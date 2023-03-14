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

// adciona item no carrinho ================================

function addProductToCart(title, price, image){
     const cartContent = document.getElementsByClassName("cart-content")[0]
     const cartShopBox = document.createElement("div");
     cartShopBox.classList.add("cart-box");
     const cartItemsNames = cartContent.getElementsByClassName('cart-product-title');

     for(var i = 0; i < cartItemsNames; i++){
          if(cartItemsNames[1].innerText == title) {
               alert('O produto ja foi adicionado ao carrinho')
               return
          }
     }

     const cartBoxContent = `
          <img src="${image}" alt="" class="cart-img">
          <div class="detail-box">
               <div class="cart-product-title">${title}</div>
               <div class="cart-price">${price}</div>
               <input type="number" class="cart-quantity" name="" id="" value="1">
          </div>
          <i class='bx bxs-trash cart-product-remove-icon'></i>
     `;

     cartShopBox.innerHTML = cartBoxContent;
     cartContent.append(cartShopBox);

     cartShopBox
          .getElementsByClassName('cart-product-remove-icon')[0]
          .addEventListener('click', (event) => removeItem(event));
     cartShopBox
          .getElementsByClassName('cart-quantity')[0]
          .addEventListener('click', (event) => quantityChanged(event));
}

function addToCartClick(event){
     const button = event.target
     const shopProducts = button.parentElement
     const title = shopProducts.getElementsByClassName('product-title')[0].innerText;
     const price = shopProducts.getElementsByClassName('price')[0].innerText;
     const productImg = shopProducts.getElementsByClassName('product-img')[0].src;
     console.log(title, price, productImg)

     addProductToCart(title, price, productImg)

     updateTotalCartValue()
}
// =========================================================

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

     // atribui a funcao de adicionar ao carrinho a todos os botoes
     const addCart = document.getElementsByClassName('add-to-cart');
     for(let i = 0; i < addCart.length; i++){
          const button = addCart[i]
          button.addEventListener('click', (event) => addToCartClick(event))
     }
}