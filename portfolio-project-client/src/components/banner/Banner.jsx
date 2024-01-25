import './Banner.css';

export default function Banner(props){
    return(
        <div className={"banner"} style={{backgroundImage: `url(${props.image})`}}>
                <div className="banner__filter"></div>
                <div className={"banner__inner"}>
                    <h1 className={"banner__title"}>{props.title}</h1>
                    <h2 className={"banner__subtitle"}>{props.subtitle}</h2>
                </div>
        </div>
    );
}