import { ApiResponseGenericError } from "../../common/apiClient";

export type BankCurrencyModel = {
  label: string;
  symbol: string;
  identifier: string;
  disallowDecimal?: boolean;
}

export type BankCurrencyStates = {
  status?: "loading" | "completed" | "error";
  error?: ApiResponseGenericError;
  currencies: BankCurrencyModel[];
};

export type BankCurrencyFetchPayload = {  };
export type BankCurrencyFetchSuccessPayload = { data: BankCurrencyModel[] };
