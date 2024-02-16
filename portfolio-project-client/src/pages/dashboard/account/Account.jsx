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
import Album from "../../../components/dashboard/album/Album";

export default function Account(props){
    const [username, setUsername] = useState("Username");
    const [name, setName] = useState("Name");
    const [surname, setSurname] = useState("Surname");
    const [userId, setUserId] = useState("UserId");
    const { isLogged, loading } = useUserStatus();


    const getUserInfo = async () => {
        axios.request({
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            },
            method: "GET",
            url: `http://localhost:8000/api/v1/user/profile`
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
            if(response.data.data.user.userId) {
                setUserId(response.data.data.user.userId);
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
                            <ProfileImage profileImage={"https://cdn.icon-icons.com/icons2/1369/PNG/512/-account-circle_89831.png"}  name={name === 'Name' && surname === 'Surname' ? username : `${name} ${surname}`} role={"Fotografo"}/>
                        </Col>
                        <Col>
                            <AccountInfo username={username} name={name} surname={surname} userId={userId}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Album albumName={"Crea nuovo album"} create/>
                        </Col>
                        <Col>
                            <Album albumName={"Mary"} image={"https://images.pexels.com/photos/20056316/pexels-photo-20056316/free-photo-of-luce-tramonto-persone-donna.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}/>
                        </Col>
                        <Col>
                            <Album albumName={"Lia"} image={"https://images.pexels.com/photos/20008023/pexels-photo-20008023/free-photo-of-luce-citta-moda-persone.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"}/>
                        </Col>
                        <Col>
                            <Album albumName={"Urban"} image={"https://images.pexels.com/photos/19560855/pexels-photo-19560855/free-photo-of-citta-punto-di-riferimento-strada-viaggio.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"}/>
                        </Col>
                        <Col>
                            <Album albumName={"Sea"} image={"https://images.pexels.com/photos/20173530/pexels-photo-20173530/free-photo-of-luce-mare-alba-tramonto.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"}/>
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
