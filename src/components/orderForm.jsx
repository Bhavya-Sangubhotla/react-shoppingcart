
import react, { useContext , useState } from "react";
import ItemContext from "../store/item-context";
import useForm from "./Hooks/use-form";

function OrderForm(props){
    

    const ctx = useContext(ItemContext)

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const {enteredValue: InputName, isValid: NameisValid, handleChange: handleInputNameChange, handleBlur: handleInputNameBlur, hasError: NameError} = useForm(value =>{
        return value.trim() !== "";
    })

    const {enteredValue: Address, isValid: addressIsValid, handleChange: hadleAddressChange, handleBlur: handleAddressBlur, hasError: AddressError} = useForm(value =>{
        return value.trim() !== "";
    })

    async function handleSubmit(event){
        event.preventDefault();
        
        if(NameisValid && addressIsValid) {
            setIsLoading(true);
            const response = await fetch("https://my-project-64ae1-default-rtdb.firebaseio.com/order.json",{
            method: "POST",
            body: JSON.stringify({
                name: InputName,
                address: Address,
                totalAmount: props.money,
                orderDetials: ctx.items,
                
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (!response.ok) {
            setIsError(true);
            setIsLoading(false);
            return;   
        }
        const data = await response.json();
        setIsLoading(false);
        console.log(data);
        props.submitted();
            
        }
            else{
                
                console.log("wrong input")

            }
            
            
        
        
        
    }

    return(
        <react.Fragment>
        
        <form className="order-form" onSubmit={handleSubmit}>
        {isLoading && <div className="center-loading">
            <div className="loading"></div> 
        </div>}
        { isError && <h4 className="error">Something went wrong!!</h4>}
            <h3>Place an Order</h3>
            <label>Name</label><br/>
            <input className={NameError ? "warning": null} onChange={handleInputNameChange} onBlur={handleInputNameBlur} value={InputName} type="text" size="20" /><br/>
            <label>Address</label><br/>
            <textarea className={AddressError ? "warning" : null} onChange={hadleAddressChange} onBlur={handleAddressBlur} value={Address} type="text"></textarea>
            <div className="Submit">
            <button type="submit" className="btn">Submit</button>
            </div>
        </form>
        </react.Fragment>
    );
}

export default OrderForm;