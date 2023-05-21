import logo from './logo.svg';
import './App.css';
import Header from './component/Header/Header';
import Footer from './component/Footer/Footer';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './component/Login/Login';
import store from './redux/store';
import { Provider, connect } from 'react-redux';
import { initializeApp } from './redux/app-reducer';
import { compose } from 'redux';
import { useEffect } from 'react';
import NavBar from './component/NavBar/NavBar';
import Products from './component/Products/Products';
import { withAuthRedirect } from './hoc/withAuthRedirect';
import Product from './component/Product/Product';
import AdminBar from './component/AdminBar/AdminBar';
import Register from './component/Register/Register';
import Preloader from './common/Preloader';
import Admin from './component/Admin/Admin';

function App(props) {

  useEffect(()=>props.initializeApp(), [])

  if(!props.initialized)
  return <div className="App">
    <div className="preloader"><Preloader /></div> 
  </div>

  document.title = "Главная";
  return <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <div className='content'>
        
        <Routes >
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register /> } />
          <Route path='/products' element={<Products />} />
          <Route path='/admin' element={<Admin /> } />
          {/* <Route path='/create-item' element={<div>Create item</div> } />
          <Route path='/update-item' element={<div>Update item</div> } /> */}
          <Route path='/product/:currentId' element={<Product />} />
          <Route exact path='/' element={<Navigate to="/products" replace />} />
          <Route path='*'element={<div>404 Not Found</div>}  />
        </Routes>
      </div>
      <footer><Footer /></footer>
    </div>
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
});

let AppContainer = compose(
  connect(mapStateToProps, {initializeApp}))
  (App);

  const ExportApp = () => {
    return<BrowserRouter>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </BrowserRouter>
  }


export default ExportApp;
