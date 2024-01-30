import './Header.css';
import {Link} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import logo from '../../images/slr-camera-512.png'

export default function Header(){
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
                                    <li className="nav__item"><Link to="/login" className={"nav__link"}>Login</Link></li>
                                    <li className="nav__item"><Link to="/signup" className={"nav__link"}>Signup</Link></li>
                                    <li className="nav__item"><a href="#" className={"nav__link"}>Test</a></li>
                                    <li className="nav__item"><a href="#" className={"nav__link"}>Test</a></li>
                                </ul>
                            </nav>
                        </div>
                    </Container>
                </div>
        </>
    );
}