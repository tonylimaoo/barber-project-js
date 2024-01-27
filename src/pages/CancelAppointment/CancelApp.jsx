import React, { useEffect } from 'react'
import styles from './CancelApp.module.scss'
import { useFetchAppointments } from '../../hooks/useFetchAppointments';
import { useParams } from 'react-router-dom';
import { useDeleteDocument } from '../../hooks/useDeleteDocument';
import { useAuthValue } from '../../context/AuthContext';

const CancelApp = () => {

  const { id } = useParams();
  const { documents, loading, error } = useFetchAppointments('transactions', false, id)
  const { deleteData } = useDeleteDocument();
  const { user } = useAuthValue();

  useEffect(() => {
    console.log(documents)
    console.log(error)
  }, [documents, error])

  const dateNow = new Date();

  const handleCancelAppointment = async (e, tid) => {

    try {
      deleteData('transactions', tid)
      console.log('deletou')

    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className={styles['cancel_container']}>
      {!loading && documents &&
        (documents.map(d => (
          <>
            <div className={styles["appt-card"]} key={d.id}>
              <h2>Agendamento:</h2>
              <h3 className={styles["transaction-id"]}>ID: {d.tid}</h3>
              <h3 className={styles.hour}><span>{d.hour[0]}</span><span>{d.service}</span><span>{d.professional}</span></h3>
              <ul className={styles["details-list"]}>
                <li>Nome do cliente: {d.name}</li>
                <li>Celular: {d.cel}</li>
                <li>Serviço: {d.service}</li>
                <li>Data: {d.date}</li>
                <li>Horário: {d.hour[0]}</li>
                {dateNow <=
                  Date.parse(`${d.date}T${d.hour[0]}:00`) - 18000000
                  &&
                  <button
                    className='cancel-app-btn'
                    onClick={(e) => handleCancelAppointment(e, d.id)}
                  >
                    Cancelar agendamento
                  </button>
                }
              </ul>
            </div>
            {!user &&
              <div className={styles.notice}>
                <h3>Salve este link para cancelar o agendamento.</h3>
                <p>Você pode cancelar em até 5 horas antes do horário marcado,</p>
                <p>caso precise depois deste tempo, entre em contato pelo WhatsApp!</p>
              </div>}
            {user &&
              <div className={styles.notice}>
                <h3>Salve este link para cancelar o agendamento ou cancele em seu perfil.</h3>
                <p>Você pode cancelar em até 5 horas antes do horário marcado,</p>
                <p>caso precise depois deste tempo, entre em contato pelo WhatsApp!</p>
              </div>}
          </>
        )))
      }
      {!loading && documents && documents.length === 0 &&
        <div>
          <h1>Agendamento não encontrado</h1>
        </div>
      }
      {loading &&
        <div>
          <h1>Loading</h1>
        </div>
      }
      {error &&
        <h1>{error.message}</h1>
      }
    </div>
  )
}

export default CancelApp