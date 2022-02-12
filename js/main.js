'use strict';

// Filter Items -------------------------------------------
const filterTitle = document.querySelectorAll('.filter-title');
const allCategoryPosts = document.querySelectorAll('.all');

for (let i = 0; i < filterTitle.length; i++) {
  filterTitle[i].addEventListener(
    'click',
    filterPosts.bind(this, filterTitle[i])
  );
}

function filterPosts(item) {
  changeActivePosition(item);
  for (let i = 0; i < allCategoryPosts.length; i++) {
    if (allCategoryPosts[i].classList.contains(item.attributes.id.value)) {
      allCategoryPosts[i].style.display = 'block';
    } else {
      allCategoryPosts[i].style.display = 'none';
    }
  }
}

function changeActivePosition(activeItem) {
  for (let i = 0; i < filterTitle.length; i++) {
    filterTitle[i].classList.remove('active');
  }
  activeItem.classList.add('active');
}

// Cart ---------------------------------------------------
const cartNavi = document.querySelector('.navi__right-cart');
const cart = document.querySelector('.addcart');
const cartCloseButton = document.querySelector('.cart-close');

cartNavi.addEventListener('click', displayCart);
cartCloseButton.addEventListener('click', closeCart);

// Products List
let products = [
  {
    name: 'Dolphine Accent Chair',
    tag: 'dolphine',
    price: 300,
    inCart: 0,
  },
  {
    name: 'Karina Accent Chair',
    tag: 'karina',
    price: 199,
    inCart: 0,
  },
  {
    name: 'Sydney Stool',
    tag: 'sydney',
    price: 199,
    inCart: 0,
  },
  {
    name: 'Elly Stool',
    tag: 'elly',
    price: 150,
    inCart: 0,
  },
  {
    name: 'Amy Accent Chair',
    tag: 'amy',
    price: 400,
    inCart: 0,
  },
  {
    name: 'Novo Fabric Sofa',
    tag: 'novo',
    price: 1200,
    inCart: 0,
  },
  {
    name: 'Kayden bench',
    tag: 'kayden',
    price: 300,
    inCart: 0,
  },
  {
    name: 'Sofia leather sofa',
    tag: 'sofia',
    price: 1800,
    inCart: 0,
  },
  {
    name: 'Calla suede sofa',
    tag: 'calla',
    price: 1299,
    inCart: 0,
  },
];

// Cart Open/Close
function displayCart() {
  cart.style.transform = 'translateX(0)';
}

function closeCart() {
  cart.style.transform = 'translateX(100%)';
}

// Cart Add/Remove Items
const addToCartBtns = document.querySelectorAll('.cart');

// Click event listener on Add to Cart Button
for (let i = 0; i < addToCartBtns.length; i++) {
  addToCartBtns[i].addEventListener('click', () => {
    cartNumbers(products[i]);
    totalCost(products[i]);
    location.reload();
  });
}

// Cart Numbers updated whenever item exist in cart
function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem('cartNumbers');
  if (productNumbers) {
    document.querySelector('.cartBtn span').textContent = productNumbers;
    document.querySelector('.cart-added span').textContent = productNumbers;
  }
}

function cartNumbers(product) {
  //   console.log('the product clicked is', product);
  let productNumbers = localStorage.getItem('cartNumbers');
  productNumbers = parseInt(productNumbers);
  if (productNumbers) {
    localStorage.setItem('cartNumbers', productNumbers + 1);
    document.querySelector('.cartBtn span').textContent = productNumbers + 1;
    document.querySelector('.cart-added span').textContent = productNumbers + 1;
  } else {
    localStorage.setItem('cartNumbers', 1);
    document.querySelector('.cartBtn span').textContent = 1;
  }

  setItems(product);
}

function setItems(product) {
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);

  if (cartItems !== null) {
    if (cartItems[product.tag] == undefined) {
      cartItems = {
        ...cartItems,
        [product.tag]: product,
      };
    }
    cartItems[product.tag].inCart += 1;
  } else {
    product.inCart = 1;
    cartItems = {
      [product.tag]: product,
    };
  }

  localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}

// Adding up total cost
function totalCost(product) {
  //   console.log('The product price is', product.price);
  let cartCost = localStorage.getItem('totalCost');

  if (cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem('totalCost', cartCost + product.price);
  } else {
    localStorage.setItem('totalCost', product.price);
  }
}

// Displaying Cart Items
function displayCartItems() {
  let cartItems = localStorage.getItem('productsInCart');
  let cartItemsContainer = document.querySelector('.cart-items');
  let cartCost = localStorage.getItem('totalCost');
  cartItems = JSON.parse(cartItems);
  if (cartItems) {
    cartItemsContainer.innerHTML = '';
    Object.values(cartItems).map((item) => {
      cartItemsContainer.innerHTML += `
<div class="cart-items__item">
<div class="image">
  <img src="img/webp/${item.tag}.webp" alt="" />
  <div class="name">${item.name}</div>
</div>
<div class="amount">
  <div class="amount-top">
    <div class="count">x${item.inCart}</div>
    <div class="price">$${item.price}</div>
  </div>
</div>
</div>
`;

      document.querySelector('.cart-totals').innerHTML = `
Subtotal $${cartCost}
`;
    });
  } else {
    cartItemsContainer.innerHTML = '';
    cartItemsContainer.innerHTML += `<p class="empty-cart-desc">cart is empty</p>`;
  }
  console.log(cartItems);
}

// Remove Item
const emptyCartBtn = document.querySelector('.empty-cart Button');

function removeAllItems() {
  localStorage.removeItem('productsInCart');
  localStorage.removeItem('totalCost');
  localStorage.removeItem('cartNumbers');
  location.reload();
}

emptyCartBtn.addEventListener('click', removeAllItems);

onLoadCartNumbers();
displayCartItems();
