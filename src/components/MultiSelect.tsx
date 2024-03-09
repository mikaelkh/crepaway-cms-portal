import React from "react";

import Select, { MultiValue } from "react-select";

type Props = {
  placeholder: string;
  options: MultiValue<FilterOption>;
  value: MultiValue<FilterOption>;
  isLoading?: boolean;
  isDisabled?: boolean;
  onChange: (options: MultiValue<FilterOption>) => void;
  maxMenuHeight: number;
  className?: string;
};
const customStyles = {
  valueContainer: (base: any) => ({
    ...base,
    maxHeight: "100px",
    flexWrap: "nowrap!important",
    overflow: "auto",
    maxWidth: "100%",
  }),
  multiValue: (base: any) => ({
    ...base,
    flexShrink: 0,
    width: "max-content",
  }),
};

const MultiSelect = (props: Props) => {
  return (
    <Select
      styles={customStyles}
      isMulti
      {...props}
      isSearchable={false}
      closeMenuOnSelect={false}
    />
  );
};

export default MultiSelect;
