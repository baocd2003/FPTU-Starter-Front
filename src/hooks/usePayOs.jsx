import { useCallback, useState } from "react";
import payOsApiInstance from "../utils/apiInstance/payOsApiInstance";
import useGenSignature from "./useGenSignature";
import { ErrorRounded } from "@mui/icons-material";


export const loadWalletMoney = async (inputAmount) => {
  // const cancelUrl = "http://localhost:5173/";
  // const returnUrl = "http://localhost:5173/";

  const cancelUrl = import.meta.env.VITE_APP_URL.toString();
  const returnUrl = import.meta.env.VITE_APP_URL.toString();


  const orderCode = Math.floor(Date.now());
  const expiredAt = Math.floor(Date.now() / 1000) + 300;
  const amount = Number(inputAmount);
  const description = "";


  const signatureParams = {
    amount,
    cancelUrl,
    description,
    orderCode,
    returnUrl,
  };

  const signature = useGenSignature(signatureParams);

  const requestData = {
    orderCode,
    amount,
    description,
    buyerName: null,
    buyerEmail: null,
    buyerPhone: null,
    buyerAddress: null,
    items: [
    ],
    cancelUrl,
    returnUrl,
    expiredAt,
    signature,
  };

  try {
    const res = await payOsApiInstance.post("/v2/payment-requests", requestData);
    console.log(res);
    return res.data;
  } catch (err) {
    return err.response.data
  }
}

export const getPayOSTransaction = async (orderCode) => {
  try {
    const res = await payOsApiInstance.get(`/v2/payment-requests/${orderCode}`);
    return res;
  } catch (err) {
    return err.response.data
  }
}