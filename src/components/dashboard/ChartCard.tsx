"use client";
import React, { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LineChart from "../charts/LineChart";
import { Button } from "../ui/button";
import ToggleItem from "../ToggleItem";

type Props = {
  title: string;
  data: [];
  filterOptions: FilterOption[];
};

const ChartCard = (props: Props) => {
  const [filter, setFilter] = useState(props.filterOptions[0].value || "");
  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>{props.title}</CardTitle>
        <div className="flex items-center justify-end">
          {props.filterOptions.map((option, idx) => (
            <ToggleItem
              key={idx}
              onClick={() => setFilter(option.value)}
              selected={filter === option.value}
            >
              {option.label}
            </ToggleItem>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <LineChart data={props.data} />
      </CardContent>
    </Card>
  );
};

export default ChartCard;
