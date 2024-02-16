import './Album.css'
import Container from "react-bootstrap/Container";
import {Row} from "react-bootstrap";
import {useState} from "react";
import CreateAlbum from "../createAlbum/CreateAlbum";

export default function Album(props) {

    const [isOpen, setIsOpen] = useState(false);
    const handleOpen = () => {
        console.log("Apro l'album")
        setIsOpen(true);
    };

    return (
        <>
            <Container>
                <Row>
                    <div className={"album"}>
                        <div className="album__inner__container">
                            <div className="album__inner"></div>
                            <div className="album__inner"></div>
                            <div className="album__inner"></div>
                            {props.create && (
                                <div className="album__inner" onClick={handleOpen}>
                                    <i className="bi bi-plus-circle"></i>
                                </div>
                            )}
                            {!props.create && (
                                <div
                                    className="album__inner"
                                    style={{ backgroundImage: `url(${props.image})` }}
                                ></div>
                            )}
                        </div>
                        <span className="album__name">{props.albumName}</span>
                    </div>
                </Row>
            </Container>
            {isOpen && <CreateAlbum setIsOpen={setIsOpen} />}
        </>
    );

}