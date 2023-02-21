import react, { useState } from "react";

const useForm = (validate) =>{



    const [enteredValue, setEnteredValue] = useState("");
    const [isTouched, setIsTouched] = useState(false);

    const isValid = validate(enteredValue);
    const hasError = isTouched && !isValid

    function handleChange(event){
        setEnteredValue(event.target.value);
    }

    function handleBlur(){
        setIsTouched(true);
    }

    return ({
        enteredValue,
        handleBlur,
        handleChange,
        hasError,
        isValid
    })

}
export default useForm;