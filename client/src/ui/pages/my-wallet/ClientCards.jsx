import ClientCard from './ClientCard'
import styles from './styles.module.scss'

const ClientCards = ({ clients}) => {
  return(
    <div className={styles.ClientCardsContent}>
      {clients?.map((c,index) => {
        const date = new Date(c?.date);
        
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
        
        return <ClientCard key={index} 
        imgClient={c?.profilePicture} 
        client={c?.name} 
        date={formattedDate} 
        petName={c?.petName} 
        petSpecie={`${c.specieIcon} ${c.specieName}`}
        originalAmount={c?.originalAmount}
        percentage={c?.percentage}
        revenue={c?.revenue}
        amountPaid={c?.amountPaid}
        />
      })}
    </div>
  )
}

export default ClientCards;