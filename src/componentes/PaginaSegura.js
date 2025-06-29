import { useNavigate } from "react-router-dom";
import cookie from "js-cookie";
import { useEffect } from "react";

export default function PaginaSegura({ children }) {
    const navegacao = useNavigate();

    useEffect(() => {
        let token = cookie.get('token');

        if (!token) {
            navegacao('/login');
        }
    }, []);

    return children;
}