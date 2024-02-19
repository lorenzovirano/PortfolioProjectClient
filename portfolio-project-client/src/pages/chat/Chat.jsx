import './Chat.css';
import Header from "../../components/navbar/Header";
import Footer from "../../components/footer/Footer";
import Container from "react-bootstrap/Container";
import {Col, Row} from "react-bootstrap";
import {Link, useParams} from "react-router-dom";

export default function Chat(props){
    let { photographer } = useParams();
    return(
        <>
            <Header />
            <Container className={"container--chat"}>
                <Row>
                    <Col>
                        <h1 className={"component-title"}>Chatta in tempo reale con {photographer}</h1>
                        <div className="chat">
                            <div className="chat__message">
                                <div className="chat__message__wrapper chat__message__wrapper--recipient">
                                    <span className="chat__message__bubble chat__message__bubble--recipient">
                                        Destinatario, messaggio non troppo lungo
                                    </span>
                                </div>
                                <div className="chat__message__wrapper chat__message__wrapper--sender">
                                    <span className="chat__message__bubble chat__message__bubble--sender">
                                        Mittente, messaggio più lungo Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos, repudiandae.
                                    </span>
                                </div>
                                <div className="chat__message__wrapper chat__message__wrapper--sender">
                                    <span className="chat__message__bubble chat__message__bubble--sender">
                                        Mittente, messaggio più lungo di prima Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad atque expedita itaque perferendis reiciendis sapiente sit sunt. Inventore, non pariatur! At cupiditate fugiat id officia tenetur? Architecto at beatae debitis?
                                    </span>
                                </div>
                                <div className="chat__message__wrapper chat__message__wrapper--recipient">
                                    <span className="chat__message__bubble chat__message__bubble--recipient">
                                        Destinatario, messaggio lunghetto Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum expedita libero magnam nam non porro.
                                    </span>
                                </div>
                            </div>
                            <div className="chat__input">
                                <input type="text" placeholder={"Invia messaggio.."}/>
                                <div className="chat__input--send">
                                    <i className="bi bi-send"></i>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <div className="form__submit form__submit--photographer">
                        <Link to={`/photographer/${photographer}`}>
                            <div className="form__submit__button form__submit__button--green">
                                Torna alla pagina del fotografo
                            </div>
                        </Link>
                    </div>
                </Row>
            </Container>
            <Footer/>
        </>

    )
}