import { INavigation, IUserNavigation } from "../types";

export const BASE_URI = "https://reqres.in/api/users?page=1";

export const navigation: INavigation[] = [
  {
    name: "CUSTOMERS",
    href: "/",
    icon: "assets/icons/customers-icon.svg",
    current: true,
  },
];

export const userNavigation: IUserNavigation[] = [
  { name: "Your Profile", href: "/" },
  { name: "Settings", href: "/" },
  { name: "Sign out", href: "/" },
];
