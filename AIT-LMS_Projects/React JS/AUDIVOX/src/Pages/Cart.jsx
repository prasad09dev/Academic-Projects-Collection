import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import productsData from "../Components/Data/ProductsData";

import {
  getCart,
  updateCartQuantity,
  removeFromCart,
} from "../Utils/cart";

function Cart() {

  const [cartItems, setCartItems] = useState([]);

  // Load cart when page opens
  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    const storedCart = getCart();

    const cartWithProducts = storedCart
      .map((cartItem) => {

        const product = productsData.find(
          (item) => item.id === cartItem.id
        );

        if (!product) return null;

        return {
          ...product,
          cartQuantity: cartItem.quantity,
        };
      })
      .filter(Boolean);

    setCartItems(cartWithProducts);
  };


  // Increase quantity
  const increaseQuantity = (id) => {

    const item = cartItems.find(
      (product) => product.id === id
    );

    if (!item) return;

    const newQuantity = item.cartQuantity + 1;

    updateCartQuantity(id, newQuantity);

    setCartItems((prev) =>
      prev.map((product) =>
        product.id === id
          ? {
              ...product,
              cartQuantity: newQuantity,
            }
          : product
      )
    );
  };


  // Decrease quantity
  const decreaseQuantity = (id) => {

    const item = cartItems.find(
      (product) => product.id === id
    );

    if (!item) return;

    // Don't allow quantity below 1
    if (item.cartQuantity <= 1) {
      return;
    }

    const newQuantity = item.cartQuantity - 1;

    updateCartQuantity(id, newQuantity);

    setCartItems((prev) =>
      prev.map((product) =>
        product.id === id
          ? {
              ...product,
              cartQuantity: newQuantity,
            }
          : product
      )
    );
  };


  // Remove item
  const handleRemove = (id) => {

    removeFromCart(id);

    setCartItems((prev) =>
      prev.filter(
        (product) => product.id !== id
      )
    );
  };


  // Original price total
  const originalTotal = cartItems.reduce(
    (total, product) =>
      total +
      product.originalPrice * product.cartQuantity,
    0
  );


  // Actual selling price
  const totalPrice = cartItems.reduce(
    (total, product) =>
      total +
      product.finalPrice * product.cartQuantity,
    0
  );


  // Discount
  const discount = originalTotal - totalPrice;


  return (
    <div className="min-h-screen px-[15px] sm:px-[30px] lg:px-[55px] py-[40px]">

      {cartItems.length === 0 ? (

        /* Empty Cart */
        <div className="min-h-[60vh] flex flex-col items-center justify-center">

          <h1 className="text-3xl font-bold mb-[10px]">
            Your Cart is Empty
          </h1>

          <p className="">
            Add some products to your cart.
            <NavLink to="/products" className="inline">
            <h1 className="text-orange-500 underline">Check product</h1>
            </NavLink>
          </p>

        </div>

      ) : (

        <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1fr] gap-[30px] max-w-[1500px] mx-auto">

          {/* ========================= */}
          {/* LEFT - CART PRODUCTS */}
          {/* ========================= */}

          <div className="space-y-[20px]">

            {cartItems.map((product) => (

              <div
                key={product.id}
                className="rounded-md border p-[20px] flex flex-col sm:flex-row items-center gap-[25px]"
              >

                {/* Product Image */}
                <div className="w-[180px] h-[180px] flex items-center justify-center shrink-0">

                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-full object-contain"
                  />

                </div>


                {/* Product Information */}
                <div className="flex-1 w-full">

                  <div className="flex justify-between items-start gap-[15px]">

                    <h2 className="text-lg sm:text-xl font-medium">
                      {product.title}
                    </h2>

                    {/* Delete */}
                    <button
                      onClick={() =>
                        handleRemove(product.id)
                      }
                      className=" hover:text-orange-500 transition"
                    >
                      <FaTrash />
                    </button>

                  </div>


                  {/* Price */}
                  <div className="flex items-center gap-[12px] mt-[25px]">
                    <span className="text-2xl font-bold">
                      ₹
                      {product.finalPrice.toLocaleString(
                        "en-IN"
                      )}
                    </span>

                    <span className="line-through text-gray-500">
                      ₹
                      {product.originalPrice.toLocaleString(
                        "en-IN"
                      )}
                    </span>

                  </div>


                  {/* Quantity */}
                  <div className="mt-[30px]">

                    <div className="flex w-fit border border-gray-700 rounded-sm overflow-hidden">

                      <button
                        onClick={() =>
                          decreaseQuantity(product.id)
                        }
                        className="w-[60px] h-[44px] text-red-500 hover:bg-gray-800 text-xl transition"
                      >
                        −
                      </button>

                      <span className="w-[60px] h-[44px] flex items-center justify-center text-orange-500 text-xl font-bold">
                        {product.cartQuantity}
                      </span>

                      <button
                        onClick={() =>
                          increaseQuantity(product.id)
                        }
                        className="w-[60px] h-[44px] text-green-500 hover:bg-gray-800 text-xl transition"
                      >
                        +
                      </button>

                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>


          {/* ========================= */}
          {/* RIGHT - ORDER SUMMARY */}
          {/* ========================= */}

          <div>

            <div className="lg:sticky lg:top-[20px]">

              <h2 className="text-2xl font-bold mb-[55px]">
                Order Summary
                <span className="text-lg font-normal ml-[10px]">
                  ({cartItems.length}{" "}
                  {cartItems.length === 1 ? "item" : "items"})
                </span>
              </h2>


              {/* Original Price */}
              <div className="flex justify-between items-center mb-[30px]">

                <span className="text-lg">
                  Original Price
                </span>

                <span className="text-lg font-semibold">
                  ₹
                  {originalTotal.toLocaleString(
                    "en-IN"
                  )}
                </span>

              </div>


              {/* Discount */}
              <div className="flex justify-between items-center mb-[30px]">

                <span className="text-lg">
                  Discount
                </span>

                <span className="text-lg">
                  - ₹
                  {discount.toLocaleString(
                    "en-IN"
                  )}
                </span>

              </div>


              {/* Delivery */}
              <div className="flex justify-between items-center mb-[45px]">

                <span className="text-lg">
                  Delivery
                </span>

                <span className="text-lg text-green-500">
                  Free
                </span>

              </div>


              <hr className="border-gray-800" />


              {/* Total */}
              <div className="flex justify-between items-center mt-[50px] mb-[60px]">

                <span className="text-2xl font-bold">
                  Total Price
                </span>

                <span className="text-2xl font-bold">
                  ₹
                  {totalPrice.toLocaleString(
                    "en-IN"
                  )}
                </span>
              </div>

              {/* Checkout */}
              <button className="w-full py-[15px] bg-orange-400 hover:bg-orange-500 text-lg rounded-sm transition active:scale-[0.98]">
                Checkout
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Cart;