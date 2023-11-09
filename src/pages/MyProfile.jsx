import { useState, useContext } from 'react'
import { useEffect } from 'react'
import './MyProfile.css'
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

  console.log(appointments)

  return (
    <div className="container-profile">
      {authUser &&
        <>
          <section className="my-profile-section">
            <h1>Meu Perfil</h1>
            {!loading &&
              <form className="form-info">
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
            <section className="appointment-list">
              <h1>Últimos agendamentos</h1>
                {appointments.slice(0, 3).map((app, i) => (
                  <div className='appointment-card' key={app.id}>
                    <h3>Agendamento {i + 1}: </h3>
                    <h5>{app.id}</h5>
                    <p>Data: {app.date.split('-')[2]}/{app.date.split('-')[1]}/{app.date.split('-')[0]}</p>
                    <p>Horário: {app.hour}</p>
                    <p>Barbeiro: {app.professional}</p>
                    <p>Serviço: {app.service}</p>
                  </div>
                ))}
            </section>
          }
        </>
      }
      {!authUser &&
        <div className="notLoggedIn">
          <h1>Entre na sua conta para visualizar seu perfil</h1>
          <button className="signBtn" onClick={() => navigate('/login')} >LOGIN</button>
        </div>
      }

    </div>
  )
}

export default MyProfile