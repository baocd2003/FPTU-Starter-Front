import { useState, useCallback } from 'react';
import CryptoJS from 'crypto-js';

const CHECKSUM_KEY = "213fb0a633078ccd55b0ec61bb08ea2e264bde7fcfdfcd779ccd0c48b52dcae7";

const useGenSignature = (signatureParams) => {
  const { amount, cancelUrl, description, orderCode, returnUrl } = signatureParams

  const dataString = `amount=${amount}&cancelUrl=${cancelUrl}&description=${description}&orderCode=${orderCode}&returnUrl=${returnUrl}`;
  const hash = CryptoJS.HmacSHA256(dataString, CHECKSUM_KEY);
  const hexSignature = hash.toString(CryptoJS.enc.Hex);

  return hexSignature;
}

export default useGenSignature;