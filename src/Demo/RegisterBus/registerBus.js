import React from 'react';
import { Row, Col, Card, Form, Button, Table } from 'react-bootstrap';
import '../RegisterBus/index.scss';
import Aux from "../../hoc/_Aux";
import controlService from '../../services/control.service';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
class RegisterBus extends React.Component {
    constructor() {
        super();
        this.state = {
            form: {
                licensePlates: "",
                //route: null,
                driverAssigned: null,
                busID: 0
            },
            formErrors: {
                licensePlates: null,
                //route: null,
                driverAssigned: null
            },
            userList: [],
            busList: [],
            btn: false
        };

        this.getUserList();
        this.getBuses();
    }

    handleChange = e => {
        const { name, value } = e.target;
        const { form, formErrors } = this.state;

        let formObj = {};

        formObj = {
            ...form,
            [name]: value
        };

        this.setState({ form: formObj }, () => {
            if (!Object.keys(formErrors).includes(name)) return;
            let formErrorsObj = {};

            const errorMsg = this.validateField(name, value);
            formErrorsObj = { ...formErrors, [name]: errorMsg };
            this.setState({ formErrors: formErrorsObj });
        });
    }

    validateField = (name, value) => {
        let errorMsg = null;
        switch (name) {
            case "licensePlates":
                let patronPlaca = /^(C|P)+[A-Z0-9]{6}$/;
                if (!value) errorMsg = "Ingrese número de placa,";
                if (!patronPlaca.test(value)) errorMsg = "Número de placa incorrecto, Ejemplo: C123ABC";
                break;



            case "driverAssigned":
                if (!value) errorMsg = "Seleccione un conductor";
                break;
            default: errorMsg = null;
        }
        return errorMsg;
    }

    validateForm = (form, formErrors, validateFunc) => {
        const errorObj = {};
        const validate = Object.keys(formErrors);
        validate.forEach(x => {
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
        const { driverAssigned, licensePlates } = form;
        controlService.post("/bus", { driverAssigned, licensePlates }).then((res) => {
            toast.success("Bus creado correctamente.");
        }).catch(error => {
            toast.error(error.data.msg);
        });
        console.log("Data: ", form);
    };

    getUserList() {
        controlService.get("/usuarios").then((res) => {
            this.setState({ userList: res.data.users, form: { driverAssigned: res.data.users[0].uid } });


        }).catch(error => {
            console.log(error);
        });
    }

    getBuses = () => {
        controlService.get("/bus").then((res) => {
            this.setState({ busList: res.data.buses });


        }).catch(error => {
            console.log(error);
        });
    }

    editBus = (bus) => {
        const { _id, driverAssigned, licensePlates } = bus;
        this.setState({
            btn: true,
            form: {
                busID: _id,
                driverAssigned: driverAssigned._id,
                licensePlates
            }
        })
    }

    busModify = () => {
        const { form, formErrors } = this.state;
        const errorObj = this.validateForm(form, formErrors, this.validateField);
        if (Object.keys(errorObj).length !== 0) {
            this.setState({ formErrors: { ...formErrors, ...errorObj } });
            return false;
        }
        const { driverAssigned, licensePlates, busID } = form;
        controlService.put(`/bus/${busID}`, { driverAssigned, licensePlates }).then((res) => {
            toast.success("Bus modifcado correctamente.");
            this.cleanForm();
        }).catch(error => {
            toast.error(JSON.stringify(error.data.errors, null, 2));
        });
    }

    busDelete = (bus) => {


        controlService.del(`/bus/${bus._id}`).then((res) => {
            toast.warning("Bus Eliminado correctamente.");
            this.cleanForm();
        }).catch(error => {
            toast.error(JSON.stringify(error.data.errors, null, 2));
        });
    }



    cleanForm = () => {
        this.setState({
            btn: false,
            form: {
                busID: 0,
                driverAssigned: "",
                licensePlates: ""
            }
        });
        this.getBuses();
    }

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
                                        <Col md={12}>

                                            <Table striped bordered hover size="sm">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Placa</th>
                                                        <th>Conductor</th>
                                                        <th>Editar</th>
                                                        <th>Eliminar</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.state.busList.map((bus, i) => (
                                                            <tr key={i}>
                                                                <td key={i + 1}>{i + 1}</td>
                                                                <td key={bus._id}>{bus.licensePlates}</td>
                                                                <td key={bus.driverAssigned.name}>{bus.driverAssigned.name}</td>
                                                                <td><i className="material-icons btn btn-warning"
                                                                    onClick={() => this.editBus(bus)}>edit</i>
                                                                </td>
                                                                <td><i className="material-icons btn btn-danger"
                                                                    onClick={() => this.busDelete(bus)}>delete</i>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </Table>
                                        </Col>

                                    </Row>
                                    <Row>

                                        <Col md={3}>

                                            <Form.Group >
                                                <Form.Label>Número de Placa</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="placa"
                                                    name="licensePlates"
                                                    value={form.licensePlates}
                                                    onChange={this.handleChange}
                                                    onBlur={this.handleChange} />

                                                {formErrors.licensePlates && (
                                                    <span className="err">{formErrors.licensePlates}</span>
                                                )}
                                            </Form.Group>

                                        </Col>

                                        <Col md={3}>

                                            <Form.Group controlId="exampleForm.ControlSelect1">
                                                <Form.Label>Conductor Responsable</Form.Label>
                                                <Col sm="8">
                                                    <Form.Control as="select"
                                                        name="driverAssigned"
                                                        onChange={
                                                            this.handleChange
                                                        } >
                                                        {this.state.userList.map(({ uid, name }, index) =>
                                                            <option value={uid} key={index} > {name} </option>
                                                        )}

                                                    </Form.Control>
                                                    {formErrors.driverAssigned && (
                                                        <span className="err">{formErrors.driverAssigned}</span>
                                                    )}
                                                </Col>
                                            </Form.Group>

                                        </Col>
                                        <Col md={6}>
                                            <Button variant="success" className="mt-4" onClick={this.handleSubmit} disabled={this.state.btn}>
                                                Guardar
                                            </Button>
                                            <Button variant="warning" className="mt-4" onClick={this.busModify} disabled={!this.state.btn} >
                                                Editar
                                            </Button>
                                            <Button variant="secondary" className="mt-4" onClick={this.cleanForm}  >
                                                Limpiar
                                            </Button>
                                        </Col>

                                    </Row>
                                </Card.Body>
                            </Card>

                        </Col>
                        <ToastContainer closeButton={false} position="bottom-right" />
                    </Row>

                </Aux>
            </>
        );
    }
}

export default RegisterBus;
