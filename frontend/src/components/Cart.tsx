import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

export default function Cart() {
  const { items, updateQuantity, removeFromCart, clearCart, getTotalPrice } = useCart();
  const { darkMode } = useTheme();

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    updateQuantity(productId, newQuantity);
  };

  if (items.length === 0) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-dark' : 'bg-gray-100'} pt-20 pb-16 px-4 transition-colors duration-300`}>
        <div className="max-w-4xl mx-auto">
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-light' : 'text-gray-800'} mb-8 transition-colors duration-300`}>Your Cart</h1>
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-8 text-center shadow-lg transition-colors duration-300`}>
            <div className={`text-6xl ${darkMode ? 'text-gray-600' : 'text-gray-300'} mb-4 transition-colors duration-300`}>🛒</div>
            <h2 className={`text-xl font-semibold ${darkMode ? 'text-light' : 'text-gray-800'} mb-4 transition-colors duration-300`}>Your cart is empty</h2>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-6 transition-colors duration-300`}>Add some products to get started!</p>
            <a 
              href="/products" 
              className="inline-block bg-primary hover:bg-accent text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Shop Products
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-dark' : 'bg-gray-100'} pt-20 pb-16 px-4 transition-colors duration-300`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-light' : 'text-gray-800'} transition-colors duration-300`}>Your Cart</h1>
          <button
            onClick={clearCart}
            className={`px-4 py-2 rounded-lg border transition-colors ${
              darkMode 
                ? 'border-gray-600 text-gray-400 hover:text-red-400 hover:border-red-400' 
                : 'border-gray-300 text-gray-600 hover:text-red-600 hover:border-red-600'
            }`}
          >
            Clear Cart
          </button>
        </div>

        <div className="space-y-4 mb-8">
          {items.map(item => {
            const itemPrice = item.discount ? item.price * (1 - item.discount) : item.price;
            
            return (
              <div key={item.productId} className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 shadow-lg transition-colors duration-300`}>
                <div className="flex items-center space-x-4">
                  <div className={`w-24 h-24 ${darkMode ? 'bg-gradient-to-t from-gray-700 to-gray-800' : 'bg-gradient-to-t from-gray-100 to-white'} rounded-lg p-2 transition-colors duration-300`}>
                    <img 
                      src={`/${item.imgName}`} 
                      alt={item.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className={`text-xl font-semibold ${darkMode ? 'text-light' : 'text-gray-800'} mb-2 transition-colors duration-300`}>
                      {item.name}
                    </h3>
                    <div className="flex items-center space-x-2">
                      {item.discount ? (
                        <>
                          <span className="text-gray-500 line-through text-sm">${item.price.toFixed(2)}</span>
                          <span className="text-primary text-lg font-bold">${itemPrice.toFixed(2)}</span>
                          <span className="text-green-600 text-sm font-medium">
                            {Math.round(item.discount * 100)}% OFF
                          </span>
                        </>
                      ) : (
                        <span className="text-primary text-lg font-bold">${item.price.toFixed(2)}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className={`flex items-center space-x-3 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-lg p-1 transition-colors duration-300`}>
                      <button 
                        onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                        className={`w-8 h-8 flex items-center justify-center ${darkMode ? 'text-light' : 'text-gray-700'} hover:text-primary transition-colors duration-300`}
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        -
                      </button>
                      <span className={`${darkMode ? 'text-light' : 'text-gray-800'} min-w-[2rem] text-center transition-colors duration-300`}>
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                        className={`w-8 h-8 flex items-center justify-center ${darkMode ? 'text-light' : 'text-gray-700'} hover:text-primary transition-colors duration-300`}
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right min-w-[100px]">
                      <div className={`text-lg font-bold ${darkMode ? 'text-light' : 'text-gray-800'} transition-colors duration-300`}>
                        ${(itemPrice * item.quantity).toFixed(2)}
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className={`p-2 rounded-lg transition-colors ${
                        darkMode 
                          ? 'text-gray-400 hover:text-red-400 hover:bg-gray-700' 
                          : 'text-gray-600 hover:text-red-600 hover:bg-gray-100'
                      }`}
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 shadow-lg transition-colors duration-300`}>
          <div className="flex justify-between items-center text-2xl font-bold">
            <span className={`${darkMode ? 'text-light' : 'text-gray-800'} transition-colors duration-300`}>
              Total:
            </span>
            <span className="text-primary">
              ${getTotalPrice().toFixed(2)}
            </span>
          </div>
          <button className="w-full mt-6 bg-primary hover:bg-accent text-white py-3 rounded-lg font-semibold text-lg transition-colors">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}