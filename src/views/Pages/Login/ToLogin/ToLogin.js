import React, {useState, useContext} from 'react';
import {Button, Card, CardBody, Col, FormFeedback, Input, InputGroup, InputGroupAddon, InputGroupText, Row} from "reactstrap";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as FormikConfig from '../Konfig/FormikConfig';
import {CobaLogin} from "../Konfig/ApiLogin";
import {GlobalContext} from "../../../../containers/GlobalState/Globalstate";
import {withRouter, Redirect} from 'react-router-dom';
const ToLoginComponent = ({history}) => {
  const {dispatch} = useContext(GlobalContext);
  const Login = localStorage.getItem('login');
  const [Loading, setLoading] = useState(false);

  return (
    <Card className="p-4">
      {Login ? <Redirect to={'/'}/> : null}
      <CardBody>
        <Formik initialValues={FormikConfig.InitialValues} validationSchema={FormikConfig.ValidationSchema} onSubmit={values => {
          CobaLogin(values, dispatch, history, setLoading)
        }}>
          {({dirty, isValid, errors, touched}) => (
            <Form>
              <h1>Login</h1>
              <p className="text-muted">Sign In to your account</p>

              <InputGroup className="mb-3">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText><i className="icon-user"></i></InputGroupText>
                </InputGroupAddon>
                <Field as={Input} invalid={errors.email && touched.email} type="email" name='email' placeholder='Email'/>
                <ErrorMessage name={'email'}>{msg => <FormFeedback>{msg}</FormFeedback>}</ErrorMessage>
              </InputGroup>


              <InputGroup className="mb-4">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="icon-lock"></i>
                  </InputGroupText>
                </InputGroupAddon>
                <Field as={Input} className='text_password' invalid={errors.password && touched.password} type="password" placeholder="Password" name='password'/>
                <ErrorMessage name={'password'}>{msg => <FormFeedback>{msg}</FormFeedback>}</ErrorMessage>
              </InputGroup>

              <Row>
                <Col xs="6">
                  {!Loading ?
                    <Button type="submit" disabled={!dirty || !isValid} color="primary" className="px-4">Login</Button> :
                    <Button type="submit" disabled={true} color="primary" className="px-4">...Loading</Button>
                  }

                </Col>
                <Col xs="6" className="text-right">
                  <Button color="link" className="px-0">Forgot password?</Button>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </CardBody>
    </Card>
  )
};

const ToLogin = React.memo(ToLoginComponent);
export default withRouter(ToLogin);
