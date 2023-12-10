import styles from "./styles.module.scss";

const CardInput = ({
  value,
  setValue,
  sendMessage,
  setImageFile,
  setImageLocal,
  isLoading,
}) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleSetImage =  (event) => {
    if (isLoading) return;
    const file = event.target.files[0];
    if (file) {
      file.preview = URL.createObjectURL(file);
      setImageFile(file);
      setImageLocal(file.preview);
			event.target.value = null;
    }
  };

  return (
    <div className={styles.containerInput}>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Escribe un mensaje!"
      />
      <div className={styles.containerBtnInput}>
        <input
          className={styles.btnImg}
          type="file"
          onChange={handleSetImage}
          accept="image/png, image/jpeg"
        />
        <button onClick={sendMessage} disabled={isLoading}>
          Enviar
        </button>
      </div>
    </div>
  );
};

export default CardInput;
