import "./Control.css"
import { useState, useContext, useEffect } from "react";
import { AdminContext } from "../context/AdminContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase/config'

export default function Controle() {
    const { isAdmin } = useContext(AdminContext);
    // const { data, loading } = useFetch(url);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [dataFiltered, setDataFiltered] = useState(false);

    useEffect(() => {

        const getFirestoreAppointmentData = async () => {
            setLoading(true);

            const querySnapshot = await getDocs(collection(db, "transactions"));
            querySnapshot.forEach((doc) => {
                setData((prevData) => [
                    ...prevData,
                    doc.data()
                ])
            });
            setLoading(false);
        }

        getFirestoreAppointmentData();
    }, []);

    const getDate = new Date();

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
    const [showList, setShowList] = useState(false);

    useEffect(() => {
        setDataFiltered(data.filter(ele => {
            return ele.date === date
        }))
    }, [data, date])

    console.log(JSON.stringify(dataFiltered));
    return (
        <div className="container-control">
            {isAdmin && !loading &&
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
            {isAdmin && loading ? (
                <div className="loading">
                    <h1>Carregando Dados...</h1>
                </div>
            ) : (
                dataFiltered && dataFiltered.length > 0 &&
                dataFiltered.map((e, i) => (
                    <div className="appt-card">
                        <h2>Agendamento ID:</h2>
                        <h3 className="transaction-id">{e.id}</h3>
                        <h3 className="hour"><span>{e.hour}</span></h3>
                        <div className="more-info" onClick={() => { setShowList(showList ? false : true) }}> + </div>
                        {showList &&
                            <ul key={e.id} id="details-list">
                                <li>Nome do cliente: {e.nome}</li>
                                <li>Serviço: {e.service}</li>
                                <li>Data: {e.date}</li>
                                <li>Horário: {e.hour}</li>
                            </ul>
                        }
                    </div>
                ))
            )}
        </div>

    )
}