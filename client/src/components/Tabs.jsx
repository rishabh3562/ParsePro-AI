import React, { useState } from 'react';
import InvoicesTable from './InvoicesTable';
import ProductsTable from './ProductsTable';
import CustomersTable from './CustomersTable';

const Tabs = ({ invoices, products, customers }) => {
    const [activeTab, setActiveTab] = useState('invoices');

    return (
        <div>
            <div className="flex space-x-4">
                <button
                    className={`px-4 py-2 ${activeTab === 'invoices' ? 'bg-blue-500' : 'bg-gray-200'}`}
                    onClick={() => setActiveTab('invoices')}
                >
                    Invoices
                </button>
                <button
                    className={`px-4 py-2 ${activeTab === 'products' ? 'bg-blue-500' : 'bg-gray-200'}`}
                    onClick={() => setActiveTab('products')}
                >
                    Products
                </button>
                <button
                    className={`px-4 py-2 ${activeTab === 'customers' ? 'bg-blue-500' : 'bg-gray-200'}`}
                    onClick={() => setActiveTab('customers')}
                >
                    Customers
                </button>
            </div>

            <div className="mt-4">
                {activeTab === 'invoices' && <InvoicesTable invoices={invoices} />}
                {activeTab === 'products' && <ProductsTable products={products} />}
                {activeTab === 'customers' && <CustomersTable customers={customers} />}
            </div>
        </div>
    );
};

export default Tabs;
