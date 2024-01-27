import { useState, useEffect } from 'react'

export const useExclusiveHours = (appointmentHours, hours, date) => {

  const [exclusiveHours, setExclusiveHours] = useState([]);

  useEffect(() => {

    let hoursFiltered = hours.filter(ele => !appointmentHours.includes(ele))

    const dateParsed = new Date(date + 'T00:00:00').toLocaleDateString();

    const dateNow = new Date();

    if (dateNow.toLocaleDateString() === dateParsed) {

      const hourNow = dateNow.toLocaleTimeString().split(':')
      hourNow.pop();
      const hourNowRefact = hourNow.join().replace(',', '');

      hoursFiltered = hoursFiltered.filter(ele => {
        const elemReplaced = parseInt(ele.replace(':', ''));
        let received;
        if (elemReplaced > hourNowRefact) {
          received = ele;
        }
        return received;
      })
      setExclusiveHours(hoursFiltered)
    } else {
      setExclusiveHours(hoursFiltered);
    }

  }, [appointmentHours, hours, date])

  return { exclusiveHours }

}