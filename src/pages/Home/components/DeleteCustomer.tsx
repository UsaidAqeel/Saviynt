import { FC, Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import SVG from "../../../components/SVG";
import { ICustomer } from "../../../types";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { useDispatch } from "react-redux";
import { setCustomerList } from "../../../store/customer/slicer";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  customer: ICustomer;
  customers: ICustomer[];
}

export const DeleteCustomerModal: FC<Props> = ({
  setOpen,
  open,
  customer,
  customers,
}) => {
  const dispatch: any = useDispatch();
  const cancelButtonRef = useRef(null);

  const [_, setValue] = useLocalStorage("customers", []);
  const [customersList, setCustomer] = useState<ICustomer[]>([]);

  useEffect(() => {
    if (customers && customers?.length > 0) {
      setCustomer([...customers]);
    }
  }, [customers]);

  const handleDeleteCustomer = () => {
    const customer_index: any = customers?.findIndex(
      ({ id }: ICustomer) => id == customer?.id
    );
    const list = JSON?.parse(JSON.stringify(customersList));
    list.splice(customer_index, 1);
    setValue(list);
    dispatch(setCustomerList(list));
    setOpen(false);
  };
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-6 sm:p-6 sm:pb-4">
                  <div className="my-5">
                    <div className="mx-auto flex items-center justify-center rounded-full ">
                      <SVG path="/assets/icons/trash.svg" />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h1"
                        className="font-bold leading-6 text-gray-900 text-2xl text-center mt-5"
                      >
                        Are you sure?
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500 text-center">
                          Do you really want to delete this customer? This
                          process can not be undone.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 "
                    onClick={handleDeleteCustomer}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 "
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
