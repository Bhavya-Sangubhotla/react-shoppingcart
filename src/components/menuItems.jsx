import react, { useContext } from "react";
import MenuItem from "./menuItem";
import ItemContext from "../store/item-context";


function MenuItems(props) {
    const ctx = useContext(ItemContext)

    function handleItems(item){
        props.onAddItem(item);
    }

    
    

    return (
        <div className="menu">
        {ctx.isLoading && <div className="center-loading">
            <div className="loading"></div> 
        </div>}
            
        { ctx.isError && <h4 className="error">Something went wrong!!</h4>}
            {props.meals.map(eachItem =>{
                return <MenuItem title={eachItem.title} description={eachItem.description} price={eachItem.price} key={eachItem.id} onAdd={handleItems} />
            })}
        </div>
    );
}

export default MenuItems;