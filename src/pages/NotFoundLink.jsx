import React from 'react';
import Error from "../components/Error404/Error";

const NotFoundPage = () => {
    return (
        <div>
            <Error title="Ссылка неактивна :("
                   description={"Скорее всего Ваш аккаунт уже зарегистрирован, если считаете, что произошла ошибка - свяжитесь с администратором"}/>
        </div>
    );
};

export default NotFoundPage;
