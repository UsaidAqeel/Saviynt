import { FC } from "react";
import { ICustomer } from "../../../types";

interface Props {
  customers: ICustomer[];
}

const Table: FC<Props> = ({ customers }) => {
  return (
    <div className="mt-8 flex flex-col">
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden ">
            <table className="min-w-full border-0">
              <thead className="bg-primary-300 mb-4 round">
                <tr className="round">
                  <th
                    scope="col"
                    className="sticky top-0 z-10  bg-opacity-75 py-3.5 pr-4 pl-3  sm:pr-6 lg:pr-8"
                  >
                    <span className="sr-only">Avatar</span>
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Customer ID
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Customer Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 border-b  bg-opacity-75 py-3.5 pr-4 pl-3 sm:pr-6 lg:pr-8"
                  >
                    <span className="sr-only">Action</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white pt-4 mt-4">
                {customers?.map((customer: ICustomer) => (
                  <tr key={customer?.email} className="border mt-3">
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={customer?.avatar}
                            alt="Avatar"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <div className="text-gray-500">{customer?.id}</div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-[#57BC90] underline cursor-pointer">
                      {`${customer?.first_name} ${customer?.last_name}`}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {customer?.email}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <div className="flex items-center justify-end">
                        <button className=" bg-[#B0E1B7] py-2 px-4 rounded text-sm flex items-center text-[#008212]">
                          Edit
                        </button>
                        <button className="ml-2  py-2 px-4 bg-[#EF9999] rounded text-sm flex items-center text-[#D80000]">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
