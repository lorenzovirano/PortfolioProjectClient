import './Banner.css';
import Container from "react-bootstrap/Container";
import {Link} from "react-router-dom";

export default function Banner(props){
    return(
        <div className={"banner"} style={{backgroundImage: `url(${props.image})`}}>
            <Container>
                <div className="banner__filter" style={{opacity: `${props.filterOpacity}`}}></div>
                <div className={"banner__inner"}>
                    <div className="banner__text">
                        <h1 className={"banner__title"}>{props.title}</h1>
                        <h2 className={"banner__subtitle"}>{props.subtitle}</h2>
                    </div>
                    <div className="banner__cta">
                        <Link to={props.bannerLink}>
                            {props.bannerCtaLabel}
                        </Link>
                    </div>
                </div>
            </Container>
        </div>
    );
}