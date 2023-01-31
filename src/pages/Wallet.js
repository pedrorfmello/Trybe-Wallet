import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/header';
import Form from '../components/form';
import Footer from '../components/footer';
import TableElement from '../components/tableelement';
import '../index.css';
import './Wallet.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import * as actions from '../actions';

class Wallet extends React.Component {
  deleteExpense = (expense) => {
    const { deleteExpense } = this.props;
    deleteExpense(expense);
  }

  render() {
    const { expenses } = this.props;

    return (
      <>
        <Header />
        <Form />
        <table className="table table-hover">
          <thead className="">
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, index) => (<TableElement
              key={ index }
              expense={ expense }
              deleteExpense={ this.deleteExpense }
            />))}
          </tbody>
        </table>
        <Footer />
      </>
    );
  }
}

Wallet.propTypes = {
  user: PropTypes.shape({ name: PropTypes.string }).isRequired,
  wallet: PropTypes.shape({
    expenses: PropTypes.arrayOf(PropTypes.shape({ description: PropTypes.string })),
  }).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    description: PropTypes.string,
  })).isRequired,
  deleteExpense: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  wallet: state.wallet,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (expense) => dispatch(actions.deleteExpense(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
