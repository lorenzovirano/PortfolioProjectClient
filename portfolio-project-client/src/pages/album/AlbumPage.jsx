import './AlbumPage.css'
import {Link, useParams} from "react-router-dom";
import Header from "../../components/navbar/Header";
import Container from "react-bootstrap/Container";
import Footer from "../../components/footer/Footer";
import useUserStatus from "../../utils/UserStatus";
import useUserRole from "../../utils/UserRole";
import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import axios from "axios";
import Cookies from "js-cookie";
import {useEffect, useState} from "react";
import PhotoList from "../../components/dashboard/photo/PhotoList";
import PhotoItem from "../../components/dashboard/photo/PhotoItem";
export default function AlbumPage(){
    let { albumId, photographer } = useParams();
    const { isLogged, loading } = useUserStatus();
    const { isPhotographer, loadingRole} = useUserRole()
    const [albumInfo, setAlbumInfo] = useState([])
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [photoFormData, setPhotoFormData] = useState({
        photos: [],
        title: "",
        description: "",
        category: "",
    });
    const config = {
        headers: {
            'Authorization': `Bearer ${Cookies.get('token')}`,
        },
        onUploadProgress: (progressEvent) => {
            const progress = Math.round(
                (progressEvent.loaded / progressEvent.total) * 100
            );
            setUploadProgress(progress);
        },
    };

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    const getAlbumInfo = async () => {
        axios.get(`http://localhost:8000/album/read/${photographer}/${albumId}`, config)
            .then(response => {
                console.dir(response)
                setAlbumInfo(response.data.data)
            })
            .catch(error => {
                console.error('Si è verificato un errore durante il recupero delle informazioni sull\'album:', error);
            });
    }

    const handlePhotoInputChange = (e) => {
        setPhotoFormData({ ...photoFormData, photos: e.target.files });
    };

    const handlePhotoFormChange = (e) => {
        setPhotoFormData({ ...photoFormData, [e.target.name]: e.target.value });
    };

    const handleUploadPhotos = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (let i = 0; i < photoFormData.photos.length; i++) {
            formData.append("photos", photoFormData.photos[i]);
        }
        formData.append("title", photoFormData.title);
        formData.append("description", photoFormData.description);
        formData.append("category", photoFormData.category);

        try {
            setUploading(true);
            const response = await axios.post(
                `http://localhost:8000/photographer/album/${albumId}/upload`,
                formData,
                config
            );
            console.log("Upload completato:", response.data);
            // Aggiorna lo stato dell'albumInfo con le nuove foto caricate
            // getAlbumInfo();
        } catch (error) {
            console.error(
                "Si è verificato un errore durante l'upload delle foto:",
                error
            );
        } finally {
            setUploading(false);
            setUploadProgress(0);
            setPhotoFormData({
                photos: [],
                title: "",
                description: "",
                category: "",
            });
            handleCloseModal();
        }
    };

    const handlePhotoDelete = (deletedPhotoId) => {
        axios.post(`http://localhost:8000/photographer/picture/delete/${deletedPhotoId}`, null, config)
            .then(response => {
                console.log('Foto eliminata con successo:', response.data);
                setAlbumInfo(prevAlbumInfo => ({
                    ...prevAlbumInfo,
                    pictures: prevAlbumInfo.pictures.filter(photo => photo.pictureId !== deletedPhotoId)
                }));
            })
            .catch(error => {
                console.error("Si è verificato un errore durante l'eliminazione della foto:", error);
            });
    };

    useEffect(() => {
        getAlbumInfo();
        console.log(albumInfo)
        console.log(albumInfo.pictures)
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
                        <PhotoList photos={albumInfo.pictures || []} onDelete={handlePhotoDelete}/>
                    </Row>
                    <Row>
                        <Col>
                            <Modal show={showModal} onHide={handleCloseModal}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Aggiungi Foto</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form onSubmit={handleUploadPhotos}>
                                        <Form.Group controlId="photo" style={{marginTop: "25px"}}>
                                            <Form.Label>Foto</Form.Label>
                                            <Form.Control
                                                type="file"
                                                accept="image/*"
                                                multiple
                                                onChange={handlePhotoInputChange}
                                                disabled={uploading}
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="title" style={{marginTop: "25px"}}>
                                            <Form.Label>Titolo</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Inserisci il titolo"
                                                value={photoFormData.title}
                                                onChange={handlePhotoFormChange}
                                                required
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="description" style={{marginTop: "25px"}}>
                                            <Form.Label>Descrizione</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                placeholder="Inserisci la descrizione"
                                                value={photoFormData.description}
                                                onChange={handlePhotoFormChange}
                                                required
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="category" style={{marginTop: "25px"}}>
                                            <Form.Label>Categoria</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Inserisci la categoria"
                                                value={photoFormData.category}
                                                onChange={handlePhotoFormChange}
                                                required
                                            />
                                        </Form.Group>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleCloseModal} style={{backgroundColor: "#FB4B4E", border: "none"}}>
                                        Chiudi
                                    </Button>
                                    <Button variant="primary" onClick={handleUploadPhotos} style={{backgroundColor: "#76d39e", border: "none"}}>
                                        Carica Foto
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                            {uploading && <progress value={uploadProgress} max={100} />}
                        </Col>
                    </Row>
                    {!isPhotographer ? (
                        <div className="form__submit form__submit--album">
                            <Link to={`/photographer/${photographer}`}>
                                <div className="form__submit__button form__submit__button--green">
                                    Contatta il fotografo
                                </div>
                            </Link>
                        </div>
                    ) : (
                        <div className="form__submit form__submit--album">
                            <button className="form__submit__button" onClick={handleShowModal}>
                                Carica foto
                            </button>
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