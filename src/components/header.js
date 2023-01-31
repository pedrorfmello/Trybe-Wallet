import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './header.css';
import '../index.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

class Header extends React.Component {
  // convertValue veio do repositório de Willian Bomfim (https://github.com/tryber/sd-020-b-project-trybewallet/pull/124/files)
  convertValue = (expense) => {
    const { value, currency, exchangeRates } = expense;
    const valueExchange = exchangeRates[currency].ask;
    return Number(value * valueExchange);
  }

  expenseTotal = () => {
    const { wallet: { expenses } } = this.props;
    const total = expenses.reduce((acc, expense) => acc + this.convertValue(expense), 0);
    return total.toFixed(2);
  };

  render() {
    const { user } = this.props;

    return (
      <header>
        <h1>Carteira</h1>
        <div className="container-direita">
          <div className="usuario">
            <p data-testid="email-field">{user.email}</p>
            <p data-testid="name-field">{user.name}</p>
          </div>
          <div className="despesas">
            <span>Despesa Total: R$</span>
            <span
              data-testid="total-field"
            >
              {`${this.expenseTotal()}`}
            </span>
            <span data-testid="header-currency-field">BRL</span>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  wallet: state.wallet,
});

Header.propTypes = {
  user: PropTypes.shape({ email: PropTypes.string, name: PropTypes.string }),
  wallet: PropTypes.shape({ despesa: PropTypes.number }),
}.isRequired;

export default connect(mapStateToProps, null)(Header);
