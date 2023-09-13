import { createContext, useContext, useState } from "react";
import { CartItem } from "../(tabs)/cart";

interface cartProps {
    cartItems: CartItem[];
    addItem: (item: any) => void;
    addCartItem: (items: CartItem) => void;
    deleteItem: (itemId: string) => void;
    addQuantity: (itemId: string, quantity: number) => void;
}

const CartContext = createContext<cartProps>({} as cartProps);

export const useCart = () => {
    const context = useContext(CartContext);
    return context;
  };

const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    function addItem(Item: any) {
        setCartItems(Item);
    }

    function addCartItem(Items: any) {
        setCartItems([...cartItems, Items]);
    }

    function deleteItem(id: string) {
        const updatedCartItems = cartItems.filter((item) => item.id !== id);
        setCartItems(updatedCartItems);
    }

    function addQuantity(id: string, quantity: number) {
        setCartItems(cartItems.map((item) => {
            if (item.id === id) {
                item.quantity = quantity.toString();
            }
            return item;
        }))
    }

    return (
        <CartContext.Provider value={{ cartItems, addItem, addCartItem, deleteItem, addQuantity }} >
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;