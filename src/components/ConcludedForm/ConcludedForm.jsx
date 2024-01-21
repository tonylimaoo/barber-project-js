import './concluded-form.css'
import { Link } from 'react-router-dom'

export default function Concluido({ transactionId, hour, date }) {

    date = date.split('-')


    return (
        <>
            <div className="concluded-container" id='appointmentConfirmation'>
                <section className="sectionId">
                    <h3>
                        Agendamento realizado!
                    </h3>
                    <section className='info_sect'>
                        <p> <span>Foi agendado na data:</span><span className="black">{date[2]}/{date[1]}/{date[0]}</span></p>
                        <p> <span>Horário:</span><span className="black">{hour[0]}</span></p>
                        <p className='show-id'> <span>Seu ID do atendimento é:</span><span className="black">{transactionId}</span></p>
                    </section>
                    <div className='div_link'>
                        <Link to={'/cancel-appointment/' + transactionId} >Link de cancelamento</Link>
                    </div>
                </section>

            </div>
        </>
    )
}