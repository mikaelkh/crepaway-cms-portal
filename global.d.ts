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
