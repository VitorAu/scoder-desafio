import { useState, useEffect } from "react";
import { IoAdd } from "react-icons/io5";
import { Button } from "../../components/button";
import { CreateTransactionModal } from "./create-transaction-modal";
import { TransactionsList } from "./transactions-list";
import { format } from "date-fns";
import { createTransaction } from "../../lib/axios";

export interface Transaction {
  transaction_title: string;
  transaction_value: string;
  transaction_date: Date;
  transaction_description: string;
  transaction_is_debit: boolean;
  transaction_is_deposit: boolean;
}

function isValidDate(d: unknown): boolean {
  return d instanceof Date && !isNaN(d.getTime());
}

export function TransactionsPage() {
  const [isCreateTransactionModalOpen, setIsCreateTransactionModalOpen] =
    useState(false);
  const [transactionsToList, setTransactionsToList] = useState<Transaction[]>(
    []
  );
  const [viewType, setViewType] = useState<"month" | "year">("month");

  function openCreateTransactionModal() {
    setIsCreateTransactionModalOpen(true);
  }
  function closeCreateTransactionModal() {
    setIsCreateTransactionModalOpen(false);
  }
  async function handleCreateTransaction(transaction: Transaction) {
    try {
      const newTransaction = await createTransaction(transaction);
      console.log("New transaction from API:", newTransaction);
      setTransactionsToList((prevTransactions) => [
        ...prevTransactions,
        newTransaction,
      ]);
      console.log("Updated transactions list:", transactionsToList);
    } catch (error) {
      console.error("Error creating transaction:", error);
    }
  }

  function handleToggleViewType() {
    setViewType((prevViewType) =>
      prevViewType === "month" ? "year" : "month"
    );
  }

  function groupTransactionsByPeriod(
    transactions: Transaction[],
    viewType: "month" | "year"
  ) {
    console.log("Transactions to be grouped:", transactions);
    return transactions.reduce((groups, transaction) => {
      const date = new Date(transaction.transaction_date);
      console.log("Transaction date:", date);

      if (!isValidDate(date)) {
        console.log("Invalid date:", transaction.transaction_date);
        return groups; // Ignora transações com data inválida
      }

      const period = format(date, viewType === "month" ? "yyyy-MM" : "yyyy");
      if (!groups[period]) {
        groups[period] = [];
      }
      groups[period].push(transaction);
      return groups;
    }, {} as { [key: string]: Transaction[] });
  }

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const response = await fetch("http://localhost:9898/transactions");
        const data: Transaction[] = await response.json();
        setTransactionsToList(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    }

    fetchTransactions();
  }, []);

  useEffect(() => {
    console.log("Transactions list updated:", transactionsToList);
  }, [transactionsToList]);

  const groupedTransactions = groupTransactionsByPeriod(
    transactionsToList,
    viewType
  );
  console.log(
    "Grouped transactions:",
    JSON.stringify(groupedTransactions, null, 2)
  );

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
            {viewType === "month" ? "Visualizar por Ano" : "Visualizar por Mês"}
          </Button>
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
        <TransactionsList
          groupedTransactions={groupedTransactions}
          viewType={viewType}
        />
      </div>

      {isCreateTransactionModalOpen && (
        <CreateTransactionModal
          closeCreateTransactionModal={closeCreateTransactionModal}
          handleCreateTransaction={handleCreateTransaction}
        />
      )}
    </div>
  );
}
