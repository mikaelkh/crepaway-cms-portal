import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "../ui/card";

type Props = {
  description: string;
  value: string;
  footerDescription: string;
};

const StatisticsCard = (props: Props) => {
  return (
    <Card className="flex-1">
      <CardHeader>
        <CardDescription className="border-b-2 border-dotted w-max">
          {props.description}
        </CardDescription>
      </CardHeader>
      <CardContent>{props.value}</CardContent>
      <CardFooter>
        <CardDescription>{props.footerDescription}</CardDescription>
      </CardFooter>
    </Card>
  );
};

export default StatisticsCard;
