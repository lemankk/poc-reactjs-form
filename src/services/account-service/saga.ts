import { call, put, takeLeading, all } from "../../store/effects";

import { bankAccountSlice } from "./slice";
import { apiGet } from "../../common/apiClient";

function* doBankAccountFetch() {
  try {
    const { data } = yield call(apiGet, { path: "accounts.json" });

    yield put(
      bankAccountSlice.actions.fetchSuccess({
        data,
      })
    );
  } catch (error) {
    const { code, message } = error;
    yield put(
      bankAccountSlice.actions.fetchError({
        error: {
          code,
          message,
        },
      })
    );
  }
}

export function* saga() {
  yield all([takeLeading(bankAccountSlice.actions.fetch, doBankAccountFetch)]);
}
