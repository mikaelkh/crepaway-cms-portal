type SidebarItem = {
  label: string;
  icon?: React.ReactNode;
  link?: string;
  children?: SidebarItem[];
};

type FilterOption = {
  value: string | number;
  label: string;
};

type TableColumn = {
  title: string;
  accessor: string;
  className: string;
  sortable: boolean;
  Cell?: ({ value: string }) => React.ReactNode;
};

type SortingState = {
  key: string;
  order: string;
};

type PaginationState = {
  total: number;
  currentPage: number;
  showPerPage: number;
};

// Dynamic Form types

type GridSpan = {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
};

type Item = {
  id: number;
  name: string;
  image_url: string;
  type: "item" | "modifier";
  source: string;
  price: number;
  created_at: Date;
};

type FormInputBase = {
  name: string;
  label: string;
  grid?: GridSpan;
};

// to add type file
type SelectFormInput = FormInputBase & {
  type: "select" | "multi-select";
  placeholder: string;
  data: LabelOption<T>[];
  defaultValue: { label: string; value: T };
  content?: "between" | "around" | "center" | "end";
};

type RadioCheckFormInput = FormInputBase & {
  type: "radio-group" | "checkbox-group";
  data: LabelOption<string>[];
  defaultValue: string;
  content?: "between" | "around" | "center" | "end";
  radioDirection?: "row" | "col";
};

type TextareaFormInput = FormInputBase & {
  type: "textarea";
  defaultValue: string;
  placeholder: string;
  rows?: number;
  cols?: number;
};

type FormInput =
  | (FormInputBase & {
      type: "text" | "password" | "number" | "email";
      defaultValue: string | number;
      placeholder: string;
    })
  | FormInputWithData
  | TextareaFormInput
  | RadioCheckFormInput
  | SelectFormInput
  | { type: "seperator" };

type LabelOption<T> = {
  label: string;
  value: T;
};
