export default function FormInput(props){
    return (
        <div className="form__input">
            <label>{props.label}</label>
            <input type={props.type} placeholder={props.placeholder}/>
        </div>
    )
}