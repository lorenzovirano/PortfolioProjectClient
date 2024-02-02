import './Login.css';
import Header from "../../../components/navbar/Header";
import FormInput from "../../../components/formInput/FormInput";
import {useState} from "react";
import Footer from "../../../components/footer/Footer";

export default function Login(){
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(values);
    }

    const onChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const inputs = [
        {
            id: 1,
            name: "username",
            type: "text",
            label: "Username",
            placeholder: "Username",
            errorMessage: "Lo username deve contenere 3-16 caratteri",
            pattern: "^[A-Za-z0-9]{3,16}$",
            required: true
        },
        {
            id: 2,
            name: "email",
            type: "email",
            label: "Email",
            errorMessage: "Inserisci una mail valida",
            placeholder: "Email"
        },
        {
            id: 3,
            name: "password",
            type: "password",
            label: "Password",
            placeholder: "Password",
            errorMessage: "Lo password deve contenere 8-20 caratteri, un carattere speciale ecc..",
            pattern:`^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
            required: true
        },
        {
            id: 4,
            name: "confirmPassword",
            type: "password",
            label: "Conferma Password",
            placeholder: "Conferma Password",
            errorMessage: "Le password non coincidono",
            pattern: values.password,
            required: true
        }
    ]

    return(
        <>
            <Header />
            <div className="form__wrapper">
                <div className="form__container">
                    <form onSubmit={handleSubmit} className="form form__login">
                        <h3 className="form__title">Login</h3>
                        <p className="form__text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur eos magni odit praesentium quo? Nemo neque nesciunt qui repellat sed.</p>
                        {inputs.map((input) => (
                            <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange}/>
                        ))}
                        <div className="form__submit login__submit">
                            <button className="form__submit__button">Submit</button>
                        </div>
                    </form>
                </div>
                <div className="form__banner" style={{backgroundImage: `url('https://images.unsplash.com/photo-1495745966610-2a67f2297e5e?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`}}>
                    <div className="form__banner__inner">
                        <h4 className="form__banner__title">Lorem ipsum</h4>
                        <p className="form__banner__text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. A cumque debitis dolor earum eum fugit ipsum iusto ullam ut voluptatum.</p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}