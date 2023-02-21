import react, { useState, useEffect } from "react";
import Header from "./components/Header";
import LandingPage from "./components/LandingPage";
import MenuItems from "./components/menuItems";
import Cart from "./components/Cart";
import ItemContext from "./store/item-context";

function App() {

    const [items, setItems] = useState([]);

    const [total, setTotal] = useState(0);

    const [menuContent , setMenuContent] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    async function fetchMeals() {
        setIsLoading(true);
        const response = await fetch("https://my-project-64ae1-default-rtdb.firebaseio.com/menucontent.json");
        if (!response.ok) {
            setIsError(true);
            setIsLoading(false);
            return;   
        }
        const data = await response.json();
        const fetchedItems = [];
        for(const key in data){
            fetchedItems.push({
                id: key,
                title: data[key].title,
                description: data[key].description,
                price: data[key].price
            })
        }
        setMenuContent(fetchedItems);
        setIsLoading(false);
    }


    useEffect(() => {
        fetchMeals();
    }, [])



    useEffect(() => {
        setTotal(() => {
            return items.reduce((acc, eachItem) => {
                return eachItem.quantity + acc;
            }, 0)
        })
    }, [items])



    const [cartBool, setCartBool] = useState(false);

    function AddedItem(item) {

        const foundIndex = items.findIndex(eachItem => {
            return eachItem.title === item.title;
        })

        if (foundIndex !== -1) {
            setItems(prev => {
                prev[foundIndex].quantity = item.quantity;
                return [...prev];
            })
        }
        else {
            setItems(prev => {
                return [...prev, item]
            })
        }
    }

    function RemovedItem(item) {
        setItems(prev => {
            return prev.filter(eachItem => {
                return item.title !== eachItem.title;
            })
        })
    }



    function handleCartClick() {
        setCartBool(true);
    }

    function handleCloseClick() {
        setCartBool(false);
    }


    return (
        <react.Fragment>
            <ItemContext.Provider value={{
                items: items,
                isLoading: isLoading,
                isError: isError
            }}>
                {cartBool &&
                    <Cart onCloseClick={handleCloseClick} onAddItem={AddedItem} RemoveItem={RemovedItem} />}


                <div className="parent-container">
                    <Header cartCount={total} onCartClick={handleCartClick} bounce={items} />
                    <LandingPage />
                    
                     
                    
                    <MenuItems onAddItem={AddedItem} meals={menuContent} />
                </div>
            </ItemContext.Provider>


        </react.Fragment>
    );
}

export default App;