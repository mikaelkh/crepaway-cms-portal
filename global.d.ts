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
