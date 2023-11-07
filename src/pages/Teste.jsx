import React, { useEffect } from 'react'
import { addDataFirestore } from '../firebase/post';
import { getDocsFirestore } from '../firebase/get';

const Teste = () => {
    useEffect(() => {
        const addData = async () => {
            addDataFirestore({name: "Tony", idade: 25}, "users");
        }
        addData();
    }, [])

    useEffect(() => {
        const getData = async () => {
            getDocsFirestore("users");
        }
        getData();
    }, [])


    return (
        <div>
            <h1>Teste Firestore</h1>
        </div>
    )
}

export default Teste