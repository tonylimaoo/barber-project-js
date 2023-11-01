import React, { useState } from 'react'
import { useEffect, useContext } from 'react'
import styles from './MyProfile.module.css'

const urls = [
  'http://localhost:3000/users/'
]

const MyProfile = () => {

  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");
  const [cellphone, setCellphone] = useState("")
  
  useEffect(() => {
    const userId = localStorage.getItem("userId")

    const fetchData = async () => {
      setLoading(true)
      const res = await fetch(urls[0] + userId);
      const data = await res.json();

      setData(data);
      setBirthday(data.birthday);
      setName(data.name);
      setEmail(data.email);
      setCellphone(data.cellphone);

      setLoading(false);
    }
    fetchData();
  }, [])
  


  return (
    <div>
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
    </div>
  )
}

export default MyProfile