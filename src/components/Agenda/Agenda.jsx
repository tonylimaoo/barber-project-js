import "./agenda.css"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFetchAppointments } from "../../hooks/useFetchAppointments";
import { useDeleteDocument } from "../../hooks/useDeleteDocument";
//jus a comment

export default function Controle() {

    const { deleteData } = useDeleteDocument();
    const dateNow = new Date();

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
    const [professional, setProfessional] = useState("");
    const [docFiltered, setDocFiltered] = useState(documents);

    useEffect(() => {
        setDocFiltered(documents)
    }, [documents])

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

    const handleCancelAppointment = async (e, tid) => {

        try {
            deleteData('transactions', tid)
            console.log('deletou')

        } catch (error) {
            console.log(error.message)
        }
    }

    const handleProfessionalFilter = (e) => {
        if (e.target.value === '') {
            setDocFiltered(documents)
        } else {
            setDocFiltered(documents.filter(doc => doc.professional === e.target.value))
        }
        setProfessional(e.target.value);
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
                    <label>
                        Filtre o profissional
                        <select type="professional" value={professional} onChange={(e) => {
                            handleProfessionalFilter(e);
                        }}>
                            <option value="">Selecione</option>
                            <option value="Carlos">Carlos</option>
                            <option value="Donizete">Donizete</option>
                        </select>
                    </label>
                </form>
            </div>

            {loading ? (
                <div className="loading">
                    <h1>Carregando Dados...</h1>
                </div>
            ) : (
                docFiltered && docFiltered.length > 0 &&
                docFiltered.map((d, i) => (
                    <div className="appt-card" key={d.id}>
                        <h2>Agendamento:</h2>
                        <h3 className="transaction-id">ID: {d.tid}</h3>
                        <h3 className="hour"><span>{d.hour[0]}</span><span>{d.service}</span><span>{d.professional}</span></h3>
                        <div className="more-info" onClick={(e) => { handleMoreInfo(e) }}> + </div>
                        <ul className="details-list">
                            <li>Nome do cliente: {d.name}</li>
                            <li>Celular:
                                <Link className="wpp-link" to={`https://api.whatsapp.com/send?phone=${d.cel.replace(/\(|\)|-| /g, '')}`}>
                                    {d.cel}
                                </Link>
                            </li>
                            <li>Serviço: {d.service}</li>
                            <li>Data: {d.date}</li>
                            <li>Horário: {d.hour[0]}</li>

                            {dateNow <=
                                Date.parse(`${d.date}T${d.hour[0]}:00`)
                                &&
                                <button
                                    className="cancel-app"
                                    onClick={(evt) => handleCancelAppointment(evt, d.tid)}
                                >Cancelar agendamento</button>
                            }
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