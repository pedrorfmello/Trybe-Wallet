import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../actions';
import '../index.css';
import './form.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const INITIAL_STATE = {
  value: 0,
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  description: '',
};

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const { dispatchCurrencies } = this.props;
    dispatchCurrencies();
  }

  onChange(e) {
    const { id, value } = e.target;
    this.setState({
      [id]: value,
    });
  }

  onSubmit() {
    const { dispatchExpense, wallet } = this.props;
    const { value, currency, method, tag, description } = this.state;
    dispatchExpense({ value, currency, method, tag, description }, wallet);
    this.setState(INITIAL_STATE);
  }

  render() {
    const { wallet } = this.props;
    const { currencies } = wallet;
    const { value, currency, method, tag, description } = this.state;

    return (
      <div className="form-add form-group">
        <label htmlFor="value">
          Valor
          <input
            className="form-control"
            data-testid="value-input"
            type="number"
            id="value"
            value={ value }
            onChange={ this.onChange }
          />
        </label>
        <label htmlFor="currency">
          moeda
          <select
            className="form-control"
            id="currency"
            name="currency"
            value={ currency }
            onChange={ this.onChange }
          >
            {currencies.map((cur) => (
              <option key={ cur } value={ cur }>{cur}</option>
            ))}
          </select>
        </label>
        <label htmlFor="method">
          Metodo
          <select
            className="form-control"
            data-testid="method-input"
            id="method"
            name="method"
            value={ method }
            onChange={ this.onChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Categoria
          <select
            className="form-control"
            data-testid="tag-input"
            id="tag"
            name="tag"
            value={ tag }
            onChange={ this.onChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <label htmlFor="description">
          Descrição
          <input
            className="form-control"
            data-testid="description-input"
            type="text"
            id="description"
            value={ description }
            onChange={ this.onChange }
          />
        </label>
        <button
          className="btn btn-primary"
          type="button"
          onClick={ this.onSubmit }
        >
          Adicionar Despesa
        </button>
      </div>
    );
  }
}

Form.propTypes = {
  dispatchCurrencies: PropTypes.func.isRequired,
  wallet: PropTypes.shape({ currencies: PropTypes.arrayOf(PropTypes.string) }).isRequired,
  dispatchExpense: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  wallet: state.wallet,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchCurrencies: () => dispatch(actions.fetchCurrencies()),
  dispatchExpense: (expense, wallet) => (dispatch(actions.sendExpense(expense, wallet))),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
