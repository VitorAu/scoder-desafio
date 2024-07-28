export interface Transaction {
  id: string;
  title: string;
  due_date: string;
  value: string;
  description: string;
  is_debit: boolean;
  is_deposit: boolean;
}
