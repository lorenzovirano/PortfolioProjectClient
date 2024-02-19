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

    const isCheckbox = type === "checkbox";

    return (
        <div className={`form__input ${rowClassName} ${lightClassName}`}>
            {isCheckbox ? (
                <div className="switch-container">
                    <label htmlFor={id}>{label}
                        <input
                            {...inputProps}
                            type="checkbox"
                            id={id} // Make sure to include the id
                            onChange={onChange}
                            onBlur={handleFocus}
                            focused={focused.toString()}
                            className={`switch-input ${focused ? "switch-input--checked" : ""}`}
                        />
                    </label>
                </div>
            ) : (
                <>
                    <label>{label}</label>
                    <input
                        {...inputProps}
                        type={type}
                        onChange={onChange}
                        onBlur={handleFocus}
                        onFocus={() => inputProps.name === "confirmPassword" && setFocused(true)}
                        focused={focused.toString()}
                    />
                </>
            )}
            <span className="form__input__error">{errorMessage}</span>
        </div>
    );
}
