import { useState } from "react";

type Authorize = {
    onAuthorize: (
        setIdInstance: string,
        setApiTokenInstance: string,
    ) => void
}

const Authorization = ({ onAuthorize }: Authorize) => {
    const [idInstance, setIdInstance] = useState("");
    const [apiTokenInstance, setApiTokenInstance] = useState("");

    const instanceAuthorization = () => {
        if (!idInstance || !apiTokenInstance) {
            alert("Введите instance и token instance");
            return;
        }

        onAuthorize(idInstance, apiTokenInstance);
    };

    return (
        <>
            <h2>Авторизация</h2>
            <input
                type="number"
                placeholder="Введите instance"
                value={idInstance}
                onChange={(e) => setIdInstance(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && instanceAuthorization()}
            />
            <input
                type="text"
                placeholder="Введите API Token"
                value={apiTokenInstance}
                onChange={(e) => setApiTokenInstance(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && instanceAuthorization()}
            />
            <button onClick={instanceAuthorization}>Авторизироваться</button>
        </>
    );
};

export { Authorization };
