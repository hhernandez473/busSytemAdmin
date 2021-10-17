import React from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';

import controlService from '../../services/control.service';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Table from './Table';
import headers from './tableData';
import TableForm from './TableForm';

class RegisterSchedule extends React.Component {


    state = {
        data: [],
        headers: headers,
        editIdx: -1,

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

    createSchedule = () => {

        //console.log(this.state.data);
        const detail = this.state.data.map(d => ({ departureTime: d.departureTime, returnTime: d.returnTime }));
        let name = "";
        if (this.state.data.length > 0) name = this.state.data.find(n => n.name != "").name;

        if (!name) {
            toast.error("Ingrese nombre de Horario");
        }
        controlService.post("/schedule", { name, detail }).then((res) => {
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


    render() {

        return (
            <div className="container" >
                <Row>
                    <Col md={12}>
                        <Card>
                            <Card.Body>
                                <Row>
                                    <Col  md={6}>
                                        <Button variant="primary" onClick={this.createSchedule} className="btn-block" >
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


                {/* <li>{JSON.stringify(this.state.data, null, 2)}</li> */}


            </div >
        )
    }

}

export default RegisterSchedule;
