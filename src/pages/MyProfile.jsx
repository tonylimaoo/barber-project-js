import { useState, useContext } from 'react'
import { useEffect } from 'react'
import styles from './MyProfile.module.css'
import { SignedInContext } from '../context/SignedInContext'
import { useNavigate } from 'react-router-dom'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../firebase/config'

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
    const userId = localStorage.getItem("userId");

    const getFirestoreUserData = async () => {
      setLoading(true);
      const q = query(collection(db, "users"), where("id", "==", userId));
  
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setBirthday(doc.data().birthday);
        setName(doc.data().name);
        setEmail(doc.data().email);
        setCellphone(doc.data().cellphone);
      });

      setLoading(false);
    }
 
    getFirestoreUserData();

    const getFirestoreAppointmentData = async () => {

      setLoading2(true);

      const data = [];
      const q = query(collection(db, "transactions"), where("uid", "==", userId));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
          data.push(doc.data())
      });

      setAppointments(data);

      setLoading2(false);
    } 

    getFirestoreAppointmentData();

  }, [])

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
              <h1>Últimos agendamentos</h1>
              <ul>
                {appointments.slice(-3).map((app, i) => (
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