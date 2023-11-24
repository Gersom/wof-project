import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const AcceptNotificationModal = ({ success, message, notification }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        if (success && notification) {
            setModalIsOpen(true);

           
            const timeoutId = setTimeout(() => {
                setModalIsOpen(false);
            }, 50000); 

            
            return () => clearTimeout(timeoutId);
        }
    }, [success, notification]);

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Accept Notification Modal"
        >
            <div>
                <h2>{message}</h2>
                <p>{notification}</p>
                <button onClick={closeModal}>Close</button>
            </div>
        </Modal>
    );
    
};
export default AcceptNotificationModal;
  // return (
  //   <div>
  //     {/* Other components */}
  //     <AcceptNotificationModal success={success} message={message} notification={notification} />
  //   </div>
  // );
