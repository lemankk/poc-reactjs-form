import { useEffect } from "react";
import {
  FormControl as MuiFormControl,
  FormControlLabel,
  FormControlTypeMap,
  FormHelperText,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { KeyboardDatePicker } from "@material-ui/pickers";
import moment from "moment";
import { Controller, useForm } from "react-hook-form";
import styled from "styled-components";
import isCurrency from "validator/lib/isCurrency";
import { ActionBar, Paper } from "../../../components";
import AccountInfoRow from "../components/AccountInfoRow";
import { FormDataType, StepBasedViewProps } from "../types";

const FormControl = styled(MuiFormControl)`
  margin-top: 10px;
  margin-bottom: 10px;
` as OverridableComponent<FormControlTypeMap>;

export default function InstructionView({
  formData = {},
  bankAccounts = [],
  currencies = [],
  onSubmit,
}: StepBasedViewProps) {
  const { handleSubmit, formState, watch, control, setValue } =
    useForm<FormDataType>({
      defaultValues: formData,
      mode: "onChange",
    });
  const editingData = watch();

  // Reset to empty selection for "accountTo" field
  useEffect(() => {
    if (editingData.accountFrom === editingData.accountTo) {
      setValue("accountTo", "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editingData.accountFrom, editingData.accountTo]);

  return (
    <>
      <Paper>
        <Controller
          control={control}
          name="accountFrom"
          rules={{
            required: true,
          }}
          render={({ field, fieldState }) => {
            return (
              <FormControl component="fieldset">
                <FormLabel component="legend">From</FormLabel>
                <Select variant="outlined" {...field}>
                  {bankAccounts.map((bankAccount) => (
                    <MenuItem
                      key={bankAccount.accountIdentifier}
                      value={bankAccount.accountIdentifier}
                    >
                      <AccountInfoRow accountInfo={bankAccount} />
                    </MenuItem>
                  ))}
                </Select>
                {fieldState.error && (
                  <FormHelperText error>
                    {fieldState.error.message}
                  </FormHelperText>
                )}
              </FormControl>
            );
          }}
        />
        <Controller
          control={control}
          name="accountTo"
          rules={{
            required: true,
            validate: {
              invalidAccount: (value) =>
                value !== editingData.accountFrom ||
                "Cannot transfer to this account",
            },
          }}
          render={({ field, fieldState }) => {
            return (
              <FormControl component="fieldset">
                <FormLabel component="legend">To</FormLabel>
                <Select variant="outlined" {...field}>
                  {bankAccounts
                    .filter(
                      (bankAccount) =>
                        bankAccount.accountIdentifier !==
                        editingData.accountFrom
                    )
                    .map((bankAccount) => (
                      <MenuItem
                        key={bankAccount.accountIdentifier}
                        value={bankAccount.accountIdentifier}
                      >
                        <AccountInfoRow accountInfo={bankAccount} />
                      </MenuItem>
                    ))}
                </Select>
                {fieldState.error && (
                  <FormHelperText error>
                    {fieldState.error.message}
                  </FormHelperText>
                )}
              </FormControl>
            );
          }}
        />
        <Controller
          control={control}
          name="action"
          rules={{ required: true }}
          render={({ field, fieldState }) => {
            return (
              <FormControl component="fieldset">
                <FormLabel component="legend">Action</FormLabel>
                <RadioGroup {...field}>
                  <FormControlLabel
                    value="debit"
                    label="Debit"
                    control={<Radio value="debit" />}
                  />
                  <FormControlLabel
                    value="crebit"
                    label="Crebit"
                    control={<Radio value="credit" />}
                  />
                </RadioGroup>
                {fieldState.error && (
                  <FormHelperText error>
                    {fieldState.error.message}
                  </FormHelperText>
                )}
              </FormControl>
            );
          }}
        />
        <Controller
          control={control}
          name="transferDate"
          rules={{
            required: true,
            validate: (value) => moment(value).isValid() || "Invalid date",
          }}
          render={({ field, fieldState }) => {
            return (
              <FormControl component="fieldset">
                <FormLabel component="legend">Transfer Date</FormLabel>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="yyyy-MM-dd"
                  value={moment(field.value).toDate()}
                  onChange={(_, value) => field.onChange(value)}
                  onBlur={field.onBlur}
                  inputRef={field.ref}
                  minDate={moment().format("YYYY-MM-DD")}
                  maxDate={moment().add(45, "days").format("YYYY-MM-DD")}
                />
                {fieldState.error && (
                  <FormHelperText error>
                    {fieldState.error.message}
                  </FormHelperText>
                )}
              </FormControl>
            );
          }}
        />
        <Controller
          control={control}
          name="currency"
          rules={{ required: true }}
          render={({ field, fieldState }) => {
            return (
              <>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Currency</FormLabel>
                  <Select variant="outlined" {...field}>
                    {currencies.map((currencyInfo) => (
                      <MenuItem
                        key={currencyInfo.identifier}
                        value={currencyInfo.identifier}
                      >
                        {currencyInfo.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {fieldState.error && (
                    <FormHelperText>{fieldState.error.message}</FormHelperText>
                  )}
                </FormControl>
              </>
            );
          }}
        />

        <Controller
          control={control}
          name="amount"
          rules={{
            required: true,
            validate: {
              amountFormat: (value) => {
                return (
                  isCurrency(String(value), { allow_decimal: true }) ||
                  "Invalid format"
                );
              },
              minAmount: (value) => {
                return (
                  Number(String(value).replaceAll(/,+/g, "")) > 0 ||
                  "At least larger than 0"
                );
              },
            },
          }}
          render={({ field, fieldState }) => {
            return (
              <>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Amount</FormLabel>
                  <TextField
                    variant="outlined"
                    autoComplete="none"
                    inputProps={{
                      autoCorrect: "false",
                      autoComplete: "false",
                      autoCapitalize: "false",
                    }}
                    {...field}
                  />
                  {fieldState.error && (
                    <FormHelperText error>
                      {fieldState.error.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </>
            );
          }}
        />
      </Paper>
      <ActionBar>
        <ActionBar.Item
          disabled={!formState.isValid}
          variant="contained"
          color="primary"
          disableElevation
          onClick={handleSubmit(
            (validatedFormData) => onSubmit && onSubmit(validatedFormData)
          )}
        >
          Next
        </ActionBar.Item>
      </ActionBar>
    </>
  );
}
