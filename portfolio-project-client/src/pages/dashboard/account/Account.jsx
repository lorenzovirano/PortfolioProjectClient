import './Account.css';
import Header from "../../../components/navbar/Header";
import Container from "react-bootstrap/Container";
import {Col, Row} from "react-bootstrap";
import ProfileImage from "../../../components/dashboard/profileImage/ProfileImage";
import AccountInfo from "../../../components/dashboard/accountInfo/AccountInfo";
import Footer from "../../../components/footer/Footer";

export default function Account(props){
    return (
        <>
            <Header />
            <Container>
                <Row>
                    <Col>
                        <ProfileImage profileImage={"https://images.pexels.com/photos/17371711/pexels-photo-17371711/free-photo-of-mano-ragazza-fiore-ritratto.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"} name={"Francesca Rossi"} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <AccountInfo />
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    )
}