import "./PhotographerCard.css"
import {Link} from "react-router-dom";
import useUserStatus from "../../../utils/UserStatus";

export  default function PhotographerCard(props){
    const { isLogged, loading } = useUserStatus();

    if (loading) {
        return <p>Loading...</p>;
    }
    return(
        <>
            <div className={"latest-work"}>
                <div className="latest-work__cards">
                    <div className="latest-work__card photographer__card">
                        <Link to={`/photographer/${props.username}`}>
                            <div style={{backgroundImage: `url(${props.profileImage})`}} className="latest-work__card__image" />
                            <div className="latest-work__card__inner">
                                <h3 className="latest-work__card__title">{props.username}{}</h3>
                                <p className="latest-work__card__par">Email: {props.email}</p>
                                {isLogged && <div className="form__submit form__submit--photographer">
                                    <Link to={`/photographer/${props.username}`}>
                                        <div className="form__submit__button form__submit__button--green">
                                            Contatta il fotografo
                                        </div>
                                    </Link>
                                </div>}
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}