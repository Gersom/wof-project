import styles from './styles.module.scss';
import CardDisplayImages from '@src/ui/components/cards/card-display-images/CardDisplayImages';
import FormHomeEdit from '@src/ui/components/forms/form-home-edit/FormHomeEdit';
import { useSelector } from 'react-redux';
import useGetDetailsCaregivers from '@src/common/hooks/useGetDetailsCaregivers';
import { useState, useEffect } from 'react';
import { API_URL_CAREGIVERS } from '@src/common/constants/api';

const MyHome = () => {
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(caregiverId) {
            const options = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            };
            const response = await fetch(`${API_URL_CAREGIVERS}/${caregiverId}`, options);
            const data = await response.json();
            console.log(data);
        }
    }

	return (
		<div className={styles.mainContainer}>
			<h1>Mi Hogar</h1>
			<div className={styles.gridContainer}>
                <FormHomeEdit
                    form={form}
                    handleChange={handleChange}
                    />
				<CardDisplayImages
					data={form.images}
					setImage={(image) =>
						setForm({ ...form, images: [...form.images, image] })
					}
				/>
			</div>
                <button onClick={handleSubmit}>Guardar cambios</button>
		</div>
	);
};

export default MyHome;
