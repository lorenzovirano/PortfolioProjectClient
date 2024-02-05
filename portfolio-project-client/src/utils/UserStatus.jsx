import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const useUserStatus = () => {
    const [isLogged, setIsLogged] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserStatus = async () => {
            try {
                const response = await axios.request({
                    headers: {
                        Authorization: `Bearer ${Cookies.get('token')}`
                    },
                    method: "GET",
                    url: `http://localhost:8000/api/v1/user/checkUser`
                });

                const isLoggedIn = response.data.code === "200";
                setIsLogged(isLoggedIn);
            } catch (error) {
                setIsLogged(false);
            } finally {
                setLoading(false);
            }
        };

        fetchUserStatus();
    }, []);

    return { isLogged, loading };
};

export default useUserStatus;
