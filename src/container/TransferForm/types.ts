import { BankAccountModel } from "../../services/account-service";
import { BankCurrencyModel } from "../../services/common-service";


export type FormDataType = {
  accountFrom: string;
  accountTo: string;
  transferDate: Date | string;
  action: "debit" | "credit";
  currency: string;
  amount: number;
};

export type StepBasedViewProps = {
  formData?: Partial<FormDataType>;
  txnId?: string;
  bankAccounts?: BankAccountModel[];
  currencies?: BankCurrencyModel[];
  onBack?: () => void;
  onSubmit?: (formData: FormDataType) => void;
  onConfirm?: () =>void;
  onCancel?: () => void;
}
