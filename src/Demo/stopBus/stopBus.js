import React from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';

import controlService from '../../services/control.service';

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Table from './Table';
import headers from './tableData';
import TableForm from './TableForm';

class StopBus extends React.Component {
    constructor() {
        super();
        this.getRoutes();
    }

    state = {
        data: [],
        headers: headers,
        editIdx: -1,
        routeList: []
    };


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
        console.log(route);

        //     //console.log(this.state.data);
        if (this.state.data.length <= 0){
            toast.error("Ingrese paradas de bus");
            return;
        }
            
        const detail = this.state.data.map(d => ({ latitude: d.latitude, longitude: d.longitude }));
        console.log(detail);

        //     if (!name) {
        //         toast.error("Ingrese nombre de Horario");
        //     }
            controlService.post("/stopBus", { route, detail }).then((res) => {
                // this.setState({ townList: res.data.town });
                // this.setList({name: "town", value: res.data.town[0]._id });
                this.setState({
                    data: []
                })
                toast.success("Paradas de bus creadas correctamente.");
            }).catch(error => {
                toast.error(JSON.stringify(error.data.errors, null , 2));
            });
    }


    render() {

        return (
            <div className="container" >
                <Row>
                    <Col md={12}>
                        <Card>
                            <Card.Body>

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

                                        <Button variant="primary" onClick={this.createStopBus} className="btn-block" >
                                            Guardar
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
                                    <Col md={6}>
                                        <Table
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
