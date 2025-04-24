import { create } from "zustand";
import { CartStore } from "../types";
import { persist } from "zustand/middleware";



export const useCartStore = create<CartStore>()(
    persist(
        (set) => ({
            cart: [],

            addToCart: (product, quantity) =>
                set((state) => {
                    const existing = state.cart.find((item) => item.id === product.id);
                    if (existing) {
                        return {
                            cart: state.cart.map((item) =>
                                item.id === product.id ? { ...item, quantity: item.quantity + quantity }
                                    : item),
                        };
                    } else {
                        return {
                            cart: [...state.cart, { ...product, quantity, selected: true }]
                        }
                    }
                }),

            removeFromCart: (id) => set((state) => ({

                cart: state.cart.filter((item) => item.id !== id)
            })),

            toggleSelect: (id) =>
                set((state) => ({
                    cart: state.cart.map((item) =>
                        item.id === id ? { ...item, selected: !item.selected } : item
                    ),
                })),

            clearCart: () => set({ cart: [] }),

            updateQuantity: (id, quantity) =>
                set((state) => ({
                    cart: state.cart.map((item) => item.id === id ? { ...item, quantity } : item)
                })),
        }),
        { name: "cart storage", }
    )
);