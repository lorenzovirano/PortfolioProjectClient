import './Login.css';
import Header from "../../../components/navbar/Header";

export default function Login(props){
    return(
        <>
            <Header />
            <div className="form__container">
                <h3>Login</h3>
                <form action="#" className="form__login">
                    <input type="text" className="login__input"/>
                    <input type="text" className="login__input"/>
                    <input type="text" className="login__input"/>
                    <button className="login__submit">Submit</button>
                </form>
            </div>
        </>
    )
}