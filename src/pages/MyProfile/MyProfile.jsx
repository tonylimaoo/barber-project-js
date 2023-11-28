import { useState } from 'react'
import { useEffect } from 'react'
import './MyProfile.css'
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from '../../firebase/config'
import { useAuthValue } from '../../context/AuthContext';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';

const MyProfile = () => {

  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");
  const [cellphone, setCellphone] = useState("")
  const [appointments, setAppointments] = useState([]);
  const { user } = useAuthValue();
  const { documents, loading, error } = useFetchDocuments('users', user.uid);

  useEffect(() => {
    if (documents !== null) {
      documents.forEach(e => {
        setBirthday(e.birthday);
        setName(e.name);
        setEmail(e.email);
        setCellphone(e.cellphone);
      })
    }

  }, [documents])

  useEffect(() => {
    const userId = user ? user.uid : null;

    const getFirestoreAppointmentData = async () => {

      const data = [];
      const q = query(collection(db, "transactions"), where("userId", "==", userId), orderBy('createdAt', 'desc'));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        data.push(doc.data())
      });

      setAppointments(data);
    }

    getFirestoreAppointmentData();

  }, [user])

  useEffect(() => {

    const setUserIdStorage = () => {

      var uidlocalStorage = localStorage.getItem("userId");

      if (uidlocalStorage === user.uid) {

        return;

      } else {

        return localStorage.setItem("userId", user.uid);

      }

    }

    setUserIdStorage();
  }, [user])

  console.log(appointments)



  return (
    <div className="container-profile">
      <section className="my-profile-section">
        {error &&
          (
            <h1>Erro ao carregar dados do usuário</h1>
          )
        }
        {loading &&
          !error &&
          <h1>Loading</h1>
        }
        {!loading &&
          <>
            <h1>Meu Perfil</h1>
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
          </>
        }
      </section>
      {appointments.length > 0 &&
        <section className="appointment-list">
          <h1>Últimos agendamentos</h1>
          {appointments.slice(0, 3).map((app, i) => (
            <div className='appointment-card' key={app.id}>
              <h3>Agendamento {i + 1}: </h3>
              <h5>{app.id}</h5>
              <p>Data: {app.date.split('-')[2]}/{app.date.split('-')[1]}/{app.date.split('-')[0]}</p>
              <p>Horário: {app.hour[0]}</p>
              <p>Barbeiro: {app.professional}</p>
              <p>Serviço: {app.service}</p>
            </div>
          ))}
        </section>
      }
    </div>
  )
}

export default MyProfile