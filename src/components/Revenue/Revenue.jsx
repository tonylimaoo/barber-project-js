import { useEffect, useState } from "react";
import { useDays } from "../../hooks/useDays";
import "./revenue.css"
import { useUpdateDocument } from "../../hooks/useUpdateDocument";

const Revenue = () => {

  const [professional, setProfessional] = useState('')
  const [date, setDate] = useState('')
  const { dayPlusSeven } = useDays();
  const { updateData } = useUpdateDocument()
  const weekDay = new Date().getDay();

  const handleSetDayoff = (e) => {
    e.preventDefault();

    
    updateData('day-off', 'day-off', {
      date: date,
      professional: professional,
      professional_id: professional === 'Carlos' ? 1 : 2,
      updatedAt: new Date()
    })
  }

  return (
    <div className='revenue_container'>
      <h1>Meu Negócio</h1>
      <div className="sched-dayoff">
        <h3>Agendar Folga</h3>
        {/* { weekDay >= 3 && weekDay <= 5 && */}
          <form onSubmit={(e) => handleSetDayoff(e)}>
            <div className="input-container">
              <label htmlFor="">
                <p>Barbeiro:</p>
                <select required value={professional} onChange={(e) => setProfessional(e.target.value)}>
                  <option value="">Selecione</option>
                  <option value="Carlos">Carlos</option>
                  <option value="Donizete">Donizete</option>
                </select>
              </label>
              <label>
                <p>Escolha o dia:</p>
                <input
                  type="date"
                  onChange={(e) => setDate(e.target.value)}
                  value={date}
                  // min={new Date().toJSON().split('T')[0]}
                  min={dayPlusSeven(10)}
                  max={dayPlusSeven(28)}
                  required
                />
              </label>
              <input
                className='inp-sub'
                type="submit"
                value='Enviar'
              />
            </div>
          </form>

        {/* } */}
        {/* { weekDay < 3 && 
          <p>Agendamento de folga somente disponível entre quarta e sexta-feira.</p>
        }
        { weekDay > 5 && 
          <p>Agendamento de folga somente disponível entre quarta e sexta-feira.</p>
        } */}
      </div>
    </div>
  )
}

export default Revenue