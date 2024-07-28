import axios from 'axios';

interface Transaction {
  transaction_title: string;
  transaction_value: string;
  transaction_date: Date;
  transaction_description: string;
  transaction_is_debit: boolean;
  transaction_is_deposit: boolean;
}

const api = axios.create({
  baseURL: 'http://localhost:9898',
});

export async function loginUser(userLogin: { user_email: string; user_password: string }) {
  const response = await api.post('/users/login', userLogin);
  return response.data;
}

export async function registerUser(userRegister: { user_name: string; user_email: string; user_password: string }) {
  const response = await api.post('/users', userRegister);
  return response.data;
}

export async function createTransaction(transaction: Transaction) {
  const response = await api.post('/transactions', transaction);
  return response.data;
}

export async function getTransactions() {
  const response = await api.get('/transactions');
  return response.data;
}
