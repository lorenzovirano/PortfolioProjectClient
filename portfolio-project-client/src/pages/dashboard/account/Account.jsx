import './Account.css';
import Header from "../../../components/navbar/Header";
import Container from "react-bootstrap/Container";
import {Col, Row} from "react-bootstrap";
import ProfileImage from "../../../components/dashboard/profileImage/ProfileImage";
import AccountInfo from "../../../components/dashboard/accountInfo/AccountInfo";
import Footer from "../../../components/footer/Footer";
import LatestWork from "../../../components/dashboard/latestWork/LatestWork";
import useUserStatus from "../../../utils/UserStatus";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function Account(props){
    const [username, setUsername] = useState("Username");
    const [name, setName] = useState("Nome");
    const [surname, setSurname] = useState("Cognome");
    const { isLogged, loading } = useUserStatus();


    const getUserInfo = async () => {
        axios.request({
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            },
            method: "GET",
            url: `http://localhost:8000/user/profile`
        }).then(response => {
            if(response.data.data.user.username){
                setUsername(response.data.data.user.username);
            }
            if(response.data.data.user.name){
                setName(response.data.data.user.name);
            }
            if(response.data.data.user.surname){
                setSurname(response.data.data.user.surname);
            }
        })
    }

    useEffect(() => {
        getUserInfo();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (isLogged) {
        return (
            <>
                <Header />
                <Container>
                    <Row>
                        <Col>
                            <ProfileImage profileImage={"https://cdn.icon-icons.com/icons2/1369/PNG/512/-account-circle_89831.png"} name={username} role={"Fotografo"}/>
                        </Col>
                        <Col>
                            <AccountInfo username={username} name={name} surname={surname}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <LatestWork />
                        </Col>
                    </Row>
                </Container>
                <Footer />
            </>
        )
    } else {
        console.log(isLogged);
        return <p>Utente non loggato</p>;
    }
}
