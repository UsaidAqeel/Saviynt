import { useEffect, useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import { fetch_Customer } from "../../services/apis";
import SVG from "../../components/SVG";
import Table from "./components/Table";
import { ICustomer } from "../../types";
import { DeleteCustomerModal } from "./components/DeleteCustomer";

export const Home = () => {
  const [customers, setValue] = useLocalStorage("customers", []);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (customers && customers?.length > 0) return;
    handleFetchCustomer();
  }, [customers]);

  const handleFetchCustomer = async () => {
    setIsLoading(() => true);
    const customers = await fetch_Customer();
    if (customers?.length > 0) {
      setValue(customers);
    }
    setIsLoading(() => false);
  };

  return (
    <div>
      <DeleteCustomerModal open={true} setOpen={() => {}} />
      <button className="bg-gradient-to-r from-[#57BC90] to-teal-900 text-white py-3 px-4 rounded-lg text-sm flex items-center">
        <SVG
          path="assets/icons/plus.svg"
          className="mr-4 flex-shrink-0 h-3 w-6 text-white"
        />
        Add New CUSTOMER
      </button>
      <Table customers={customers as ICustomer[]} />
    </div>
  );
};
