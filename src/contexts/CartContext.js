'use client';

import { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const initialState = {
  items: [],
  storeId: null,
  storeName: null,
  storeCategory: null,
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      // If trying to add item from different store, clear cart first
      if (state.storeId && state.storeId !== action.item.storeId) {
        return {
          items: [{ ...action.item, quantity: 1 }],
          storeId: action.item.storeId,
          storeName: action.storeName,
          storeCategory: action.storeCategory,
        };
      }

      const existingItem = state.items.find((i) => i.id === action.item.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.item.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.item, quantity: 1 }],
        storeId: action.item.storeId,
        storeName: action.storeName,
        storeCategory: action.storeCategory,
      };
    }
    case 'REMOVE_ITEM': {
      const existingItem = state.items.find((i) => i.id === action.itemId);
      if (existingItem.quantity === 1) {
        const newItems = state.items.filter((item) => item.id !== action.itemId);
        return {
          ...state,
          items: newItems,
          storeId: newItems.length > 0 ? state.storeId : null,
          storeName: newItems.length > 0 ? state.storeName : null,
          storeCategory: newItems.length > 0 ? state.storeCategory : null,
        };
      }
      return {
        ...state,
        items: state.items.map((item) => (item.id === action.itemId ? { ...item, quantity: item.quantity - 1 } : item)),
      };
    }
    case 'CLEAR_CART':
      return initialState;
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = (item) => {
    // Extract store info from the item
    const { storeName, storeCategory, ...itemData } = item;
    dispatch({
      type: 'ADD_ITEM',
      item: itemData,
      storeName,
      storeCategory,
    });
  };

  const removeItem = (itemId) => {
    dispatch({ type: 'REMOVE_ITEM', itemId });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getTotal = () => {
    return state.items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ ...state, addItem, removeItem, clearCart, getTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
