import AppointmentTable from "../components/AppointmentTable"
import styles from "./Control.module.css"
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
    const [changeDate, setChangeDate] = useState(true);

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


    if (data !== null && changeDate === true) {
        setDataFiltered(data.filter(ele => {
            return ele.date === date
        }))
        setChangeDate(false);
    }

    return (
        <div className={styles.containerPage}>
            {isAdmin &&
                <>
                    <div>
                        <form className={styles.setDay}>
                            <label>
                                Filtre o dia
                                <input type="date" value={date} onChange={(e) => {
                                    setDate(e.target.value);
                                    setChangeDate(true);
                                }} />
                            </label>
                        </form>
                    </div>
                    <div className={styles.table}>
                        {loading ? (
                            <div className={styles.loading}>
                                <h1>Carregando Dados...</h1>
                            </div>
                        ) : (
                            dataFiltered && dataFiltered.length > 0 && <div className={styles.container}>
                                <AppointmentTable appointments={dataFiltered} />
                            </div>
                        )}
                    </div>
                </>
            }
            {!isAdmin &&
                <h1>404 - Page Not Found</h1>
            }
        </div>

    )
}