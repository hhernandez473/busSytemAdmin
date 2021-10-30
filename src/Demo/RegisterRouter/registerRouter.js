import React from 'react';
import { Row, Col, Card, Form, Button, Table } from 'react-bootstrap';
import Aux from "../../hoc/_Aux";
import controlService from '../../services/control.service';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
class RegisterRouter extends React.Component {

    constructor() {
        super();
        this.state = {
            form: {
                country: "",
                departament: "",
                municipality: "",
                town: "",
                route: ''
            },
            formErrors: {
                country: null,
                departament: null,
                municipality: null,
                town: null,
                route: '',
                routeID: '',
                btn: false
            },
            countryList: [],
            depList: [],
            muniList: [],
            townList: [],
            routeList: []
        }

        this.getCountries();
        this.getDepartament();
        this.getMunicipality();
        this.getTown();
        this.getRoutes();
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

    setList(list){
        const { name, value } = list;
        const { form, formErrors } = this.state;
        let formObj = {
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
            case "country":
                if (!value) errorMsg = "Seleccione país";
                break;

            case "departament":
                if (!value) errorMsg = "Seleccione departamento";
                break;

            case "municipality":
                if (!value) errorMsg = "Seleccione municipio";
                break;
            case "town":
                if (!value) errorMsg = "Seleccione aldea o zona";
                break;
            case "route":
                if (!value) errorMsg = "Ingrese nombre de ruta";
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
        //console.log(form);
        const { town, route} = form;
        controlService.post( "/route", { town, name: route } ).then((res) => {
            // this.setState({ townList: res.data.town });
            // this.setList({name: "town", value: res.data.town[0]._id });
            toast.success("Ruta creada correctamente.");
            this.getRoutes();
        }).catch(error => {
           toast.error(error.data.msg);
        });
    };

    getCountries() {
        
        controlService.get("/country").then((res) => {
            this.setState({ countryList: res.data.countries })
            this.setList({name: "country", value: res.data.countries[0]._id });
        }).catch(error => {
            console.log(error);
        });

    }

    getDepartament() {

        controlService.get("/departament").then((res) => {
            this.setState({ depList: res.data.departaments })
            this.setList({name: "departament", value: res.data.departaments[0]._id });
        }).catch(error => {
            console.log(error);
        });

    }

    getMunicipality() {

        controlService.get("/municipality").then((res) => {
            this.setState({ muniList: res.data.municipality });
            this.setList({name: "municipality", value: res.data.municipality[0]._id });
        }).catch(error => {
            console.log(error);
        });

    }

    getTown() {

        controlService.get("/town").then((res) => {
            this.setState({ townList: res.data.town });
            this.setList({name: "town", value: res.data.town[0]._id });
        }).catch(error => {
            console.log(error);
        });

    }

    getRoutes(){
        controlService.get("/route").then((res) => {
            this.setState({ routeList: res.data.route });
           
        }).catch(error => {
            console.log(error);
        });
    }

    editRoute = (route) => {
        const { _id,  name } = route;
        this.setState({
            btn: true,
            form: {
                town: route.town._id,
                route: name,
                routeID: _id
            }
        });
        this.setList({name: "town", value: route.town._id });
    }

    render() {
        const { form, formErrors, countryList } = this.state;
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
                                                        <th>Aldea/Zona</th>
                                                        <th>Nombre Ruta</th>
                                                        <th>Editar</th>
                                                        <th>Eliminar</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.state.routeList.map((route, i) => (
                                                            <tr key={i}>
                                                                <td key={i + 1}>{i + 1}</td>
                                                                <td key={route.town._id}>{route.town.name}</td>
                                                                <td key={route.name}>{route.name}</td>
                                                                <td><i className="material-icons btn btn-warning"
                                                                    onClick={() => this.editRoute(route)}>edit</i>
                                                                </td>
                                                                <td><i className="material-icons btn btn-danger"
                                                                    onClick={() => this.getRoutes(route)}>delete</i>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </Table>
                                        </Col>

                                    </Row>
                                    <Row>

                                        <Col md={4}>

                                            <Form.Group controlId="exampleForm.ControlSelect1">
                                                <Form.Label>Pais</Form.Label>
                                                <Form.Control as="select"
                                                    name="country"
                                                    onChange={
                                                        this.handleChange
                                                    }
                                                >
                                                    {this.state.countryList.map(({ _id, name }, index) =>
                                                        <option value={_id} key={index} > {name} </option>
                                                    )}

                                                </Form.Control>
                                                {formErrors.country && (
                                                    <span className="err">{formErrors.country}</span>
                                                )}
                                            </Form.Group>

                                        </Col>
                                        <Col md={4}>

                                            <Form.Group controlId="exampleForm.ControlSelect1">
                                                <Form.Label>Departamento</Form.Label>
                                                <Form.Control as="select"
                                                    name="departament"
                                                    onChange={
                                                        this.handleChange
                                                    }
                                                >
                                                    {this.state.depList.map(({ _id, name }, index) =>
                                                        <option value={_id} key={index} > {name} </option>
                                                    )}

                                                </Form.Control>
                                                {formErrors.departament && (
                                                    <span className="err">{formErrors.departament}</span>
                                                )}
                                            </Form.Group>

                                        </Col>
                                        <Col md={4}>

                                            <Form.Group controlId="exampleForm.ControlSelect1">
                                                <Form.Label>Municipio</Form.Label>
                                                <Form.Control as="select"
                                                    name="municipality"
                                                    onChange={
                                                        this.handleChange
                                                    }
                                                >
                                                    {this.state.muniList.map(({ _id, name }, index) =>
                                                        <option value={_id} key={index} > {name} </option>
                                                    )}

                                                </Form.Control>
                                                {formErrors.municipality && (
                                                    <span className="err">{formErrors.municipality}</span>
                                                )}
                                            </Form.Group>

                                        </Col>
                                        

                                    </Row>
                                    <Row>
                                        <Col md={4}>

                                            <Form.Group controlId="exampleForm.ControlSelect1">
                                                <Form.Label>Zona/Aldea</Form.Label>
                                                <Form.Control as="select"
                                                    name="town"
                                                    onChange={
                                                        this.handleChange
                                                    }
                                                >
                                                    {this.state.townList.map(({ _id, name }, index) =>
                                                        <option value={_id} key={index} > {name} </option>
                                                    )}

                                                </Form.Control>
                                                {formErrors.town && (
                                                    <span className="err">{formErrors.town}</span>
                                                )}
                                            </Form.Group>

                                        </Col>
                                        <Col md={4}>

                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label>Nombre de ruta</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Nombre de ruta"
                                                    name="route"
                                                    value={form.route}
                                                    onChange={this.handleChange}
                                                    onBlur={this.handleChange} />
                                                <Form.Text className="text-muted">

                                                </Form.Text>
                                                {formErrors.route && (
                                                    <span className="err">{formErrors.route}</span>
                                                )}
                                            </Form.Group>

                                        </Col>
                                        <Col md={4}>
                                            <Button variant="primary" className="mt-4" onClick={this.handleSubmit}>
                                                Guardar
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

export default RegisterRouter;
