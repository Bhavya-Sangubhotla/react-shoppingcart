import react , { useState } from "react";




function MenuItem(props) {

    

    const [item, setItem] = useState({
        title: "",
        quantity: 0,
        price: ""
    });

    function handleClick(){


        setItem(prev =>{
            return {
                title: props.title,
                quantity: prev.quantity + 1,
                price: props.price
            }
        })  
    }

    function handleSubmit(event){
        event.preventDefault();
        props.onAdd(item);
    }
    
   
    return (
        <react.Fragment>
        <div className="menu-item">
           
            <div className="menu-content">
                <h3>{props.title}</h3>
                <p>{props.description}</p>
                <h4>{props.price} Rs</h4>
            </div>
            <form onSubmit={handleSubmit} className="add-items">
                <label htmlFor="Amount">Amount</label>
                <input onChange={() => {}} type="number" name="Amount" value={item.quantity}/>
                <button onClick={handleClick}  type="submit" className="btn btn-lg">Add</button>
            </form>
        </div>
        </react.Fragment>
    );
}

export default MenuItem;