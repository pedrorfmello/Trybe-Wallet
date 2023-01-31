import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Carteira from '../image/wallet.png';
import './Login.css';
import '../index.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import * as actions from '../actions';

const emailState = {
  email: '',
  senha: '',
  nome: '',
  error: {
    email: '',
    password: '',
  },
  buttonDisabled: true,
};

class Login extends React.Component {
  constructor() {
    super();
    this.state = emailState;
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const { buttonDisabled } = this.state;
    const { id, value } = e.target;
    this.setState({
      [id]: value,
    });

    this.setState({ buttonDisabled: true }, () => {
      if (this.emailValidation() && this.passwordValidation()) {
        this.setState({
          buttonDisabled: false,
        });
      }
    });

    if (!buttonDisabled) {
      this.setState({
        error: { email: '', password: '' },
      });
    }
  }

  onSubmit() {
    const { email, senha, nome } = this.state;
    const { history } = this.props;
    const loginInfo = { email, senha, nome };

    const { dispatchLogin } = this.props;

    if (this.emailValidation() && this.passwordValidation()) {
      dispatchLogin(loginInfo);
      history.push('/carteira');
    }
  }

  emailValidation() {
    const { email, error } = this.state;
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (!email || regex.test(email) === false) {
      return false;
    }

    this.setState({
      error: { ...error, email: '' },
    });
    return true;
  }

  passwordValidation() {
    const { senha, error } = this.state;
    const passMinLength = 6;
    if (!senha || senha.length < passMinLength) {
      this.setState({
        error: { ...error, password: 'Mínimo de 6 caracteres' },
      });
      return false;
    }

    this.setState({
      error: { ...error, password: '' },
    });
    return true;
  }

  render() {
    const { email, senha, nome, error, buttonDisabled } = this.state;

    return (
      <div className="form form-group">
        <img src={ Carteira } alt="trybewallet" className="logo" />
        <h4>Bem vindo a TrybeWallet.</h4>
        <h6>Faça o cadastro e entre</h6>
        <div className="form-group mb-3">
          <div className="inputForm">
            <strong>Nome</strong>
            <input
              id="nome"
              type="text"
              name="nome"
              value={ nome }
              onChange={ this.onChange }
              className="form-control"
            />
          </div>

          <div className="inputForm">
            <strong>Email</strong>
            <input
              data-testid="email-input"
              id="email"
              type="email"
              name="email"
              value={ email }
              onChange={ this.onChange }
              className="form-control"
            />
            <span className="text-danger">{error.email}</span>
          </div>

          <div className="inputForm">
            <strong>Senha</strong>
            <input
              data-testid="password-input"
              id="senha"
              type="password"
              name="senha"
              value={ senha }
              onChange={ this.onChange }
              className="form-control"
            />
            <span className="text-danger">{error.password}</span>
          </div>
        </div>
        <div className="d-grid">
          <button
            type="submit"
            className="btn btn-dark"
            onClick={ () => this.onSubmit() }
            disabled={ buttonDisabled }
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchLogin: (loginInfo) => dispatch(actions.loginUser(loginInfo)),
});

Login.propTypes = {
  dispatchLogin: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
