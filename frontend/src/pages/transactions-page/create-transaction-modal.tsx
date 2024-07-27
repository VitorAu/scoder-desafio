import { useState } from "react";
import { IoCalendarClear, IoClose } from "react-icons/io5";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { ToggleButton } from "../../components/toggleButton";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";

interface CreateTransactionModalProps {
  closeCreateTransactionModal: () => void;
  handleCreateTransaction: (transaction: {
    transaction_title: string;
    transaction_value: string;
    transaction_date: Date;
    transaction_description: string;
    transaction_is_debit: boolean;
    transaction_is_deposit: boolean;
  }) => void;
}

export function CreateTransactionModal({
  closeCreateTransactionModal,
  handleCreateTransaction,
}: CreateTransactionModalProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [isDeposit, setIsDeposit] = useState(true);
  const [isDebit, setIsDebit] = useState(true);

  function openDatePicker() {
    setIsDatePickerOpen(true);
  }
  function closeDatePicker() {
    setIsDatePickerOpen(false);
  }
  function handleDateChange(date: Date | undefined) {
    setSelectedDate(date);
    closeDatePicker();
  }
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const transaction = {
      transaction_title:
        formData.get("transaction_title")?.toString().trim() || "",
      transaction_value:
        formData.get("transaction_value")?.toString().trim() || "",
      transaction_date: selectedDate || new Date(),
      transaction_description:
        formData.get("transaction_description")?.toString() || "",
      transaction_is_debit: isDebit,
      transaction_is_deposit: isDeposit,
    };

    if (
      !transaction.transaction_title ||
      !transaction.transaction_value ||
      !transaction.transaction_date
    ) {
      alert("Formulário incompleto");
      return;
    }

    const transactionValueNumber = parseFloat(transaction.transaction_value);
    if (isNaN(transactionValueNumber) || transactionValueNumber < 0) {
      alert("Valor da transação deve ser um número não negativo");
      return;
    }

    await handleCreateTransaction(transaction);
    closeCreateTransactionModal();
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 bg-[#151518] space-y-5">
        <div className="flex items-center justify-between">
          <span className="text-xl font-semibold">
            Cadastrar nova transação
          </span>
          <button type="button" onClick={closeCreateTransactionModal}>
            <IoClose className="size-5 text-white" />
          </button>
        </div>
        <form
          className="flex flex-col items-center w-full space-y-5"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col w-full items-center space-y-3">
            <Input placeholder="Nome da transação" name="transaction_title" />
            <Input
              placeholder="Valor da transação"
              name="transaction_value"
              type="number"
              step="any"
            />
            <button
              type="button"
              onClick={openDatePicker}
              className="flex items-center gap-2 text-left w-full bg-[#09090b] border border-[#27272a] rounded-lg py-2 px-3 outline-none font-semibold"
            >
              <IoCalendarClear className="size-5 text-[#ffffff]/40" />
              <span className="text-[#ffffff]/40 text-left w-40 flex-1 font-semibold">
                {selectedDate
                  ? format(selectedDate, "dd/MM/yyyy")
                  : "Data de vencimento"}
              </span>
            </button>

            {isDatePickerOpen && (
              <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
                <div className="rounded-xl py-5 px-6 bg-[#151518] space-y-5">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold">
                        Selecione a data
                      </h2>
                      <button type="button" onClick={closeDatePicker}>
                        <IoClose className="size-5 text-white" />
                      </button>
                    </div>
                  </div>
                  <DayPicker
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDateChange}
                  />
                </div>
              </div>
            )}
            <Input
              placeholder="Descrição da transação"
              name="transaction_description"
            />
            <div className="flex w-full justify-between">
              <ToggleButton
                children_on="Entrada"
                children_off="Saída"
                isToggled={isDeposit}
                onToggle={setIsDeposit}
              />
              <ToggleButton
                children_on="Débito"
                children_off="Crédito"
                isToggled={isDebit}
                onToggle={setIsDebit}
              />
            </div>
          </div>
          <Button type="submit" size="full">
            Cadastrar
          </Button>
        </form>
      </div>
    </div>
  );
}
