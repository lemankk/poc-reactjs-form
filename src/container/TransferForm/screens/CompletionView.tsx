

import { StepBasedViewProps } from "../types";
import { ActionBar, Paper, FieldBox } from "../../../components";
import AccountInfoRow from "../components/AccountInfoRow";
import { useSelector } from "react-redux";
import { makeSelectMyBankAccountByIdentifer } from "../../../services/account-service";
import moment from "moment";

export default function InstructionView({
  onCancel,
  formData,
  txnId = "-",
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
        <h2>Your transaction has been submitted</h2>
        <p>Transaction ID: {txnId}</p>
      </Paper>
      <Paper>
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
        <ActionBar.Item variant="contained" onClick={onCancel}>
          Done
        </ActionBar.Item>
      </ActionBar>
    </>
  );
}
