import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { Button } from '../../components/button';
import { Input } from '../../components/input';
import { ToggleButton } from '../../components/toggleButton';
import { Transaction } from './types';

interface TransactionModalProps {
  closeModal: () => void;
  createTransaction: (transaction: Omit<Transaction, 'id'>) => Promise<void>;
}

export function TransactionModal({ closeModal, createTransaction }: TransactionModalProps) {
  const [isDebit, setIsDebit] = useState(true);
  const [isDeposit, setIsDeposit] = useState(true);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const transaction = {
      title: formData.get('transaction_title')?.toString().trim() || '',
      value: formData.get('transaction_value')?.toString().trim() || '',
      due_date: formData.get('transaction_date')?.toString() || '',
      description: formData.get('transaction_description')?.toString() || '',
      is_debit: isDebit,
      is_deposit: isDeposit,
    };

    if (!transaction.title || !transaction.value || !transaction.due_date) {
      alert('Formulário incompleto');
      return;
    }

    const transactionValueNumber = parseFloat(transaction.value);
    if (isNaN(transactionValueNumber) || transactionValueNumber < 0) {
      alert('Valor da transação deve ser um número não negativo');
      return;
    }

    await createTransaction(transaction as Omit<Transaction, 'id'>);
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 bg-[#151518] space-y-5">
        <div className="flex items-center justify-between">
          <span className="text-xl font-semibold">Cadastrar nova transação</span>
          <button type="button" onClick={closeModal}>
            <IoClose className="size-5 text-white" />
          </button>
        </div>
        <form className="flex flex-col items-center w-full space-y-5" onSubmit={handleSubmit}>
          <div className="flex flex-col w-full items-center space-y-3">
            <Input placeholder="Nome da transação" name="transaction_title" />
            <Input placeholder="Valor da transação" name="transaction_value" type="number" step="any" />
            <Input placeholder="Data de vencimento" name="transaction_date" type="date" />
            <Input placeholder="Descrição da transação" name="transaction_description" />
            <div className="flex w-full justify-between">
              <ToggleButton children_on="Entrada" children_off="Saída" isToggled={isDeposit} onToggle={setIsDeposit} />
              <ToggleButton children_on="Débito" children_off="Crédito" isToggled={isDebit} onToggle={setIsDebit} />
            </div>
          </div>
          <Button type="submit" size="full">Cadastrar</Button>
        </form>
      </div>
    </div>
  );
}
