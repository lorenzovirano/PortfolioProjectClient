import './LatestWork.css';
import {Link} from "react-router-dom";

export default function LatestWork(props){
    return(
        <div className={"latest-work"}>
            <h2 className={"latest-work__title"}>Latest work</h2>
            <div className="latest-work__cards">
                    <div className="latest-work__card">
                        <Link>
                            <div style={{backgroundImage: "url('https://images.pexels.com/photos/17685567/pexels-photo-17685567/free-photo-of-mare-citta-paesaggio-natura.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')"}} className="latest-work__card__image" />
                            <div className="latest-work__card__inner">
                                <h3 className="latest-work__card__title">Title card</h3>
                                <p className="latest-work__card__par">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut autem commodi dicta dolorem doloremque eveniet quam quas quidem temporibus voluptas?</p>
                            </div>
                        </Link>
                    </div>
                <div className="latest-work__card">
                    <Link>
                        <div style={{backgroundImage: "url('https://images.pexels.com/photos/13398438/pexels-photo-13398438.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')"}} className="latest-work__card__image" />
                        <div className="latest-work__card__inner">
                            <h3 className="latest-work__card__title">Title card</h3>
                            <p className="latest-work__card__par">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut autem commodi dicta dolorem doloremque eveniet quam quas quidem temporibus voluptas?</p>
                        </div>
                    </Link>
                </div>
                <div className="latest-work__card">
                    <Link>
                        <div style={{backgroundImage: "url('https://images.pexels.com/photos/20087121/pexels-photo-20087121/free-photo-of-moda-persone-donna-ragazza.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')"}} className="latest-work__card__image" />
                        <div className="latest-work__card__inner">
                            <h3 className="latest-work__card__title">Title card</h3>
                            <p className="latest-work__card__par">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut autem commodi dicta dolorem doloremque eveniet quam quas quidem temporibus voluptas?</p>
                        </div>
                    </Link>
                </div>
                <div className="latest-work__card">
                    <Link>
                        <div style={{backgroundImage: "url('https://images.pexels.com/photos/11395821/pexels-photo-11395821.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')"}} className="latest-work__card__image" />
                        <div className="latest-work__card__inner">
                            <h3 className="latest-work__card__title">Title card</h3>
                            <p className="latest-work__card__par">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut autem commodi dicta dolorem doloremque eveniet quam quas quidem temporibus voluptas?</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}