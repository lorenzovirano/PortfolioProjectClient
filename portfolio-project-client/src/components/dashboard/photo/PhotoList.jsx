import './PhotoList.css'
import React from 'react';
import PhotoItem from './PhotoItem';
import {Col} from "react-bootstrap";

export default function PhotoList({ photos, onDelete }){
    return (
        <>
            {photos.map((photo) => (
                <Col lg={4} md={6} sm={12}>
                    <PhotoItem key={photo.pictureId} photo={photo} onDelete={onDelete} />
                </Col>
            ))}
        </>
    );
};
