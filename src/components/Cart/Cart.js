import React, { useContext } from "react";
import Title from "../Title";
import CartColumns from "./CartColumns";
import { ProductContext } from '../../Context'
import CartList from "./CartList";
import EmptyCart from "./EmptyCart";

export default function Store() {

    const value = useContext(ProductContext);
    const { cartItems } = value;

    if(cartItems.length === 0){
        return <EmptyCart/>
    }

    return (
      <section>
        <Title name="your" title="cart" />
        <CartColumns />
        <CartList value={value} />
      </section>
    );
}
