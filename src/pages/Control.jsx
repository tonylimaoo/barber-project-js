import AppointmentTable from "../components/AppointmentTable"
import styles from "./Control.module.css"
import { useFetch } from "../hooks/useFetch"

const url = 'http://localhost:3000/appointments';

export default function Controle() {
    const { data, loading } = useFetch(url);

    return (
        <div>
            {loading ? (
                <div className={styles.loading}>
                    <h1>Carregando Dados...</h1>
                </div>
            ) : (
                data && data.length > 0 && <div className={styles.container}>
                    <AppointmentTable appointments={data} />
                </div>
            )}
        </div>

    )
}