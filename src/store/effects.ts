import * as Effects from "redux-saga/effects";

// Fix for typescript
export const call: any = Effects.call;
export const all: any = Effects.all;
export const put: any = Effects.put;
export const takeLeading: any = Effects.takeLeading;
export const takeLatest: any = Effects.takeLatest;