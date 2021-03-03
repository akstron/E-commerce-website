import React, { useState, useEffect } from 'react';
import {detailProduct, storeProducts} from './data';


export const ProductContext = React.createContext();


export const ProductProvider = (props) => { 

    const [products, setProducts] = useState([]);
    const [details, setDetails] = useState(detailProduct);

    const getItem = (id) => {
        return products.find(item => item.id === id);
    }

    const addToCart = () => {

    }

    const openModal = () => {

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
        <ProductContext.Provider value={{products, setProducts, details, setDetails, addToCart, openModal, handleDetails}}>
            {props.children}
        </ProductContext.Provider>
    );
}
