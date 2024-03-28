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
  label?: string;
  grid?: GridSpan;
};

// to add type file
type SelectFormInput = FormInputBase & {
  //  TODO add multi-select
  type: "select";
  placeholder: string;
  data: LabelOption<T>[];
  defaultValue?: T;
  content?: "between" | "around" | "center" | "end";
};

type GroupRadioFormInput = FormInputBase & {
  type: "radio-group";
  data: LabelOption<T>[];
  defaultValue?: T;
  content?: "between" | "around" | "center" | "end";
  direction?: "row" | "col";
};

type GroupCheckFormInput = FormInputBase & {
  type: "checkbox-group";
  data: LabelOption<T>[];
  defaultValue?: T[];
  content?: "between" | "around" | "center" | "end";
  direction?: "row" | "col";
};

type CheckboxFormInput = FormInputBase & {
  type: "checkbox";
  description?: string;
  defaultValue?: 1 | 0;
};

type TextareaFormInput = FormInputBase & {
  type: "textarea";
  defaultValue?: string;
  placeholder: string;
  rows?: number;
  cols?: number;
};

type FileFormInput = FormInputBase & {
  type: "file";
  accept?: string;
};

type FormInput =
  | (FormInputBase & {
      type:
        | "text"
        | "password"
        | "number"
        | "email"
        | "datetime-local"
        | "date";
      defaultValue?: string | number;
      placeholder: string;
    })
  | TextareaFormInput
  | GroupCheckFormInput
  | GroupRadioFormInput
  | SelectFormInput
  | CheckboxFormInput
  | FileFormInput
  | (FormInputBase & {
      type: "custom";
      defaultValue?: any;
      Component: (props: { changeHandle: (value: any) => void }) => JSX.Element;
    })
  | { type: "seperator" };

type LabelOption<T> = {
  label: string;
  value: T;
};
