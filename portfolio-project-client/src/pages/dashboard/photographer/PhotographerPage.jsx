import './PhotographerPage.css';
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from 'jwt-decode';
import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import Header from "../../../components/navbar/Header";
import Container from "react-bootstrap/Container";
import Footer from "../../../components/footer/Footer";
import {Col, Row} from "react-bootstrap";
import ProfileImage from "../../../components/dashboard/profileImage/ProfileImage";
import useUserRole from "../../../utils/UserRole";
import AlbumList from "../../../components/dashboard/albumList/AlbumList";


export default function PhotographerPage(props){
    let { photographer } = useParams();
    const [ photographerInfo, setPhotographerInfo ] = useState({});
    const { isPhotographer, loadingRole} = useUserRole()
    const [username, setUsername] = useState()

    const getPhotographerInfo = async () => {
        axios.request({
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            },
            method: "GET",
            url: `http://localhost:8000/home/photographer/${photographer}`
        }).then(response => {
            setPhotographerInfo(response.data.data);
            console.dir(response)
        })
    }
    const getUsernameFromToken = () => {
        const storedToken = Cookies.get('token');
        if (storedToken) {
            let tempDecodedToken = jwtDecode(storedToken);
            setUsername(tempDecodedToken.sub)
        }
    }

    useEffect(() => {
        getPhotographerInfo();
        getUsernameFromToken();
    }, []);

    if (loadingRole) {
        return <p>Loading...</p>;
    }

    return(
        <>
            <Header />
            <Container>
                <Row>
                    <Col>
                        <ProfileImage profileImage={"https://cdn.icon-icons.com/icons2/1369/PNG/512/-account-circle_89831.png"}  name={photographerInfo.name === 'Name' && photographerInfo.surname === 'Surname' ? photographerInfo.username : `${photographerInfo.name} ${photographerInfo.surname}`}  role={"Fotografo"}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {isPhotographer &&
                            <div className="form__submit form__submit--photographer">
                                <Link to={`/chat/${username}?photographer=${photographer}`}>
                                    <div className="form__submit__button form__submit__button--green">
                                        Manda un messaggio al fotografo
                                    </div>
                                </Link>
                            </div>
                        }
                    </Col>
                </Row>
                <Row style={{marginTop: '100px'}}>
                    <AlbumList photographer={photographer}/>
                </Row>
            </Container>
            <Footer />
        </>
    )
}