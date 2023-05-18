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

function App(props) {

  useEffect(()=>props.initializeApp(), [])

  if(!props.initialized)
  return <div className="preloader">loading...</div> 

  document.title = "Главная";
  return <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <div className='content'>
        <NavBar />
        <Routes >
          <Route path='/login' element={<Login />} />
          <Route path='/products' element={<Products />} />
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
