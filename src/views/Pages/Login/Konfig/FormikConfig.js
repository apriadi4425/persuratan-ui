import * as Yup from "yup";

export const InitialValues = {email : '', password:''};

export const ValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Kesalahan Penulisan Format Email')
    .required('Email tidak boleh kosong !!'),
  password: Yup.string()
    .required('Password harus diisi!!!'),
});
