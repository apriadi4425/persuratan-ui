import React from "react";
import {Button, Input, InputGroup, InputGroupAddon} from "reactstrap";
import {Formik, Form, Field} from "formik";

const CariDataKomponent = ({HandleCari, TutupCari}) => {
  const InitialValues = {cari : '', isi : ''};
  return (
    <div className="float-right">
      <Formik initialValues={InitialValues} onSubmit={values => HandleCari(values)}>
        <Form>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
                <Button type="button" onClick={() => HandleCari(InitialValues, 'tutup')} color="danger"><i className="fa fa-times"></i> Tutup</Button>
            </InputGroupAddon>
                <Field as={Input} type='select' name="cari" id="cari">
                  <option>Pilih Field Pencarian</option>
                  <option value="asal_surat">Asal Surat</option>
                  <option value="nomor_surat">Nomor Surat</option>
                  <option value="perihal">Perihal Surat</option>
                </Field>
                <Field as={Input} type="text" id="isi" name="isi" placeholder="Tekan Enter Untuk Mencari" />
          </InputGroup>
        </Form>
      </Formik>
    </div>
  )
};

const CariData = React.memo(CariDataKomponent);
export default CariData;
