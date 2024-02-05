import {useState} from "react";

export default function FormInput(props){
    const [focused, setFocused] = useState(false)
    const { label, onChange, id, errorMessage, newRow, ...inputProps } = props;

    const handleFocus = (e) => {
        setFocused(true);
    }

    const rowClassName = newRow ? 'form__new-row' : '';

    return (
        <div className={`form__input ${rowClassName}`}>
            <label>{label}</label>
            <input
                {...inputProps}
                onChange={onChange}
                onBlur={handleFocus}
                onFocus={() => inputProps.name === "confirmPassword" && setFocused(true)}
                focused={focused.toString()}
                style={{background: "transparent"}}
            />
            <span className="form__input__error">{errorMessage}</span>
        </div>
    )
}