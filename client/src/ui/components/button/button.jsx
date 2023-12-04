import React from 'react';
import styles from './styles.module.scss';
import iconOfertas from '@icons/nav/ofertas.svg';
import iconAceptar from '@icons/acepto.svg';
import iconCancel from '@icons/nav/cancelar.svg';
import iconBuscar from '@icons/buscar.svg'

// {/* <SmallButton onClick={() => {console.log("SALUDAR")}} dobleLine={true}></SmallButton>
//           <OfertasButtonleft type="ofertas" disabled={false} onClick={() => {console.log("cancel")}}></OfertasButtonleft>
//           <OfertasButton type="ofertas" disabled={false} onClick={() => {console.log("cancel")}}></OfertasButton>
//           <AceptarButton type="Aceptar" disabled={false} onClick={() => {console.log("Aceptar")}}></AceptarButton>
//           <CancelButton type="cancel" disabled={false} onClick={() => {console.log("cancel")}}></CancelButton>
//           <DisabledButton type="cancel" disabled={false} onClick={() => {console.log("cancel")}}></DisabledButton>
//           <BuscarButton type="cancel" disabled={false} onClick={() => {console.log("cancel")}}></BuscarButton>
//           <GuardarButton type="cancel" disabled={false} onClick={() => {console.log("cancel")}}></GuardarButton> */}

export const DefaultButton = ({ onClick, children }) => (
  <div className={styles.buttonContainer}>
    <button className={styles.defaultButton} onClick={onClick}>
      {children}
    </button>
  </div>
);

export const OfertasButton = ({ onClick, alignLeft, children }) => (
  <div className={styles.buttonContainer}>
    <button className={`${styles.ofertasButton} ${alignLeft ? styles.alignLeft : ''}`} onClick={onClick}>
      {children}
      <img src={iconOfertas} alt="icon" className={styles.iconOfertas} />
      <span className={styles.buttonText}>Ofertas</span>
    </button>
  </div>
);
export const OfertasButtonleft = ({ onClick, alignLeft, children }) => (
    <div className={styles.buttonContainer}>
      <button className={`${styles.ofertasButtonleft} ${alignLeft ? styles.alignLeft : ''}`} onClick={onClick}>
        {children}
        <img src={iconOfertas} alt=" icon " className={styles.iconOfertas} />
        <span className={styles.buttonText}>Ofertas</span>
      </button>
    </div>
  );
  
export const AceptarButton= ({ onClick, alignLeft, children }) => (
    <div className={styles.buttonContainer}>
      <button className={`${styles.AceptarButton} ${alignLeft ? styles.alignLeft : ''}`} onClick={onClick}>
        {children}
        {/* <img src={iconAceptar} alt="icon" className={styles.iconAceptar} /> */}
        <span className={styles.buttonText}>Regresar</span>
      </button>
    </div>
  );
      

  



export const SmallButton = ({ onClick, children, dobleLine }) => {
    let buttons = "smallButton";
    
    if (dobleLine === "ok") {
        buttons = dobleLine;
      } 
      return (
        <button className={`${styles[buttons]}`} onClick={onClick}>
      {children}
        <span className={styles.buttonText}>Cargar desde 
        ordenador</span>
    </button>
      )
        
 } ;
 export const DisabledButton = ({ onClick, alignLeft, children }) => (
    <div className={styles.buttonContainer}>
      <button className={`${styles.DisabledButton} ${alignLeft ? styles.alignLeft : ''}`} onClick={onClick}>
        {children}
        <img src={iconOfertas} alt="icon" className={styles.iconOfertas} />
        <span className={styles.buttonText}>Ofertas</span>
      </button>
    </div> 
  );
 export const CancelButton= ({ onClick, alignLeft, children }) => (
    <div className={styles.buttonContainer}>
      <button className={`${styles.CancelButton} ${alignLeft ? styles.alignLeft : ''}`} onClick={onClick}>
        {children}
        <img src={iconCancel} alt="icon" className={styles.iconCancel} />
        <span className={styles.buttonText}>Cancelar oferta</span>
      </button>
    </div>
  );

  export const BuscarButton= ({ onClick, alignLeft, children }) => (
    <div className={styles.buttonContainer}>
      <button className={`${styles.BuscarButton} ${alignLeft ? styles.alignLeft : ''}`} onClick={onClick}>
        {children}
        <img src={iconBuscar} alt="icon" className={styles.iconBuscar} />
        <span className={styles.buttonText}>  Buscar</span>
      </button>
    </div>
  );

  export const GuardarButton= ({ onClick, alignLeft, children }) => (
    <div className={styles.buttonContainer}>
      <button className={`${styles.GuardarButton} ${alignLeft ? styles.alignLeft : ''}`} onClick={onClick}>
        {children}
        <span className={styles.buttonText}>Guardar cambios</span>
      </button>
    </div>
  );
  
