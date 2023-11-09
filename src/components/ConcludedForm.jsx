import './Styles/concluded-form.css'

export default function Concluido({ transactionId, hour, date }) {

    // Component that shows the Schedule Confirmation
    
    date = date.split('-')

    return (
        <>
            <div className="concluded-container">
                <section className="sectionId">
                    <h3>
                        Agendamento realizado!
                    </h3>
                    <p> <span>Foi agendado na data:</span><span className="black">{date[2]}/{date[1]}/{date[0]}</span></p>
                    <p> <span>Horário:</span><span className="black">{hour}</span></p>
                    <p className='show-id'> <span>Seu ID do atendimento é:</span><span className="black">{transactionId}</span></p>
                </section>
            </div>
        </>
    )
}