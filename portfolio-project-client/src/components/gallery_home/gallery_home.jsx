import React, { useState } from "react";
import "./gallery_home.css";
import Comments from "./comments.jsx";
import {Container} from "react-bootstrap";

const GalleryHome = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [comments, setComments] = useState([]); 
    const userImages = [
        { id: 1, url: "https://images.pexels.com/photos/19402529/pexels-photo-19402529/free-photo-of-verde-atras-fare-verde.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2.png", title: "Image 1" },
        { id: 2, url: "/landscape.png", title: "Image 2" },
        { id: 3, url: "https://images.pexels.com/photos/19966316/pexels-photo-19966316/free-photo-of-mare-spiaggia-vacanza-persone.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", title: "Image 3" },
        { id: 4, url: "https://images.pexels.com/photos/20087472/pexels-photo-20087472/free-photo-of-uomo-persone-donna-seduto.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", title: "Image 4" },
        { id: 5, url: "https://images.pexels.com/photos/11395821/pexels-photo-11395821.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", title: "Image 5" },
        { id: 6, url: "https://images.pexels.com/photos/18909762/pexels-photo-18909762/free-photo-of-parco-divertimenti-ruota-panoramica-avventura-crepuscolo.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", title: "Image 6" },
    ];

    const handleCommentClick = (imageId) => {
        setSelectedImage(imageId);
    }
    const handleCloseClick = () =>{
        setSelectedImage(null);
    }
    const handleAddComment = (comment) => {
        setComments([...comments, comment]);
    }

   

    return (
        <>
            <Container>
                <h2 className={"GalleryHome__title"}>Latest work</h2>
                <div className="GalleryHome">
                    {userImages.map((image) => (
                        <div className="GalleryHome-item" key={image.id}>
                            <div className="ProfileUser">
                                <img src={image.url} alt="ProfilePic" />
                                <p className="NameProfile">Lorem ipsum</p>
                            </div>
                            <div className="PostUser" style={{backgroundImage: `url('${image.url}`}}></div>
                            <div className="PostInteraction">
                                <p className="like"><i className="bi bi-heart"></i></p>
                                <p className="comment" onClick={() => handleCommentClick(image.id)}><i className="bi bi-chat-left-dots"></i></p>
                            </div>
                        </div>
                    ))}
                    {selectedImage && (
                        <div className="commentBox">
                            <span className="closeIcon" onClick={handleCloseClick}><i className="bi bi-x-lg"></i></span>
                            <div className={"commentBox__img"} style={{backgroundImage: `url('${userImages.find(image => image.id === selectedImage).url}')` }} />
                            <Comments comments={comments} onAddComment={handleAddComment} />
                        </div>


                    )}
                </div>
            </Container>
        </>
    );
};

export default GalleryHome;
