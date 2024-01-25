import './Signup.css';
import Header from "../../../components/navbar/Header";

export default function Signup(props){
    return(
        <>
            <Header />
            <div className="form__container">
                <h3>Signup</h3>
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