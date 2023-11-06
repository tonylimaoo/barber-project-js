import { useState, useContext } from 'react'
import { useEffect } from 'react'
import styles from './MyProfile.module.css'
import { SignedInContext } from '../context/SignedInContext'
import { useNavigate } from 'react-router-dom'

const urls = [
  'http://localhost:3000/users/',
  'http://localhost:3000/appointments?uid='
]

const MyProfile = () => {

  const { authUser } = useContext(SignedInContext);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");
  const [cellphone, setCellphone] = useState("")
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId")

    const fetchData = async () => {
      setLoading(true)
      const res = await fetch(urls[0] + userId);
      const json = await res.json();

      setBirthday(json.birthday);
      setName(json.name);
      setEmail(json.email);
      setCellphone(json.cellphone);

      setLoading(false);
    }

    const fetchAppointmentData = async () => {
      setLoading2(true)
      const res = await fetch(urls[1] + userId);
      const data = await res.json();

      setAppointments(data)
      setLoading2(false);
    }

    fetchData();
    fetchAppointmentData();

  }, [])

  console.log(appointments)

  return (
    <div className={styles.container}>
      {authUser &&
        <>
          <section className={styles.myProfileSection}>
            <h1>Meu Perfil</h1>
            {!loading &&
              <form className={styles.myProfileInfo}>
                <label>
                  Nome
                  <input type="text" value={name} disabled />
                </label>
                <label>
                  Celular
                  <input type="text" value={cellphone} disabled />
                </label>
                <label>
                  Data de Nascimento
                  <input type="text" value={birthday} disabled />
                </label>
                <label>
                  Email
                  <input type="text" value={email} disabled />
                </label>
              </form>
            }
          </section>
          {!loading2 && appointments !== [] &&
            <section className={styles.list}>
              <h1>Agendamentos</h1>
              <ul>
                {appointments.map((app, i) => (
                  <div key={app.id}>
                    <h3>Agendamento {i + 1}: {app.id}</h3>
                    <li>Data: {app.date.split('-')[2]}/{app.date.split('-')[1]}/{app.date.split('-')[0]}</li>
                    <li>Horário: {app.hour}</li>
                    <li>Barbeiro: {app.professional}</li>
                    <li>Serviço: {app.service}</li>
                  </div>
                ))}
              </ul>
            </section>
          }
        </>
      }
      {!authUser &&
        <div className={styles.notLoggedIn}>
          <h1>Entre na sua conta para visualizar seu perfil</h1>
          <button className={styles.signBtn} onClick={() => navigate('/login')} >LOGIN</button>
        </div>
      }

    </div>
  )
}

export default MyProfile