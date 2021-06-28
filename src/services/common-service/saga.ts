import { call, put, takeLeading, all } from "../../store/effects";
import { apiGet } from "../../common/apiClient";
import { bankCurrencySlice } from "./slice";
function* doBankCurrencyFetch() {
  try {
    const { data } = yield call(apiGet, { path: "currencies.json" });

    yield put(
      bankCurrencySlice.actions.fetchSuccess({
        data,
      })
    );
  } catch (error) {
    const { code, message } = error;
    yield put(
      bankCurrencySlice.actions.fetchError({
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
    takeLeading(bankCurrencySlice.actions.fetch, doBankCurrencyFetch),
  ]);
}
