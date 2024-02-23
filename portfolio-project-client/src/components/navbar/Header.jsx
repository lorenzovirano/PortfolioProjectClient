import './Header.css';
import {Link} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import logo from '../../images/slr-camera-512.png'
import Cookies from "js-cookie";
import useUserStatus from "../../utils/UserStatus";

export default function Header(){
    const logout = () => {
        Cookies.remove('token')
        window.location.replace("/login");
    }

    const { isLogged } = useUserStatus();

    if(isLogged){
        return(
            <>
                <div className={"header__container"}>
                    <Container>
                        <div className="header">
                            <div className="header__logo">
                                <Link to="/">
                                    <img src={logo} alt={"Portfolio Project"}/>
                                </Link>
                            </div>
                            <nav className="header__nav">
                                <ul className="nav__list list">
                                    <li className="nav__item"><Link to="/photographer/list" className={"nav__link"}>Fotografi</Link></li>
                                    <li className="nav__item"><Link to="/account" className={"nav__link"}>Account</Link></li>
                                    <li className="nav__item"><a href="#" className={"nav__link"} onClick={logout}>Logout</a></li>
                                </ul>
                            </nav>
                        </div>
                    </Container>
                </div>
            </>
        );
    } else {
        return(
            <>
                <div className={"header__container"}>
                    <Container>
                        <div className="header">
                            <div className="header__logo">
                                <Link to="/">
                                    <img src={logo} alt={"Portfolio Project"}/>
                                </Link>
                            </div>
                            <nav className="header__nav">
                                <ul className="nav__list list">
                                    <li className="nav__item"><Link to="/photographer/list" className={"nav__link"}>Fotografi</Link></li>
                                    <li className="nav__item"><Link to="/login" className={"nav__link"}>Login</Link></li>
                                    <li className="nav__item"><Link to="/signup" className={"nav__link"}>Signup</Link></li>
                                </ul>
                            </nav>
                        </div>
                    </Container>
                </div>
            </>
        );
    }

}