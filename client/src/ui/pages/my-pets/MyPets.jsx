import styles from './styles.module.scss';
import CardPetPublic from '@src/ui/components/cards/card-pets/CardPetPublic';
import ButtonAgree from '@src/ui/components/forms/form-pet-edit/atoms/ButtonAgree';
import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getPets } from '@src/common/utils/helpers-redux/myPets';
import { getMyPets } from '@src/common/store/slices/myPetsSlice';

const MyPets = () => {
	const dispatch = useDispatch();
	const pets = useSelector((state) => state.myPetsReducer.myPets);

	useEffect(() => {
		const get = async () => {
			const pets = await getPets();
			dispatch(getMyPets(pets));
		};
		get();
	}, [dispatch]);


	return (
		<div className={styles.mainContainer}>
			<h1>Mis Mascotas</h1>
			<div className={styles.gridContainer}>
				<CardPetPublic />
				<ButtonAgree />
			</div>
		</div>
	);
};

export default MyPets;
