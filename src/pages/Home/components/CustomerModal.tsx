import { FC, Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ICustomer } from "../../../types";
import { toAbsoluteUrl } from "../../../utils/helper";
import SVG from "../../../components/SVG";
import Button from "../../../components/Button";
import { createCustomer, updateCustomer } from "../../../store/customer/slicer";
import { useDispatch } from "react-redux";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  customer: ICustomer;
}

export const CustomerModal: FC<Props> = ({ open, setOpen, customer }) => {
  const dispatch: any = useDispatch();

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
    } else {
      setInputValue({
        name: "",
        email: "",
      });
    }
  }, [customer]);

  const handleOnChange = (e: any) => {
    const { value, name } = e?.target;
    setInputValue((values) => ({ ...values, [name]: value }));
  };

  const handleAddCustomer = () => {
    const name = inputValue?.name?.split(" ");

    const data = {
      first_name: name[0],
      last_name: name.slice(1).join(" "),
      email: inputValue?.email,
      avatar: "https://reqres.in/img/faces/4-image.jpg",
    };
    dispatch(createCustomer({ ...data }));
  };

  const handleEditCustomer = () => {
    const name = inputValue?.name?.split(" ");

    const data = {
      first_name: name[0],
      last_name: name.slice(1).join(" "),
      email: inputValue?.email,
      avatar: customer?.avatar,
      id: customer?.id,
    };
    dispatch(updateCustomer(data));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (customer?.id) handleEditCustomer();
    else handleAddCustomer();
    setOpen(false);
    setInputValue({
      name: "",
      email: "",
    });
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
                <div className={`relative h-32`}>
                  <img
                    src={toAbsoluteUrl("assets/images/back.svg")}
                    className="absolute inset-0 -z-10 "
                  />
                  <div className="p-3 flex justify-end">
                    <SVG
                      onClick={() => setOpen(false)}
                      path="assets/icons/cut.svg"
                      className="h-3 w-6 text-white cursor-pointer"
                    />
                  </div>
                  <h1 className="text-white text-center mt-5 text-2xl">
                    {customer?.id ? "Edit Customer" : "Add New Customer"}
                  </h1>
                </div>
                <div className="mt-2 sm:mt-5 px-4 ">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
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
                    <div className="mt-5 sm:mt-6 pt-5">
                      <Button type={"submit"} className="w-full">
                        {customer?.id ? "EDIT CUSTOMER" : "ADD CUSTOMER"}
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
