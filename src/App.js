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
import Register from './component/Admin/Register/Register';
import Preloader from './common/Preloader';
import Admin from './component/Admin/Admin';
import Order from './component/Order/Order';

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
          <Route path='/profile' element={<><div>Данная страница находится в разработке</div><div className="preloader"><Preloader /></div></>} />
          <Route path='/about-us' element={<><div>Данная страница находится в разработке</div><div className="preloader"><Preloader /></div></>} />
          <Route path='/order' element={<Order /> } />
          <Route path='/products' element={<Products />} />
          <Route path='/admin' element={<Admin /> } />
          <Route path='/product/:currentId' element={<Product />} />
          <Route exact path='/' element={<Navigate to="/products" replace />} />
          <Route path='*'element={<><div>404 Not Found</div><div className="preloader"><Preloader /></div></>}  />
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
