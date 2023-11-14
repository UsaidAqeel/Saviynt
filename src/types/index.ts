export interface INavigation {
  name: string;
  href: string;
  icon: (props: React.ComponentProps<"svg">) => JSX.Element;
  current: boolean;
}
