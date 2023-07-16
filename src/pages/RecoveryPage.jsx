import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import {useParams} from "react-router-dom";
import RecoveryForm from "../components/RecoveryForm/RecoveryForm";
import NotFoundPage from "./NotFoundPage";

const LoginPage = () => {
    const {userID} = useParams();
    if (!userID)
        return <NotFoundPage/>
    return (
        <div>
            <RecoveryForm userID={userID}/>
        </div>
    );
};

export default LoginPage;
