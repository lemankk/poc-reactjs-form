import { ApiResponseGenericError } from "../../../common/apiClient";
import { FormDataType } from "../types";

export type TransferCommonStates = {
  activeStep: number;
};
export type TransferInstructionStates = {
  status?: "loading" | "completed" | "error";
  error?: ApiResponseGenericError;
  token?: string;
  formData?: FormDataType;
};
export type TransferPreviewStates = {
  status?: "loading" | "completed" | "error";
  error?: ApiResponseGenericError;
  token?: string;
  txnId?: string;
  formData?: FormDataType;
};

export type TransferInstructionSubmitPayload = { formData: FormDataType };
export type TransferInstructionSubmitSuccessPayload = { token: string };

export type TransferPreviewSubmitPayload = {
  formData: FormDataType;
  token: string;
};
export type TransferPreviewSubmitSuccessPayload = { txnId: string };
