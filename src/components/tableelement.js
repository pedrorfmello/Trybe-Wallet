import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class TableElement extends React.Component {
  // convertValue veio do repositório de Willian Bomfim (https://github.com/tryber/sd-020-b-project-trybewallet/pull/124/files)
  convertValue = (expense) => {
    const { value, currency, exchangeRates } = expense;
    const valueExchange = exchangeRates[currency].ask;
    return Number(value * valueExchange).toFixed(2);
  }

  findExchange = (expense) => {
    const { currency, exchangeRates } = expense;
    return Number(exchangeRates[currency].ask).toFixed(2);
  }

  findCurrencyName = (expense) => {
    const { currency, exchangeRates } = expense;
    return exchangeRates[currency].name;
  }

  render() {
    const { expense, deleteExpense } = this.props;
    const {
      description,
      tag,
      method,
      value,
    } = expense;

    return (
      <tr className="">
        <td>{description}</td>
        <td>{tag}</td>
        <td>{method}</td>
        <td>{Number(value).toFixed(2)}</td>
        <td>{this.findCurrencyName(expense)}</td>
        <td>{this.findExchange(expense)}</td>
        <td>{this.convertValue(expense)}</td>
        <td>Real</td>
        <td>
          <button
            className="btn btn-danger"
            data-testid="delete-btn"
            type="button"
            onClick={ () => deleteExpense(expense) }
          >
            Deletar
          </button>
        </td>
      </tr>
    );
  }
}

TableElement.propTypes = {
  expense: PropTypes.shape({
    description: PropTypes.string,
    tag: PropTypes.string,
    method: PropTypes.string,
    value: PropTypes.number,
    currency: PropTypes.string,
    exchange: PropTypes.number,
    exchangeCurrency: PropTypes.string,
  }),
}.isRequired;

export default connect(null, null)(TableElement);
