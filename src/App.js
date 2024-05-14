import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Cart from './components/Cart';
import ProductDetails from './components/ProductDetails';
import PageContainer from './components/PageContainer';
import AppProvider from './context/AppContext';
import ProductProvider from './context/ProductContext';
import CheckOut from './components/CheckOut';
import Payment from './components/Payment';

function App() {
  return (
    <>
      <BrowserRouter>
        <AppProvider>
          <ProductProvider>
            <Navbar />
            <Routes>
              <Route path='/' element={<PageContainer />}></Route>
              <Route path='/cart' element={<Cart />}></Route>
              <Route path='/product/:productId' element={<ProductDetails />}></Route>
              <Route path='/checkout' element={<CheckOut/>}></Route>
              <Route path='/payment' element={<Payment/>}></Route>
            </Routes>
          </ProductProvider>
        </AppProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
