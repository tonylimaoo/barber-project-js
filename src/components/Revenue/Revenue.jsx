import styles from "./Revenue.module.scss"
import DayOff from "../DayOff/DayOff";
import Lunch from "../Lunch/Lunch";

const Revenue = () => {

  return (
    <div className={styles.revenue_container}>
      <h1>Meu Negócio</h1>
      <DayOff />
      <Lunch />
    </div>
  )
}

export default Revenue