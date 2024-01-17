import './Header.css';

export default function Header(){
    return(
      <div className={"header__container"}>
          <div className="header">
              <div className="header__logo">
                  <img src="#" alt="#"/>
              </div>
              <nav className="header__nav">
                  <ul className="nav__list list">
                      <li className="nav__item"><a href="#" className={"nav__link"}>Test</a></li>
                      <li className="nav__item"><a href="#" className={"nav__link"}>Test</a></li>
                      <li className="nav__item"><a href="#" className={"nav__link"}>Test</a></li>
                      <li className="nav__item"><a href="#" className={"nav__link"}>Test</a></li>
                  </ul>
              </nav>
          </div>
      </div>
    );
}