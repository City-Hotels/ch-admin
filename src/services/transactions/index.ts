import { ApiResponse, Meta, getRequest, postRequest } from "@/utils/api/calls";
import type {
  ITransactionBalance,
  ITransaction,
  IInititateWithdraw,
  IConfirmWithdraw,
  TransactionFilter
} from "./payload";

// const getTransactions = () => {
//   return getRequest<{ Transactions: ITransaction[] }>({
//     url: `/transactions`
//   });
// };

const getTransactions = (
  filter: TransactionFilter
): Promise<
  ApiResponse<{
    Meta: Meta;
    Transactions: ITransaction[];
  }>
> => {
  const args = Object.keys(filter)
    .map(
      (item) =>
        `${encodeURIComponent(item)}=${encodeURIComponent(
          (filter as any)[item]
        )}`
    )
    .join("&");
  return getRequest<{ Meta: Meta; Transactions: ITransaction[] }>({
    url: `/transactions?${args}`
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
