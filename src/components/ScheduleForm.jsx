import { useEffect, useState } from 'react';
import './Styles/schedule-form.css'

const hours = ["7:10", "8:00", "8:50", "9:40", "10:30", "11:20", "12:10", "13:00", "13:50", "14:40", "15:30", "16:20", "17:10", "18:00", "18:50", "19:40", "20:30"]

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
        let day = `${Number(getDate.getDate()) + 7}`;
        let month = `${getDate.getMonth() + 1}`;
        let year = `${getDate.getFullYear()}`;

        if (day.length === 1) {
            day = 0 + day;
        };

        if (month.length === 1) {
            month = 0 + month;
        };

        const fullDate = `${year}-${month}-${day}`;

        return fullDate;
    }

    const handleDateChange = (e) => {
        const realDate = e.target.value;
        const date = e.target.value.split("-");
        const dateObject = {
            day: Number(date[2]),
            month: Number(date[1]),
            year: Number(date[0])
        };

        const checkSunday = new Date(dateObject.year, dateObject.month - 1, dateObject.day);

        if (checkSunday.getDay() === 0) {
            window.alert("Não atendemos aos domingos.\nEscolha outra data.");
        } else {
            setDate(realDate);
        }

    }

    // JSON.stringify(array.map(e => e.horarios.join())).replace(/"|'|]|\[/g, '').split(',')
    // Código para splitar e coletar mais de uma hora
    // Ideia são os horarios serem coletados num array

    const todaysDate = formatDate();
    const todaysDatePlusSeven = dayPlusSeven();

    return (
        <>
            <section className="form-section">
                
                <h1 className="form-title">Marque seu horário</h1>

                <form className="appointment-form"
                    onSubmit={handleSubmit}
                >
                    <label>
                        <span>Nome Completo</span>
                        {filledForm === 'filled' ? (
                            <input
                                type="text"
                                name='nome'
                                onChange={(e) => setName(e.target.value)}
                                placeholder='Digite seu nome completo'
                                value={name}
                                required
                                disabled
                            />
                        ) : (
                            <input
                                type="text"
                                name='nome'
                                onChange={(e) => setName(e.target.value)}
                                placeholder='Digite seu nome completo'
                                value={name}
                                required
                            />
                        )}

                    </label>
                    <label>
                        <span>Celular</span>
                        {filledForm === 'filled' ? (
                            <input
                                type="number"
                                name='celular'
                                placeholder='(19) 99323-2332'
                                onChange={(e) => setCel(e.target.value)}
                                value={cel}
                                required
                                disabled
                            />
                        ) : (
                            <input
                                type="number"
                                name='celular'
                                placeholder='(19) 99323-2332'
                                onChange={(e) => setCel(e.target.value)}
                                value={cel}
                                required
                            />
                        )}
                    </label>
                    <label>
                        <span>Data</span>
                        <input
                            type="date"
                            name='date'
                            min={todaysDate}
                            max={todaysDatePlusSeven}
                            onChange={(e) => handleDateChange(e)}
                            // onChange={(e) => setDate(e.target.value)}
                            value={date}
                            required
                        />
                    </label>
                    <div className="service">
                        <label>
                            <span>Serviço</span>
                            {date === "" ? (
                                <select>
                                    <option value="" defaultChecked>Selecione</option>
                                </select>
                            ) : (
                                <select
                                    onChange={(e) => setService(e.target.value)}
                                    value={service}
                                    required
                                >
                                    <option value="" defaultChecked>Selecione</option>
                                    <option value="Cabelo">Cabelo</option>
                                    <option value="Barba">Barba</option>
                                    <option value="Cabelo e Barba">Cabelo e Barba</option>
                                    <option value="Prótese + Corte">Prótese + Corte</option>
                                    <option value="Manutenção da Prótese">Manutenção da Prótese</option>
                                </select>
                            )}

                        </label>
                        <label>
                            <span>Barbeiro</span>
                            {date === '' ? (
                                <select>
                                    <option value="" defaultChecked>Selecione</option>
                                </select>
                            ) : (
                                <select
                                    onChange={(e) => setProfessional(e.target.value)}
                                    value={professional}
                                    required
                                >
                                    <option value="" defaultChecked>Selecione</option>
                                    <option value="Carlos">Carlos</option>
                                    <option value="Donizete">Donizete</option>
                                </select>
                            )}

                        </label>
                    </div>
                    <label>
                        <span>Horário</span>
                        {professional === "" ? (
                            <select>
                                <option value="" defaultValue=''>Selecione</option>
                            </select>
                        ) : (
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
                        )}

                    </label>
                    {loading ? (
                        <button disabled type='submit'>Aguarde</button>
                    ) : (
                        <button type='submit'>AGENDAR</button>
                    )}
                </form>
            </section >
        </>
    )
}