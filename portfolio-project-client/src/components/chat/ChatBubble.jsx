export default function ChatBubble(props){
    return(
        <>
            <div className={`chat__message__wrapper ${props.isSender ? 'chat__message__wrapper--sender' : 'chat__message__wrapper--recipient'}`}>
                <span className={`chat__message__bubble ${props.isSender ? 'chat__message__bubble--sender' : 'chat__message__bubble--recipient'}`} >
                    {props.message}
                </span>
            </div>
        </>
    )
}