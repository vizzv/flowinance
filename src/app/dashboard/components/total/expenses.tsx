import { getTotalExpenses } from "@/lib/calculations";
import { AppContext } from "@/lib/context";
import { formatNumberWithTwoDecimals, roundToTwoDecimal } from "@/lib/utils";
import * as React from "react";
import { useContext } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

export function Expenses() {
  const { filteredTransactions, currency } = useContext(AppContext);

  function getExpenses() {
    const expenses = getTotalExpenses(filteredTransactions!);
    return roundToTwoDecimal(expenses);
  }

  const expenses = getExpenses();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardDescription className="flex items-center flex-wrap gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            className="bg-red-100 p-1 rounded-md w-6 h-6"
          >
            <path
              fill="currentColor"
              d="m18.6 16l-5.2-5.15l-2.575 2.575Q10.25 14 9.4 14t-1.425-.575L2.7 8.1q-.275-.275-.288-.687T2.7 6.7q.275-.275.7-.275t.7.275L9.4 12l2.575-2.575q.575-.575 1.425-.575t1.425.575L20 14.6V13q0-.425.288-.712T21 12t.713.288T22 13v4q0 .425-.288.713T21 18h-4q-.425 0-.712-.288T16 17t.288-.712T17 16z"
            />
          </svg>
          Expenses
        </CardDescription>
        <CardTitle className="text-red-500 text-lg md:text-xl font-mono tabular-nums">
          {expenses !== 0 && "-"}
          {currency}
          {formatNumberWithTwoDecimals(expenses)}
        </CardTitle>
      </CardHeader>
    </Card>
  );
}
