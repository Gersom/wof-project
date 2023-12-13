import styles from './styles.module.scss'
import Card from './Card'
import money from './walletIcons/money.svg'
import moneyOne from './walletIcons/moneyOne.svg'
import moneySecond from './walletIcons/moneySecond.svg'
import pet from './walletIcons/pet.svg'

const Cards = ({dueBalance, recievedBalance,clientsNumber}) => {

  const array = [
    {
      icon:moneySecond,
      tema: 'Por liberar',
      amount: `$ ${Number(dueBalance).toFixed(2)}`
    },
    {
      icon: moneyOne,
      tema: 'Retirado',
      amount: `$ ${Number(recievedBalance).toFixed(2)}`
    },
    {
      icon: money,
      tema: 'Generado',
      amount: `$ ${Number(dueBalance + recievedBalance).toFixed(2)}`
    },
    {
      icon: pet,
      tema: 'Clientes',
      amount: '0' + clientsNumber
    },
  ]

  return (
    <div className={styles.cardsContent}>
      {
        array?.map((a,index) => (
          <Card icon={a?.icon} tema={a?.tema} amount={a?.amount} key={index}/>
        ))
      }
    </div>
  )
}

export default Cards