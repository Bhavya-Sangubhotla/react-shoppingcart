import react ,{ useState, useEffect }from "react";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function Header(props){

    

    const [animateBool, setAnimateBool] = useState(false);

    function handleCartClick(){
        props.onCartClick()
    }
    useEffect(() => {
        if(props.bounce.length === 0){
            return;
        }
        setAnimateBool(true);

        const timer =  setTimeout(() => {
            setAnimateBool(false);
        },300)

        return () =>{
            clearTimeout(timer);
        }
           
    },[props.bounce])
    return (
        <nav>
        <h1>Super Food</h1>
        <button onClick={handleCartClick} className={`btn btn-lg ${animateBool && "animate"}`}>
        <ShoppingCartIcon />
        <span className="text">your cart</span>
        <span className="quantity">{props.cartCount}</span>
        </button>

        </nav>
    );
}

export default Header;