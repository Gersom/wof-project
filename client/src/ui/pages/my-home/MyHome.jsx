import styles from './styles.module.scss';
import CardDisplayImages from '@src/ui/components/cards/card-display-images/CardDisplayImages';
import FormHomeEdit from '@src/ui/components/forms/form-home-edit/FormHomeEdit';
import { useSelector, useDispatch } from 'react-redux';
import useGetDetailsCaregivers from '@src/common/hooks/useGetDetailsCaregivers';
import { useState, useEffect } from 'react';
import { API_URL_CAREGIVERS } from '@src/common/constants/api';
import { setAlert } from '@src/common/store/slices/alertSlice';

const MyHome = () => {
	const dispatch = useDispatch();
	const [form, setForm] = useState({
		experiencies: '',
		myHouse: '',
		notes: '',
		caregiverId: '',
		images: [''],
	});
	const caregiverId = useSelector(
		(state) => state?.userReducer?.user?.caregiver?.id
	);
	const { isLoading, details } = useGetDetailsCaregivers(caregiverId);

	useEffect(() => {
		setForm({
			experiencies: details?.experiencies,
			myHouse: details?.myHouse,
			notes: details?.notes,
			caregiverId: caregiverId,
			images: details?.caregiversImages?.map((image) => image?.imageUrl),
		});
	}, [caregiverId, details]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });
	};

	const handleDeleteImage = (image) => {
		const newImages = form.images.filter((img) => img !== image);
		setForm({ ...form, images: newImages });
		dispatch(setAlert({ message: 'Imagen eliminada', type: 'success' }));
	};

	const handleSetImage = (image) => {
		setForm({ ...form, images: [...form.images, image] });
		dispatch(setAlert({ message: 'Imagen agregada', type: 'success' }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (caregiverId) {
			const options = {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(form),
			};
			const response = await fetch(
				`${API_URL_CAREGIVERS}/${caregiverId}`,
				options
			);
			const data = await response.json();
			console.log(data);
			dispatch(setAlert({ message: 'Cambios guardados', type: 'success' }));
		}
	};

	return (
		<div className={styles.mainContainer}>
			<h1>Mi Hogar</h1>
			<div className={styles.gridContainer}>
				<FormHomeEdit form={form} handleChange={handleChange} />
				<CardDisplayImages
					data={form.images}
					setImage={handleSetImage}
					handleDeleteImage={handleDeleteImage}
				/>
			</div>
			<button onClick={handleSubmit}>Guardar cambios</button>
		</div>
	);
};

export default MyHome;
