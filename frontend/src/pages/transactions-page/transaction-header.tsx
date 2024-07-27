import { Button } from "../../components/button";
import { useState } from "react";

interface TransactionHeaderProps {
  handleLogOffButton: () => void;
  onToggleViewType: (viewType: "month" | "year") => void;
}

export function TransactionHeader({
  handleLogOffButton,
  onToggleViewType,
}: TransactionHeaderProps) {
  const [isMonthlyView, setIsMonthlyView] = useState(true);

  function handleToggle() {
    setIsMonthlyView(!isMonthlyView);
    onToggleViewType(isMonthlyView ? "year" : "month");
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-5">
        <span className="text-2xl font-bold break-all w-44">
          Contabilidade <span className="text-[#7045ff]">eficiente</span>
        </span>
      </div>
      <div className="flex items-center space-x-5">
        <Button onClick={handleToggle}>
          {isMonthlyView ? "Visualizar por Ano" : "Visualizar por Mês"}
        </Button>
        <Button variant="secondary" onClick={handleLogOffButton}>
          Sair
        </Button>
      </div>
    </div>
  );
}
