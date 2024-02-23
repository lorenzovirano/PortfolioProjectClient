import './Chat.css';
import Header from "../../components/navbar/Header";
import Footer from "../../components/footer/Footer";
import Container from "react-bootstrap/Container";
import {Col, Row} from "react-bootstrap";
import {Link, useLocation, useParams} from "react-router-dom";
import { Client } from "@stomp/stompjs";
import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import ChatBubble from "../../components/chat/ChatBubble";
import FormInput from "../../components/formInput/FormInput";
import axios from "axios";

export default function Chat(props){
    const { username } = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const photographer = queryParams.get('photographer');
    const [stompClient, setStompClient] = useState(null);
    const [value, setValue] = useState("");
    const [messages, setMessages] = useState([])
    const [historyMessages, setHistoryEssages] = useState([])

    const onChange = (e) => {
        setValue(e.target.value)
    }


    const config = {
        headers: {
            'Authorization': `Bearer ${Cookies.get('token')}`,
        }
    };


    const loadHistoryMessages = () => {
        axios.request({
            headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`,
                'Content-Type': 'application/json',
            },
            method: "GET",
            url: `http://localhost:8000/messages/${username}/${photographer}`
        }).then(response => {
            console.log(response.data.data)
        }).catch(error => {
            console.log('Si è verificato un errore durante il caricamento dei messaggi:', error);
        });
    }

    const setupStompClient = (username) => {
        const stompClient = new Client({
            brokerURL: "ws://localhost:8000/ws",
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            connectHeaders: config.headers,
        });

        stompClient.onConnect = () => {
            console.log("STOMP connection established.");
            stompClient.subscribe(`/user/${username}/queue/messages`, (data) => {
                onMessageReceived(data);
            });
        };

        stompClient.onStompError = (error) => {
            console.error("STOMP connection error:", error);
            setTimeout(() => {
                console.log("Riprova la connessione STOMP...");
                setupStompClient(username);
            }, 5000); // Riprova la connessione dopo 5 secondi
        };

        stompClient.activate();
        setStompClient(stompClient);
    };

    useEffect(() => {
        if (stompClient && !stompClient.connected) {
            console.warn("STOMP client is not connected.");
        }
    }, [stompClient]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (value && stompClient && stompClient.connected) {
            const payload = {
                senderId: username,
                recipientId: photographer,
                content: value,
                timestamp: new Date(),
            };
            stompClient.publish({ destination: `/app/chat`, body: JSON.stringify(payload) });
            setValue("");
            setMessages(prevMessages => [...prevMessages, payload]);
        } else {
            console.error("No active STOMP connection.");
        }
    };


    const onMessageReceived = (data) => {
        const message = JSON.parse(data.body);
        if (message.senderId !== username) {
            if (!messages.some(msg => msg.id === message.id)) {
                setMessages(prevMessages => [...prevMessages, message]);
            }
        }
    };

    useEffect(() => {
        //loadHistoryMessages();
    })


    useEffect(() => {
        if (!stompClient) {
            setupStompClient(username);
        }
        return () => {
            if (stompClient) {
                stompClient.deactivate();
            }
        };
    }, [stompClient, username]);

    return(
        <>
            <Header/>
            <Container className={"container--chat"}>
                <Row>
                    <Col>
                        <form onSubmit={sendMessage}>
                            <h1 className={"component-title"}>Chatta in tempo reale con {photographer}</h1>
                            <div className="chat">
                                <div className="chat__message">
                                    {messages.map((message, index) => (
                                        <ChatBubble key={index} isSender={message.senderId === username} message={message.content} />
                                    ))}
                                </div>
                                <div className="chat__input">
                                    <FormInput placeholder={"Invia messaggio..."} type={"text"}  value={value} onChange={onChange} className={"form__input--full-width"}/>
                                    <button className="chat__input--send">
                                        <i className="bi bi-send"></i>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </Col>
                </Row>
                <Row>
                    <div className="form__submit form__submit--photographer">
                        <Link to={`/photographer/${photographer}`}>
                            <div className="form__submit__button form__submit__button--green form__submit__button--green-full-wdith">
                                Torna alla pagina del fotografo
                            </div>
                        </Link>
                    </div>
                </Row>
            </Container>
            <Footer/>
        </>

    )
}