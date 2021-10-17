import React from 'react';


import './../../../assets/scss/style.scss';
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
import AuthService from './../../../services/auth.service'
class SignUp1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isToggleOn: true };

        // Este enlace es necesario para hacer que `this` funcione en el callback
        this.handleClick = this.handleClick.bind(this);
        this.login = this.login.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            username: "",
            password: "",

        };
    }

    handleClick() {
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn
        }));
    }

    login() {
        
        
        AuthService.login(this.state.username, this.state.password).then(
            () => {
                this.props.history.push("/dashboard/default");
                window.location.reload();
            }, error => {
                console.log(error);
            }
        )
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    render() {
        return (
            <Aux>
                <Breadcrumb />
                <div className="auth-wrapper ">
                    <div className="auth-content">
                        <div className="auth-bg">
                            <span className="r" />
                            <span className="r s" />
                            <span className="r s" />
                            <span className="r" />
                        </div>
                        <div className="card">
                            <div className="card-body text-center">
                                <div className="mb-4">
                                    <i className="feather icon-user-plus auth-icon" />
                                </div>
                                <h3 className="mb-4">Buses Administración</h3>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="Username" name="username"
                                        value={this.state.username}
                                        onChange={this.onChangeUsername}
                                        />
                                </div>
                                <div className="input-group mb-4">
                                    <input type="password" className="form-control" placeholder="password" type="password"
                                        className="form-control"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.onChangePassword}
                                         />
                                </div>

                                <button className="btn btn-secondary shadow-2 mb-4" onClick={this.login}>Iniciar Sesión</button>


                            </div>
                        </div>
                    </div>
                </div>
            </Aux>
        );
    }
}

export default SignUp1;