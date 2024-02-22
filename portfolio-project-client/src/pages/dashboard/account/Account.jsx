import './Account.css';
import Header from "../../../components/navbar/Header";
import Container from "react-bootstrap/Container";
import {Col, Row} from "react-bootstrap";
import ProfileImage from "../../../components/dashboard/profileImage/ProfileImage";
import AccountInfo from "../../../components/dashboard/accountInfo/AccountInfo";
import Footer from "../../../components/footer/Footer";
import useUserStatus from "../../../utils/UserStatus";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import AlbumList from "../../../components/dashboard/albumList/AlbumList";
import useUserRole from "../../../utils/UserRole";
import PhotographerList from "../../photographerList/PhotographerList";

export default function Account(props){
    const [username, setUsername] = useState("Username");
    const [name, setName] = useState("Name");
    const [surname, setSurname] = useState("Surname");
    const [userId, setUserId] = useState("UserId");
    const [role, setRole] = useState("Role");
    const { isLogged, loading } = useUserStatus();
    const { isPhotographer, loadingRole} = useUserRole()


    const getUserInfo = async () => {
        axios.request({
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            },
            method: "GET",
            url: `http://localhost:8000/api/v1/user/profile`
        }).then(response => {
            console.log(response)
            const userData = response.data.data.user;
            if(userData.username){
                setUsername(userData.username);
            }
            if(userData.name){
                setName(userData.name);
            }
            if(userData.surname){
                setSurname(userData.surname);
            }
            if(userData.userId) {
                setUserId(userData.userId);
            }
            if (userData.role && userData.role.authority) {
                setRole(userData.role.authority === "PHOTOGRAPHER" ? "Fotografo" : "Cliente");
            }
        })
    }

    useEffect(() => {
        getUserInfo();
    }, []);

    if (loading || loadingRole) {
        return <p>Loading...</p>;
    }

    if (isLogged) {
        return (
            <>
                <Header />
                <Container>
                    <Row>
                        <Col>
                            <ProfileImage profileImage={"https://cdn.icon-icons.com/icons2/1369/PNG/512/-account-circle_89831.png"}  name={name === 'Name' && surname === 'Surname' ? username : `${name} ${surname}`} role={role}/>
                        </Col>
                        <Col>
                            <AccountInfo username={username} name={name} surname={surname} userId={userId}/>
                        </Col>
                    </Row>
                    <Row>
                        {isPhotographer ? (
                            <AlbumList photographer={username} />
                        ) : (
                            <PhotographerList />
                        )}
                    </Row>
                </Container>
                <Footer />
            </>
        )
    } else {
        window.location.replace("/login")
    }
}
