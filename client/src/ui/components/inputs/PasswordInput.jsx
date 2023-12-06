import { useState, useEffect } from "react";
import { passwordValidation } from "./validations"
import PasswordIcon from "@icons/form/password.svg?react";
import EyeIcon from "@icons/form/eye.svg?react";
import EyeSlashIcon from "@icons/form/eye-slash.svg?react";
import style from "./styles.module.scss"

const PasswordInput = ({
  name="password",
  label="Contraseña",
  background="gray",
  validation=true,
  dark=false,
  onValidated=()=>null
}) => {

  const [errorLabel, setValue] = useState("")
  const [stateInput, setStateInput] = useState("")
  const [stylesInput, setStylesInput] = useState("")
  const [titleChar, setTitleChar] = useState("")
  const [valueInput, setValueInput] = useState("")
  const [openEye, setOpenEye] = useState(false)
  
  const handleChange = (e) => {
    const value = e.target.value
    setValueInput(value)

    if(validation) {  
      const validationData = passwordValidation(value)
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
  }, [stateInput])
  
  return (
    <div className={stylesInput}>
      <div className={style.titleInput}>
        <PasswordIcon/>
        <label>{label} : {titleChar}</label>
      </div>
      <div className={style.inputPass}>
        <input
          type={openEye?'text':'password'}
          name={name}
          value={valueInput}
          onChange={handleChange}
          autoComplete='on'
          placeholder='*****'
        />
        <button type="button" 
        onClick={()=>setOpenEye(!openEye)}>
          {
            openEye
            ? <EyeIcon />
            : <EyeSlashIcon />
          }
        </button>
      </div>
      <span className="EmailInputError">
        {errorLabel}
      </span>
    </div>
  );
};

export default PasswordInput;
