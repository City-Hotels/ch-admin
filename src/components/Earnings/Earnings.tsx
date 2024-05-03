import ADollarIcon from "@/assets/icons/available-money.svg";
import ChartIcon from "@/assets/icons/chart.svg";
import RDollarIcon from "@/assets/icons/revenue-money.svg";
import WDollarIcon from "@/assets/icons/withdrawn-money.svg";
import { H3, Label, P3 } from "@/components/Headings/Headings";
import ButtonLink from "@/components/Button/Link/Link";
import { getBalance } from "@/services/transactions";
import type { ITransactionBalance } from "@/services/transactions/payload";
import queryKeys from "@/utils/api/queryKeys";
import { formatCurrencyNoSymbol } from "@/utils/helpers";
import React, { useState } from "react";
import { useQuery } from "react-query";
import styles from "./Earnings.module.scss";

const CardItem: React.FC<{
  label: string;
  value: number;
  onClick?: () => void;
  type: "revenue" | "expense" | "available";
  Icon: any;
  active?: boolean;
  SideComponent: any;
}> = ({ SideComponent, label, value, Icon, type, onClick, active }) => {
  return (
    <div
      className={`${styles.EarningsCard} ${active ? "bg-orange50 shadow-lg" : "border-grey30 bg-white"
        }`}
      onClick={onClick}
    >
      <div className="flex flex-col gap-4">
        <div
          className={`flex size-[34px] items-center justify-center rounded-lg shadow-lg 
        
         ${type === "available" && "bg-orange50"}
         ${type === "revenue" && "bg-success50"}
         ${type === "expense" && "bg-danger50"}
         `}
        >
          <Icon className={styles.Icon} />
        </div>
        <div>
          <H3>{value}</H3>
          <P3 className="text-white800">{label}</P3>
        </div>
      </div>
      <div className="flex flex-col justify-end">{SideComponent}</div>
    </div>
  );
};

const EarningsChart: React.FC<{
  type: "Debit" | "Credit";
  balance: number;
}> = ({ type, balance }) => {
  return (
    <div className="h-auto w-full rounded-md border px-[22px] py-5">
      <H3>{balance}</H3>
      <P3 className="text-white800">
        {type === "Credit" ? "Earnings" : "Expenses"}
      </P3>
    </div>
  );
};

const UserEarnings = () => {
  const { data, isLoading } = useQuery([queryKeys.getUserBalance], () =>
    getBalance()
  );
  const [activeChart, setActiveChart] = useState<"Debit" | "Credit">("Credit");
  const balance = data?.data as ITransactionBalance;
  return (
    <div className="flex w-full gap-4">
      {!isLoading && data ? (
        <div className="flex flex-col gap-3">
          <CardItem
            type="revenue"
            active={activeChart === "Credit"}
            label="Total Revenue"
            onClick={() => setActiveChart("Credit")}
            value={balance?.Credit}
            SideComponent={
              <div className="flex gap-1">
                <ChartIcon />
                <Label className="text-white700">20.1% from last month</Label>
              </div>
            }
            Icon={RDollarIcon}
          />
          <CardItem
            type="expense"
            active={activeChart === "Debit"}
            label="Expenses"
            onClick={() => setActiveChart("Debit")}
            value={balance?.Debit}
            SideComponent={
              <div className="flex gap-1">
                <ChartIcon />
                <Label className="text-white700">20.1% from last month</Label>
              </div>
            }
            Icon={WDollarIcon}
          />
          <CardItem
            type="available"
            label="Available"
            value={parseFloat(formatCurrencyNoSymbol(balance?.Balance || 0))}
            SideComponent={
              <ButtonLink size="sm" color="secondary" href="/user/withdraw">
                <span className="px-4">Withdraw</span>
              </ButtonLink>
            }
            Icon={ADollarIcon}
          />
        </div>
      ) : (
        "Loading Balace"
      )}
      <EarningsChart
        type={activeChart}
        balance={activeChart === "Credit" ? balance?.Credit : balance?.Debit}
      />
    </div>
  );
};

export default UserEarnings;
