export interface INavigation {
  name: string;
  href: string;
  icon: string;
  current: boolean;
}

export interface IUserNavigation {
  name: string;
  href: string;
}

export interface ICustomer {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}
