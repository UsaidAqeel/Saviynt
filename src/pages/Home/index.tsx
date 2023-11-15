import { useEffect, useState } from "react";
import { fetch_Customer } from "../../services/apis";
import SVG from "../../components/SVG";
import Table from "./components/Table";
import { ICustomer } from "../../types";
import { DeleteCustomerModal } from "./components/DeleteCustomer";
import { useSelector, useDispatch } from "react-redux";
import { setCustomerList } from "../../store/customer/slicer";
import { CustomerModal } from "./components/CustomerModal";
import Button from "../../components/Button";

export const Home = () => {
  const dispatch: any = useDispatch();
  const { customers } = useSelector((state: any) => state?.customer);

  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState({});
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [customerListData, setCustomerListData] = useState<ICustomer[]>([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (customers?.length > 0) {
      setCustomerListData([...customers]);
      return;
    }
    handleFetchCustomer();
  }, [customers]);

  const handleFetchCustomer = async () => {
    setIsLoading(true);
    const customers = await fetch_Customer();
    if (customers?.length > 0) {
      dispatch(setCustomerList(customers));
    }
    setIsLoading(false);
  };

  const handleShowDeleteModal = (customer: ICustomer) => {
    setSelectedCustomer(customer);
    setShowDeleteModal(true);
  };

  const handleAddCustomer = () => {
    setSelectedCustomer({});
    setShowCustomerModal(true);
  };

  const handleEditCustomer = (customer: ICustomer) => {
    setSelectedCustomer(customer);
    setShowCustomerModal(true);
  };

  const handleSearch = (e: any) => {
    const { value } = e.target;
    setSearchValue(value);
    if (!value) {
      setCustomerListData([...customers]);
      return;
    }
    const filterData = [...customers]?.reduce((acc, cur: ICustomer) => {
      const name = `${cur.first_name} ${cur.last_name}`
        ?.toLocaleLowerCase()
        .includes(value);
      if (cur?.id == value || name) {
        acc.push(cur);
      }
      return acc;
    }, []);
    setCustomerListData([...filterData]);
  };

  return (
    <div>
      <DeleteCustomerModal
        open={showDeleteModal}
        setOpen={setShowDeleteModal}
        customer={selectedCustomer as ICustomer}
      />
      <CustomerModal
        open={showCustomerModal}
        setOpen={setShowCustomerModal}
        customer={selectedCustomer as ICustomer}
      />
      <div className="flex justify-start items-start flex-col md:flex-row md:justify-between md:items-center">
        <Button onClick={handleAddCustomer}>
          <SVG
            path="assets/icons/plus.svg"
            className="mr-4 flex-shrink-0 h-3 w-6 text-white"
          />
          Add New CUSTOMER
        </Button>
        <input
          type="text"
          name="search"
          id="search"
          className="shadow-sm py-3 px-4 w-80 block sm:text-sm border rounded-md outline-none mt-2 md:m-0"
          placeholder="Search"
          onChange={handleSearch}
        />
      </div>
      <Table
        customers={customerListData as ICustomer[]}
        handleShowDeleteModal={handleShowDeleteModal}
        handleEditCustomer={handleEditCustomer}
        isLoading={isLoading}
      />
    </div>
  );
};
