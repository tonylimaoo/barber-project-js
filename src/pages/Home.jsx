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

const urls = [
    'http://localhost:3000/appointments',
    "http://localhost:3000/appointments?_sort=hour&_order=asc"
]
const uuid = require('uuid');



export default function App() {
    // States
    const [name, setName] = useState("");
    const [cel, setCel] = useState("");
    const [date, setDate] = useState("");
    const [hour, setHour] = useState("");
    const [service, setService] = useState("");
    const [professional, setProfessional] = useState("");
    const [transactionId, setTransactionId] = useState("");
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState("");
    const [filledForm, setFilledForm] = useState("");
    const [appointmentHours, setAppointmentHours] = useState("");

    // Custom Hooks
    const { httpConfig } = useFetch(urls[0]);
    const { authUser } = useAuth();

    // Handel submit form function
    const handleSubmit = (e) => {

        (async () => {
            e.preventDefault();
            const tid = uuid.v4()
            const userId = authUser ? authUser.uid : null
            setLoading(true);
            const appointment = {
                "nome": name,
                "celular": cel,
                "date": date,
                "hour": hour,
                "id": tid,
                "professional": professional,
                "service": service,
                "uid": userId
            }

            httpConfig(appointment, "POST");
            setFormSubmitted(true);
            setLoading(false);
            setTransactionId(tid);
        })()

    };

    useEffect(() => {
        localStorage.setItem('transactionId', transactionId)
    }, [transactionId])

    useEffect(() => {
        setUserId(localStorage.getItem("userId"))
    }, [userId])

    useEffect(() => {
        if (userId !== '') {
            const fetchData = async () => {
                const res = await fetch('http://localhost:3000/users/' + userId)
                const data = await res.json();

                setName(data.name);
                setCel(data.cellphone);
                setFilledForm("filled")
            }
            fetchData();
        } else {
            setFilledForm("unfilled")
        }
    }, [userId, filledForm, cel, name])

    useEffect(() => {
        const handleEnabledHours = async () => {
            const res = await fetch(urls[1]);
            const json = await res.json();
            let apt = json
                .filter(e => e.date === date)
                .filter(e => e.professional === professional)
                .map(e => e.hour)
            setAppointmentHours(apt)
        }
        handleEnabledHours();
    }, [date, professional]);

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
                        handleSubmit={handleSubmit}
                        loading={loading}
                        userId={userId}
                        setService={setService}
                        setProfessional={setProfessional}
                        appointmentHours={appointmentHours}
                        filledForm={filledForm}
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
