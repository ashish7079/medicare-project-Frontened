import { createContext, useState } from "react";

export const CartContext = createContext();

function CartProvider({ children }) {

  const [cart, setCart] = useState([]);

  // Add To Cart
  const addToCart = (item) => {

    setCart((prev) => [...prev, item]);
  };

  // Remove
  const removeCart = (id) => {

    const updated = cart.filter((item) =>
      item.id !== id
    );

    setCart(updated);
  };

  return (

    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeCart
      }}
    >

      {children}

    </CartContext.Provider>
  );
}

export default CartProvider;