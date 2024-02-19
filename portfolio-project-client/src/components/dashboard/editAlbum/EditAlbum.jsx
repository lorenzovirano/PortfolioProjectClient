import "./EditAlbum.css";
import FormInput from "../../formInput/FormInput";
import {useState} from "react";
import {Col, Row} from "react-bootstrap";
import axios from "axios";
import Cookies from "js-cookie";
import {Link} from "react-router-dom";

export default function EditAlbum({ setIsOpenEdit, title, description, albumId, photographer }) {
    const [values, setValues] = useState({
        title: title,
        description: description
    });

    const [error, setError] = useState(null);

    const onChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    const handleClose = () => {
        setIsOpenEdit(false); // Chiudi il componente CreateAlbum impostando isOpen su false
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8000/photographer/album/update/${albumId}`, values, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('token')}`,
                    'Content-Type': 'application/json',
                }
            });
            console.log(response.status, response.data);
            window.location.replace("/account");
        } catch (error) {
            console.error("Error updating album:", error);
            setError("Errore nella modifica dell'album, ti preghiamo di riprovare.");
        }
    };


    const inputs = [
        {
            id: 1,
            name: "title",
            type: "text",
            label: "Titolo album",
            placeholder: "Titolo album"
        },
        {
            id: 2,
            name: "description",
            type: "text",
            label: "Descrizione",
            placeholder: "Descrizione"
        }
    ]

    return (
        <div className={"create-album"}>
            <div className="create-album__inner">
                <form onSubmit={handleSubmit} className="form form--album">
                    <div className="form__header">
                        <h3 className="form__title">{title}</h3>
                        <i className="bi bi-x-circle-fill close-icon" onClick={handleClose}></i>
                    </div>
                    <p className="form__text form__text--light">{description}</p>
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
                            {error && <p className="form__error">{error}</p>}
                        </div>
                    ))}
                    <div className="form__submit">
                        <button className="form__submit__button">Modifica</button>
                        <Link to={`/album/${photographer}/${albumId}`}>
                            <div className="form__submit__button form__submit__button--green">Apri pagina dell'album</div>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
