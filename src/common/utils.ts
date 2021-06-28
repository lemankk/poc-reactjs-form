export const amountTextToNumber = (value: string) =>
  Number(value.replace(/[^0-9\.-]+/g, ""));

export const numberToCurrencyAmount = (
  value: number,
  currency: string,
  locale: string = "en-US"
) =>
  new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    currencyDisplay: "",
  }).format(value);
