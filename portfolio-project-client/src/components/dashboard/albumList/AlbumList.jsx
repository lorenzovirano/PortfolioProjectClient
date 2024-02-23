import './AlbumList.css';
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import Album from "../album/Album";
import useUserStatus from "../../../utils/UserStatus";

export default function AlbumList(props) {
    const { username } = useUserStatus();
    const [albumDataList, setAlbumDataList] = useState([]);
    const isCurrentPhotographer = username === props.photographer;

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
            {albumDataList && albumDataList.length > 0 ? (
                <>
                    <h2 className={"component-title"}>Album creati</h2>
                    {isCurrentPhotographer && (
                        <Col lg={3} md={4} sm={12}>
                            <Album title={"Crea nuovo album"} create />
                        </Col>
                    )}
                    {albumDataList.map((albumData) => (
                        <Col lg={3} md={4} sm={6} key={albumData.albumId}>
                            <Album
                                title={albumData.title}
                                images={""}
                                albumId={albumData.albumId}
                                description={albumData.description}
                                photographer={props.photographer}
                            />
                        </Col>
                    ))}
                </>
            ) : (
                <>
                    {isCurrentPhotographer ? (
                        <Col lg={3} md={4} sm={12}>
                            <Album title={"Crea nuovo album"} create />
                        </Col>
                    ) : (
                        <div className={"album-list-empty"}>
                            <div className="album-list-empty__par">
                                Mi dispiace, al momento il fotografo non ha ancora caricato nessun album, riprova fra un
                                po' di tempo!
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    );

}
