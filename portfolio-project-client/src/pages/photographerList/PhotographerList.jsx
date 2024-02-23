import './PhotographerList.css';
import {Col} from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";
import PhotographerCard from "../../components/dashboard/photographerCard/PhotographerCard";

export default function PhotographerList() {
    const [photographerList, setPhotographerList] = useState([]);

    useEffect(() => {
        const getPhotographerList = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/home/list/photographer`);
                console.log(response);
                setPhotographerList(response.data.data);
            } catch (error) {
                console.error("Error fetching photographer list:", error);
            }
        };

        getPhotographerList();
    }, []);

    return(
        <>
            <h1 className={"page-title"}>Lista dei fotografi iscritti</h1>
            {photographerList.map((photographer) => (
                <Col>
                    <PhotographerCard
                        key={photographer.userId}
                        username={photographer.username}
                        name={photographer.name}
                        email={photographer.email}
                        profileImage={"https://images.pexels.com/photos/19781192/pexels-photo-19781192/free-photo-of-citta-strada-traffico-moda.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}/>
                </Col>
            ))}
        </>
    )
}