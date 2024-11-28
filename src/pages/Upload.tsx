import { useState, lazy } from "react";
import { Provider } from "react-redux";
import { FileText, Package, Users } from "lucide-react";
import { store } from "../store";
import { FileUpload } from "../components/FileUpload";
import { Wrapper } from "../components/Wrapper";
import { Toaster } from "react-hot-toast";
import { Oval } from "react-loader-spinner"; // Importing loader

// Lazy load tab components
const InvoicesTab = lazy(() =>
  import("../components/tabs/InvoicesTab").then((module) => ({
    default: module.InvoicesTab,
  }))
);
const ProductsTab = lazy(() =>
  import("../components/tabs/ProductsTab").then((module) => ({
    default: module.ProductsTab,
  }))
);
const CustomersTab = lazy(() =>
  import("../components/tabs/CustomersTab").then((module) => ({
    default: module.CustomersTab,
  }))
);

const tabs = [
  { id: "invoices", label: "Invoices", icon: FileText, component: InvoicesTab },
  { id: "products", label: "Products", icon: Package, component: ProductsTab },
  { id: "customers", label: "Customers", icon: Users, component: CustomersTab },
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("invoices");
  const [isUploading, setIsUploading] = useState<boolean>(false); // Track upload status

  const ActiveComponent =
    tabs.find((tab) => tab.id === activeTab)?.component || InvoicesTab;

  const handleUploadStart = () => setIsUploading(true); // Start upload
  const handleUploadComplete = () => setIsUploading(false); // End upload

  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-8">
                Invoice Management System
              </h1>

              {/* Pass the upload handlers to FileUpload */}
              <FileUpload
                onUploadStart={handleUploadStart}
                onUploadComplete={handleUploadComplete}
              />

              <div className="mt-8">
                <div className="border-b border-gray-200">
                  <nav className="-mb-px flex space-x-8">
                    {tabs.map((tab) => {
                      const Icon = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`${
                            activeTab === tab.id
                              ? "border-indigo-500 text-indigo-600"
                              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                          } group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm`}
                        >
                          <Icon
                            className={`${
                              activeTab === tab.id
                                ? "text-indigo-500"
                                : "text-gray-400 group-hover:text-gray-500"
                            } -ml-0.5 mr-2 h-5 w-5`}
                          />
                          {tab.label}
                        </button>
                      );
                    })}
                  </nav>
                </div>

                <div className="mt-8">
                  {/* Show loader while uploading */}
                  {isUploading ? (
                    <div className="flex justify-center items-center">
                      <Oval
                        visible={true}
                        height="80"
                        width="80"
                        color="#3949ab"
                        ariaLabel="oval-loading"
                        secondaryColor="#626ebc"
                        wrapperStyle={{}}
                        wrapperClass=""
                      />
                    </div>
                  ) : (
                    <Wrapper element={<ActiveComponent />} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster position="top-right" />
    </Provider>
  );
};

export default App;
