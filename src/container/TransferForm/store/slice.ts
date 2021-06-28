import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";
import { ApiResponseErrorPayloadAction } from "../../../common/apiClient";
import { FormDataType } from "../types";
import {
  previewSliceKey,
  rootReducerKey,
  instructionSliceKey,
  commonSliceKey,
} from "./constants";
import {
  TransferCommonStates,
  TransferInstructionStates,
  TransferInstructionSubmitPayload,
  TransferInstructionSubmitSuccessPayload,
  TransferPreviewStates,
  TransferPreviewSubmitSuccessPayload,
} from "./types";

export const getDefaultFormData = (): FormDataType => {
  const out: FormDataType = {
    accountFrom: '',
    accountTo: '',
    action: 'credit',
    transferDate: moment().format('YYYY-MM-DD'),
    currency: '',
    amount: 0,
  }
  return out;
}

export const commonInitialStates: TransferCommonStates = {
  activeStep: 1,
};
export const commonSlice = createSlice({
  name: `${rootReducerKey}/${commonSliceKey}`,
  initialState: commonInitialStates,
  reducers: {
    reset: (state) => {
      state.activeStep = 1;
    },
    gotoStep: (
      state,
      action: PayloadAction<{step: number}>
    ) => {
      state.activeStep = action.payload.step;
    },
    previousStep: (
      state,
    ) => {
      state.activeStep --;
      if (state.activeStep < 1) {
        state.activeStep = 1;
      }
    },
    nextStep: (
      state,
    ) => {
      state.activeStep ++;
    },
  },
});

export const instructionInitialStates: TransferInstructionStates = {
  formData: getDefaultFormData()
};

export const insturctionSlice = createSlice({
  name: `${rootReducerKey}/${instructionSliceKey}`,
  initialState: instructionInitialStates,
  reducers: {
    reset: (state) => {
      state.status = undefined;
      state.error = undefined;
      state.token = undefined;
      state.status = undefined;
      state.formData = getDefaultFormData();
    },
    submit: (
      state,
      action: PayloadAction<TransferInstructionSubmitPayload>
    ) => {
      state.status = "loading";
      state.formData = action.payload.formData;
    },
    submitSuccess: (
      state,
      action: PayloadAction<TransferInstructionSubmitSuccessPayload>
    ) => {
      state.status = "completed";
      state.token = action.payload.token;
    },
    submitError: (state, action: ApiResponseErrorPayloadAction) => {
      state.status = "error";
      state.error = action.payload.error;
    },
  },
  extraReducers: {
    [commonSlice.actions.reset.toString()]: (state) => {
      state.status = undefined;
      state.error = undefined;
      state.token = undefined;
      state.status = undefined;
      state.formData = getDefaultFormData();
    }
  },
});

export const previewInitialStates: TransferPreviewStates = {};
export const previewSlice = createSlice({
  name: `${rootReducerKey}/${previewSliceKey}`,
  initialState: previewInitialStates,
  reducers: {
    reset: (state) => {
      state.status = undefined;
      state.error = undefined;
      state.token = undefined;
      state.status = undefined;
      state.txnId = undefined;
    },
    submit: (state) => {
      state.status = "loading";
    },
    submitSuccess: (
      state,
      action: PayloadAction<TransferPreviewSubmitSuccessPayload>
    ) => {
      state.status = "completed";
      state.txnId = action.payload.txnId;
    },
    submitError: (state, action: ApiResponseErrorPayloadAction) => {
      state.status = "error";
      state.error = action.payload.error;
    },
  },
  extraReducers: {
    [commonSlice.actions.reset.toString()]: (state) => {
      state.status = undefined;
      state.error = undefined;
      state.token = undefined;
      state.status = undefined;
      state.txnId = undefined;
    }
  }
});
