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

  useEffect(() => {
    if (customers?.length > 0) return;
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

  return (
    <div>
      <DeleteCustomerModal
        open={showDeleteModal}
        setOpen={setShowDeleteModal}
        customer={selectedCustomer as ICustomer}
        customers={customers}
      />
      <CustomerModal
        open={showCustomerModal}
        setOpen={setShowCustomerModal}
        customer={selectedCustomer as ICustomer}
      />
      <Button onClick={handleAddCustomer}>
        <SVG
          path="assets/icons/plus.svg"
          className="mr-4 flex-shrink-0 h-3 w-6 text-white"
        />
        Add New CUSTOMER
      </Button>
      <Table
        customers={customers as ICustomer[]}
        handleShowDeleteModal={handleShowDeleteModal}
        handleEditCustomer={handleEditCustomer}
        isLoading={isLoading}
      />
    </div>
  );
};
