import React, { useState } from 'react';
import { Row, Col, Card, CardTitle, CardText, Form, FormGroup, Button, Label, Input } from 'reactstrap';

function AppLogin({handleSubmit, info}) {
    return (
        <Row>
            <Col sm="4"></Col>
            <Col sm="4">
                <Card body>
                    <CardTitle className="text-center" tag="h4">
                        Log in
                    </CardTitle>
                    <Form inline onSubmit={handleSubmit}>
                        <FormGroup className="mb-2 me-sm-2 mb-sm-0">
                            <Label className="me-sm-2" for="exampleEmail">User id</Label>
                            <Input
                                id="Email"
                                name="email"
                                placeholder="Escribe el usuario"
                                type="email"
                            />
                        </FormGroup>
                        <FormGroup className="mb-2 me-sm-2 mb-sm-0">
                            <Label className="me-sm-2" for="examplePassword">Password</Label>
                            <Input
                                id="Password"
                                name="password"
                                type="password"
                            />
                        </FormGroup>
                        <br />
                        <Button color="primary" size="lg" block >
                            <strong>Log in</strong>
                        </Button>
                        <CardText className="text-danger">{info}</CardText>
                    </Form>
                </Card>
            </Col>
        </Row>
    )
}
export default AppLogin;