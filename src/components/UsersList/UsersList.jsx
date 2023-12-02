import "./users-list.css"
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { Link } from 'react-router-dom';

const UsersList = () => {

  const { documents, loading, error } = useFetchDocuments("users");

  const handleMoreInfo = (ele) => {

    const eleClassList = ele.target.closest("div.user-card").querySelector('.details-list').classList

    if (eleClassList.value.match('active')) {
      eleClassList.remove('active');
      ele.target.innerHTML = "+";
    } else {
      eleClassList.add('active');
      ele.target.innerHTML = "-";
    }

  }

  if(documents !== null){
    console.log(documents.map(e => {
      return e.createdAt
    }))
  }

  return (
    <div className='users_list_container'>
      <h1>Usuários Cadastrados</h1>
      {error && 
        <p>{error}</p>
      }
      {!loading && documents &&
        (
          documents.map((user) => (
            <div key={user.tid} className="user-card">
              <h2>Usuário:</h2>
              <h3 className="transaction-id">ID: {user.id}</h3>
              <h3 className="hour"><span>{user.name}</span><Link to={`https://api.whatsapp.com/send?phone=${user.cellphone.replace(/\(|\)|-| /g,'')}`}>{user.cellphone}</Link></h3>
              <div className="more-info" onClick={(e) => { handleMoreInfo(e) }}> + </div>
              <ul className="details-list">
                <li>Nome do cliente: {user.name}</li>
                <li>Celular: {user.cellphone}</li>
                <li>Criado: {user.createdAt[0]}</li>
              </ul>

            </div>
          ))
        )
      }
    </div>
  )
}

export default UsersList