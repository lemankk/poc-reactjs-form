import { call, put, takeLeading, all } from "../../../store/effects";
import { apiGet } from "../../../common/apiClient";
import { PayloadAction } from "@reduxjs/toolkit";
import { commonSlice, insturctionSlice, previewSlice } from "./slice";
import {
  TransferInstructionSubmitPayload,
} from "./types";
import { select } from "redux-saga/effects";
import { selectTransferInstructionState } from "./selectors";

/**
 * Submit instruction data to backend for server-side form validation(Suppose)
 * And getting token for CSRF
 * @param action
 */
function* doInstructionSubmit(
  action: PayloadAction<TransferInstructionSubmitPayload>
) {
  try {
    const { data } = yield call(apiGet, {
      path: "transfer/preview.json",
      body: action.payload.formData,
    });
    const { token } = data;

    yield put(
      insturctionSlice.actions.submitSuccess({
        token,
      })
    );
    yield put(commonSlice.actions.nextStep())
  } catch (error) {
    const { code, message } = error;
    yield put(
      insturctionSlice.actions.submitError({
        error: {
          code,
          message,
        },
      })
    );
  }
}

/**
 * Perform when user verified instruction and execute
 * instruction in backend to create transaction id
 * @param action
 */
function* doPreviewSubmit() {
  try {
    const { token, formData } = yield select(selectTransferInstructionState);
    const { data } = yield call(apiGet, {
      path: "transfer/success.json",
      body: {
        ...formData,
        token,
      },
    });
    const { txnId } = data;

    yield put(
      previewSlice.actions.submitSuccess({
        txnId,
      })
    );
    yield put(commonSlice.actions.nextStep())
  } catch (error) {
    const { code, message } = error;
    yield put(
      previewSlice.actions.submitError({
        error: {
          code,
          message,
        },
      })
    );
  }
}

export function* saga() {
  yield all([
    takeLeading(insturctionSlice.actions.submit, doInstructionSubmit),
    takeLeading(previewSlice.actions.submit, doPreviewSubmit),
  ]);
}
