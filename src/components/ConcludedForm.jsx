import styles from './Styles/concluded-form.module.css'

export default function Concluido({ transactionId, hour, date }) {

    date = date.split('-')
    return (
        <>
            <div className={styles.container}>
                <section className={styles.sectionId}>
                    <p>
                        Agendamento realizado!
                    </p>
                    <p>Foi agendado na data: {date[2]}/{date[1]}/{date[0]}</p>
                    <p>Horário: {hour}</p>
                    <p>Seu ID do atendimento é <tr />{transactionId}</p>
                </section>
            </div>
        </>
    )
}