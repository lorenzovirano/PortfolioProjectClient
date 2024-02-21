import React, {useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {Col} from "react-bootstrap";

export default function PhotoItem({ photo, onDelete }) {
    const defaultImageUrl = 'https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg';
    const [editing, setEditing] = useState(false);
    const [editedPhoto, setEditedPhoto] = useState({
        title: photo.title,
        description: photo.description,
        category: photo.category
    });
    const [originalPhoto, setOriginalPhoto] = useState({ ...editedPhoto });
    const config = {
        headers: {
            'Authorization': `Bearer ${Cookies.get('token')}`,
        }
    };

    const handleEdit = () => {
        setEditing(true);
    };

    const handleSave = () => {
        axios.post(`http://localhost:8000/photographer/picture/update/${photo.pictureId}`, editedPhoto, config)
            .then(response => {
                console.log('Modifiche salvate con successo:', response.data);
                setEditing(false);
                setEditedPhoto(prevState => ({ ...prevState }));
            })
            .catch(error => {
                console.error('Si è verificato un errore durante il salvataggio delle modifiche:', error);
            });
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedPhoto(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCancel = () => {
        setEditing(false);
        setEditedPhoto({ ...originalPhoto });
    };

    const handleDelete = () => {
        onDelete(photo.pictureId);
    };

    return (
        <div className={`latest-work__card`}>
            <div className="latest-work__card__image" style={{ backgroundImage: `url(${photo.path || defaultImageUrl})` }} />
            <div className="latest-work__card__inner">
                {editing ? (
                    <div className={"latest-work__card__inputs-wrapper"}>

                        <div className="latest-work__card__input-wrapper">
                            <label>Titolo:</label>
                            <input className={"latest-work__card__input"} type="text" name="title"
                                   value={editedPhoto.title}
                                   onChange={handleChange}/>
                        </div>
                        <div className="latest-work__card__input-wrapper">
                            <label>Descrizione</label>
                            <input className={"latest-work__card__input"} type="text" name="description"
                                   value={editedPhoto.description}
                                   onChange={handleChange}/>
                        </div>
                        <div className="latest-work__card__input-wrapper">
                            <label>Categoria:</label>
                            <input className={"latest-work__card__input"} type="text" name="category"
                                   value={editedPhoto.category}
                                   onChange={handleChange}/>
                        </div>
                        <div className="latest-work__card__actions">
                            <button className="latest-work__card__button" onClick={handleSave}>
                                <i className="bi bi-floppy-fill"></i>
                            </button>
                            <button className="latest-work__card__button" onClick={handleCancel}>
                                Annulla
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <h3 className="latest-work__card__title">{editedPhoto.title}</h3>
                        <p className="latest-work__card__par">{editedPhoto.description}</p>
                        <p className="latest-work__card__par latest-work__card__par--category">{editedPhoto.category}</p>
                        <div className="latest-work__card__actions">
                            <button className="latest-work__card__button" onClick={handleEdit}>
                                <i className="bi bi-pencil-fill"></i>
                            </button>
                            <button className="latest-work__card__button" onClick={handleDelete}>
                                <i className="bi bi-trash3-fill"></i>
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
