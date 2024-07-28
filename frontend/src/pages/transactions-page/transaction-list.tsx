import { format, parseISO, addDays } from 'date-fns';
import { Transaction } from './types';

interface TransactionsListProps {
  groupedTransactions: { [key: string]: Transaction[] };
  viewType: 'month' | 'year';
}

export function TransactionsList({ groupedTransactions, viewType }: TransactionsListProps) {
  return (
    <div className="p-5 rounded-lg bg-[#151518] h-full flex flex-col w-full space-y-5 overflow-y-auto">
      {Object.entries(groupedTransactions).map(([period, transactions]) => {
        let formattedPeriod: string;
        try {
          if (viewType === 'month') {
            const [yearStr, monthStr] = period.split('-');
            const year = parseInt(yearStr, 10);
            const month = parseInt(monthStr, 10);
            const date = new Date(year, month - 1);
            formattedPeriod = format(date, 'MMMM yyyy');
          } else {
            const year = parseInt(period, 10);
            const date = new Date(year, 0, 1);
            formattedPeriod = format(date, 'yyyy');
          }
        } catch (error) {
          formattedPeriod = period;
        }

        const total = transactions.reduce((sum, transaction) => {
          const transactionValue = parseFloat(transaction.value);
          return transaction.is_deposit ? sum + transactionValue : sum - transactionValue;
        }, 0);

        return (
          <div key={period}>
            <div className="flex justify-between items-center bg-[#09090b] p-4 rounded-lg">
              <span className="text-lg font-semibold">{formattedPeriod}</span>
              <span className="text-lg font-semibold">Total: {total.toFixed(2)}</span>
            </div>
            <div className="flex flex-col space-y-3">
              {transactions.map((transaction) => {
                const parsedDate = addDays(parseISO(transaction.due_date), 1); // Adicionar um dia à data
                return (
                  <div
                    key={transaction.id}
                    className="flex flex-col space-y-3 items-center w-full px-5 py-6 hover:bg-[#09090b]/35 rounded-lg"
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="w-60 truncate text-2xl font-semibold">
                        {transaction.title}
                      </span>
                      <span className="w-36 font-semibold text-center">
                        {format(parsedDate, 'dd-MM-yyyy')}
                      </span>
                      <span className="w-32 font-semibold text-center">
                        {transaction.is_debit ? 'Débito' : 'Crédito'}
                      </span>
                      <span className="w-32 font-semibold text-center">
                        {transaction.is_deposit ? 'Entrada' : 'Saída'}
                      </span>
                      <span className="w-20 text-right font-semibold">
                        {transaction.value}
                      </span>
                    </div>
                    <div className="w-full bg-[#ffffff]/5 h-px" />
                    <span className="w-full text-sm text-[#ffffff]/40 truncate">
                      Descrição: {transaction.description}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
