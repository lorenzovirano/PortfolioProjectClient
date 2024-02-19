import './Album.css';
import Container from "react-bootstrap/Container";
import { Row } from "react-bootstrap";
import {useEffect, useState} from "react";
import CreateAlbum from "../createAlbum/CreateAlbum";
import EditAlbum from "../editAlbum/EditAlbum";
import axios from "axios";
import Cookies from "js-cookie";

export default function Album(props) {
    const [isOpenCreate, setIsOpenCreate] = useState(false);
    const [isOpenEdit, setIsOpenEdit] = useState(false);


    const handleOpenCreate = () => {
        console.log("Apro creazione album");
        setIsOpenCreate(true);
    };

    const handleOpenEdit = () => {
        console.log("Apro edit album");
        setIsOpenEdit(true);
    };



    return (
        <>
            <div className={"album"}>
                <div className="album__inner__container">
                    <div className="album__inner"></div>
                    <div className="album__inner"></div>
                    <div className="album__inner"></div>
                    {props.create && (
                        <div className="album__inner" onClick={handleOpenCreate}>
                            <i className="bi bi-plus-circle"></i>
                        </div>
                    )}
                    {!props.create && (
                        <div
                            className="album__inner"
                            style={{ backgroundImage: `url(${props.image})` }}
                            onClick={handleOpenEdit}
                        ></div>
                    )}
                </div>
                <span className="album__name">{props.title}</span>
            </div>
            {isOpenCreate && <CreateAlbum setIsOpenCreate={setIsOpenCreate} />}
            {isOpenEdit && <EditAlbum setIsOpenEdit={setIsOpenEdit} title={props.title} photographer={props.photographer} albumId={props.albumId} description={props.description}/>}
        </>
    );
}
