import ClientCard from './ClientCard'
import styles from './styles.module.scss'

const ClientCards = ({ clients}) => {
  return(
    <div className={styles.ClientCardsContent}>
      {clients?.map((c,index) => {
        const date = new Date(c?.endDate);
        
        const day = date.getDate();
        const monthIndex = date.getMonth();
            
        const monthNames = [
          "Enero", "Febrero", "Marzo",
          "Abril", "Mayo", "Junio",
          "Julio", "Agosto", "Septiembre",
          "Octubre", "Noviembre", "Diciembre"
        ];
   
        const monthName = monthNames[monthIndex];
        
        const formattedDate = `${day} de ${monthName}`;
        
        return <ClientCard key={index} imgClient={c?.imgClient} client={c?.client} date={formattedDate} petName={c?.petName} petSpecie={c.petSpecie} price={c?.price}/>
      })}
    </div>
  )
}

export default ClientCards;