import { useEffect, useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import { fetch_Customer } from "../../services/apis";
import SVG from "../../components/SVG";
import Table from "./components/Table";
import { ICustomer } from "../../types";
import { DeleteCustomerModal } from "./components/DeleteCustomer";
import { useSelector, useDispatch } from "react-redux";
import { setCustomerList } from "../../store/customer/slicer";

export const Home = () => {
  const dispatch: any = useDispatch();
  const [_, setValue] = useLocalStorage("customers", []);
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [customer, setCustomer] = useState({});

  const { customers } = useSelector((state: any) => state?.customer);
  useEffect(() => {
    if (customers?.length > 0) return;
    handleFetchCustomer();
  }, [customers]);

  const handleFetchCustomer = async () => {
    setIsLoading(() => true);
    const customers = await fetch_Customer();
    if (customers?.length > 0) {
      setValue(customers);
      dispatch(setCustomerList(customers));
    }
    setIsLoading(() => false);
  };

  const handleShowDeleteModal = (customer: ICustomer) => {
    setCustomer(customer);
    setShowDeleteModal(true);
  };

  return (
    <div>
      <DeleteCustomerModal
        open={showDeleteModal}
        setOpen={setShowDeleteModal}
        customer={customer as ICustomer}
        customers={customers}
       />
      <button className="bg-gradient-to-r from-[#57BC90] to-teal-900 text-white py-3 px-4 rounded-lg text-sm flex items-center">
        <SVG
          path="assets/icons/plus.svg"
          className="mr-4 flex-shrink-0 h-3 w-6 text-white"
        />
        Add New CUSTOMER
      </button>
      <Table
        customers={customers as ICustomer[]}
        handleShowDeleteModal={handleShowDeleteModal}
      />
    </div>
  );
};
