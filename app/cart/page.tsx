'use client';

import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Lottie from 'lottie-react';
import emptyCartAnimation from '@/public/animations/empty-cart.json.json';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useCart();

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="w-64 h-64">
          <Lottie animationData={emptyCartAnimation} loop={true} />
        </div>
        <h2 className="text-lg font-semibold text-gray-600 mt-4">Your cart is currently empty</h2>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Your Shopping Cart</h1>

      <div className="space-y-6">
        {cart.map((item) => (
          <div key={item.id} className="flex gap-6 border-b pb-4">
            <Image src={item.image} alt={item.title} width={100} height={100} className="rounded-md" />
            <div className="flex-1">
              <h2 className="font-semibold text-lg">{item.title}</h2>
              <p className="text-gray-600">Rs: {item.price}</p>

              <div className="flex items-center mt-2 gap-2">
                <label className="text-sm text-gray-700">Quantity:</label>
                <select
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                  className="border px-2 py-1 rounded"
                >
                  {[1, 2, 3, 4, 5].map((q) => (
                    <option key={q} value={q}>{q}</option>
                  ))}
                </select>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-sm text-red-500 hover:underline ml-4"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-right mt-10">
        <p className="text-xl font-semibold">Total: Rs {totalPrice}</p>
        <button className="bg-blue-600 text-white px-6 py-2 rounded mt-4 hover:bg-blue-700">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
