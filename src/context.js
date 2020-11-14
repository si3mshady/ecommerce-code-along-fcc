import React, { Component } from 'react'
import {storeProducts, detailProduct} from './data'

const ProductContext = React.createContext();
// Create context creates two components
// 1.) Provider 
// 2.) Consumer 

class ProductProvider extends Component {

    state = {
        products: [],
        detailProduct: detailProduct,
        cart: [],
        modalOpen: false,
        modalProduct: detailProduct,
        cartSubTotal:0,
        cartTax:0,
        cartTotal: 0
    }


    componentDidMount() {
        this.setProducts();
    }

    // this process allows us to avoid passing objects in array by reference 
    //Allows us to access hard copy or products instead of using a reference 
    // passing by refernce any updates the array affect the source array and its copies
    // You may just want to copy an array so that changes in one array do not affect the other. 
    setProducts = () => {
        let tempProducts = [];
        storeProducts.forEach(item => {
            const singleItem = {...item}
            tempProducts = [...tempProducts, singleItem]

        })
        this.setState({ products: tempProducts })
    }

    // utility method to get item based on id 
    getItem = (id) =>  {
        const product = this.state.products.find(item => item.id === id);
        // console.log('here is the product', product)
        return product;
    }

    handleDetail = (id) => {
        const product = this.getItem(id);
       this.setState( {detailProduct:product })    
    }

    addToCart = (id) => {
       let tempProducts = [...this.state.products];
       const index = tempProducts.indexOf(this.getItem(id));
       const product   = tempProducts[index];
       product.inCart = true;
       product.count = 1;
       const price = product.price;
       product.total = price;
       this.setState({
           products: tempProducts, cart:[...this.state.cart, product]

       }, () => {this.addTotals()})
    }


    openModal = id => {
        const product = this.getItem(id);
        this.setState({
            modalProduct:product,
            modalOpen:true
        })
    }

    closeModal = () => {
        this.setState({
            modalOpen:false
        }) }

    increment = (id) => {
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => item.id === id );
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];

        product.count += 1
        product.total = product.count * product.price;
        this.setState({cart:[...tempCart]}, () => {this.addTotals()})


    }

    decrement = (id) => {
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => item.id === id );
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];
        product.count = product.count -1;
        if (product.count === 0) {
            this.removeItem(id)
        } else {  product.total = product.count * product.price  

        this.setState({cart:[...tempCart]}, () => {this.addTotals()})
        }

    }

    removeItem = (id) => {
        let tempProducts = [...this.state.products];
        let tempCart = [...this.state.cart];

        tempCart = tempCart.filter(item => item.id !== id);

        const index = tempProducts.indexOf(this.getItem(id))
        let removedProduct = tempProducts[index];
        removedProduct.inCart = false;
        removedProduct.count = 0;
        removedProduct.total = 0;

        this.setState(() => {
            return {cart: [...tempCart],
            products: [...tempProducts]}
        },
        () => { this.addTotals()})

    }

    
  
    clearCart = () => {
        this.setState(() => {
            return {cart:[]}
        }, () => {
            this.setProducts();
            this.addTotals()
        })
    }

    addTotals = () => {
        let subTotal = 0;
        this.state.cart.map(item => (subTotal += item.total));
        const tempTax = subTotal * .1;
        const tax = parseFloat(tempTax.toFixed(2));
        const total = subTotal + tax
        this.setState(() => {
            return {
                cartSubTotal: subTotal,
                cartTax: tax,
                cartTotal: total
            }
        })

    }

    render() {
        return (
            // must return the Provider component 
            <ProductContext.Provider value={{
                 ...this.state,
                handleDetail: this.handleDetail,
                addToCart: this.addToCart,
                openModal: this.openModal,
                closeModal: this.closeModal,
                increment: this.increment,
                decrement: this.decrement,
                removeItem: this.removeItem,
                clearCart: this.clearCart                 

                  }}>

            {this.props.children}
                
            </ProductContext.Provider>
        )
    }
}


const ProductConsumer = ProductContext.Consumer;

export{ProductProvider,ProductConsumer}


// resume https://www.youtube.com/watch?v=wPQ1-33teR4&t=3105s