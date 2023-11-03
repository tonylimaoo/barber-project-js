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
                    <p><span className={styles.black}>Foi agendado na data:</span> {date[2]}/{date[1]}/{date[0]}</p>
                    <p><span className={styles.black}>Horário:</span> {hour}</p>
                    <p><span className={styles.black}>Seu ID do atendimento é:</span> {transactionId}</p>
                </section>
            </div>
        </>
    )
}