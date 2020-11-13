import React from 'react';
import Modal from 'react-modal';
import './modal.css';


function MyModal(props) {

   
  return <Modal
    isOpen={props.details.isOpen}
    onRequestClose={props.handleModal}
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
    <button className="button-modal" onClick={props.handleModal}>Okay</button>
  </Modal>
}

export default MyModal;