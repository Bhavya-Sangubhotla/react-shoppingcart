import react from "react";

const ItemContext = react.createContext({
    items: [],
    isLoading: false,
    isError: false

});

export default ItemContext;