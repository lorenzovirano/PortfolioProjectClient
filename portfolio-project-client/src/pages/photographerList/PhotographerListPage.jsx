import './PhotographerList.css';
import Header from "../../components/navbar/Header";
import Footer from "../../components/footer/Footer";
import Container from "react-bootstrap/Container";
import {Row} from "react-bootstrap";
import PhotographerList from "./PhotographerList";

export default function PhotographerListPage() {
    return(
        <>
            <Header />
            <Container style={{margin: "50px auto"}}>
                <Row>
                    <PhotographerList/>
                </Row>
            </Container>
            <Footer/>
        </>
    )
}