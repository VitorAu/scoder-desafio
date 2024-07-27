import { IoAdd } from "react-icons/io5";
import { Button } from "../../components/button";
import { TransactionHeader } from "./transaction-header";
import { useState } from "react";
import { CreateTransactionModal } from "./create-transaction-modal";
import { TransactionsList } from "./transactions-list";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

export interface Transaction {
  transaction_title: string;
  transaction_value: string;
  transaction_date: Date;
  transaction_description: string;
  transaction_is_debit: boolean;
  transaction_is_deposit: boolean;
}

export function TransactionsPage() {
  const [isCreateTransactionModalOpen, setIsCreateTransactionModalOpen] =
    useState(false);
  const [transactionsToList, setTransactionsToList] = useState<Transaction[]>([
    {
      transaction_title: "Spotify",
      transaction_value: "23.00",
      transaction_date: new Date(),
      transaction_description: "pagamento de boleto",
      transaction_is_debit: true,
      transaction_is_deposit: true,
    },
  ]);
  const [viewType, setViewType] = useState<"month" | "year">("month");
  const navigate = useNavigate();

  function openCreateTransactionModal() {
    setIsCreateTransactionModalOpen(true);
  }
  function closeCreateTransactionModal() {
    setIsCreateTransactionModalOpen(false);
  }
  function handleCreateTransaction(transaction: Transaction) {
    setTransactionsToList([...transactionsToList, transaction]);
  }
  function handleLogOffButton() {
    navigate(`/`);
  }
  function handleToggleViewType(viewType: "month" | "year") {
    setViewType(viewType);
  }
  function groupTransactionsByPeriod(
    transactions: Transaction[],
    viewType: "month" | "year"
  ) {
    return transactions.reduce((groups, transaction) => {
      const period = format(
        transaction.transaction_date,
        viewType === "month" ? "yyyy-MM" : "yyyy"
      );
      if (!groups[period]) {
        groups[period] = [];
      }
      groups[period].push(transaction);
      return groups;
    }, {} as { [key: string]: Transaction[] });
  }

  const groupedTransactions = groupTransactionsByPeriod(
    transactionsToList,
    viewType
  );

  return (
    <div className="h-screen w-screen flex flex-col space-y-5 py-8 px-12">
      <TransactionHeader
        handleLogOffButton={handleLogOffButton}
        onToggleViewType={handleToggleViewType}
      />
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
