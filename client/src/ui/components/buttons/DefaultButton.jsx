import styles from './styles.module.scss';

const DefaultButton = ({ 
  onAction= ()=>null,
  label = "Aceptar",
  iconFill = "stroke",
  disabled = false,
  background = true,
  size = "normal",
  type="button",
  children,
}) => {

  const generateClasses = () => {
    let classes = `${styles.defaultButton}`

    if (size === "small") {
      classes += ` ${styles.defaultButtonSmall}`
    } else if (size === "large") {
      classes += ` ${styles.defaultButtonLarge}`
    }
    
    if (!disabled && background) {
      classes += ` ${styles.defaultButtonEnabled}`
    } else if (!disabled && !background) {
      classes += ` ${styles.defaultButtonNotBackground}`
    } else if (disabled) {
      classes += ` ${styles.defaultButtonDisabled}`
    }

    if (iconFill === 'fill' && !disabled && background) {
      classes += ` ${styles.defaultButtonIconFill}`
    } else if (iconFill === 'fill' && !disabled && !background) {
      classes += ` ${styles.defaultButtonIconFillNotBackground}`
    } else if (iconFill === 'fill' && disabled) {
      classes += ` ${styles.defaultButtonIconFillDisabled}`
    }

    return classes
  }

  return (<>
    <button 
      disabled={disabled}
      className={generateClasses()} 
      onClick={onAction}
      type={type}>
      {children}
      <span className={styles.defaultButtonText}>
        {label}
      </span>
    </button>
  </>)
};

export default DefaultButton