import React from 'react'
import {Switch,Route} from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from './components/Navbar'
import ProductList from './components/ProductList'
import Details from './components/Details'
import Cart from './components/Cart/Cart'
import Default from './components/Default'
import Modal from  './components/Modal'
// Browser Route  is the container will hold all information
// switch componet grouping routes 
// rouute will display the specific route
// Link will serve as the anchor tag

function App() {
  return (
      <React.Fragment>
  
        <Navbar/>
              <Switch>
                <Route exact path='/' component={ProductList}/>
                <Route path='/details' component={Details}/>       
                <Route path='/cart' component={Cart}/>           
                <Route component={Default}/>                
              </Switch>
              <Modal />
   
      </React.Fragment>
  );
}

export default App;


// resume 3:45: 37  
// 5:13:36