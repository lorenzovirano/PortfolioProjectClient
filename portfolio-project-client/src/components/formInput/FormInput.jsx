import React, { useState } from "react";

export default function FormInput(props) {
    const [focused, setFocused] = useState(false);
    const {
        type,
        label,
        onChange,
        id,
        errorMessage,
        newRow,
        light,
        ...inputProps
    } = props;

    const handleFocus = () => {
        setFocused(true);
    };

    const rowClassName = newRow ? "form__new-row" : "";
    const lightClassName = light ? "form__input--light" : "";

    return (
        <div className={`form__input ${rowClassName} ${lightClassName}`}>
                <label>{label}</label>
                <input
                    {...inputProps}
                    type={type}
                    onChange={onChange}
                    onBlur={handleFocus}
                    onFocus={() => inputProps.name === "confirmPassword" && setFocused(true)}
                    focused={focused.toString()}
                />
            <span className="form__input__error">{errorMessage}</span>
        </div>
    );
}
