import { emailValidation } from "./validations"
import { useState, useEffect } from "react";
import EmailIcon from "@icons/form/email.svg?react";
import style from "./styles.module.scss"

const EmailInput = ({
  name="email",
  label="Correo electrónico",
  background="white",
  validation=true,
  dark=false,
  onValidated=()=>null
}) => {

  const [errorLabel, setValue] = useState("")
  const [stateInput, setStateInput] = useState("")
  const [stylesInput, setStylesInput] = useState("")
  const [titleChar, setTitleChar] = useState("")
  const [valueInput, setValueInput] = useState("")
  
  const handleChange = (e) => {
    const value = e.target.value
    setValueInput(value)

    if(validation) {  
      const validationData = emailValidation(value)
      setStateInput(validationData.state)
      setTitleChar(validationData.char)
      setValue(validationData.message)
      if(validationData.state === "validated"){
        onValidated(value)
      } else {
        onValidated(false)
      }
    } else {
      onValidated(value)
    }
  }

  useEffect(()=>{
    let styles = `${style.defaultInput}`
    if(stateInput == "error") {
      styles += ` ${style.errorInput}`
    } 
    else if (stateInput == "validated") {
      styles += ` ${style.validatedInput}`
    }

    if(background == "gray") {
      styles += ` ${style.grayBG}`
    }
    if(dark) {
      styles += ` ${style.darkInput}`
    }

    setStylesInput(styles)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [background, dark, stateInput])
  
  return (
    <div className={stylesInput}>
      <div className={style.titleInput}>
        <EmailIcon/>
        <label>{label} : {titleChar}</label>
      </div>
      <input
        type='text'
        name={name}
        value={valueInput}
        onChange={handleChange}
        autoComplete='on'
        placeholder='¿@gmail.com?'
      />
      <span>{errorLabel}</span>
    </div>
  );
};

export default EmailInput;
