const CART_KEY = "cartItems";

// Get cart
export const getCart = () => {
  const cart = localStorage.getItem(CART_KEY);

  return cart ? JSON.parse(cart) : [];
};


// Get number of different products
export const getCartCount = () => {
  const cart = getCart();

  return cart.length;
};


// Add product
export const addToCart = (productId, quantity = 1) => {
  const cart = getCart();

  const existingProduct = cart.find(
    (item) => item.id === productId
  );

  if (existingProduct) {
    existingProduct.quantity += quantity;
  } else {
    cart.push({
      id: productId,
      quantity: quantity,
    });
  }

  localStorage.setItem(
    CART_KEY,
    JSON.stringify(cart)
  );

  // Tell Header that cart changed
  window.dispatchEvent(new Event("cartUpdated"));
};


// Update quantity
export const updateCartQuantity = (productId, quantity) => {
  const cart = getCart();

  const product = cart.find(
    (item) => item.id === productId
  );

  if (product) {
    product.quantity = quantity;
  }

  localStorage.setItem(
    CART_KEY,
    JSON.stringify(cart)
  );

  // Tell Header that cart changed
  window.dispatchEvent(new Event("cartUpdated"));
};


// Remove product
export const removeFromCart = (productId) => {
  const cart = getCart();

  const updatedCart = cart.filter(
    (item) => item.id !== productId
  );

  localStorage.setItem(
    CART_KEY,
    JSON.stringify(updatedCart)
  );

  // Tell Header that cart changed
  window.dispatchEvent(new Event("cartUpdated"));
};