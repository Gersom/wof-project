const validation = (name, value, error) => {
		let errors = { ...error };

		if (name === 'name') {
			if (value.length < 2) {
				errors.name = 'El nombre debe tener al menos 2 caracteres';
			} else if (value.length > 20) {
				errors.name = 'El nombre debe tener menos de 20 caracteres';
			} else if (/\d/.test(value) || /[!@#$%^&*(),.?":{}|<>]/.test(value)) {
				errors.name = 'El nombre no puede contener números o símbolos';
			} else {
				errors.name = '';
			}
		} else if (name === 'temperaments') {
			if (value.length < 5) {
				errors.temperaments = 'Debe escribir al menos 1 caracteristica';
			} else if (value.length > 60) {
				errors.temperaments = 'Debe escribir menos de 60 caracteres';
			} else {
				errors.temperaments = '';
			}
		} else if (name === 'manners') {
			if (value.length < 5) {
				errors.manners = 'Debe escribir al menos 1 caracteristica';
			} else if (value.length > 80) {
				errors.manners = 'Debe escribir menos de 80 caracteres';
			} else {
				errors.manners = '';
			}
		} else if (name === 'notes') {
			if (value.length < 5) {
				errors.notes = 'Debe escribir al menos 5 caracteres';
			} else if (value.length > 80) {
				errors.notes = 'Debe escribir menos de 80 caracteres';
			} else {
				errors.notes = '';
			}
		}

		return errors;
};

export default validation;
