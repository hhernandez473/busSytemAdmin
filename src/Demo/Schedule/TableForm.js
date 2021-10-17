import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Aux from "../../hoc/_Aux";
class TableForm extends React.Component {
    state = {
        departureTime: '',
        returnTime: '',
        name: '',
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
        const name = e.target.name
        this.setState({
            [name]: e.target.value
        })
    }

    createRow = (e) => {
        e.preventDefault();
        const {name} = this.state;
        const newItem = this.state
        const er = this.validateFields()
        if (!er) {
            this.props.addRow(newItem)
            this.setState({
                departureTime: '',
                returnTime: '',
                name: name,
                errors: ''
            })
            e.currentTarget.reset()

        }
    }

    createSchedule = (e) => {
        e.preventDefault();
        
        const newItem = this.state
        e.currentTarget.reset()
        console.log(newItem);
    }



    render() {
        return (
            <>
                <Aux>
                    <Row>
                        <Col>
                            <form onSubmit={this.createSchedule} autoComplete="off" >
                                <Row>
                                    <Col md={12} className="mb-4">
                                        <input type="text"
                                            onChange={this.handleInputChange}
                                            className="form-control"
                                            placeholder="Nombre de Horario"
                                            name="name" />
                                    </Col>

                                    
                                </Row>

                            </form>
                        </Col>
                    </Row>
                    <Row>
                        <Col>

                            {this.state.errors &&
                                <div className="alert alert-warning" role="alert">
                                    {this.state.errors.map(e => <li>{e}</li>)}
                                </div>
                            }
                            <form onSubmit={this.createRow} autoComplete="off" >
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


