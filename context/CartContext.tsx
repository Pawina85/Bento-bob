'use client';


import { createContext, useContext, useState, ReactNode } from 'react';

export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    }

    export interface Order {
    id: string;
    items: CartItem[];
    totalPrice: number;
    deliveryAddress: string;
    status: 'pending' | 'preparing' | 'out-for-delivery' | 'delivered';
    estimatedDeliveryTime: string;
    createdAt: Date;
    }

    export interface DeliveryInfo {
        type: 'pickup' | 'delivery' | null;
        location: string | null;
        date: string | null;
        time: string | null;
    }

    interface CartContextType {
        items: CartItem[];
        isCartOpen: boolean;
        isCheckoutOpen: boolean;
        isConfirmationOpen: boolean;
        currentOrder: Order | null;
        totalItems: number;
        totalPrice: number;
        deliveryInfo: DeliveryInfo;
        addItem: (item: Omit<CartItem, 'quantity'>) => void;
        removeItem: (id: string) => void;
        updateQuantity: (id: string, quantity: number) => void;
        clearCart: () => void;
        openCart: () => void;
        closeCart: () => void;
        openCheckout: () => void;
        closeCheckout: () => void;
        openConfirmation: (order: Order) => void;
        closeConfirmation: () => void;
        updateDeliveryInfo: (info: Partial<DeliveryInfo>) => void;
    }
const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

    const totalItems =  items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const addItem = (newItem: Omit<CartItem, 'quantity'>) => {
        setItems((prev) => {            
            const existingItem = prev.find((item) => item.id === newItem.id);
            if (existingItem) {
                return prev.map((item) =>
                    item.id === newItem.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...newItem, quantity: 1 }];
        });
    };

    const removeItem = (id: string) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    const updateQuantity = (id: string, quantity: number) => {
        if (quantity <= 0) {
            removeItem(id);
            return;
        }
        setItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setItems([]);
    };

    const openCart = () => {
        setIsCartOpen(true);
    };
    const closeCart = () => {
        setIsCartOpen(false);
    };

    const openCheckout = () => {
        setIsCheckoutOpen(true);
    };
    const closeCheckout = () => {
        setIsCheckoutOpen(false);
    };

    const openConfirmation = (order: Order ) => {
        setIsCheckoutOpen(false);
        setCurrentOrder(order);
        setIsConfirmationOpen(true);
        clearCart();
    };
    const closeConfirmation = () => {
        setIsConfirmationOpen(false);
        setCurrentOrder(null);
    };

    const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo>({
        type: null,
        location: null,
        date: null,
        time: null,
    });

    const updateDeliveryInfo = (info: Partial<typeof deliveryInfo>) => {
        setDeliveryInfo((prev) => ({ ...prev, ...info }));
    }

    return (
        <CartContext.Provider
            value={{
                items,
                isCartOpen,
                isCheckoutOpen,
                isConfirmationOpen,
                currentOrder,
                totalItems,
                totalPrice,
                deliveryInfo,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
                openCart,
                closeCart,
                openCheckout,
                closeCheckout,
                openConfirmation,
                closeConfirmation,
                updateDeliveryInfo,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
