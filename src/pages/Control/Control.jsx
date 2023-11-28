import "./Control.css"
import { useState, useEffect } from "react";
import Agenda from "../../components/Agenda"
import UsersList from "../../components/UsersList"
import Revenue from "../../components/Revenue"

//jus a comment

export default function Controle() {

    const [menu, setMenu] = useState("agenda");

    console.log(menu);

    return (

        <div className="container">
            <div className="menu-control">
                <ul>
                    <li onClick={() => setMenu("agenda")} >Agenda</li>
                    <li onClick={() => setMenu("users")} >Usuarios</li>
                    <li onClick={() => setMenu("revenue")} >Dados de Receita</li>
                </ul>
            </div>
            {menu === "agenda" &&
                <Agenda />
            }
            {menu === "users" &&
                <UsersList />
            }
            {menu === "revenue" &&
                <Revenue />
            }
        </div>
    )
}