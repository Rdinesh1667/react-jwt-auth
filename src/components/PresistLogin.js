import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";


import React from 'react'

const PresistLogin = () => {

    const [isLoding, setIsLoding] = useState(true);
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {

                await refresh();

            } catch (err) {
                console.error(err);
            } finally {
                setIsLoding(false);
            }
        }
        !auth?.refreshToken ? verifyRefreshToken() : setIsLoding(false);
    }, []);

    useEffect(() => {
        console.log(`Is Loding ${isLoding}`);
        console.log(`At : ${JSON.stringify(auth?.refreshToken)}`);
    }, [isLoding]);



    return (
        <React.Fragment >
            {isLoding ? <p>Is Loding ...</p> : <Outlet />}
        </React.Fragment>
    )
}


export default PresistLogin;