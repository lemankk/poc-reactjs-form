import memoize from "lodash/memoize";
import { createSelector } from "@reduxjs/toolkit";

import { rootReducerKey, accountSliceKey } from "./constants";
import { bankAccountInitialStates } from "./slice";
import { BankAccountStates } from "./types";

export const selectAccountServiceState = (state: any) =>
  state[rootReducerKey] || {};

export const selectAccountServiceMyAccountState = (
  state: any
): BankAccountStates =>
  selectAccountServiceState(state)[accountSliceKey] || bankAccountInitialStates;

export const makeSelectMyBankAccountState = createSelector(
  selectAccountServiceMyAccountState,
  (sliceState) => sliceState
);

export const makeSelectMyBankAccountByIdentifer = memoize(
  (identifier?: string) =>
    createSelector(selectAccountServiceMyAccountState, (sliceState) =>
      sliceState.accounts?.find(
        (account) => account.accountIdentifier === identifier
      )
    )
);
