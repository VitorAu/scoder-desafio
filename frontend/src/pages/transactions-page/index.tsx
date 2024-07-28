import { useState, useEffect } from 'react';
import { IoAdd } from 'react-icons/io5';
import axios from 'axios';
import { Button } from '../../components/button';
import { TransactionsList } from './transaction-list';
import { TransactionModal } from './create-transaction-modal';
import { Transaction } from './types';
import { useNavigate } from 'react-router-dom';

export function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isCreateTransactionModalOpen, setCreateTransactionModalOpen] = useState(false);
  const [viewType, setViewType] = useState<'month' | 'year'>('month');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:9898/transactions');
        setTransactions(response.data);
      } catch (error) {
        console.error('Erro ao buscar transações:', error);
      }
    };

    fetchTransactions();
  }, []);

  const handleToggleViewType = () => {
    setViewType(viewType === 'month' ? 'year' : 'month');
  };
  const openCreateTransactionModal = () => {
    setCreateTransactionModalOpen(true);
  };
  const closeCreateTransactionModal = () => {
    setCreateTransactionModalOpen(false);
  };
  const handleCreateTransaction = async (newTransaction: Omit<Transaction, 'id'>) => {
    try {
      const response = await axios.post('http://localhost:9898/transactions', newTransaction);
      setTransactions([...transactions, response.data]);
      closeCreateTransactionModal();
    } catch (error) {
      console.error('Erro ao criar transação:', error);
    }
  };
  const groupTransactionsByPeriod = (transactions: Transaction[], viewType: 'month' | 'year') => {
    return transactions.reduce((groups, transaction) => {
      const date = new Date(transaction.due_date);
      const key = viewType === 'month'
        ? `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`
        : date.getFullYear().toString();

      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(transaction);
      return groups;
    }, {} as { [key: string]: Transaction[] });
  };
  const handleLogout = () => {
    navigate('/');
  };
  const groupedTransactions = groupTransactionsByPeriod(transactions, viewType);

  return (
    <div className="h-screen w-screen flex flex-col space-y-5 py-8 px-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-5">
          <span className="text-2xl font-bold break-all w-44">
            Contabilidade <span className="text-[#7045ff]">eficiente</span>
          </span>
        </div>
        <div className="flex items-center space-x-5">
          <Button onClick={handleToggleViewType}>
            {viewType === 'month' ? 'Visualizar por Ano' : 'Visualizar por Mês'}
          </Button>
          <Button variant='secondary' onClick={handleLogout}>Sair</Button>
        </div>
      </div>
      <div className="flex flex-col space-y-2 h-full overflow-hidden">
        <div className="px-5 flex items-center justify-between">
          <span className="text-3xl font-bold">Transações</span>
          <Button size="adaptable" onClick={openCreateTransactionModal}>
            <IoAdd className="size-5" />
            <span>Cadastrar nova transação</span>
          </Button>
        </div>
        <TransactionsList groupedTransactions={groupedTransactions} viewType={viewType} />
      </div>

      {isCreateTransactionModalOpen && (
        <TransactionModal
          closeModal={closeCreateTransactionModal}
          createTransaction={handleCreateTransaction}
        />
      )}
    </div>
  );
}
