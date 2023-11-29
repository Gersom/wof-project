const validation = (form) => {
	let errors = {};
	if (form.name.length < 4) {
		errors.name = 'El nombre debe tener al menos 4 caracteres';
	} else if (form.name.length > 20) {
		errors.name = 'El nombre debe tener menos de 20 caracteres';
	} else if (/\d/.test(form.name) || /[!@#$%^&*(),.?":{}|<>]/.test(form.name)) {
		errors.name = 'El nombre no puede contener números o símbolos';
	} else {
		errors.name = '';
	}
	if (form.temperaments.length < 5) {
		errors.temperaments = 'Debe escribir al menos 1 caracteristica';
	} else if (form.temperaments.length > 60) {
		errors.temperaments = 'Debe escribir menos de 60 caracteres';
	} else {
		errors.temperaments = '';
	}
	if (form.manners.length < 5) {
		errors.manners = 'Debe escribir al menos 1 caracteristica';
	} else if (form.manners.length > 80) {
        errors.manners = 'Debe escribir menos de 80 caracteres';
	} else {
		errors.manners = '';
	}
	if (form.notes.length < 5) {
		errors.notes = 'Debe escribir al menos 5 caracteres';
	} else if (form.notes.length > 80) {
		errors.notes = 'Debe escribir menos de 80 caracteres';
	} else {
		errors.notes = '';
	}
    return errors;
};

export default validation;
