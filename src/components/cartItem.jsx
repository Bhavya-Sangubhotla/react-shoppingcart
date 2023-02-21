import react, { useState } from "react";




function CartItem(props) {

    const [item, setItem] = useState({
        title: props.title,
        price: props.price,
        quantity: props.quantity 
    })

    function handlePlusClick(){
        setItem(prev =>{
            prev.quantity = prev.quantity + 1
            return prev
        })
        props.onAdd(item);
    }

    function handleMinusClick(){
        var updatedQuantity;
        setItem(prev =>{
                prev.quantity = prev.quantity -1
                updatedQuantity = prev.quantity
                return prev;
           
        })
        if(updatedQuantity > 0){
            props.onAdd(item);
        }
        else{
            props.onRemove(item);
        }
       
    }

    

    return (
        <div className="cart-item">
            <div className="cart-content">
                <h1>{props.title}</h1>
                <p>{props.price * props.quantity} Rs
                <span> X {props.quantity}</span>
                </p>
                
            </div>
            <div className="button-controls">
                <button onClick={handleMinusClick}>-</button>
                <button onClick={handlePlusClick}>+</button>
            </div>
        </div>
    );
}

export default CartItem;