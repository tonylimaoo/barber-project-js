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
    const [userId, setUserId] = useState("");
    const [filledForm, setFilledForm] = useState("");
    // const [disabled, setDisabled] = useState("");

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
        console.log(userId)
    }, [])

    useEffect(() => {
        if(userId !== ''){
            const fetchData = async () => {
                const res = await fetch ('http://localhost:3000/users/'+ userId)
                const data = await res.json();
                
                setName(data.name);
                setCel(data.cellphone);
                console.log(name, cel)
                setFilledForm("filled")
                console.log(filledForm)
            }
            fetchData();
        } else {
            setFilledForm("unfilled")
            console.log(filledForm)
        }
    }, [userId])

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
