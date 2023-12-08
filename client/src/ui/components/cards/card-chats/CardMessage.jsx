import React from 'react';
import styles from './styles.module.scss';
import { convertDate } from '@src/common/utils/converDates';

const CardMessage = ({
	data = {
		isOwner: false,
		isCaregiver: false,
		message: '',
		createdAt: '',
	},
	caregiverName,
	ownerName,
	role,
}) => {
  const date = convertDate(data.createdAt);

	const renderMessage = () => {
		if ((role === 'owner') & data.isOwner) {
			return (
				<div className={styles.messageOwnerByOwner}>
					<section>
						<h4>{date}</h4>
						<h3>🦮{ownerName} :</h3>
					</section>
					<p>{data.message}</p>
				</div>
			);
		} else if ((role === 'owner') & data.isCaregiver) {
			return (
				<div className={styles.messageOwnerByCaregiver}>
					<section>
						<h3>🤝{caregiverName} :</h3>
						<h4>{date}</h4>
					</section>
					<p>{data.message}</p>
				</div>
			);
		} else if ((role === 'caregiver') & data.isCaregiver) {
			return (
				<div className={styles.messageCaregiverByCaregiver}>
					<section>
						<h4>{date}</h4>
						<h3> 🤝{caregiverName} :</h3>
					</section>
					<p>{data.message}</p>
				</div>
			);
		} else if ((role === 'caregiver') & data.isOwner) {
			return (
				<div className={styles.messageCaregiverByOwner}>
					<section>
						<h3>🦮{ownerName} :</h3>
						<h4>{date}</h4>
					</section>
					<p>{data.message}</p>
				</div>
			);
		}
	};

	return <>{renderMessage()}</>;
};

export default CardMessage;
