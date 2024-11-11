import { getSavings } from "@/lib/calculations";
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

export function Savings() {
  const { transactions, currency } = useContext(AppContext);

  function getSavingsRounded() {
    const savings = getSavings(transactions);
    return roundToTwoDecimal(savings);
  }

  const savings = getSavingsRounded();

  return (
    <Card className="w-full md:w-1/3">
      <CardHeader>
        <CardDescription className="flex items-center flex-wrap gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            className="bg-gray-50 p-1 rounded-md w-7 h-7"
          >
            <path
              fill="currentColor"
              d="M5.925 21q-.575 0-1.112-.4t-.713-.975q-.625-2.1-1.025-3.637t-.638-2.7t-.337-2.063T2 9.5q0-2.3 1.6-3.9T7.5 4h5q.675-.9 1.713-1.45T16.5 2q.625 0 1.063.438T18 3.5q0 .15-.038.3t-.087.275q-.1.275-.187.55t-.138.6L19.825 7.5H21q.425 0 .713.288T22 8.5v5.25q0 .325-.187.575t-.513.375l-2.125.7l-1.25 4.175q-.2.65-.725 1.038T16 21h-2q-.825 0-1.412-.587T12 19h-2q0 .825-.587 1.413T8 21zM6 19h2v-2h6v2h2l1.55-5.15l2.45-.825V9.5h-1L15.5 6q0-.5.063-.975t.187-.925q-.725.2-1.275.688T13.675 6H7.5Q6.05 6 5.025 7.025T4 9.5q0 1.025.525 3.513T6 19m10-8q.425 0 .713-.288T17 10t-.288-.712T16 9t-.712.288T15 10t.288.713T16 11m-4-2q.425 0 .713-.288T13 8t-.288-.712T12 7H9q-.425 0-.712.288T8 8t.288.713T9 9zm0 2.55"
            />
          </svg>
          Savings
        </CardDescription>
        <CardTitle className="text-green-500 flex-nowrap text-lg md:text-xl font-mono tabular-nums">
          {savings !== 0 && "+"}
          {currency}
          {formatNumberWithTwoDecimals(savings)}
        </CardTitle>
      </CardHeader>
    </Card>
  );
}
