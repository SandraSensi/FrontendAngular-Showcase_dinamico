//creamos las constantes utilizadas en el proyecto
const compra =document.getElementById('celdas')
const shoppingCartItemsContainer=document.querySelector('.shoppingCartItemsContainer')

console.log(compra)
compra.addEventListener('dragend' ,addtocartdrag);

const contenedor = document.getElementById('shoppingcart')
contenedor.addEventListener('dragenter',e => {
  addtocartdrag;
});

//Se procede a crear una función [addtocartdrag] para recoger los datos de titulo, precio e imagen.

function addtocartdrag(event){
  const drag=event.target
  const item=drag.closest('.col')
  const itemTitle = item.querySelector('h5').textContent;
  const itemPrice = item.querySelector('p').textContent;
  const itemImage = item.querySelector('img').src;
  console.log(itemTitle,itemPrice,itemImage)
  addItemToShoppingCart(itemTitle, itemPrice, itemImage);
}


//Creamos otra función que recoja los parámetros de la función[addtocartdrag], para incorporarlo en nuestro contenedor de productos comprados
function addItemToShoppingCart(itemTitle, itemPrice, itemImage) {
  const shoppingCartRow = document.createElement('div');
  //Creamos un elemento de forma 'string literal', que es el que vamos a incluir dentro de nuestr contenedor
  const shoppingCartContent = `
  <div class="row shoppingCartItem">
        <div class="col-6">
            <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <img src=${itemImage} class="shopping-cart-image">
                <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${itemTitle}</h6>
            </div>
        </div>
        <div class="col-2">
            <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <p class="item-price mb-0 shoppingCartItemPrice">${itemPrice}</p>
            </div>
        </div>
        <div class="col-4">
            <div
                class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number"
                    value="1">
                <button class="btn btn-danger buttonDelete" type="button">X</button>
            </div>
        </div>
    </div>`;
  shoppingCartRow.innerHTML = shoppingCartContent;
  shoppingCartItemsContainer.append(shoppingCartRow);

  shoppingCartRow
    .querySelector('.buttonDelete')
    .addEventListener('click', removeShoppingCartItem);

  updateShoppingCartTotal();
}

//creamos una función de actualizar el total del precio
function updateShoppingCartTotal() {
  let total = 0;
  const shoppingCartTotal = document.querySelector('.shoppingCartTotal');
  //creamos una variable en la que nos devuelva todos los item seleccionados
  const shoppingCartItems = document.querySelectorAll('.shoppingCartItem');
  //Recorremos los elementos seleccionados con el parametro [forEach()]
  shoppingCartItems.forEach((shoppingCartItem) => {
    const shoppingCartItemPriceElement = shoppingCartItem.querySelector(
      '.shoppingCartItemPrice'
    );
    const shoppingCartItemPrice = Number(
      shoppingCartItemPriceElement.textContent.replace('€', '')
    );
    const shoppingCartItemQuantityElement = shoppingCartItem.querySelector(
      '.shoppingCartItemQuantity'
    );
    const shoppingCartItemQuantity = Number(
      shoppingCartItemQuantityElement.value
    );
    total = total + shoppingCartItemPrice * shoppingCartItemQuantity;
  });
  shoppingCartTotal.innerHTML = `${total.toFixed(2)}€`;
}

function removeShoppingCartItem(event) {
  const buttonClicked = event.target;
  buttonClicked.closest('.shoppingCartItem').remove();
  updateShoppingCartTotal();
}

function quantityChanged(event) {
  const input = event.target;
  input.value <= 0 ? (input.value = 1) : null;
  updateShoppingCartTotal();
}

function comprarButtonClicked() {
  shoppingCartItemsContainer.innerHTML = '';
  updateShoppingCartTotal();
}
