import React from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import '../RegisterBus/index.scss';
import Aux from "../../hoc/_Aux";

class RegisterBus extends React.Component {
    constructor() {
        super();
        this.state = {
            form: {
                plateNumber: "",
                route: null,
                driver: null
            },
            formErrors: {
                plateNumber: null,
                route: null,
                driver: null
            }
        }
    }

    handleChange = e => {
        const { name, value } = e.target;
        const { form, formErrors } = this.state;

        let formObj = { };

        formObj = {
            ...form,
            [name]: value
        };

        this.setState({ form: formObj }, () => {
            if (!Object.keys(formErrors).includes(name)) return;
            let formErrorsObj = { };

            const errorMsg = this.validateField(name, value);
            formErrorsObj = { ...formErrors, [name]: errorMsg };
            this.setState({ formErrors: formErrorsObj });
        });
    }

    validateField = (name, value) => {
        let errorMsg = null;
        switch (name) {
            case "plateNumber":
                if (!value) errorMsg = "Ingrese número de placa";
                break;

            case "route":
                if (!value) errorMsg = "Seleccione una ruta";
                break;

            case "driver":
                if (!value) errorMsg = "Seleccione un conductor";
                break;
            default:  errorMsg = null;
        }
        return errorMsg;
    }

    validateForm = (form, formErrors, validateFunc) => {
        const errorObj = { };
        const validate =  Object.keys(formErrors);
        validate.forEach( x => {
            const msg = validateFunc(x, form[x]);
            if (msg) errorObj[x] = msg;
        });
        return errorObj;
    };

    handleSubmit = () => {
        const { form, formErrors } = this.state;
        const errorObj = this.validateForm(form, formErrors, this.validateField);
        if (Object.keys(errorObj).length !== 0) {
            this.setState({ formErrors: { ...formErrors, ...errorObj } });
            return false;
        }
        console.log("Data: ", form);
    };

    render() {
        const { form, formErrors } = this.state;
        return (
            <>
            <Aux>
                <Row>
                    <Col>
                        <Card>

                            <Card.Body>

                                <hr />
                                <Row>
                                    
                                        <Col md={3}>

                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label>Número de Placa</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="placa"
                                                    name="plateNumber"
                                                    value={form.plateNumber}
                                                    onChange={this.handleChange}
                                                    onBlur={this.handleChange} />
                                                <Form.Text className="text-muted">

                                                </Form.Text>
                                                {formErrors.plateNumber && (
                                                    <span className="err">{formErrors.plateNumber}</span>
                                                )}
                                            </Form.Group>

                                        </Col>
                                        <Col md={3}>

                                            <Form.Group controlId="exampleForm.ControlSelect1">
                                                <Form.Label>Ruta a Asignar</Form.Label>
                                                <Form.Control as="select"
                                                    name="route"
                                                    onChange={
                                                        this.handleChange
                                                    }
                                                >
                                                    <option  >Seleccione Ruta</option>
                                                    <option value="2">2</option>
                                                    <option value="3" >3</option>
                                                    <option>4</option>
                                                    <option>5</option>
                                                </Form.Control>
                                                {formErrors.route && (
                                                    <span className="err">{formErrors.route}</span>
                                                )}
                                            </Form.Group>

                                        </Col>
                                        <Col md={3}>

                                            <Form.Group controlId="exampleForm.ControlSelect1">
                                                <Form.Label>Conductor Responsable</Form.Label>
                                                <Form.Control as="select">
                                                    <option>Seleccione Conductor </option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                    <option>5</option>
                                                </Form.Control>
                                            </Form.Group>

                                        </Col>
                                        <Col md={3}>
                                            <Button variant="primary" className="mt-4">
                                                Submit
                                            </Button>
                                        </Col>
                                  
                                </Row>
                            </Card.Body>
                        </Card>

                    </Col>
                </Row>
            </Aux>
            </>
        );
    }
}

export default RegisterBus;
