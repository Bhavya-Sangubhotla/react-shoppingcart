import react from "react";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

function OrderPlaced(){
   
    return(
        <form>
        <div className="card">
            <h1>Order Placed Successfully!!!</h1>
            <div>
            <CheckCircleOutlineIcon />
            </div>
            <button className="btn btn-lg" type="submit">Go To Homepage</button>
        </div>
        </form>
        
    );
}

export default OrderPlaced;