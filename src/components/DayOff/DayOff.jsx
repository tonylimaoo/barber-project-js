import React from 'react'
import styles from './DayOff.module.scss'
import { useState } from "react";
import { useDays } from "../../hooks/useDays";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useInsertDocument } from '../../hooks/useInsertDocument';
import { useDeleteDocument } from '../../hooks/useDeleteDocument';
import AlertMessage from "../AlertMessage/AlertMessage";

const DayOff = () => {
    const [professional, setProfessional] = useState("");
    const [date, setDate] = useState("");
    const [enabled, setEnabled] = useState(false);
    const [formError, setFormError] = useState("");
    const [formErrorMessage] = useState("");
    const { dayPlusSeven } = useDays();
    const { documents } = useFetchDocuments('day-off', null, false, true);
    const { setDocument } = useInsertDocument('day-off');
    const {deleteData} = useDeleteDocument();
    const dateNow = new Date();

    const handleProfessionalChange = (e) => {
        setEnabled(true);
        setProfessional(e.target.value);
    }

    const handleSetDayoff = (e) => {
        e.preventDefault();

        const dayOffObject = {
            date: date,
            professional: professional,
            professional_id: professional === 'Carlos' ? 1 : 2,
            updatedAt: new Date()
        }

        setDocument(dayOffObject, date);

        setProfessional('')
        setDate('')
    }

    const handleCancelAppointment = async (e, tid) => {

        try {
          deleteData('day-off', tid)
          console.log('deletou')
    
        } catch (error) {
          console.log(error.message)
        }
      }

    return (
        <div className={styles.dayoff_container}>
            {formError &&
                <AlertMessage
                    setFormError={setFormError}
                    formErrorMessage={formErrorMessage}
                />
            }
            <div className={styles['sched-dayoff']}>
                <h3>Agendar Folga</h3>
                <div className={styles['white-bg']}>

                    <form onSubmit={(e) => handleSetDayoff(e)}>
                        <div className={styles["input-container"]}>
                            <label>
                                <p>Barbeiro:</p>
                                <select
                                    required
                                    value={professional}
                                    onChange={(e) => handleProfessionalChange(e)}
                                >
                                    <option value="">Selecione</option>
                                    <option value="Carlos">Carlos</option>
                                    <option value="Donizete">Donizete</option>
                                </select>
                            </label>
                            <label>
                                <p>Escolha o dia:</p>
                                {!enabled ? (
                                    <input
                                        type="date"
                                        disabled
                                    />
                                ) : (
                                    <input
                                        type="date"
                                        value={date || ''}
                                        onChange={(e) => setDate(e.target.value)}
                                        // min={new Date().toJSON().split('T')[0]}
                                        min={dayPlusSeven(8)}
                                        required
                                    />
                                )
                                }
                            </label>
                            <input
                                className={styles['inp-sub']}
                                type="submit"
                                value='Enviar'
                            />
                        </div>
                    </form>
                </div>
                <h3>Últimas Folgas Agendadas</h3>
                <div className={`${styles["white-bg"]} ${styles["set-margin"]}`}>
                    {documents && documents.map((d) => (
                        new Date(d.date) >= dateNow &&
                        <h3 key={d.id}>{d.professional} <span className="font-normal">- {new Date(`${d.date}T00:00:00`).toLocaleDateString()}</span><button className={styles.inp_sub_cancel} onClick={(evt) => handleCancelAppointment(evt, d.date)}>Cancelar</button></h3>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default DayOff