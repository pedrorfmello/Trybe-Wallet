// Coloque aqui suas actions
export const loginUser = (loginInfo) => ({
  type: 'LOGIN_USER',
  payload: {
    email: loginInfo.email,
    password: loginInfo.senha,
    name: loginInfo.nome,
  },
});

export const requestCurrencies = () => ({
  type: 'REQUEST_CURRENCIES',
});

export const getCurrencies = (currencies) => ({
  type: 'GET_CURRENCIES',
  payload: currencies,
});

export const fetchCurrencies = () => async (dispatch) => {
  dispatch(requestCurrencies());
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const rawCur = await response.json();
  const filterCur = Object.keys(rawCur).filter((key) => key !== 'USDT');
  dispatch(getCurrencies(filterCur));
};

export const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  payload: expense,
});

export const sendExpense = (expense, wallet) => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const rawCur = await response.json();

  const expenseLength = wallet.expenses.length;
  const myExpense = { id: expenseLength, ...expense, exchangeRates: rawCur };

  dispatch(addExpense(myExpense));
};

export const deleteExpense = (expense) => ({
  type: 'DELETE_EXPENSE',
  payload: expense.id,
});
