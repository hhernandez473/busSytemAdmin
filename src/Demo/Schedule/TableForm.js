import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import Aux from "../../hoc/_Aux";
import controlService from '../../services/control.service';
class TableForm extends React.Component {

    constructor() {
        super();
        this.getUserList();
    }



    state = {
        departureTime: '',
        returnTime: '',
        driverAssigned: '',
        userList: [],
        errors: ''
    };

    validateFields = () => {
        let iserror = false
        const errors = []

        if (!this.state.departureTime) {
            iserror = true
            errors.push('La hora de salida es requerida')
        }
        if (!this.state.returnTime) {
            iserror = true
            errors.push('La hora de retorno es requerida')
        }
        if (iserror) {
            this.setState({ errors })
        }

        return iserror
    }

    handleInputChange = (e) => {
        const { value } = e.target
        const name = e.target.name
        
        this.setState({
            [name]: (name == 'driverAssigned')?JSON.parse(value): value
        })
    }

    createRow = (e) => {
        e.preventDefault();
        const { name } = this.state;
        const newItem = this.state
        const er = this.validateFields()
        if (!er) {
            this.props.addRow(newItem)
            this.setState({
                departureTime: '',
                returnTime: '',
                driverAssigned: '',
                name: name,
                errors: ''
            })
            e.currentTarget.reset()
            this.getUserList();
        }
    }

    createSchedule = (e) => {
        e.preventDefault();

        const newItem = this.state
        e.currentTarget.reset();
        this.getUserList();
        console.log(newItem);
    }

    getUserList() {
        controlService.get("/usuarios").then((res) => {
            this.setState({ userList: res.data.users, driverAssigned: res.data.users[0] });


        }).catch(error => {
            console.log(error);
        });
    }



    render() {
        return (
            <>
                <Aux>

                    <Row>
                        <Col>

                            {this.state.errors &&
                                <div className="alert alert-warning" role="alert">
                                    {this.state.errors.map(e => <li>{e}</li>)}
                                </div>
                            }
                            <form onSubmit={this.createRow} autoComplete="off" >
                                <Row>
                                    <Col>
                                        <Form.Group as={Row} controlId="exampleForm.ControlSelect1">
                                            <Form.Label column sm="4">Conductores</Form.Label>
                                            <Col sm="8">
                                                <Form.Control as="select"
                                                    name="driverAssigned"
                                                    onChange={
                                                        this.handleInputChange
                                                    } >
                                                    {this.state.userList.map((res, index) =>
                                                        <option value={JSON.stringify(res)} key={index} > {res.name} </option>
                                                    )}

                                                </Form.Control>
                                            </Col>


                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={4}>
                                        <input type="text"
                                            onChange={this.handleInputChange}
                                            className="form-control"
                                            placeholder="Hora salida"
                                            name="departureTime" />
                                    </Col>
                                    <Col md={4}>
                                        <input type="text"
                                            onChange={this.handleInputChange}
                                            className="form-control"
                                            placeholder="Hora retorno"
                                            name="returnTime" />
                                    </Col>
                                    <Col md={4}>
                                        <button type="submit"
                                            className="btn-block btn btn-raised btn-primary">
                                            Agregar
                                        </button>
                                    </Col>
                                </Row>

                            </form>



                        </Col>
                    </Row>

                </Aux>

            </>

        )
    }
}




export default TableForm


