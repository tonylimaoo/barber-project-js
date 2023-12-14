import { useEffect, useState } from 'react';
import './schedule-form.css'
import { useDays } from '../../hooks/useDays';

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
    setProfessional,
    appointmentHours,
    hours,
    setFormErrorMessage,
    setFormError,
    user,
    index,
    setIndex,
    dayOffs,
    noDayOffBarber,
    setNoDayOffBarber,
    barbers
}) {
    const [exclusiveHours, setExclusiveHours] = useState([]);

    useEffect(() => {
        setExclusiveHours(hours.filter(ele => !appointmentHours.includes(ele)));
    }, [appointmentHours, hours])

    const { formatDate, dayPlusSeven } = useDays();

    const handleDateChange = (e) => {
        const realDate = e.target.value;
        const date = realDate.split("-");
        const dateObject = {
            day: Number(date[2]),
            month: Number(date[1]),
            year: Number(date[0])
        };

        const checkSunday = new Date(dateObject.year, dateObject.month - 1, dateObject.day);

        if (checkSunday.getDay() === 0) {
            setFormError(true);
            setFormErrorMessage("Não atendemos aos domingos. Escolha outra data.")
        } else {
            setDate(realDate);
        }

        const dayOffBarberObj = dayOffs.filter(e => e.date === realDate) || undefined

        if (dayOffBarberObj.length > 0) {
            const barber = dayOffBarberObj[0].professional
            
            const working = barbers.filter((e) => !barber.includes(e))

            setNoDayOffBarber(working)

            setFormError(true);
            setFormErrorMessage(`O Barbeiro ${barber} estará de folga no dia ${new Date(realDate + 'T00:00:00').toLocaleDateString()}`)
        } else {
            setNoDayOffBarber(barbers)
        }

    }

    const handleHourChange = (e) => {
        if (service === "Cabelo e Barba") {

            const hoursIndex = hours.indexOf(e.target.value) + 1;

            if (appointmentHours.includes(hours[hoursIndex])) {
                setHour([0])
                setFormError(true);
                setFormErrorMessage("Horário seguinte indisponível. Este serviço consome 1h 40min.");
                return;
            } else {
                setHour(() => [
                    e.target.value,
                    hours[hoursIndex]
                ]);
                setIndex(hoursIndex);
            }

        } else if (service === "Prótese + Corte") {

            const hoursIndex = [hours.indexOf(e.target.value) + 1, hours.indexOf(e.target.value) + 2]


            if (appointmentHours.includes(hours[hoursIndex[0]]) || appointmentHours.includes(hours[hoursIndex[1]])) {
                setHour([0])
                setFormError(true);
                setFormErrorMessage("Horário seguinte indisponível. Este serviço consome 2h 30min.");
                return;
            } else {
                setHour(() => [
                    e.target.value,
                    hours[hoursIndex[0]],
                    hours[hoursIndex[1]]
                ]);
                setIndex(hoursIndex[0]);
            }

        } else if (service === "Manutenção da Prótese") {

            const hoursIndex = hours.indexOf(e.target.value) + 1;

            if (appointmentHours.includes(hours[hoursIndex])) {
                setHour([0])
                setFormError(true);
                setFormErrorMessage("Horário seguinte indisponível. Este serviço consome 1h 40min.");
                return;
            } else {
                setHour(() => [
                    e.target.value,
                    hours[hoursIndex]
                ]);
                setIndex(hoursIndex[0]);
            };

        } else {
            const hoursIndex = hours.indexOf(e.target.value) + 1;

            setHour(() => [e.target.value]);
            setIndex(hoursIndex);
        }

    }

    const handleCelChange = (e) => {

        const target = e.target.value.replace(/\(|\)|-| /g, '');

        if (target.match(/[a-zA-Z]/)) {
            return;
        }
        if (target.length < 12) {
            setCel(e.target.value);
        } else {
            return;
        }

        let celArray = target.split('');

        if (e.target.value.length === 11) {
            celArray.splice(0, 0, '(')
            celArray.splice(3, 0, ')')
            celArray.splice(4, 0, ' ')
            celArray.splice(10, 0, '-')
            let cel = celArray.join('')
            setCel(cel)
        }
    }

    const todaysDate = formatDate(0);
    const todaysDatePlusSeven = dayPlusSeven(7);

    return (
        <>
            <section className="schedule-form-section">

                <h1 className="form-title">Marque seu horário</h1>

                <form className="appointment-form"
                    onSubmit={handleSubmit}
                >
                    <label>
                        <span>Nome Completo</span>
                        {user ? (
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
                        {user ? (
                            <input
                                type="text"
                                name='celular'
                                placeholder='(19) 99323-2332'
                                onChange={(e) => setCel(e.target.value)}
                                // onChange={(e) => handleCelChange(e)}
                                value={cel}
                                required
                                disabled
                            />
                        ) : (
                            <input
                                type="text"
                                name='celular'
                                placeholder='(19) 99323-2332'
                                // onChange={(e) => setCel(e.target.value)}
                                onChange={(e) => handleCelChange(e)}
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
                                    {noDayOffBarber.map((e, i) => (
                                        <option key={i} value={e}>{e}</option>
                                    ))}
                                    
                                    {/* <option value="Donizete">Donizete</option> */}
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
                                onChange={(e) => handleHourChange(e)}
                                value={hour[0]}
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