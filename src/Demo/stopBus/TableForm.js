import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Aux from "../../hoc/_Aux";
class TableForm extends React.Component {
    state = {
        latitude: '',
        longitude: '',
        name: '',
        errors: ''
    };

    validateFields = () => {
        let iserror = false
        const errors = []

        if (!this.state.latitude) {
            iserror = true
            errors.push('La latitude es requerida')
        }
        if (!this.state.longitude) {
            iserror = true
            errors.push('La longitude es requerida')
        }
        if (!this.state.name) {
            iserror = true
            errors.push('El nombre es requerido')
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
        const { name } = this.state;
        const newItem = this.state
        const er = this.validateFields()
        if (!er) {
            this.props.addRow(newItem)
            this.setState({
                latitude: '',
                longitude: '',
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

                            {this.state.errors &&
                                <div className="alert alert-warning" role="alert">
                                    {this.state.errors.map(e => <li>{e}</li>)}
                                </div>
                            }
                            <form onSubmit={this.createRow} autoComplete="off" >
                                <Row>
                                    <Col md={12}>
                                        <input type="text"
                                            onChange={this.handleInputChange}
                                            className="  form-control mb-2"
                                            placeholder="Nombre parada de bus"
                                            name="name" />
                                    </Col>
                                   
                                </Row>
                                <Row>
                                    <Col md={4}>
                                        <input type="number"
                                            onChange={this.handleInputChange}
                                            className="  form-control"
                                            placeholder="latitude"
                                            name="latitude" step="any"  />
                                    </Col>
                                    <Col md={4}>
                                        <input type="number"
                                            onChange={this.handleInputChange}
                                            className=" form-control"
                                            placeholder="longitude"
                                            name="longitude" step="any" />
                                    </Col>
                                    <Col md={4} >
                                        <button type="submit"
                                            className="btn-block btn  btn-raised btn-primary" >
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


