import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header, Footer } from "./Components/Components";

// Pages
import Home from './Pages/Home';
import Products from './Pages/Products'
import Cart from './Pages/Cart'
import Productdetails from './Pages/Productdetails'

function App() {
  return (<>
    
    <BrowserRouter>
      <Header />    
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products/:id" element={<Productdetails />} />
        </Routes>

        <Footer />
    </BrowserRouter>
  </>);
}

export default App;