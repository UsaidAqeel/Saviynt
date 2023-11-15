import { FC, Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/outline";
import { ICustomer } from "../../../types";
import { toAbsoluteUrl } from "../../../utils/helper";
import SVG from "../../../components/SVG";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  customer: ICustomer;
}

export const CustomerModal: FC<Props> = ({ open, setOpen, customer }) => {
  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    if (customer?.id) {
      setInputValue({
        name: `${customer?.first_name} ${customer?.last_name}`,
        email: customer?.email,
      });
    }
  }, [customer]);

  const handleOnChange = (e: any) => {
    const { value, name } = e?.target;
    setInputValue((values) => ({ ...values, [name]: value }));
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative inline-block align-bottom bg-white rounded-2xl pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm w-full ">
              <div>
                <div className={`bg-center	bg-no-repeat bg-cover relative h-32`}>
                  <img
                    src={toAbsoluteUrl("assets/images/back.svg")}
                    className="absolute inset-0 -z-10"
                  />
                  <div className="p-3 flex justify-end">
                    <SVG
                      path="assets/icons/cut.svg"
                      className="h-3 w-6 text-white"
                    />
                  </div>
                  <h1 className="text-white text-center mt-5 text-2xl">
                    {customer?.id ? "" : "Add New Customer"}
                  </h1>
                </div>
                <div className="mt-2 sm:mt-5 px-4 ">
                  <form>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Name
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="shadow-sm p-2 block w-full sm:text-sm border rounded-md outline-none"
                          placeholder="Customer Name"
                          value={inputValue?.name}
                          onChange={handleOnChange}
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <div className="mt-1">
                        <input
                          type="email"
                          name="email"
                          id="email"
                          className="shadow-sm p-2 block w-full sm:text-sm border rounded-md outline-none"
                          placeholder="Email"
                          value={inputValue?.email}
                          onChange={handleOnChange}
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 px-4 pt-5 ">
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                  onClick={() => setOpen(false)}
                >
                  Go back to dashboard
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
