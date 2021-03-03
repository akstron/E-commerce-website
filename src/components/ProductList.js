import React, { useContext } from 'react'
import Product from './Product'
import Title from './Title'
import {ProductContext} from '../Context'

function ProductList() {

    const value = useContext(ProductContext);

    return (
    <>
        <div className="py-5">
            <div className="container">
                <Title name="our" title="products"/>
                <div className="row">
                {
                    value.products.map((product) => {
                        return (
                            <Product product={product}/>
                        )
                    })
                }
                </div>  
            </div>
        </div>
    </>
)
}

export default ProductList
