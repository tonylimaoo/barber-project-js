import { useState } from 'react'
import { useEffect } from 'react'
import './MyProfile.css'
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
  const {
    documents: transactionsList,
    loading: loadingList,
    error: listError
  } = useFetchDocuments('transactions', user.uid, true);

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
    const setUserIdStorage = () => {
      var uidlocalStorage = localStorage.getItem("userId");

      if (uidlocalStorage === user.uid) return;
      else return localStorage.setItem("userId", user.uid);
    }

    setUserIdStorage();
  }, [user])

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
      {transactionsList &&
        <section className="appointment-list">
          <h1>Últimos agendamentos</h1>
          {transactionsList.slice(0, 3).map((app, i) => (
            <div key={app.id} className='appointment-card'>
              <h3 key={app.id} >Agendamento {i + 1}: </h3>
              <h5>{app.id}</h5>
              <p>Data: {app.date.split('-')[2]}/{app.date.split('-')[1]}/{app.date.split('-')[0]}</p>
              <p>Horário: {app.hour[0]}</p>
              <p>Barbeiro: {app.professional}</p>
              <p>Serviço: {app.service}</p>
              <div className='button-container'>
                <button className='cancel-app-btn'>Cancelar agendamento</button>
              </div>
            </div>
          ))}
        </section>
      }
    </div>
  )
}

export default MyProfile