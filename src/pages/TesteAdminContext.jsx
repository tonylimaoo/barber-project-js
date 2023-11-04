import { useContext } from 'react'
import { AdminContext } from '../context/ AdminContext'

const TesteAdminContext = () => {

    const { isAdmin } = useContext(AdminContext);

    console.log(isAdmin);

    return (
        <div>
            <h1>TesteAdminContext</h1>
        </div>
    )
}

export default TesteAdminContext