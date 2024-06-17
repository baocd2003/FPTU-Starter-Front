import walletApiInstance from "../utils/apiInstance/walletApiInstance";

export const addLoadedMoneyToWallet = async (transactionData) => {
  try {
    const { walletId, amount, createdDate } = transactionData

    const date = new Date(createdDate);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    const res = await walletApiInstance.post(`/add-loaded-money?walletId=${walletId}&amount=${amount}&createdDate=${formattedDate}`);
    console.log(res);
  } catch (err) {
    console.log(err);
    return err.response?.data;
  }
};