import { useState } from "react";

type Authorize = {
    onAuthorize: (
        setIdInstance: string,
        setApiTokenInstance: string,
    ) => void
}

const Authorization = ({ onAuthorize }: Authorize) => {
    const [idInstance, setIdInstance] = useState("1103183990");
    const [apiTokenInstance, setApiTokenInstance] = useState("ee6f91e600ed4f108868c073f74775022614915dc8b94b0196");

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
