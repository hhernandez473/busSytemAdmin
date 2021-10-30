import React from 'react';
import { Row, Col, Card, Form, Button, Table } from 'react-bootstrap';

import controlService from '../../services/control.service';

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Table2 from './Table';
import headers from './tableData';
import TableForm from './TableForm';

class StopBus extends React.Component {
    constructor() {
        super();
        this.getRoutes();
        this.getStopBus();
    }

    state = {
        data: [],
        headers: headers,
        editIdx: -1,
        routeList: [],
        stopBusList: [],
        stopBusId: '',
        btn: false
    };

    getStopBus() {
        controlService.get("/stopBus").then((res) => {
            this.setState({ stopBusList: res.data.stopBus });


        }).catch(error => {
            console.log(error);
        });
    }

    editStopBus = (stopbus) => {
       
        const editList = stopbus.detail.map(s =>
            (
                {
                    name: s.name,
                    latitude: s.latitude,
                    longitude: s.longitude
                }
            )
        );
        this.setState({
            btn: true,
            data: editList,
            stopBusId: stopbus._id
        })
        console.log(editList);
    }


    addRow = (item) => {
        const prevState = this.state.data
        const nextState = [...prevState, item]
        this.setState({
            data: nextState
        })
    }



    handleRemove = (i) => {
        this.setState({
            data: this.state.data.filter((item, j) => {
                return j !== i
            })
        })
    }

    startEditing = (i) => {
        this.setState({ editIdx: i })
    }

    stopEditing = (i) => {
        this.setState({ editIdx: -1 })
    }

    handleChange = (e, name, i) => {
        const { value } = e.target
        this.setState({
            data: this.state.data.map(
                (row, j) => (j === i ? { ...row, [name]: value } : row)
            )
        })
    }

    getRoutes() {
        controlService.get("/route").then((res) => {
            this.setState({ routeList: res.data.route });
            this.setState({ route: res.data.route[0]._id });

        }).catch(error => {
            console.log(error);
        });
    }

    setRoute = (e) => {
        const { value } = e.target
        this.setState({
            route: value
        })
        console.log(value)
    }

    createStopBus = () => {
        const route = this.state.route;
        
        if (this.state.data.length <= 0) {
            toast.error("Ingrese paradas de bus");
            return;
        }

        const detail = this.state.data.map(d => ({name: d.name, latitude: d.latitude, longitude: d.longitude }));


       
        controlService.post("/stopBus", { route, detail }).then((res) => {
         
            this.cleanForm();
            toast.success("Paradas de bus creadas correctamente.");
        }).catch(error => {
            toast.error(JSON.stringify(error.data.errors, null, 2));
        });
    }

    stopBusModify= ()=>{
        if (this.state.data.length <= 0 || this.state.stopBusId <= 0) {
            toast.error("Ingrese paradas de bus");
            return;
        }
        const detail = this.state.data.map(d => ({name: d.name, latitude: d.latitude, longitude: d.longitude }));

        controlService.put(`/stopBus/${this.state.stopBusId}`, {  detail }).then((res) => {
            this.cleanForm();
            toast.success("Paradas de bus modificadas correctamente.");
        }).catch(error => {
            toast.error(JSON.stringify(error.data.errors, null, 2));
        });
    }

    stopBusDel = (stopbus) =>{
        controlService.del(`/stopBus/${stopbus._id}`).then((res) => {
            this.cleanForm();
            toast.warning("Parada de bus eliminada correctamente.");
        }).catch(error => {
            toast.error(JSON.stringify(error.data.errors, null, 2));
        });
    }

    cleanForm = ()=>{
        this.setState({
            data: [],
            stopBusList: [],
            btn: false

        });
        this.getStopBus();
    }


    render() {

        return (
            <div className="container" >
                <Row>
                    <Col md={12}>
                        <Card>
                            <Card.Body>
                                <Row>
                                    <Col md={12}>

                                        <Table striped bordered hover size="sm">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Ruta</th>
                                                    <th>Editar</th>
                                                    <th>Eliminar</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.stopBusList.map((stopBus, i) => (
                                                        <tr key={i}>
                                                            <td key={i + 1}>{i + 1}</td>
                                                            <td key={stopBus.id}>{stopBus.route.name}</td>
                                                            <td><i className="material-icons btn btn-warning"
                                                                onClick={() => this.editStopBus(stopBus)}>edit</i>
                                                            </td>
                                                            <td><i className="material-icons btn btn-danger"
                                                                onClick={() => this.stopBusDel(stopBus)}>delete</i>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </Table>
                                    </Col>

                                </Row>

                                <Row>

                                    <Col md={6}>

                                        <Form.Group as={Row} controlId="exampleForm.ControlSelect1">
                                            <Form.Label column sm="2">Ruta</Form.Label>
                                            <Col sm="10">
                                                <Form.Control as="select"
                                                    name="route"
                                                    onChange={
                                                        this.setRoute
                                                    } >
                                                    {this.state.routeList.map(({ _id, name }, index) =>
                                                        <option value={_id} key={index} > {name} </option>
                                                    )}

                                                </Form.Control>
                                            </Col>


                                        </Form.Group>

                                    </Col>
                                    <Col md={6}  >

                                        <Button variant="success" onClick={this.createStopBus} disabled={this.state.btn | this.state.data.length < 1} >
                                            Guardar
                                        </Button>
                                        <Button variant="warning" onClick={this.stopBusModify} disabled={!this.state.btn } >
                                            Editar
                                        </Button>
                                        <Button variant="secondary" onClick={this.cleanForm}  >
                                            Limpiar
                                        </Button>
                                    </Col>
                                </Row>
                                <div className="clearfix"></div>
                                <Row>
                                    <Col md={6}>
                                        <TableForm
                                            addRow={this.addRow}

                                        />
                                    </Col>
                                    <Col md={6} >
                                        <Table2
                                        
                                            headers={headers}
                                            data={this.state.data}
                                            handleRemove={this.handleRemove}
                                            startEditing={this.startEditing}
                                            editIdx={this.state.editIdx}
                                            handleChange={this.handleChange}
                                            stopEditing={this.stopEditing}

                                        />
                                    </Col>

                                </Row>

                            </Card.Body>

                        </Card>

                    </Col>
                    <ToastContainer closeButton={false} position="bottom-right" />
                </Row>





            </div >
        )
    }

}

export default StopBus;
