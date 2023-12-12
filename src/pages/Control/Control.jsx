import "./Control.css"
import { useState } from "react";
import Agenda from "../../components/Agenda/Agenda"
import UsersList from "../../components/UsersList/UsersList"
import Revenue from "../../components/Revenue/Revenue"

//jus a comment

export default function Controle() {

    const [menu, setMenu] = useState("agenda");

    return (

        <div className="container">
            <div className="menu-control">
                <ul>
                    <li onClick={() => setMenu("agenda")} >Agenda</li>
                    <li onClick={() => setMenu("users")} >Usuarios</li>
                    <li onClick={() => setMenu("revenue")} >Meu negócio</li>
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