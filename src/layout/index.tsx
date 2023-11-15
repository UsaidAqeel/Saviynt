import { useState, FC } from "react";
import SideBar from "./SideBar";
import Header from "./Header";
interface Props {
  children: React.ReactNode;
  pageTitle: string;
}

export const Layout: FC<Props> = ({ children, pageTitle }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <div>
        <SideBar open={sidebarOpen} setOpen={setSidebarOpen} />
        <div className="md:pl-64 flex flex-col flex-1">
          <Header
            setSidebarOpen={setSidebarOpen}
            pageTitle={pageTitle as string}
          />
          <main className="bg-[#F3F3F3] min-h-screen">
            <div className="py-6">
              <div className="mx-auto px-4 sm:px-6 md:px-8">
                <div className="py-4">{children}</div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};
