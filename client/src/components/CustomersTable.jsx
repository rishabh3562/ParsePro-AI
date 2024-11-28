import React from 'react';

const CustomersTable = ({ customers }) => {
    return (
        <table className="min-w-full table-auto">
            <thead>
                <tr>
                    <th>Customer Name</th>
                    <th>Phone Number</th>
                    <th>Total Purchase Amount</th>
                </tr>
            </thead>
            <tbody>
                {customers.map((customer, index) => (
                    <tr key={index}>
                        <td>{customer.name}</td>
                        <td>{customer.phone}</td>
                        <td>{customer.totalPurchase}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default CustomersTable;
