"use client";
import Container from "@/components/Container";
import MultiSelect from "@/components/MultiSelect";
import Select from "@/components/Select";
import Title from "@/components/Title";
import LineChart from "@/components/charts/LineChart";
import ChartCard from "@/components/dashboard/ChartCard";
import StatisticsCard from "@/components/dashboard/StatisticsCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MultiValue, SingleValue } from "react-select";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";

const chartOptions = [
  {
    label: "Weekly",
    value: "week",
  },
  {
    label: "Yearly",
    value: "year",
  },
];

const branchesOptions = [
  { value: "achrafieh", label: "Achrafieh" },
  { value: "batroun", label: "Batroun" },
  { value: "kaslik", label: "Kaslik" },
  { value: "asd", label: "Achrafieh" },
  { value: "asfa", label: "Batroun" },
  { value: "asdsaf", label: "Kaslik" },
  { value: "asdsafsa", label: "Achrafieh" },
  { value: "eqwewqeq", label: "Batroun" },
  { value: "rwqrwq", label: "Kaslik" },
  { value: "adsadcx", label: "Achrafieh" },
  { value: "123", label: "Batroun" },
  { value: "5", label: "Kaslik" },
];

export default function Home() {
  const [selectedBranches, setSelectedBranches] = useState<
    MultiValue<FilterOption>
  >([]);
  const [date, setDate] = useState<DateValueType>({
    startDate: null,
    endDate: null,
  });
  console.log(date);

  const handleValueChange = (newValue: DateValueType) => {
    setDate(newValue);
  };

  return (
    <div className="overflow-auto w-full h-full">
      <Container>
        <div className="grid gap-10">
          <div className="flex justify-between items-center flex-wrap">
            <Title>Dashboard</Title>
            <div className="flex gap-2">
              <MultiSelect
                className="min-w-[15rem] max-w-[15rem]"
                placeholder={"Select a branch"}
                options={branchesOptions}
                value={selectedBranches}
                onChange={(options) => setSelectedBranches(options)}
                maxMenuHeight={200}
              />
              <Datepicker value={date} onChange={handleValueChange} />
            </div>
          </div>
          {/* charts */}
          <div className="flex flex-col gap-2 lg:flex-row">
            <ChartCard data={[]} title="Orders" filterOptions={chartOptions} />
            <ChartCard data={[]} title="Orders" filterOptions={chartOptions} />
          </div>
          {/* cards */}
          <div className="grid gap-5">
            <Title>Performance metrics</Title>
            <div className="flex gap-4 flex-wrap">
              <StatisticsCard
                description={"Order acceptance rate"}
                value={"0%"}
                footerDescription={"0% rejected/0% missed"}
              />
              <StatisticsCard
                description={"Order acceptance rate"}
                value={"0%"}
                footerDescription={"0% rejected/0% missed"}
              />
              <StatisticsCard
                description={"Order acceptance rate"}
                value={"0%"}
                footerDescription={"0% rejected/0% missed"}
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
