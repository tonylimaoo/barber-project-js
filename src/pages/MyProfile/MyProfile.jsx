import { useState } from 'react'
import { useEffect } from 'react'
import './MyProfile.css'
import { useAuthValue } from '../../context/AuthContext';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useDeleteDocument } from '../../hooks/useDeleteDocument';

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
  const { deleteData } = useDeleteDocument();

  const dateNow = new Date().getTime();
  
  const handleCancelAppointment = async (e, tid) => {

    try {
      deleteData('transactions', tid)
      console.log('deletou')

    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    if (documents !== null) {
      documents.forEach(e => {
        setBirthday(new Date(e.birthday + 'T00:00:00').toLocaleDateString());
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
      {transactionsList && transactionsList.length > 0 &&
        <section className="appointment-list">
          <h1>Últimos agendamentos</h1>
          {transactionsList.slice(0, 3).map((app, i) => (
            <div key={app.id} className='appointment-card'>
              <h3>Agendamento {i + 1}: </h3>
              <h5>{app.id}</h5>
              <p>Data: {new Date(app.date + 'T00:00:00').toLocaleDateString()}</p>
              <p>Horário: {app.hour[0]}</p>
              <p>Barbeiro: {app.professional}</p>
              <p>Serviço: {app.service}</p>
              <div className='cancel-button-container'>
                {dateNow <=
                  Date.parse(`${app.date}T${app.hour[0]}:00`) - 18000000
                  &&
                  <button
                    className='cancel-app-btn'
                    onClick={(e) => handleCancelAppointment(e, app.id)}
                  >
                    Cancelar agendamento
                  </button>
                }
              </div>
            </div>
          ))}
        </section>
      }
    </div>
  )
}

export default MyProfile