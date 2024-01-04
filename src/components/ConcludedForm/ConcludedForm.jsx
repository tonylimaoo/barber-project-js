import './concluded-form.css'

export default function Concluido({ transactionId, hour, date }) {

    date = date.split('-')

    return (
        <>
            <div className="concluded-container" id='appointmentConfirmation'>
                <section className="sectionId">
                    <h3>
                        Agendamento realizado!
                    </h3>
                    <p> <span>Foi agendado na data:</span><span className="black">{date[2]}/{date[1]}/{date[0]}</span></p>
                    <p> <span>Horário:</span><span className="black">{hour[0]}</span></p>
                    <p className='show-id'> <span>Seu ID do atendimento é:</span><span className="black">{transactionId}</span></p>
                </section>

            </div>
            <button onClick={() => console.log("banana")}>Tire um Print!</button>
        </>
    )
}