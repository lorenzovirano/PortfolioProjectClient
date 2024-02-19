import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const useUserRole = () => {
    const [isPhotographer, setIsPhotographer] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const response = await axios.request({
                    headers: {
                        Authorization: `Bearer ${Cookies.get('token')}`
                    },
                    method: "GET",
                    url: `http://localhost:8000/api/v1/user/profile`
                });
                let isPhotographer = false;
                if(response.data.data.user.role.authority === "PHOTOGRAPHER"){
                    isPhotographer = true
                }
                setIsPhotographer(isPhotographer);
            } catch (error) {
                setIsPhotographer(false);
            } finally {
                setLoading(false);
            }
        };

        fetchUserRole();
    }, []);

    return { isPhotographer, loading };
};

export default useUserRole;
