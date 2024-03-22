import { getRequest, postRequest } from "@/utils/api/calls";
import type {
  ITransactionBalance,
  ITransaction,
  IInititateWithdraw,
  IConfirmWithdraw
} from "./payload";

const getTransactions = () => {
  return getRequest<{ Transactions: ITransaction[] }>({
    url: `/transactions`
  });
};

const getBalance = () => {
  return getRequest<ITransactionBalance>({
    url: `/transactions/balance`
  });
};
const initiateWithdraw = (payload: IInititateWithdraw) => {
  return postRequest<IInititateWithdraw, any>({
    url: `/transactions/withdraw`,
    data: payload
  });
};
const confirmWithdraw = (payload: IConfirmWithdraw) => {
  return postRequest<IConfirmWithdraw, any>({
    url: `/transactions/withdraw/complete`,
    data: payload
  });
};

export { getTransactions, getBalance, initiateWithdraw, confirmWithdraw };
