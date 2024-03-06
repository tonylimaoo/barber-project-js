// CSS
import './Home.css'

// Components
import ScheduleForm from '../../components/ScheduleForm/ScheduleForm'
import ConcludedForm from '../../components/ConcludedForm/ConcludedForm'

// React
import { useState, useEffect } from 'react'

// Functions
// import { addDataFirestore } from '../../firebase/post'
import AlertMessage from '../../components/AlertMessage/AlertMessage'
import { useAuthValue } from '../../context/AuthContext'
import { useInsertDocument } from '../../hooks/useInsertDocument'
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useFetchEnabledHours } from '../../hooks/useFetchEnabledHours';
import { useHours } from '../../hooks/useHours'
import { useAdminValue } from '../../context/AdminContext'

const uuid = require('uuid');

// const hours = ["07:10", "08:00", "08:50", "09:40", "10:30", "11:20", "12:10", "13:00", "13:50", "14:40", "15:30", "16:20", "17:10", "18:00", "18:50", "19:40", "20:30"]
const barbers = ["Carlos", "Donizete"]

export default function App() {
    // States
    const [name, setName] = useState("");
    const [cel, setCel] = useState("");
    const [date, setDate] = useState("");
    const [hour, setHour] = useState([]);
    const [service, setService] = useState("");
    const [professional, setProfessional] = useState("");
    const [transactionId, setTransactionId] = useState("");
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [appointmentHours, setAppointmentHours] = useState("");
    const [formError, setFormError] = useState(false);
    const [formErrorMessage, setFormErrorMessage] = useState("");
    const [hoursIndex, setHoursIndex] = useState();
    const [noDayOffBarber, setNoDayOffBarber] = useState();
    const [exclusiveHours, setExclusiveHours] = useState();
    const { isAdmin } = useAdminValue();
    const { hours } = useHours(date);

    // Custom Hooks
    const { user: authUser } = useAuthValue();

    const { setDocument } = useInsertDocument('transactions');
    const {
        documents,
        loading: loadingUserData,
        error
    } = useFetchDocuments("users", authUser ? authUser.uid : null);
    const {
        documents: enabledHours,
        // error: errorEnabledHours
    } = useFetchEnabledHours("transactions", professional, date);
    const {
        documents: dayOffs,
    } = useFetchDocuments("day-off");

    const uid = authUser ? authUser.uid : null;

    // Handle submit form function
    const handleSubmit = (e) => {

        (async () => {
            e.preventDefault();
            const tid = uuid.v4()
            const uid = authUser ? authUser.uid : null
            setLoading(true);

            const appointment = {
                name,
                cel,
                date,
                hour,
                tid,
                professional,
                service,
                uid,
                hours_index: hoursIndex
            }

            setDocument(appointment, tid)
            setFormSubmitted(true);
            setLoading(false);
            setTransactionId(tid);
        })()

    };

    useEffect(() => {
        localStorage.setItem('transactionId', transactionId)
    }, [transactionId])

    useEffect(() => {
        if (!isAdmin) {
            if (uid !== null && documents !== null) {
                documents.forEach(e => {
                    setName(e.name);
                    setCel(e.cellphone);
                })
            }
        }
    }, [uid, documents, isAdmin]);

    useEffect(() => {
        if(error) {
            setFormError(true)
            setFormErrorMessage("Sem Internet! Atualize a página.")
        }
    }, [error])

    useEffect(() => {
        if (date && professional && enabledHours) {


            const handleEnabledHours = async () => {
                    if (!navigator.onLine){
                        setFormError(true)
                        setFormErrorMessage("Sem Internet! Atualize a página.")
                        setAppointmentHours([])
                        setExclusiveHours([])
                    } else {
                        let data = enabledHours;

                        let apt = data
                            .filter(e => e.date === date)
                            .filter(e => e.professional === professional)
                            .map(e => e.hour)
    
                        let hoursFormatted = JSON.stringify(apt)
                            .replace(/\[|\]/g, '')
                            .replace(/(['"])/g, '')
                            .split(',');
    
    
                        if (new Date(date + "T00:00:00").getDay() === 6) {
                            hoursFormatted.push("18:40")
                        } else {
                            hoursFormatted.push("20:00")
                        }
    
                        console.log("hoursFormatted")
                        console.log(hoursFormatted)
    
                        setAppointmentHours(hoursFormatted);
                    }
            }
            handleEnabledHours();
        }
    }, [date, professional, enabledHours]);

    useEffect(() => {

        if (hours) {
            let hoursFiltered = hours.filter(ele => !appointmentHours.includes(ele))

            const dateParsed = new Date(date + 'T00:00:00').toLocaleDateString();

            const dateNow = new Date();

            if (dateNow.toLocaleDateString() === dateParsed) {

                if(!navigator.onLine) {
                    hoursFiltered = [];
                } else {
                    const hourNow = new Date().getTime()
    
                    hoursFiltered = hoursFiltered.filter((ele) => {
                        console.log('entrou aqui')
                        let received;
    
                        const date = new Date()
    
                        const dateOffset = date.getTimezoneOffset();
                        let dateTimestamp = date.getTime()
    
                        dateTimestamp = dateTimestamp - dateOffset * 60 * 1000
    
                        const dateNowJson = new Date(dateTimestamp).toJSON().split("T")[0]
                        const dateHourMounted = new Date(`${dateNowJson}T${ele}:00`).getTime() //- (600000 * 6 * 24); //.358Z
    
                        if (hourNow <= dateHourMounted - (600000)) { //+(600000 * 6 * 24)
                            received = ele
                        } else {
                            console.log('nao é')
                        }
                        console.log(received)
                        return received;
                    })
                }
                                
                // hoursFiltered = hoursFiltered.filter(ele => {
                //     const elemReplaced = parseInt(ele.replace(':', ''));
                //     let received;
                //     if (elemReplaced > hourNowRefact) {
                //         received = ele;
                //     }
                //     return received;
                // })
                
                setExclusiveHours(hoursFiltered)
            } else if(!navigator.onLine) {
                setExclusiveHours([]);
            } else {
                setExclusiveHours(hoursFiltered);
            }
        }

    }, [appointmentHours, hours, date])

    return (
        <div className="container-home">
            {formError &&
                <AlertMessage
                    setFormError={setFormError}
                    formErrorMessage={formErrorMessage}
                />
            }

            {!formSubmitted &&
                !loadingUserData &&
                !error &&
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
                    setService={setService}
                    setProfessional={setProfessional}
                    appointmentHours={appointmentHours}
                    hours={hours}
                    setFormErrorMessage={setFormErrorMessage}
                    setFormError={setFormError}
                    user={authUser}
                    index={hoursIndex}
                    setIndex={setHoursIndex}
                    dayOffs={dayOffs}
                    noDayOffBarber={noDayOffBarber}
                    setNoDayOffBarber={setNoDayOffBarber}
                    barbers={barbers}
                    exclusiveHours={exclusiveHours}
                />
            }
            {error &&
                <p>{error}</p>
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
