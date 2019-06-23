import React from "react";

const Card = props => (

    <div className="imageBorder">
        <img className="img-thumbnail" id={props.id} key={props.id} alt={props.name} src={props.image} onClick={() => props.clickPicture(props.id)} />
    </div>

);

export default Card;