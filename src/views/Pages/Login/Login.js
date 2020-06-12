import React from 'react';
import {Container, Row, Col, CardGroup} from 'reactstrap';

import ToLogin from "./ToLogin/ToLogin";
import ToRegister from "./ToRegister/ToRegister";

  const Login = () => {
    console.log('login utama');
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <ToLogin/>
                <ToRegister/>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

export default Login;
