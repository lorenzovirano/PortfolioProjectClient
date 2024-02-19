import './AlbumPage.css'
import {Link, useParams} from "react-router-dom";
import Header from "../../components/navbar/Header";
import Container from "react-bootstrap/Container";
import Footer from "../../components/footer/Footer";
import useUserStatus from "../../utils/UserStatus";
import useUserRole from "../../utils/UserRole";
import {Col, Row} from "react-bootstrap";
import axios from "axios";
import Cookies from "js-cookie";
import {useEffect, useState} from "react";
import PhotoList from "../../components/dashboard/latestWork/PhotoList";
export default function AlbumPage(){
    let { albumId, photographer } = useParams();
    const { isLogged, loading } = useUserStatus();
    const { isPhotographer, loadingRole} = useUserRole()
    const [albumInfo, setAlbumInfo] = useState([])

    // album/read/{photographer}/{albumId}

    const getAlbumInfo = async () => {
        axios.request({
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            },
            method: "GET",
            url: `http://localhost:8000/album/read/${photographer}/${albumId}`
        }).then(response => {
            console.dir(response)
            setAlbumInfo(response.data.data)
        })
    }

    useEffect(() => {
        getAlbumInfo();
        console.log(albumInfo)
    }, []);

    if (loading || loadingRole) {
        return <p>Loading...</p>;
    }

    if (isLogged) {
        return (
            <>
                <Header />
                <Container className={"container--album-page"}>
                    <Row>
                        <Col>
                            <h1 className={"page-title"}>{albumInfo.title}</h1>
                            <span className={"album__photographer"}>di <span>{photographer}</span></span>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="album__description">
                                {albumInfo.description}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <PhotoList />
                    </Row>
                    {isPhotographer ? (
                        <div className="form__submit form__submit--album">
                            <Link to={`/photographer/${photographer}`}>
                                <div className="form__submit__button form__submit__button--green">
                                    Contatta il fotografo
                                </div>
                            </Link>
                        </div>
                    ) : (
                        <div className="form__submit form__submit--album">
                            <div className="form__submit__button">
                                Modifica foto album
                            </div>
                        </div>
                    )}
                </Container>
                <Footer/>
            </>
        )
    } else {
        console.log(isLogged);
        return <p>Utente non loggato</p>;
    }
}