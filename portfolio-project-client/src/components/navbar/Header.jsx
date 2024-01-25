import './Header.css';
import {Link} from "react-router-dom";

export default function Header(){
    return(
        <>
            <div className={"header__container"}>
                <div className="header">
                    <div className="header__logo">
                        <Link to="/">
                            <img src="#" alt="#"/>
                        </Link>
                    </div>
                    <nav className="header__nav">
                        <ul className="nav__list list">
                            <li className="nav__item"><Link to="/login" className={"nav__link"}>Login</Link></li>
                            <li className="nav__item"><Link to="/signup" className={"nav__link"}>Signup</Link></li>
                            <li className="nav__item"><a href="#" className={"nav__link"}>Test</a></li>
                            <li className="nav__item"><a href="#" className={"nav__link"}>Test</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    );
}