import React, { useState } from "react";
import "./gallery_home.css";
import Comments from "./comments.jsx";

const GalleryHome = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [comments, setComments] = useState([]); 
    const userImages = [
        { id: 1, url: "/landscape.png", title: "Image 1" },
        { id: 2, url: "/landscape.png", title: "Image 2" },
        { id: 3, url: "/landscape.png", title: "Image 3" },
        { id: 4, url: "/landscape.png", title: "Image 4" },
        { id: 5, url: "/landscape.png", title: "Image 5" },
        { id: 6, url: "/landscape.png", title: "Image 6" },
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
        <div className="GalleryHome">
            {userImages.map((image) => (
                <div className="GalleryHome-item" key={image.id}>
                    <div className="ProfileUser">
                        <img src={image.url} alt="ProfilePic" />
                        <p className="NameProfile">hfejddsjfc_refvwf04</p>
                    </div>
                    <img className="PostUser" src={image.url} alt={image.title} />
                    <div className="PostInteraction">
                        <p className="like">mi piace</p>
                        <p className="comment" onClick={() => handleCommentClick(image.id)}>commenta</p>
                    </div>
                </div>
            ))}
            {selectedImage && (
                <div className="commentBox">
                    <span className="closeIcon" onClick={handleCloseClick}>X</span>
                    <img src={userImages.find(image => image.id === selectedImage).url} alt="immagine selezionata" />
                   <Comments comments={comments} onAddComment={handleAddComment} />
                    </div>

                
            )}
        </div>
    );
};

export default GalleryHome;
