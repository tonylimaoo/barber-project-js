import { useState, useEffect } from 'react'
import AlertMessage from '../AlertMessage/AlertMessage'
import styles from './Lunch.module.scss'
import { useInsertDocument } from '../../hooks/useInsertDocument'
import { useFetchEnabledHours } from '../../hooks/useFetchEnabledHours'
import { useExclusiveHours } from '../../hooks/useExclusiveHours'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { useDeleteDocument } from '../../hooks/useDeleteDocument'
import { useHours } from '../../hooks/useHours'
import { useFetchDayOff } from '../../hooks/useFetchDayOff'
// import { useDays } from '../../hooks/useDays'

// const hours = ["07:10", "08:00", "08:50", "09:40", "10:30", "11:20", "12:10", "13:00", "13:50", "14:40", "15:30", "16:20", "17:10", "18:00", "18:50", "19:40", "20:30"]
const uuid = require('uuid');

const Lunch = () => {

  const [lunchDate, setLunchDate] = useState(new Date().toJSON().split('T')[0]);
  const [professional, setProfessional] = useState("");
  const [date, setDate] = useState("");
  const [enabled, setEnabled] = useState(false);
  const [hour, setHour] = useState('');
  const [formError, setFormError] = useState("");
  const [formErrorMessage] = useState("");
  const [appointmentHours, setAppointmentHours] = useState("");
  // const { dayPlusSeven } = useDays();
  const { documents } = useFetchDayOff('transactions', lunchDate)
  const { setDocument } = useInsertDocument('transactions');
  const { documents: enabledHours } = useFetchEnabledHours("transactions", professional, date);
  const { hours } = useHours(date);
  const { exclusiveHours } = useExclusiveHours(appointmentHours, hours, date);
  const { deleteData } = useDeleteDocument();
  const dateNow = new Date();

  useEffect(() => {
    if (date && professional && enabledHours) {
      const handleEnabledHours = async () => {
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
          hoursFormatted.push("12:50", "18:40")
        } else {
          hoursFormatted.push("12:20", "20:00")
        }

        setAppointmentHours(hoursFormatted);

      }
      handleEnabledHours();
    }
  }, [date, professional, enabledHours]);

  const handleProfessionalChange = (e) => {
    setEnabled(true);
    setProfessional(e.target.value);
  }

  const handleSetLunch = (e) => {
    e.preventDefault();

    const tid = uuid.v4();

    const lunchObject = {
      date: date,
      professional: professional,
      professional_id: professional === 'Carlos' ? 1 : 2,
      hour: hour,
      updatedAt: new Date(),
      tid,
      lunch: true
    }

    setDocument(lunchObject, tid);

    setProfessional('')
    setDate('')
  }

  const handleCancelAppointment = async (e, tid) => {

    try {
      deleteData('transactions', tid)
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
        <h3>Agendar Almoço</h3>
        <div className={styles['white-bg']}>

          <form onSubmit={(e) => handleSetLunch(e)}>
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
                    min={new Date().toJSON().split('T')[0]}
                    required
                  />
                )
                }
              </label>
              <label>
                <p>Escolha o horário:</p>
                {date === "" ? (
                  <select
                    disabled
                  >
                    <option value="" defaultValue=''>Selecione</option>
                  </select>
                ) : (
                  <select
                    onChange={e => setHour(e.target.value)}
                    value={hour}
                    required
                  >
                    <option value="" defaultValue=''>Selecione</option>
                    {exclusiveHours.map((hour, i) => (
                      <option key={i} value={hour}>{hour}</option>
                    ))}
                  </select>
                )}
              </label>
              <input
                className={styles['inp-sub']}
                type="submit"
                value='Enviar'
              />
            </div>
          </form>
        </div>
        <h3>Últimas horários agendados</h3>
        <div className={`${styles["white-bg"]} ${styles["set-margin"]}`}>
          <form>
            <input
              className={styles.day_off_date_input}
              type="date"
              value={lunchDate}
              onChange={(e) => setLunchDate(e.target.value)}
            />
          </form>
          {documents && documents.map((d) => (
            d.lunch &&
            //new Date(`${d.date}T00:00:00`) >= dateNow &&
            <h3 key={d.id}>{d.professional} <span className="font-normal">- {new Date(`${d.date}T00:00:00`).toLocaleDateString()} - {d.hour} <button className={styles.inp_sub_cancel} onClick={(evt) => handleCancelAppointment(evt, d.tid)}>Cancelar</button></span></h3>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Lunch