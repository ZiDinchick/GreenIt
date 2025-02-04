import { useState } from "react";
import { Authorization } from './Authorization';
import { ReceiveNotification } from './ReceiveNotification';

export const apiUrl = "https://1103.api.green-api.com";

function Massager() {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [idInstance, setIdInstance] = useState("");
    const [apiTokenInstance, setApiTokenInstance] = useState("");
    const [message, setMessage] = useState("");
    const [number, setNumber] = useState("");
    const [messages, setMessages] = useState<string[]>([]);

    const handleAuthorization = (id: string, token: string) => {
        setIdInstance(id);
        setApiTokenInstance(token);
        setIsAuthorized(true);
    };

    const sendMessage = async () => {
        if (!number || !message) {
            alert("Введите номер и сообщение!");
            return;
        }


        await fetch(`${apiUrl}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`, {
            method: "POST",
            body: JSON.stringify({ chatId: `${number}@c.us`, message }),
        });


        setMessages(prev => [...prev, `Вы: ${message}`]);
        setMessage("");

    };

    return (
        <div className="App">
            {!isAuthorized ? (
                <div className="Authorization">
                    <Authorization onAuthorize={handleAuthorization} />
                </div>
            ) : (
                <>
                    <div className="chats">

                        <input
                            type="tel"
                            placeholder="Введите номер (без +)"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                        />

                    </div>
                    <div className="container_massage">
                        <div className="chat">
                            <ReceiveNotification
                                idInstance={idInstance}
                                apiTokenInstance={apiTokenInstance}
                                messages={messages}
                                setMessages={setMessages}
                            />
                        </div>
                        <div className="container_send">

                            <textarea
                                placeholder="Введите сообщение"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                            />
                            <button className="send" onClick={sendMessage}><img src='../../public/send.svg' alt="send" /></button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export { Massager };
