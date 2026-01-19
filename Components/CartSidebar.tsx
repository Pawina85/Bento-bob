import { useCart } from '@/Components/CartContext';
import Image from 'next/image';

export default function CartSidebar() {

    const {
        items ,
        isCartOpen,
        closeCart,
        updateQuantity,
        removeItem,
        totalPrice,
        totalItems,

    } = useCart();

    if (!isCartOpen) return null;

    return (
        <>
        <div 
        className="fixed inset-0 bg-black/50 z-40"
        onClick={closeCart}
        />

        <div className="fixed right-0 h-full max-w-md bg-white shadow-xl z-50 flex flex-col">

            <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900">Your Cart ({totalItems})</h2>
            
            <button 
            onClick={closeCart}
            className="p-2 text-gray-500 hover:text-gray-900 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
                {items.length === 0 ? (
                    <div className="text-center py-12">
                        <span className="text-5xl mb-4 block">🍱</span>
                        <p className="text-gray-500 mb-2">Your cart is empty</p>
                        <p className="text-gray-400 text-sm">Add some delicious bento!</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {items.map((item) => (
                            <div key={item.id} className="flex gap-4 bg-gray-50 rounded-xl p-3">

                                <div className="w-20 h-20 relative rounded-lg overflow-hidden flex-shrink-0">
                                    <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    sizes="80px"
                                    className="object-cover"
                                    />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
                                    <p className="text-yellow-500 font-bold">${item.price.toFixed(2)}</p>
                                
                                <div className="flex items-center gap-2 mt-2">
                                    <button 
                                    onClick={() => updateQuantity(item.id, item.quantity -1)}
                                    className="w-7 h-7 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-600 font-bold transition-colors"
                                    >-</button>
                                    <span className="w-6 text-center font-semibold text-gray-900">{item.quantity}</span>
                                    <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="w-7 h-7 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-600 font-bold transition-colors"
                                    >+</button>
                                </div>
                                </div>

                                <button
                                    onClick={() => removeItem(item.id)}
                                    className="p-2 text-gray-400 hover:text-red-500 transition-colors self-start"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                                
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {items.length > 0 && (
            <div className="p-4 border-t border-gray-100 space-y-4">
                <div className="space-y-2">
                    <div className="flex justify-between text-gray-600">
                        <span>Subtotal</span>
                        <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                        <span>Delivery</span>
                        <span>$2.00</span>
                    </div>
                    <div className="flex justify-between font-bold text-gray-900 text-lg pt-2 border-t border-gray-100">
                        <span>Total</span>
                        <span>${(totalPrice + 2).toFixed(2)}</span>
                    </div>
                </div>
                <button
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-4 rounded-full transition-all hover:scale-105">
                    Checkout
                </button>
            </div>
            )}
                            
        </div>
        
        </>
    );
}