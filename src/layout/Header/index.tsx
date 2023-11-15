import { Fragment, FC } from "react";
import { Menu, Transition } from "@headlessui/react";
import { MenuAlt2Icon } from "@heroicons/react/outline";
import { clsx, toAbsoluteUrl } from "../../utils/helper";
import { userNavigation } from "../../constant";
import { IUserNavigation } from "../../types";
import { Link } from "react-router-dom";

interface Props {
  setSidebarOpen: (open: boolean) => void;
  pageTitle: string;
}

const Header: FC<Props> = ({ setSidebarOpen, pageTitle }) => {
  return (
    <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow-lg">
      <button
        type="button"
        className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
      </button>
      <div className="flex-1 px-4 flex justify-between items-center">
        <div>
          <h1 className="font-bold text-2xl">{pageTitle}</h1>
        </div>
        <div className="ml-4 flex items-center md:ml-6">
          <Menu as="div" className="ml-3 relative">
            <div>
              <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                <img
                  className="h-8 w-8 rounded-full"
                  src={toAbsoluteUrl("assets/icons/avatar.svg")}
                  alt=""
                />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                {userNavigation.map((item: IUserNavigation) => (
                  <Menu.Item key={item.name}>
                    {({ active }) => (
                      <Link
                        to={item.href}
                        className={clsx(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}
                      >
                        {item.name}
                      </Link>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Header;
