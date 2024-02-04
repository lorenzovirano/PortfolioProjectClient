import './Login.css';
import Header from "../../../components/navbar/Header";
import FormInput from "../../../components/formInput/FormInput";
import {useState} from "react";
import Footer from "../../../components/footer/Footer";
import axios from "axios";
import Cookies from "js-cookie";

export default function Login(){
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/auth/login", values);
            console.log("Utente loggato:", response.data.data.user);
            Cookies.set('token', response.data.data.jwt, { expires: 7, secure: true });
            window.location.replace("/account");
        } catch (error) {
            // Esempio di gestione specifica di alcuni tipi di errori
            if (error.response) {
                // La richiesta è stata effettuata e il server ha risposto con uno stato diverso da 2xx
                console.error("Risposta dal server:", error.response.data);
                console.error("Stato della risposta:", error.response.status);
            } else if (error.request) {
                // La richiesta è stata effettuata, ma non è stata ricevuta alcuna risposta
                console.error("La richiesta è stata effettuata, ma nessuna risposta ricevuta");
            } else {
                // Si è verificato un errore durante la configurazione della richiesta
                console.error("Errore durante la configurazione della richiesta:", error.message);
            }
        }
    }

    const onChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    const [values, setValues] = useState({
        username: "",
        password: ""
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
            name: "password",
            type: "password",
            label: "Password",
            placeholder: "Password",
            errorMessage: "Lo password deve contenere 8-20 caratteri, un carattere speciale ecc..",
            pattern:`^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
            required: true
        },
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