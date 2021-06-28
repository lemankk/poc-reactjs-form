import React from "react";
import { Box } from "@material-ui/core";
import { BankAccountModel } from "../../../services/account-service";

export default function AccountInfoRow({
  accountInfo,
}: {
  accountInfo: BankAccountModel;
}) {
  return (
    <>
      <Box flexDirection="column">
        <Box marginBottom="2px" fontWeight="bold">
          {accountInfo.accountNo} {accountInfo.accountType}
        </Box>
        <Box fontSize="12px">
          {accountInfo.currency} {accountInfo.balance}
        </Box>
      </Box>
    </>
  );
}
