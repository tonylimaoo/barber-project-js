import "./Styles/agenda.css"
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase/config'
import { Link } from "react-router-dom";

//jus a comment

export default function Controle() {
    // const { data, loading } = useFetch(url);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [dataFiltered, setDataFiltered] = useState(false);
    const getDate = new Date();

    const compareHour = (a, b) => {
        return a.hour - b.hour;
    }

    useEffect(() => {

        const getFirestoreAppointmentData = async () => {
            setLoading(true);

            const querySnapshot = await getDocs(collection(db, "transactions"));
            let transactions = [];
            querySnapshot.forEach((doc) => {

                transactions.push(doc.data())
            });
            const dbGet = transactions.map((e) => {
                return {
                    ...e,
                    hour: Number(e.hour[0].replace(':', ''))
                }
            })
                .sort(compareHour)
                .map(e => {
                    let hourLength = `${e.hour}`.length

                    return {
                        ...e,
                        hour: hourLength < 4 ?
                            `${e.hour}`.slice(0, 1) + ":" + `${e.hour}`.slice(1, 3)
                            :
                            `${e.hour}`.slice(0, 2) + ":" + `${e.hour}`.slice(2, 4)
                    }
                })

            setData(dbGet);

            setLoading(false);
        }

        getFirestoreAppointmentData();
    }, []);


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

    const todaysDate = formatDate();

    const [date, setDate] = useState(todaysDate);

    useEffect(() => {
        setDataFiltered(data.filter(ele => {
            return ele.date === date
        }))
    }, [data, date])

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
            {!loading &&
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
            }

            {loading ? (
                <div className="loading">
                    <h1>Carregando Dados...</h1>
                </div>
            ) : (
                dataFiltered && dataFiltered.length > 0 &&
                dataFiltered.map((e, i) => (
                    <div key={e.id} className="appt-card">
                        <h2>Agendamento ID:</h2>
                        <h3 className="transaction-id">{e.tid}</h3>
                        <h3 className="hour"><span>{e.hour}</span><span>{e.professional}</span></h3>
                        <div className="more-info" onClick={(e) => { handleMoreInfo(e) }}> + </div>
                        <ul className="details-list">
                            <li>Nome do cliente: {e.nome}</li>
                            <li>Celular: <Link className="link" to={`https://api.whatsapp.com/send?phone=${e.cel.replace(/\(|\)|-| /g, '')}`}>
                                {e.cel}
                            </Link>
                            </li>
                            <li>Serviço: {e.service}</li>
                            <li>Data: {e.date}</li>
                            <li>Horário: {e.hour}</li>
                        </ul>

                    </div>
                ))
            )}
        </div>

    )
}