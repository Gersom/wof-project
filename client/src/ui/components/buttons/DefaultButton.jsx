import styles from './styles.module.scss';

const DefaultButton = ({ 
  onAction= ()=>null, 
  align = 'center', 
  label = "Aceptar",
  iconFill = "fill",
  children,
}) => {

  const content = (<>
    {children}

    <span className={styles.defaultButtonText}>
      {label}
    </span>
  </>)

  const generateClasses = () => {
    let classes = `${styles.defaultButton}`

    if (align === 'left') {
      classes += ` ${styles.defaultButtonLeft}`
    }
    
    if (iconFill === 'fill') {
      classes += ` ${styles.defaultButtonIconFill}`
    }

    return classes
  }

  return (<>
    <button 
      className={generateClasses()} 
      onClick={onAction}>
      {content}
    </button>
  </>)
};

export default DefaultButton