import React from "react";
import { default as ReactSelect, SingleValue } from "react-select";

type Props = {
  placeholder: string;
  isMandatory: boolean;
  labelledBy: string;
  options: any;
  value: FilterOption | null;
  isLoading?: boolean;
  isDisabled?: boolean;
  onChange: (value: SingleValue<FilterOption>) => void;
  maxMenuHeight: number;
};

const Select = (props: Props) => {
  return <ReactSelect {...props} isSearchable={false} />;
};

export default Select;
