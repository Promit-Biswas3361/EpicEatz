import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { store } from './Redux/store.js';
import { CartProvider } from './Frontend/context/CartContext'; // ✅ Adjust path as needed

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <CartProvider> {/* ✅ Wrap App with CartProvider */}
        <App />
      </CartProvider>
    </Provider>
  </StrictMode>
);
