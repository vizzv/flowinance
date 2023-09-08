import { EXPENSES_CATEGORIES } from "@/lib/categories";
import { DashboardContext } from "@/lib/context";
import { roundToTwoDecimal } from "@/lib/utils";
import React, { useContext, useEffect, useState } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  AreaChart,
} from "recharts";
import { Card, CardTitle } from "../../ui/card";
import { DashboardNoDataCard } from "../ui/dashboard-no-data-card";

interface ChartData {
  name: string;
  spent: number;
}

export default function ExpensesEvolutionChart() {
  const { transactions } = useContext(DashboardContext);
  const [data, setData] = useState<ChartData[]>([]);
  useEffect(() => {
    const expenses = transactions.filter((transaction) => {
      return EXPENSES_CATEGORIES.some(
        (category) => category === transaction.category
      );
    });
    const shortedExpenses = expenses.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
    let accumulatedAmount = 0;
    const accumulatedExpenses = shortedExpenses.map((expense) => {
      accumulatedAmount += expense.amount;
      return roundToTwoDecimal(accumulatedAmount);
    });
    const dataArray = shortedExpenses.map((transaction, index) => {
      return {
        name: transaction.date,
        spent: accumulatedExpenses[index],
      };
    });
    setData(dataArray);
  }, [transactions]);
  return (
    <div>
      {data.length !== 0 ? (
        <Card className="flex flex-col items-center p-4">
          <CardTitle className="mb-6">Expenses Evolution</CardTitle>
          <AreaChart
            width={500}
            height={400}
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="spent"
              stroke="#8884d8"
              fill="#8884d8"
            />
          </AreaChart>
        </Card>
      ) : (
        <DashboardNoDataCard
          title="Expenses"
          description=" You have not generated any expense so far."
        />
      )}
    </div>
  );
}