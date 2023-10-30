import styles from './Styles/schedule-form.module.css'

export default function ScheduleForm({
    name,
    cel,
    date,
    hour,
    service,
    professional,
    setName,
    setCel,
    setDate,
    setHour,
    handleSubmit,
    loading,
    setService,
    setProfessional
}) {

    return (
        <>
            <section className={styles['form-section']}>
                <div className={styles['form-title']}>Marque seu horário</div>
                <form
                    onSubmit={handleSubmit}
                    className={styles.form}
                >
                    <label>
                        <span>Nome Completo</span>
                        <input
                            type="text"
                            name='nome'
                            onChange={(e) => setName(e.target.value)}
                            placeholder='Digite seu nome completo'
                            value={name}
                            required
                        />
                    </label>
                    <label>
                        <span>Celular</span>
                        <input
                            type="number"
                            name='celular'
                            placeholder='(19)99323-2332'
                            onChange={(e) => setCel(e.target.value)}
                            value={cel}
                            required
                        />
                    </label>
                    <label>
                        <span>Data</span>
                        <input
                            type="date"
                            name='date'
                            onChange={(e) => setDate(e.target.value)}
                            value={date}
                            required
                        />
                    </label>
                    <label>
                        <span>Horario</span>
                        <input
                            type="time"
                            name='hour'
                            min="07:50"
                            max="20:00"
                            onChange={(e) => setHour(e.target.value)}
                            value={hour}
                            required
                        />
                    </label>
                    <div className={styles.service}>
                        <label>
                            <span>Serviço</span>
                            <select 
                                onChange={(e) => setService(e.target.value)}
                                value={service}
                                required
                            >
                                <option value="" selected>Selecione</option>
                                <option value="1">Cabelo</option>
                                <option value="2">Barba</option>
                                <option value="3">Cabelo e Barba</option>
                                <option value="4">Prótese + Corte</option>
                                <option value="5">Manutenção da Prótese</option>
                            </select>
                        </label>
                        <label>
                            <span>Profissional</span>
                            <select 
                                onChange={(e) => setProfessional(e.target.value)}
                                value={professional}
                                required
                            >
                                <option value="" selected>Selecione</option>
                                <option value={Number(1)}>Carlos</option>
                                <option value={Number(2)}>Donizete</option>
                            </select>
                        </label>
                    </div>
                    {loading ? (
                        <button disabled type='submit'>Aguarde</button>
                    ) : (
                        <button type='submit'>AGENDAR</button>
                    )}

                </form>
            </section>
        </>
    )
}