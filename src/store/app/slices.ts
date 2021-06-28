import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export const languageSlice = createSlice({
  name: "app/language",
  initialState: {
    locale: 'en-US',
  },
  reducers: {
    changeLocale: (state, action: PayloadAction<{locale: string}>) => {
      state.locale = action.payload.locale;
    }
  }
})