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
                            cart: state.cart.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + quantity }
                                : item),
                        };
                    } else {
                        return {
                            cart: [...state.cart, { ...product, quantity }]
                        }
                    }
                }),
            clearCart: () => set({ cart: [] }),
        }),
        { name: "cart storage", }
    )
);