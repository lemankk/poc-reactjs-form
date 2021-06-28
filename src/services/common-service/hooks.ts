import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useInjectReducer } from "../../store/utils/injectReducer";
import { useInjectSaga } from "../../store/utils/injectSaga";
import { rootReducerKey } from "./constants";
import { reducers } from "./reducers";
import { saga } from "./saga";
import { makeSelectCurrencyState } from "./selectors";
import { bankCurrencySlice } from "./slice";

export function useCommonService() {
  useInjectReducer({ key: rootReducerKey, reducer: reducers });
  useInjectSaga({ key: rootReducerKey, saga: saga });
}

type UseBankCurrenciesOptions = {
  autoFetch?: boolean;
};

/**
 * Getting bank-wised currencies data
 * @returns
 */
export function useBankCurrencies({
  autoFetch = true,
}: UseBankCurrenciesOptions = {}) {
  useCommonService();

  const dispatch = useDispatch();
  const state = useSelector(makeSelectCurrencyState);

  const fetch = useCallback(() => {
    dispatch(bankCurrencySlice.actions.fetch({}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const reset = useCallback(() => {
    dispatch(bankCurrencySlice.actions.reset());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (autoFetch) {
      fetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    state,
    fetch,
    reset,
  };
}
