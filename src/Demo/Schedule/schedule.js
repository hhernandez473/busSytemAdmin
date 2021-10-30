import React from 'react';
import { Row, Col, Card, Form, Button, Table } from 'react-bootstrap';

import controlService from '../../services/control.service';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Table2 from './Table';
import headers from './tableData';
import TableForm from './TableForm';

class RegisterSchedule extends React.Component {

    constructor() {
        super();
        this.getRoutes();
        this.getSchedules();
        this.getUserList();
    }



    state = {
        data: [],
        headers: headers,
        editIdx: -1,
        userList2: [],
        routeList: [],
        scheduleList: [], 
        btn: false,
        scheduleId: 0

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
                (row, j) => (j === i ? { ...row, [name]: ((name == 'driverAssigned') ? JSON.parse(value) : value) } : row)
            )
        })
    }
    setRoute = (e) => {
        const { value } = e.target
        this.setState({
            route: value
        })
        console.log(value)
    }

    createSchedule = () => {

        //console.log(this.state.data);
        const route = this.state.route;
        const detail = this.state.data.map(d => ({ departureTime: d.departureTime, returnTime: d.returnTime, driverAssigned: d.driverAssigned.uid }));
        let name = "";
        if (this.state.data.length > 0) name = this.state.data.find(n => n.name != "").name;

        if (!route) {
            toast.error("Seleccione ruta.");
        }
        controlService.post("/schedule", { route, detail }).then((res) => {
            // this.setState({ townList: res.data.town });
            // this.setList({name: "town", value: res.data.town[0]._id });
            this.setState({
                data: []
            })
            toast.success("Horario creado correctamente.");
        }).catch(error => {
            toast.error(error.data.msg);
        });
    }

    getRoutes() {
        controlService.get("/route").then((res) => {
            this.setState({ routeList: res.data.route });
            this.setState({ route: res.data.route[0]._id });

        }).catch(error => {
            console.log(error);
        });
    }

    getSchedules() {
        controlService.get("/schedule").then((res) => {
            this.setState({ scheduleList: res.data.schedules });


        }).catch(error => {
            console.log(error);
        });
    }

    getUserList() {
        controlService.get("/usuarios").then((res) => {
            this.setState({ userList2: res.data.users });


        }).catch(error => {
            console.log(error);
        });
    }


    editSchedules = (schedule) => {
        const userList = this.state.userList2;
        const editList= schedule.detail.map(
            s => ({
                ...s, 
                driverAssigned: {
                    ...s.driverAssigned,
                    uid:  s.driverAssigned._id
                },  
                userList,
                errors: ""
            }));
        this.setState({ 
            btn: true,
            data: editList,
            scheduleId: schedule._id
        })
        console.log(editList);
    }

    getdriverAssigned= (id) => {
        return this.userList2.find(user => user.uid = id);
    }

    scheduleModify= ()=>{
        if (this.state.data.length <= 0 || this.state.scheduleId <= 0) {
            toast.error("Ingrese horarios");
            return;
        }
        const detail = this.state.data.map(d => ({ departureTime: d.departureTime, returnTime: d.returnTime, driverAssigned: d.driverAssigned.uid }));

        controlService.put(`/schedule/${this.state.scheduleId}`, {  detail }).then((res) => {
            this.cleanForm();
            toast.success("Horarios de bus modificados correctamente.");
        }).catch(error => {
            toast.error(JSON.stringify(error.data.errors, null, 2));
        });
    }

    scheduleDel = (schedule) =>{
        controlService.del(`/schedule/${schedule._id}`).then((res) => {
            this.cleanForm();
            toast.warning("Horario de bus eliminado correctamente.");
        }).catch(error => {
            toast.error(JSON.stringify(error.data.errors, null, 2));
        });
    }

    cleanForm = ()=>{
        this.setState({
            data: [],
            scheduleList: [],
            btn: false

        });
        this.getSchedules();
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
                                                    this.state.scheduleList.map((schedule, i) => (
                                                        <tr key={i}>
                                                            <td key={i + 1}>{i + 1}</td>
                                                            <td key={schedule.id}>{schedule.route.name}</td>
                                                            <td><i className="material-icons btn btn-warning"
                                                                onClick={() => this.editSchedules(schedule)}>edit</i>
                                                            </td>
                                                            <td><i className="material-icons btn btn-danger"
                                                                onClick={() => this.scheduleDel(schedule)}>delete</i>
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
                                    <Col md={6}>
                                        <Button variant="success" onClick={this.createSchedule} disabled={this.state.btn | this.state.data.length < 1} >
                                            Guardar
                                        </Button>
                                        <Button variant="warning" onClick={this.scheduleModify} disabled={!this.state.btn } >
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
                                    <Col md={6}>
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


                {/* <li>{JSON.stringify(this.state.data, null, 2)}</li> */}


            </div >
        )
    }

}

export default RegisterSchedule;
