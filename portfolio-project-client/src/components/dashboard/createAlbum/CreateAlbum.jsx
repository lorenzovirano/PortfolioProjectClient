import "./CreateAlbum.css";
import FormInput from "../../formInput/FormInput";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
import Cookies from "js-cookie";

export default function CreateAlbum({ setIsOpenCreate }) {
    const [values, setValues] = useState({
        name: "",
        description: ""
    });

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleClose = () => {
        setIsOpenCreate(false); // Chiudi il componente CreateAlbum impostando isOpen su false
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        axios.post(`http://localhost:8000/photographer/album/create`, values, {
            headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`,
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            console.log(response.status, response.data)
            window.location.replace("/account");
        });
    }

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

                {/* Aggiunto un pulsante per chiudere il componente */}
                <form onSubmit={handleSubmit} className="form form--album">
                    <div className="form__header">
                        <h3 className="form__title">Crea un nuovo album</h3>
                        <i className="bi bi-x-circle-fill close-icon" onClick={handleClose}></i>
                    </div>
                    <p className="form__text form__text--light">Dai un nome, aggiungi la descrizione che desideri e crea il tuo album!</p>
                    {inputs.map((input, index) => (
                        <div key={input.id}>
                            {index % 2 === 0 && (
                                <Row style={{ gap: "20px" }}>
                                    <Col>
                                        <FormInput {...inputs[index]} value={values[inputs[index].name]} onChange={onChange} light />
                                    </Col>
                                    <Col>
                                        {inputs[index + 1] && (
                                            <FormInput {...inputs[index + 1]} value={values[inputs[index + 1].name]} onChange={onChange} light />
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
