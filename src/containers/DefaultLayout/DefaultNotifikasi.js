import React, {useContext} from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {GlobalContext} from "../GlobalState/Globalstate";

const ModalNotifikasiKomponent = () => {
  const {modal, dispatch} = useContext(GlobalContext);

  return (
    <Modal isOpen={modal.modal} toggle={() => dispatch({type:'TUTUP_MODAL'})} className={'modal-danger ' + modal.state}>
      <ModalHeader toggle={dispatch.tutup}>Terjadi Kesalahan dengan Kode #{modal.status}#</ModalHeader>
      <ModalBody>
       <table className={'table table-bordered'}>
         <tbody>
         <tr>
           <td>Pesan</td>
           <td>{modal.message}</td>
         </tr>
         </tbody>
       </table>
      </ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={() => dispatch({type:'TUTUP_MODAL'})}>Do Something</Button>{' '}
        <Button color="secondary" onClick={() => dispatch({type:'TUTUP_MODAL'})}>Cancel</Button>
      </ModalFooter>
    </Modal>
  )
};

const ModalNotifikasi = React.memo(ModalNotifikasiKomponent);
export default ModalNotifikasi;
