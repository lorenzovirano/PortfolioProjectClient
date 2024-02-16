import "./CreateAlbum.css";
import FormInput from "../../formInput/FormInput";
import {useState} from "react";
import {Col, Row} from "react-bootstrap";

export default function CreateAlbum({ setIsOpen }) {
    const [values, setValues] = useState({
        name: "",

    });

    const onChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    const handleClose = () => {
        setIsOpen(false); // Chiudi il componente CreateAlbum impostando isOpen su false
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Album creato!");
    }

    const inputs = [
        {
            id: 1,
            name: "name",
            type: "text",
            label: "Nome album",
            placeholder: "Nome album",
            value: "test"
        },
        {
            id: 1,
            name: "images",
            type: "file",
            label: "Immagini",
            placeholder: "Immagini",
            value: "test",
            multiple: true
        }
    ]

    return (
        <div className={"create-album"}>
            <div className="create-album__inner">

                {/* Aggiunto un pulsante per chiudere il componente */}
                <form onSubmit={handleSubmit} className="form form--album">
                    <div className="form__header">
                        <h3 className="form__title">Crea un nuovo album</h3>
                        <i className="bi bi-x-circle-fill close-icon" onClick={handleClose}></i>
                    </div>
                    <p className="form__text form__text--light">Dai un nome all'album, aggiungi le immagini che preferisci ed è fatta!</p>
                    {inputs.map((input, index) => (
                        <div key={input.id}>
                            {index % 2 === 0 && (
                                <Row style={{gap: "20px"}}>
                                    <Col>
                                        <FormInput {...inputs[index]} value={values[inputs[index].name]} onChange={onChange} light/>
                                    </Col>
                                    <Col>
                                        {inputs[index + 1] && (
                                            <FormInput {...inputs[index + 1]} value={values[inputs[index + 1].name]} onChange={onChange} light/>
                                        )}
                                    </Col>
                                </Row>
                            )}
                        </div>
                    ))}
                    <div className="form__submit login--submit">
                        <button className="form__submit__button">Crea</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
