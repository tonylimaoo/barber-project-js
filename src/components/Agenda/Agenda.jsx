import "./agenda.css"
import { useState } from "react";
import { Link } from "react-router-dom";
import { useFetchAppointments } from "../../hooks/useFetchAppointments";

//jus a comment

export default function Controle() {

    const formatDate = () => {
        let day = `${getDate.getDate()}`
        let month = `${getDate.getMonth() + 1}`
        let year = `${getDate.getFullYear()}`

        if (day.length === 1) {
            day = 0 + day
        }

        if (month.length === 1) {
            month = 0 + month
        }

        const fullDate = `${year}-${month}-${day}`

        return fullDate
    };

    const getDate = new Date();
    const todaysDate = formatDate();
    const [date, setDate] = useState(todaysDate);
    const { documents, loading, error } = useFetchAppointments('transactions', date)

    const handleMoreInfo = (ele) => {

        const eleClassList = ele.target.closest("div.appt-card").querySelector('.details-list').classList

        if (eleClassList.value.match('active')) {
            eleClassList.remove('active');
            ele.target.innerHTML = "+";
        } else {
            eleClassList.add('active');
            ele.target.innerHTML = "-";
        }

    }

    return (
        <div className="container-control">

            <div className="day-filter">
                <form className="setDay">
                    <label>
                        Filtre o dia
                        <input type="date" value={date} onChange={(e) => {
                            setDate(e.target.value);
                        }} />
                    </label>
                </form>
            </div>

            {loading ? (
                <div className="loading">
                    <h1>Carregando Dados...</h1>
                </div>
            ) : (
                documents && documents.length > 0 &&
                documents.map((e, i) => (
                    <div key={e.id} className="appt-card">
                        <h2>Agendamento:</h2>
                        <h3 className="transaction-id">ID: {e.tid}</h3>
                        <h3 className="hour"><span>{e.hour[0]}</span><span>{e.professional}</span></h3>
                        <div className="more-info" onClick={(e) => { handleMoreInfo(e) }}> + </div>
                        <ul className="details-list">
                            <li>Nome do cliente: {e.name}</li>
                            <li>Celular: <Link className="wpp-link" to={`https://api.whatsapp.com/send?phone=${e.cel.replace(/\(|\)|-| /g, '')}`}>
                                {e.cel}
                            </Link>
                            </li>
                            <li>Serviço: {e.service}</li>
                            <li>Data: {e.date}</li>
                            <li>Horário: {e.hour[0]}</li>
                        </ul>

                    </div>
                ))
            )}
            {error &&
                <p>{error}</p>
            }
        </div>

    )
}