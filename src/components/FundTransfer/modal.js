import React from 'react';
import Modal from 'react-modal';
import './modal.css';


function MyModal(props) {

   
  return <Modal
    isOpen={props.details.isOpen}
    onRequestClose={props.handleClearModal}
    contentLabel="Selected Option"
    closeTimeoutMS={200}
    ariaHideApp={false}
    className="modal"
  >
    
    <h3 className="modal__title">FD Summary  {props.details.condition}</h3>
    {props.details.isOpen && <p className="modal__body">hiii hellohiii hellohiii hello
    kdljfhfgregreteh
    
    wfgrehrehe
    srrehrereh
    rgrewgrehrehre
    
    rhrehrehrehrehreherh
    </p>}

    {props.details.condition===3?<><button className="button-modal" onClick={props.handleClearModal}>NO</button>
      <button className="button-modal" onClick={props.handleSuccess}>Yes</button> </>:
      <button className="button-modal" onClick={props.handleClearModal} >Okay</button> }
  </Modal>
}

export default MyModal;