import './AlbumList.css';
import axios from "axios";
import Cookies from "js-cookie";
import {useEffect, useState} from "react";
import {Col} from "react-bootstrap";
import Album from "../album/Album";

export default function AlbumList(props){
    const [albumDataList, setAlbumDataList] = useState([]);

    useEffect(() => {
        const getPhotographerAlbums = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/album/read/${props.photographer}`, {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('token')}`
                    }
                });
                console.log(response);
                setAlbumDataList(response.data.data);
            } catch (error) {
                console.error("Error fetching photographer albums:", error);
            }
        };

        getPhotographerAlbums();
    }, [props.photographer]);

    return (
        <>
            <h2 className={"component-title"}>Album creati</h2>
            <Col lg={3} md={4} sm={12}>
                <Album title={"Crea nuovo album"} create/>
            </Col>
            {albumDataList && albumDataList.length > 0 && albumDataList.map((albumData) => (
                <Col lg={3} md={4} sm={6}>
                    <Album
                        key={albumData.albumId}
                        title={albumData.title}
                        images={""}
                        albumId={albumData.albumId}
                        description={albumData.description}
                        photographer={props.photographer}
                    />
                </Col>
            ))}
        </>

    )
}