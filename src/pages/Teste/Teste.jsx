import React, { useEffect } from 'react'
import { useInsertDocument } from '../../hooks/useInsertDocument'
import { doc, deleteDoc, where, setDoc } from "firebase/firestore";
import { db } from '../../firebase/config';



const Teste = () => {

    const handleDelete = async (e) =>{
        e.preventDefault()
        await setDoc(doc(db, "cities"), {
            name: "Los Angeles",
            state: "CA",
            country: "USA"
          });
        await deleteDoc(doc(db, 't', 'id'), where('id', '==', '1'));
    };


    return (
        <div>
            <h1>Teste de Delete</h1>
            <button onClick={(e) => handleDelete(e)}>Delete</button>
        </div>
    )
}

export default Teste