import React, {useEffect} from 'react';
import 'react-toastify/dist/ReactToastify.css';
import PageTitle from "../components/PageTitle/PageTitle";
import InvitationForm from "../components/InvitationForm/InvitationForm";
import TableRow from "../components/TableRow/TableRow";

import s from "./Pages.module.css";
import {getUsers} from "../store/slices/usersSlice";
import {useDispatch} from "react-redux";
import {useUsers} from "../hooks/use-users";
import Loading from "../components/Loading/Loading";
import {FRONTEND_HOST} from "../api/host";

const InvitationsPage = () => {
    const dispatch = useDispatch();
    const users = useUsers();

    useEffect(() => {
        dispatch(getUsers());
    }, []);

    const headers = [
        {type: "header", text: 'Почта', alignment: "left", width: "250px"},
        {type: "header", text: 'ФИО', alignment: "left", width: "348px"},
        {type: "header", text: 'Ссылка', alignment: "left", width: "374px"},
        {type: "header", text: 'Статус', alignment: "left", width: "260px"},
        {type: "header", text: '', alignment: "left", width: "40px"},
    ]

    let invitations = []

    if (users.isLoading)
        return <Loading/>

    if (!users.isLoading)
        invitations = users.users.slice()
            .sort((firstUser, secondUser) => {
                return +firstUser.emailConfirmed > +secondUser.emailConfirmed ? 1 : -1
            })
            .map(user => {
                return {
                    mail: user.email,
                    name: user.name ? user.surname + " " + user.name + " " + user.patronymic : "-",
                    id: user.id,
                    //date: "26.02.2023",
                    link: FRONTEND_HOST + "registration/" + user.id,
                    status: user.lockoutEnabled ? user.emailConfirmed ? "Registr" : "Wait" : "NotWorking"
                }
            })
    console.log(invitations)
    return (
        <div>
            <PageTitle title="Приглашения"/>
            <InvitationForm/>
            <div className={s.InvitationsPageTable}>
                <TableRow cells={headers} isHeader/>
                {
                    invitations.length === 0 ?
                        <TableRow
                            cells={[{type: "text", text: "Нет приглашений!", alignment: "center", width: "1272px"}]}/> :
                        <></>
                }
                {
                    invitations.map(invitation => {
                        let cells = [
                            {type: "text", text: invitation.mail, alignment: "left", width: "250px"},
                            {type: "text", text: invitation.name, alignment: "left", width: "348px"},
                        ]
                        if (invitation.status === "Wait")
                            cells.push({type: "copyLink", link: invitation.link, alignment: "left", width: "374px"})
                        else
                            cells.push({type: "text", text: "-", alignment: "left", width: "374px"})

                        cells.push({type: "status", status: invitation.status, alignment: "left", width: "260px"},)
                        if (invitation.name === "-" && invitation.status !== "NotWorking")
                            cells.push({type: "deleteInvention", id: invitation.id, alignment: "left", width: "40px"},)
                        return <TableRow cells={cells}/>
                    })
                }
            </div>
        </div>
    );
};

export default InvitationsPage;
