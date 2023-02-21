import react, { useContext, useState } from "react";
import CartItem from "./cartItem";
import ItemContext from "../store/item-context";
import OrderForm from "./orderForm";
import OrderPlaced from "./orderPlaced";

function Cart(props) {

    const ctx = useContext(ItemContext);
    const [orderClicked, setOrderClicked] = useState(false);
    const [submitClicked, setSubmitClicked] = useState(false);

    const totalAmount = ctx.items.reduce((acc,eachItem) =>{
        return acc + (eachItem.quantity * eachItem.price)
    }, 0)
    
    function handleCloseClick(){
        props.onCloseClick();
    }

    function handleOrderClick(){
        setOrderClicked(prev =>{
            return !prev;
        });

    }

    function handleSubmit(){
        setSubmitClicked(true);
    }
    
    return (
        
        <div className="cart-modal">
        {submitClicked 
        ? <OrderPlaced /> 
        : <div className="card">
            {ctx.items.map((eachItem, index) =>{
                return <CartItem title={eachItem.title} price={eachItem.price} quantity={eachItem.quantity} key={index} onAdd={props.onAddItem} onRemove={props.RemoveItem}/>
            })}
        <div className="cart-item total">
        <h3>TotalAmount</h3>
        <h3>{totalAmount} Rs</h3>
        </div>
        
        {orderClicked && <OrderForm money={totalAmount} submitted={handleSubmit}/>}

        
            <footer>
                <button className="btn btn-lg" onClick={handleCloseClick}>Close</button>
                <button className="btn btn-lg" onClick={handleOrderClick} disabled={orderClicked ? true : false}>Order</button>
            </footer>
            </div>}
            
        </div>

    );
}

export default Cart;