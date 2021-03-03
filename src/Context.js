import React, { useState, useEffect } from 'react';
import {detailProduct, storeProducts} from './data';


export const ProductContext = React.createContext();


export const ProductProvider = (props) => { 

    const [products, setProducts] = useState([]);
    const [details, setDetails] = useState(detailProduct);

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
        <ProductContext.Provider value={{products, setProducts, details, setDetails}}>
            {props.children}
        </ProductContext.Provider>
    );
}
