import React, { useState } from "react";
import "./comments.css";
const Comments = ({ comments, onAddComment }) => {
    const [newComment, setNewComment] = useState("");


    const handleChange = (event) => {
        setNewComment(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (newComment.trim() !== "") {
            onAddComment(newComment);
            setNewComment("");
        }
    }
    

    return (
        <div className="commentSection">
            <h2>Commenti</h2>
            <ul>
                {comments.map((comment, index) => (
                    <li key={index}>
                        <div className="ProfileUserComment">
                           <img className={"comment__img"} src={"/landscape.png"} alt="ProfilePicComment" />
                           <p className="NameProfileComment">Lorem ipsum</p>
                        </div>
                       <p className="message"> {comment} </p>
                    </li>
                    
                ))}
            </ul>
            <form className="commentBar" onSubmit={handleSubmit}>
                <input className="commentText" type="text" value={newComment} onChange={handleChange} placeholder="Aggiungi un commento" />
                <button type="submit">Invia</button>
            </form>
        </div>
    );
};

export default Comments;
