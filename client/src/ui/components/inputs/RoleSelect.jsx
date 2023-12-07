import { useState, useEffect } from "react";
import ShapesIcon from "@icons/form/shapes.svg?react";
import DownArrowIcon from "@icons/form/down-arrow.svg?react";
import style from "./styles.module.scss"

const RoleSelect = ({
  label="Rol",
  background="white",
  dark=false,
  data=[
    {id:'owner', name:'🐶 Dueño de mascotas'},
    {id:'caregiver', name:'🤝 Cuidador de mascotas'},
  ],
  onSelected=()=>null
}) => {

  const [stylesInput, setStylesInput] = useState("")
  const [valueInput, setValueInput] = useState({id:0,name:'¿?'})
  const [showOptions, setShowOptions] = useState(false)
  
  const handleChange = (value) => {
    setShowOptions(false)
    console.log(value)
    setValueInput(value)
    onSelected(value.id)
  }

  const ToggleOptions = () => {
    setShowOptions(!showOptions)
  }

  // const closeOptions = () => {
  //   setTimeout(()=>setShowOptions(false), 200)
  // }

  useEffect(()=>{
    let styles = `${style.defaultInput}`

    if(background == "gray") {
      styles += ` ${style.grayBG}`
    }
    if(dark) {
      styles += ` ${style.darkInput}`
    }

    setStylesInput(styles)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [background, dark])
  
  return (
    <div className={stylesInput} >
      <div className={`${style.titleInput} ${style.notStroke}`}>
        <ShapesIcon/>
        <label>{label} :</label>
      </div>
      <div className={style.DropDownRoleSelect} onBlur={()=>setShowOptions(false)}>
        <button className={style.selectedRoleSelect} 
        type="button" onClick={ToggleOptions}>
          {valueInput.name}
          <DownArrowIcon />
        </button>
        <div className={`${style.optionRoleSelect} ${showOptions?style.optionOpenRoleSelect:''}`}>
          {data.map((rol) => (
            <button key={'roleOption'+rol.id} type="button"
            onClick={()=>handleChange(rol)}>
              {rol.name}</button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoleSelect;
