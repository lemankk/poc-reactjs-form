import { Box, Container } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import Progress from "../../components/Progress";
import { useMyAccountList } from "../../services/account-service";
import { useBankCurrencies } from "../../services/common-service";
import { useInjectReducer } from "../../store/utils/injectReducer";
import { useInjectSaga } from "../../store/utils/injectSaga";
import CompletionView from "./screens/CompletionView";
import InstructionView from "./screens/InstructionView";
import PreviewView from "./screens/PreviewView";
import {
  commonSlice,
  insturctionSlice,
  previewSlice,
  reducers,
  saga,
  selectTransferCommonState,
  selectTransferInstructionState,
  selectTransferPreviewState,
} from "./store";
import { rootReducerKey } from "./store/constants";
import { FormDataType, StepBasedViewProps } from "./types";

type StepBasedViewConfigType = {
  ViewComponent: React.ComponentType<StepBasedViewProps>;
  onBack?: () => void;
  onCancel?: () => void;
  onConfirm?: () => void;
  onSubmit?: (formData: FormDataType) => void;
};

export default function TransferForm() {
  const { state: currenciesState } = useBankCurrencies();
  const { state: myAccountListState } = useMyAccountList();

  useInjectSaga({ key: rootReducerKey, saga: saga });
  useInjectReducer({ key: rootReducerKey, reducer: reducers });

  const dispatch = useDispatch();

  const { activeStep } = useSelector(selectTransferCommonState);
  const instructionState = useSelector(selectTransferInstructionState);
  const previewState = useSelector(selectTransferPreviewState);

  const { formData: committedFormData } = instructionState;
  let isBusy = false;

  if (instructionState && instructionState.status === "loading") {
    isBusy = true;
  }
  if (previewState && previewState.status === "loading") {
    isBusy = true;
  }

  const stepViews: StepBasedViewConfigType[] = [
    {
      ViewComponent: InstructionView,
      onSubmit: (formData) => {
        dispatch(insturctionSlice.actions.submit({ formData }));
      },
    },
    {
      ViewComponent: PreviewView,
      onCancel: () => {
        dispatch(commonSlice.actions.reset());
      },
      onBack: () => {
        dispatch(commonSlice.actions.previousStep());
      },
      onConfirm: () => {
        if (!instructionState.token) {
          return;
        }
        // Directly select from redux store
        dispatch(previewSlice.actions.submit());
      },
    },
    {
      ViewComponent: CompletionView,
      onCancel: () => {
        dispatch(commonSlice.actions.reset());
      },
    },
  ];

  const stepViewConfig = stepViews[activeStep - 1];
  if (!stepViewConfig) {
    return null;
  }
  const { ViewComponent } = stepViewConfig;
  const viewProps: StepBasedViewProps = {
    ...stepViewConfig,
    txnId: previewState.txnId,
    currencies: currenciesState.currencies,
    bankAccounts: myAccountListState.accounts,
    formData: committedFormData,
  };
  return (
    <Container>
      <Progress enabled={isBusy}>
        <Box alignItems="center">
          {ViewComponent && <ViewComponent {...viewProps} />}
        </Box>
      </Progress>
    </Container>
  );
}
