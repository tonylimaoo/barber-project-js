// CSS
import styles from './Home.module.css'

// Components
import ScheduleForm from '../components/ScheduleForm'
import ConcludedForm from '../components/ConcludedForm'

// React
import { useState, useEffect } from 'react'

// Functions
import { useFetch } from '../hooks/useFetch'
import { useAuth } from '../hooks/useAuth'

const url = 'http://localhost:3000/appointments'
const uuid = require('uuid');



export default function App() {
    const [name, setName] = useState("");
    const [cel, setCel] = useState("");
    const [date, setDate] = useState("");
    const [hour, setHour] = useState("");
    const [service, setService] = useState("");
    const [professional, setProfessional] = useState("");
    const [transactionId, setTransactionId] = useState("");
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const { httpConfig } = useFetch(url);
    const { authUser } = useAuth();

    const handleSubmit = (e) => {

        (async () => {
            e.preventDefault();
            const tid = uuid.v4()
            console.log("Resultado");
            console.log(professional);
            console.log(service);
            setLoading(true);
            const appointment = {
                "nome": name,
                "celular": cel,
                "date": date,
                "hour": hour,
                "id": tid,
                "professional": professional,
                "service": service,
                "uid": authUser.uid || undefined
            }

            httpConfig(appointment, "POST");
            // setTransactionId(await setAppointments(name, cel, date, hour));
            // console.log('Datas: ' + name, cel, date, hour, transactionId);
            setFormSubmitted(true);
            setLoading(false);
            setTransactionId(tid);


        })()

    };

    useEffect(() => {
        localStorage.setItem('transactionId', transactionId)
    }, [transactionId])

    return (
        <div className="main">

            {!formSubmitted &&
                <div className={styles.main}>
                    <ScheduleForm
                        name={name}
                        cel={cel}
                        date={date}
                        hour={hour}
                        service={service}
                        professional={professional}
                        setName={setName}
                        setCel={setCel}
                        setDate={setDate}
                        setHour={setHour}
                        setService={setService}
                        setProfessional={setProfessional}
                        handleSubmit={handleSubmit}
                        loading={loading}
                    />
                </div>
            }
            {formSubmitted && transactionId === '' && <h1>Carregando...</h1>}
            {transactionId !== '' &&
                <ConcludedForm
                    transactionId={transactionId}
                    hour={hour}
                    date={date}
                />}

        </div>

    )
}
