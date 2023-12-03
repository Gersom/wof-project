import styles from './styles.module.scss';

const DefaultButton = ({ 
  onAction= ()=>null,
  label = "Aceptar",
  iconFill = "fill",
  disabled = false,
  children,
}) => {

  const generateClasses = () => {
    let classes = `${styles.defaultButton}`
    
    if (!disabled) {
      classes += ` ${styles.defaultButtonEnabled}`
    } else {
      classes += ` ${styles.defaultButtonDisabled}`
    }

    if (iconFill === 'fill' && !disabled) {
      classes += ` ${styles.defaultButtonIconFill}`
    } else if (iconFill === 'fill' && disabled) {
      classes += ` ${styles.defaultButtonIconFillDisabled}`
    }

    return classes
  }

  return (<>
    <button 
      disabled={disabled}
      className={generateClasses()} 
      onClick={onAction}>
      {children}
      <span className={styles.defaultButtonText}>
        {label}
      </span>
    </button>
  </>)
};

export default DefaultButton