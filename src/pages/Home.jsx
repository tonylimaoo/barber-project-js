// CSS
import './Home.css'

// Components
import ScheduleForm from '../components/ScheduleForm'
import ConcludedForm from '../components/ConcludedForm'

// React
import { useState, useEffect } from 'react'

// Functions
import { useAuth } from '../hooks/useAuth'
import { addDataFirestore } from '../firebase/post'

import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../firebase/config'

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

            addDataFirestore(appointment, "transactions");

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

            const getFirestoreUserInfo = async () => {
                const q = query(collection(db, "users"), where("id", "==", userId));

                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    setName(doc.data().name);
                    setCel(doc.data().cellphone);
                    setFilledForm("filled")
                });
            }

            getFirestoreUserInfo();

        } else {

            setFilledForm("unfilled");

        }
    }, [userId, filledForm, cel, name]);

    useEffect(() => {

        const handleEnabledHours = async () => {
            let data = [];
            const querySnapshot = await getDocs(collection(db, "transactions"));
            querySnapshot.forEach((doc) => {
                data.push(doc.data());
            });

            let apt = data
                .filter(e => e.date === date)
                .filter(e => e.professional === professional)
                .map(e => e.hour)
            setAppointmentHours(apt)

        }
        handleEnabledHours();

    }, [date, professional]);

    return (
        <div className="container-home">

            {!formSubmitted &&
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
