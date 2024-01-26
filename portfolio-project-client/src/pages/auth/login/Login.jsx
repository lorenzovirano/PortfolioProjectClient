import './Login.css';
import Header from "../../../components/navbar/Header";

export default function Login(){
    return(
        <>
            <Header />
            <div className="form__wrapper">
                <div className="form__container">
                    <form action="#" className="form form__login">
                        <h3 className="form__title">Login</h3>
                        <p className="form__text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur eos magni odit praesentium quo? Nemo neque nesciunt qui repellat sed.</p>
                        <div className="form__input login__input">
                            <label>Lorem</label>
                            <input type="text"/>
                        </div>
                        <div className="form__input login__input">
                            <label>Lorem</label>
                            <input type="text"/>
                        </div>
                        <div className="form__input login__input">
                            <label>Lorem</label>
                            <input type="text"/>
                        </div>

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
        </>
    )
}