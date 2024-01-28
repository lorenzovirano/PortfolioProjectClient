import {useState} from "react";

export default function FormInput(props){
    const [focused, setFocused] = useState(false)
    const {label, onChange, id, errorMessage, ...inputProps} = props;

    const handleFocus = (e) => {
        setFocused(true);
    }
    return (
        <div className="form__input">
            <label>{label}</label>
            <input
                {...inputProps}
                onChange={onChange}
                onBlur={handleFocus}
                onFocus={() => inputProps.name === "confirmPassword" && setFocused(true)}
                focused={focused.toString()
            } />
            <span className="form__input__error">{errorMessage}</span>
        </div>
    )
}