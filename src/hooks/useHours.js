import { useEffect, useState } from "react";

export const useHours = (date) => {

  console.log(date)
  const selectedDate = new Date(date + "T00:00:00");
  const [hours, setHours] = useState('');
  // console.log("day")
  // console.log(day)
  useEffect(() => {
    if (date !== '') {
      if (selectedDate.getDay() === 6) {
        setHours([
          "7:00",
          "7:50",
          "8:40",
          "9:30",
          "10:20",
          "11:10",
          "12:00",
          "12:50",
          "13:40",
          "14:30",
          "15:20",
          "16:10",
          "17:00",
          "17:50",
          "18:40"
        ])
      } else {
        setHours([
          "08:10",
          "09:00",
          "09:50",
          "10:40",
          "11:30",
          "12:20",
          "14:10",
          "15:00",
          "15:50",
          "16:40",
          "17:30",
          "18:20",
          "19:10",
          "20:00"
        ])
      }
    }

  }, [date])

  return { hours }
}