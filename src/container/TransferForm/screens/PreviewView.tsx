import moment from "moment";
import { useSelector } from "react-redux";
import { StepBasedViewProps } from "../types";
import { makeSelectMyBankAccountByIdentifer } from "../../../services/account-service";
import { ActionBar, Paper, FieldBox } from "../../../components";
import AccountInfoRow from "../components/AccountInfoRow";

export default function PreviewView({
  formData,
  onBack,
  onConfirm,
}: StepBasedViewProps) {
  const accountFromInfo = useSelector(
    makeSelectMyBankAccountByIdentifer(formData?.accountFrom)
  );
  const accountToInfo = useSelector(
    makeSelectMyBankAccountByIdentifer(formData?.accountTo)
  );
  return (
    <>
      <Paper>
        <h2>Confirm your instruction?</h2>
        {accountFromInfo && (
          <FieldBox label="From">
            <AccountInfoRow accountInfo={accountFromInfo} />
          </FieldBox>
        )}
        {accountToInfo && (
          <FieldBox label="To">
            <AccountInfoRow accountInfo={accountToInfo} />
          </FieldBox>
        )}
        <FieldBox label="Action">{formData?.action}</FieldBox>
        <FieldBox label="Transfer Date">
          {moment(formData?.transferDate).format("YYYY-MM-DD")}
        </FieldBox>
        <FieldBox label="Amount">
          {formData?.currency} {formData?.amount}
        </FieldBox>
      </Paper>
      <ActionBar>
        <ActionBar.Item disableElevation onClick={onBack} variant="contained">
          Back
        </ActionBar.Item>
        <ActionBar.Item
          color="primary"
          disableElevation
          onClick={onConfirm}
          variant="contained"
        >
          Confirm
        </ActionBar.Item>
      </ActionBar>
    </>
  );
}
