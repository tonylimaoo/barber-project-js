import { useEffect, useState } from 'react';
import styles from './Styles/schedule-form.module.css'

const hours = ["8:00", "8:50", "9:40", "10:30", "11:20", "12:10", "13:00", "13:50", "14:40", "15:30", "16:20", "17:10", "18:00", "18:50", "19:40", "20:30"]

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
    userId,
    setService,
    setProfessional,
    appointmentHours,
    filledForm
}) {
    const [exclusiveHours, setExclusiveHours] = useState([]);

    useEffect(() => {
        setExclusiveHours(hours.filter(ele => !appointmentHours.includes(ele)));
    }, [appointmentHours])

    const getDate = new Date();

    const formatDate = () => {
        let day = `${getDate.getDate()}`
        let month = `${getDate.getMonth() + 1}`
        let year = `${getDate.getFullYear()}`

        if (day.length === 1) {
            day = 0 + day
        }

        if (month.length === 1) {
            month = 0 + month
        }

        const fullDate = `${year}-${month}-${day}`

        return fullDate
    };

    const dayPlusSeven = () => {
        let day = Number(getDate.getDate()) + 7
        let month = `${getDate.getMonth() + 1}`
        let year = `${getDate.getFullYear()}`

        if (day.length === 1) {
            day = 0 + day
        }

        if (month.length === 1) {
            month = 0 + month
        }

        const fullDate = `${year}-${month}-${day}`

        return fullDate
    }

    const todaysDate = formatDate();
    const todaysDatePlusSeven = dayPlusSeven();

    return (
        <>
            <section className={styles['form-section']}>
                <div className={styles['form-title']}>Marque seu horário</div>

                {filledForm === 'filled' &&
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
                                disabled
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
                                disabled
                            />
                        </label>
                        <label>
                            <span>Data</span>
                            <input
                                type="date"
                                name='date'
                                min={todaysDate}
                                max={todaysDatePlusSeven}
                                onChange={(e) => setDate(e.target.value)}
                                value={date}
                                required
                            />
                        </label>
                        {/* <label>
                            <span>Data</span>
                            <input
                                type="date"
                                name='date'
                                min={todaysDate}
                                max={todaysDatePlusSeven}
                                onChange={(e) => setDate(e.target.value)}
                                value={date}
                                required
                            />
                        </label> */}
                        <label>
                            <span>Horário</span>
                            <select
                                onChange={(e) => setHour(e.target.value)}
                                value={hour}
                                required
                            >
                                <option value="" defaultValue=''>Selecione</option>
                                {exclusiveHours.map((hour, i) => (
                                    <option key={i} value={hour}>{hour}</option>
                                ))}
                            </select>
                        </label>
                        <div className={styles.service}>
                            <label>
                                <span>Serviço</span>
                                <select
                                    onChange={(e) => setService(e.target.value)}
                                    value={service}
                                    required
                                >
                                    <option value="" defaultChecked>Selecione</option>
                                    <option value="1">Cabelo</option>
                                    <option value="2">Barba</option>
                                    <option value="3">Cabelo e Barba</option>
                                    <option value="4">Prótese + Corte</option>
                                    <option value="5">Manutenção da Prótese</option>
                                </select>
                            </label>
                            <label>
                                <span>Barbeiro</span>
                                <select
                                    onChange={(e) => setProfessional(e.target.value)}
                                    value={professional}
                                    required
                                >
                                    <option value="" defaultChecked>Selecione</option>
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

                    </form>}
                {filledForm === 'unfilled' &&
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
                                min={todaysDate}
                                max={todaysDatePlusSeven}
                                onChange={(e) => setDate(e.target.value)}
                                value={date}
                                required
                            />
                        </label>
                        <label>
                            <span>Horário</span>
                            <select
                                onChange={(e) => setHour(e.target.value)}
                                value={hour}
                                required
                            >
                                <option value="" defaultChecked>Selecione</option>
                                {exclusiveHours.map((hour, i) => (
                                    <option key={i} value={hour}>{hour}</option>
                                ))}
                            </select>
                        </label>
                        <div className={styles.service}>
                            <label>
                                <span>Serviço</span>
                                <select
                                    onChange={(e) => setService(e.target.value)}
                                    value={service}
                                    required
                                >
                                    <option value="" defaultChecked>Selecione</option>
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
                                    <option value="" defaultChecked>Selecione</option>
                                    <option value={Number(1)}>Carlos</option>
                                    <option value={Number(2)}>Donizete</option>
                                </select>
                            </label>
                        </div>
                        {loading ? (
                            <button disabled type='submit'>AGUARDE</button>
                        ) : (
                            <button type='submit'>AGENDAR</button>
                        )}

                    </form>}
            </section>
        </>
    )
}