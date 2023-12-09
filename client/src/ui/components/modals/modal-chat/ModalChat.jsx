import styles from './styles.module.scss';
import CardChat from '../../cards/card-chats/CardChat';

const ModalChat = ({
	data = {
		id: 0,
		caregiverId: 0,
		ownerId: 0,
		ownerName: 'Juan',
		caregiverName: 'Pedro',
		ownerAvatar: 'https://www.abc.es/Media/201410/09/Perro--644x362.jpg',
		caregiverAvatar: 'https://www.abc.es/Media/201410/09/Perro--644x362.jpg',
		messageChats: [],
	},
	role,
}) => {
	const messageNoChats =
		role === 'owner'
			? 'Actualmente no tienes ningún cuidador contratado. ¡Encuentra tu cuidador perfecto y comienza a chatear para brindarle lo mejor a tu mascota!'
			: 'Actualmente no tienes ningún cliente asignado. Encuentra dueños de mascotas con quienes conectarte y brindarles tu atención especializada.';

  const notChats = (
    <p className={styles.messageNotChats}>
      {messageNoChats}
    </p>
  )

  const yesChats = (
    <>{
      data.map((chat) => {
        return (
          <CardChat key={chat.id} data={chat}  role={role} />
        );
      })
    }</>
  )
	return (
		<>
			<div className={styles.mainContainerChat}>
				<h3>Chats</h3>
				<div className={styles.containerChats}> { 
          data.length > 0
            ? yesChats
            : notChats
        } </div>
			</div>
		</>
	);
};

export default ModalChat;
