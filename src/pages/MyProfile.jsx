import React, { useState } from 'react'
import { useEffect } from 'react'
import styles from './MyProfile.module.css'

const urls = [
  'http://localhost:3000/users/',
  'http://localhost:3000/appointments?uid='
]

const MyProfile = () => {

  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");
  const [cellphone, setCellphone] = useState("")
  const [appointments, setAppointments] = useState([]);

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

  return (
    <div className={styles.container}>
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
      <section className={styles.list}>
        <h1>Appointments</h1>
        <ul>
          {!loading2 && appointments !== [] && appointments.map((app, i) => (
            <div key={app.id}>
              <h3>Agendamento {i + 1}: {app.id}</h3>
              <li>Data: {app.date.split('-')[2]}/{app.date.split('-')[1]}/{app.date.split('-')[0]}</li>
              <li>Horário: {app.hour}</li>
              <li>Barbeiro: {app.professional}</li>
              <li>Serviço: {app.service}</li>
          {appointments !== [] && appointments.map((app, i) => (
            <div>
              <h3>Agendamento {i + 1}: {app.id}</h3>
              <li key={app.id} >Data: {app.date.split('-')[2]}/{app.date.split('-')[1]}/{app.date.split('-')[0]}</li>
              <li key={app.id} >Horário: {app.hour}</li>
              <li key={app.id} >Profissinal: {app.professional}</li>
              <li key={app.id} >Serviço: {app.service}</li>
            </div>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default MyProfile