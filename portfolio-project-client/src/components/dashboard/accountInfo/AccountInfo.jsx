import './AccountInfo.css';
import FormInput from "../../formInput/FormInput";
import {useState} from "react";
import {Col, Row} from "react-bootstrap";

export default function AccountInfo(props){
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(values);
    }
    const [disabledInputs, setDisabledInputs] = useState({
        name: true,
        surname: true,
        username: true,
        email: true,
        password: true,
        confirmPassword: true
    });

    const handleUnlockClick = () => {
        setDisabledInputs({
            name: false,
            surname: false,
            username: true,
            email: false,
            password: false,
            confirmPassword: false
        });
    };


    const onChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    const [values, setValues] = useState({
        name: "",
        surname: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const inputs = [
        {
            id: 1,
            name: "nome",
            type: "text",
            label: "Nome",
            placeholder: props.name,
            disabled: disabledInputs.name
        },
        {
            id: 2,
            name: "cognome",
            type: "text",
            label: "Cognome",
            placeholder: props.surname,
            disabled: disabledInputs.surname
        },
        {
            id: 3,
            name: "username",
            type: "text",
            label: "Username",
            placeholder: props.username,
            errorMessage: "Lo username deve contenere 3-16 caratteri",
            pattern: "^[A-Za-z0-9]{3,16}$",
            required: true,
            disabled: disabledInputs.username
        },
        {
            id: 4,
            name: "password",
            type: "password",
            label: "Password",
            placeholder: "Password",
            errorMessage: "Lo password deve contenere 8-20 caratteri, un carattere speciale ecc..",
            pattern:`^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
            required: true,
            newRow: true,
            disabled: disabledInputs.password
        },
        {
            id: 5,
            name: "confirmPassword",
            type: "password",
            label: "Conferma Password",
            placeholder: "Conferma Password",
            errorMessage: "Le password non coincidono",
            pattern: values.password,
            required: true,
            disabled: disabledInputs.confirmPassword
        }
    ]

    return (
        <div className={"form__wrapper"}>
            <div className={"form__container form__container--full-width form__container--account__info"}>
                <form className="form form--account__info">
                    {inputs.map((input, index) => (
                        <>
                            {index % 2 === 0 && (
                                <Row style={{gap: "20px"}}>
                                    <Col>
                                        <FormInput {...inputs[index]} value={values[inputs[index].name]} onChange={onChange}/>
                                    </Col>
                                    <Col>
                                        {inputs[index + 1] && (
                                            <FormInput {...inputs[index + 1]} value={values[inputs[index + 1].name]} onChange={onChange}/>
                                        )}
                                    </Col>
                                </Row>
                            )}
                        </>
                    ))}
                    <div className="form__submit signup__submit">
                        <div className="form__submit__unlock" onClick={handleUnlockClick}>
                            <i className="bi bi-pencil"></i>
                        </div>
                        <button className="form__submit__button">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}