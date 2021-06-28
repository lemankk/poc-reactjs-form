import { ApiResponseGenericError } from "../../common/apiClient";

export enum BankAccountEnum {
  Saving = "SAVING",
  Current = "CURRENT",
};

export type BankAccountModel = {
  accountIdentifier: string;
  accountName: string;
  accountNo: string;
  accountType: BankAccountEnum;
  currency: string;
  balance: string;

}

export type BankAccountStates = {
  status?: "loading" | "completed" | "error";
  error?: ApiResponseGenericError;
  accounts?: BankAccountModel[];
};


export type BankAccountFetchPayload = {  };
export type BankAccountFetchSuccessPayload = { data: BankAccountModel[] };
