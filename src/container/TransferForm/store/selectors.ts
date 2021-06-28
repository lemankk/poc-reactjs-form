import {
  instructionSliceKey,
  rootReducerKey,
  previewSliceKey,
  commonSliceKey,
} from "./constants";
import { commonInitialStates, instructionInitialStates, previewInitialStates } from "./slice";
import { TransferCommonStates, TransferInstructionStates, TransferPreviewStates } from "./types";

export const selectTransferRootState = (state: any) =>
  state[rootReducerKey] || {};
export const selectTransferSliceState = (
  state: any,
  sliceName: string,
  initial: any = {}
) => {
  const rootState = selectTransferRootState(state);

  return rootState[sliceName] || initial;
};

export const selectTransferCommonState = (
  state: any
): TransferCommonStates =>
  selectTransferSliceState(
    state,
    commonSliceKey,
    commonInitialStates
  );

export const selectTransferInstructionState = (
  state: any
): TransferInstructionStates =>
  selectTransferSliceState(
    state,
    instructionSliceKey,
    instructionInitialStates
  );

export const selectTransferPreviewState = (state: any): TransferPreviewStates =>
  selectTransferSliceState(state, previewSliceKey, previewInitialStates);
