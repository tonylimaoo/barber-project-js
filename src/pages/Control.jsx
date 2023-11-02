import AppointmentTable from "../components/AppointmentTable"
import styles from "./Control.module.css"
import { useFetch } from "../hooks/useFetch"
import { useState } from "react";

const url = 'http://localhost:3000/appointments';

export default function Controle() {
    const { data, loading } = useFetch(url);
    const [dataFiltered, setDataFiltered] = useState(false);
    const [changeDate, setChangeDate] = useState(true);

    const getDate = new Date();

    // console.log(getDate.getDate(), getDate.getMonth(), getDate.getFullYear())

    const formatDate = () => {
        let day = `${getDate.getDate()}`
        let month = `${getDate.getMonth() + 1}`
        let year = `${getDate.getFullYear()}`

        if(day.length === 1){
            day = 0 + day
        }

        if(month.length === 1){
            month = 0 + month
        }

        const fullDate = `${year}-${month}-${day}`

        return fullDate
    };

    const todaysDate = formatDate();
    
    const [date, setDate] = useState(todaysDate);


    if (data !== null && changeDate === true){
        setDataFiltered(data.filter(ele => {
            return ele.date === date
        }))
        setChangeDate(false);
    }

    return (
        <div className={styles.containerPage}>

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

        </div>

    )
}