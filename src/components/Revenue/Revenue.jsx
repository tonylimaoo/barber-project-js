import styles from "./Revenue.module.scss"
import DayOff from "../DayOff/DayOff";

const Revenue = () => {

  return (
    <div className={styles.revenue_container}>
      <h1>Meu Negócio</h1>
      <DayOff />
    </div>
  )
}

export default Revenue