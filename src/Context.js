import React, { useState, useEffect } from 'react';
import {detailProduct, storeProducts} from './data';


export const ProductContext = React.createContext();

export const ProductProvider = (props) => { 

    const [products, setProducts] = useState([]);
    const [details, setDetails] = useState(detailProduct);
    const [cartItems, setCartItems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalProduct, setModalProduct] = useState(null);

    const increment = id => {
        let tempCart = [...cartItems];
        const selectedProduct = tempCart.find(item => {
          return item.id === id;
        });
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];
        product.count = product.count + 1;
        product.total = product.count * product.price;

        setCartItems(() => tempCart);
    }

    const decrement = id => {
        let tempCart = [...cartItems];
        const selectedProduct = tempCart.find(item => {
          return item.id === id;
        });
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];
        product.count = product.count - 1;

        if(product.count === 0){
            removeItem(id);
        }
        else{
            setCartItems(() => tempCart);
        }
    }

    const removeItem = id => {
        let tempProducts = [...products];
        let tempCart = [...cartItems];
    
        const index = tempProducts.indexOf(getItem(id));
        let removedProduct = tempProducts[index];
        removedProduct.inCart = false;
        removedProduct.count = 0;
        removedProduct.total = 0;
    
        tempCart = tempCart.filter(item => {
          return item.id !== id;
        });

        setProducts(() => tempProducts);
        setCartItems(() => tempCart);
    }

    const getItem = (id) => {
        return products.find(item => item.id === id);
    }

    const addToCart = id => {
        const tempProducts = [...products];
        const product = tempProducts.find(item => item.id===id);
        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total = price;
        
        setProducts(() => tempProducts);
        setCartItems((items) => [...items, product]);
    }

    const openModal = id => {
        const product = getItem(id);
        
        setIsModalOpen(() => true);
        setModalProduct(() => product);
    }

    const closeModal = () => {
        setIsModalOpen(() => false);
    }

    const handleDetails = (id) => {
        const details = getItem(id);
        setDetails(() => {
            return details;
        }) 
    }

    useEffect(() => {
        let tempProduct = [];
        storeProducts.forEach((product) => {
           tempProduct = [...tempProduct, {...product}];
        })

        setProducts(() => {
            return tempProduct;
        })
    }, [])

    return (
        <ProductContext.Provider value={
            {products,
            setProducts,
            details,
            setDetails,
            addToCart,
            openModal,
            handleDetails, 
            closeModal, 
            isModalOpen, 
            cartItems, 
            modalProduct, 
            increment, 
            decrement, 
            removeItem}}>
            {props.children}
        </ProductContext.Provider>
    );
}
