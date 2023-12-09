import styles from './styles.module.scss';

const CardInput = ({ value, setValue, sendMessage, setImageFile, setImageLocal }) => {
	const handleKeyPress = (e) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			sendMessage();
		}
	};

  const handleSetImage = async (event) => {
    const file = event.target.files[0];
		if (file) {
			file.preview = URL.createObjectURL(file);
			setImageFile(file)
			setImageLocal(file.preview);
      console.log(file)
		}
  }

	return (
		<div className={styles.containerInput}>
			<textarea
				value={value}
				onChange={(e) => setValue(e.target.value)}
				onKeyPress={handleKeyPress}
				placeholder='Escribe un mensaje!'
			/>
			<div className={styles.containerBtnInput}>
				<input className={styles.btnImg} type='file' onChange={handleSetImage}/>
				<button onClick={sendMessage}>Enviar</button>
			</div>
		</div>
	);
};

export default CardInput;
