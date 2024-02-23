import './AlbumPage.css';
import { Link, useParams } from "react-router-dom";
import Header from "../../components/navbar/Header";
import Container from "react-bootstrap/Container";
import Footer from "../../components/footer/Footer";
import useUserStatus from "../../utils/UserStatus";
import useUserRole from "../../utils/UserRole";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import PhotoList from "../../components/dashboard/photo/PhotoList";

export default function AlbumPage() {
    let { albumId, photographer } = useParams();
    const { username } = useUserStatus();
    const isCurrentPhotographer = username === photographer;
    const { isLogged, loading } = useUserStatus();
    const { isPhotographer, loadingRole } = useUserRole();
    const [albumInfo, setAlbumInfo] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [photoFormData, setPhotoFormData] = useState({
        photo: null, // Cambiato da un array a un singolo file
        title: "",
        description: "",
        category: "",
    });
    const config = {
        headers: {
            'Authorization': `Bearer ${Cookies.get('token')}`,
        }
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
        if (e.target.files.length > 0) {
            const selectedFile = e.target.files[0]; // Preleva solo il primo file
            setPhotoFormData({ ...photoFormData, photo: selectedFile });
        }
    };

    const handlePhotoFormChange = (e) => {
        setPhotoFormData({ ...photoFormData, [e.target.name]: e.target.value });
    };

    const handleUploadPhotos = async (e) => {
        e.preventDefault();

        // Verifica se è stato selezionato un file
        if (!photoFormData.photo) {
            console.error("Nessun file selezionato per l'upload.");
            return;
        }

        // Costruisci il FormData
        const formData = new FormData();
        formData.append("file", photoFormData.photo);

        // Prepara il JSON payload
        const jsonPayload = {
            title: photoFormData.title,
            description: photoFormData.description,
            category: photoFormData.category,
        };

        try {
            setUploading(true);
            const response = await axios.post(
                `http://localhost:8000/photographer/picture/upload/${albumId}`,
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${Cookies.get('token')}`,
                        'Content-Type': 'multipart/form-data'
                    },
                    params: {
                        pictureCreateDTO: JSON.stringify(jsonPayload) // Invia i campi come query parameters in un unico oggetto
                    },
                    onUploadProgress: progressEvent => {
                        const progress = (progressEvent.loaded / progressEvent.total) * 100;
                        setUploadProgress(progress);
                    }
                }
            );
            console.log("Upload completato:", response.data);
            getAlbumInfo();
        } catch (error) {
            console.error(
                "Si è verificato un errore durante l'upload delle foto:",
                error
            );
        } finally {
            setUploading(false);
            setUploadProgress(0);
            setPhotoFormData({
                photo: null,
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
                        <PhotoList photos={albumInfo.pictures || []} onDelete={handlePhotoDelete} photographer={photographer}/>
                    </Row>
                    <Row>
                        <Col>
                            <Modal show={showModal} onHide={handleCloseModal}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Aggiungi Foto</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form onSubmit={handleUploadPhotos}>
                                        <Form.Group controlId="photo" style={{ marginTop: "25px" }}>
                                            <Form.Label>Foto</Form.Label>
                                            <Form.Control
                                                type="file"
                                                accept="image/*"
                                                onChange={handlePhotoInputChange}
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="title" style={{ marginTop: "25px" }}>
                                            <Form.Label>Titolo</Form.Label>
                                            <Form.Control
                                                name={"title"}
                                                type="text"
                                                placeholder="Inserisci il titolo"
                                                value={photoFormData.title}
                                                onChange={handlePhotoFormChange}
                                                required
                                            />

                                        </Form.Group>
                                        <Form.Group controlId="description" style={{ marginTop: "25px" }}>
                                            <Form.Label>Descrizione</Form.Label>
                                            <Form.Control
                                                name={"description"}
                                                as="textarea"
                                                placeholder="Inserisci la descrizione"
                                                value={photoFormData.description}
                                                onChange={handlePhotoFormChange}
                                                required
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="category" style={{ marginTop: "25px" }}>
                                            <Form.Label>Categoria</Form.Label>
                                            <Form.Control
                                                name={"category"}
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
                                    <Button variant="secondary" onClick={handleCloseModal} style={{ backgroundColor: "#FB4B4E", border: "none" }} disabled={uploading}>
                                        Chiudi
                                    </Button>
                                    <Button variant="primary" onClick={handleUploadPhotos} style={{ backgroundColor: "#76d39e", border: "none" }} disabled={uploading}>
                                        {uploading ? 'Caricamento...' : 'Carica Foto'}
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                            {uploading && <progress value={uploadProgress} max={100} />}
                        </Col>
                    </Row>
                    {isCurrentPhotographer && (
                        <div className="form__submit form__submit--album">
                            <button className="form__submit__button" onClick={handleShowModal} disabled={uploading}>
                                Carica foto
                            </button>
                        </div>
                    )}
                    {!isPhotographer && (
                        <div className="form__submit form__submit--album">
                            <Link to={`/photographer/${photographer}`}>
                                <div className="form__submit__button form__submit__button--green">
                                    Contatta il fotografo
                                </div>
                            </Link>
                        </div>
                    )}
                </Container>
                <Footer />
            </>
        )
    } else {
        console.log(isLogged);
        return <p>Utente non loggato</p>;
    }
}
