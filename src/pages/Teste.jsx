import React from 'react'
import { useContext } from 'react'
import { SignedInContext } from '../context/SignedInContext'

const Teste = () => {

    const { authUser } = useContext(SignedInContext);

    console.log(authUser)
    return (
        <div>
            <h1>Teste</h1>
            {authUser &&
                (<h2>User {authUser.email}</h2>)
            }

        </div>
    )
}

export default Teste