import './ProfileImage.css';

export default function ProfileImage(props){
    return(
        <>
            <div className="profile-image">
                <div className={"profile-image__img"} style={{backgroundImage: `url('${props.profileImage}')`}}>

                </div>
                <span className={"profile-image__name"}>{props.name}</span>
            </div>
        </>
    )
}