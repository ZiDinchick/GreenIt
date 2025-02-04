import { useEffect } from "react";
import { apiUrl } from "./Massanger";

type ReceiveNotificationProps = {
    idInstance: string;
    apiTokenInstance: string;
    messages: string[];
    setMessages: React.Dispatch<React.SetStateAction<string[]>>;
};


const ReceiveNotification = ({ idInstance, apiTokenInstance, messages, setMessages }: ReceiveNotificationProps) => {
    useEffect(() => {
        const fetchMessages = () => {
            const url = `${apiUrl}/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (data.body === null)
                        return;
                    const textMessage = data.body?.messageData?.textMessageData?.textMessage

                    if (textMessage) {
                        setMessages([...messages, `Друг: ${textMessage}`]);
                    }

                    if (data.receiptId) {
                        const deleteUrl = `${apiUrl}/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${data.receiptId}`;
                        return fetch(deleteUrl, { method: "DELETE" });
                    }
                })
        };

        const interval = setInterval(fetchMessages, 4000);
        return () => clearInterval(interval);
    }, [messages]);

    return (
        <div className="chat-box">
            {messages.map((msg, index) => {
                const isMine = msg.startsWith("Вы:");
                return (
                    <div key={index} className={isMine ? "message" : "incoming_messages"}>
                        <p>{msg.replace(/^(Вы:|Друг:)\s*/, "")}</p>
                    </div>
                );
            })}
        </div>
    );
};

export { ReceiveNotification };
