import { createSelector } from "@reduxjs/toolkit";

import { rootReducerKey, currenciesSliceKey } from "./constants";
import { bankCurrencyInitialStates } from "./slice";
import { BankCurrencyStates } from "./types";

export const selectCommonServiceState = (state: any) =>
  state[rootReducerKey] || {};

export const selectCommonServiceCurrencyState = (
  state: any
): BankCurrencyStates =>
  selectCommonServiceState(state)[currenciesSliceKey] ||
  bankCurrencyInitialStates;

export const makeSelectCurrencyState = createSelector(
  selectCommonServiceCurrencyState,
  (sliceState) => sliceState
);
