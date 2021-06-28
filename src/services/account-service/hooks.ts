import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useInjectReducer } from "../../store/utils/injectReducer";
import { useInjectSaga } from "../../store/utils/injectSaga";
import { rootReducerKey } from "./constants";
import { reducers } from "./reducers";
import { saga } from "./saga";
import { makeSelectMyBankAccountState } from "./selectors";
import { bankAccountSlice } from "./slice";

export function useAccountService() {
  useInjectReducer({ key: rootReducerKey, reducer: reducers });
  useInjectSaga({ key: rootReducerKey, saga: saga });
}

type UseMyAccountListOptions = {
  autoFetch?: boolean;
};

export function useMyAccountList({
  autoFetch = true,
}: UseMyAccountListOptions = {}) {
  useAccountService();

  const dispatch = useDispatch();
  const state = useSelector(makeSelectMyBankAccountState);

  const fetch = useCallback(() => {
    dispatch(bankAccountSlice.actions.fetch({}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const reset = useCallback(() => {
    dispatch(bankAccountSlice.actions.reset());
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
