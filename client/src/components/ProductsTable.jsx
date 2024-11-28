import React from 'react';

const ProductsTable = ({ products }) => {
    return (
        <table className="min-w-full table-auto">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>Tax</th>
                    <th>Price with Tax</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product, index) => (
                    <tr key={index}>
                        <td>{product.name}</td>
                        <td>{product.quantity}</td>
                        <td>{product.unitPrice}</td>
                        <td>{product.tax}</td>
                        <td>{product.priceWithTax}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ProductsTable;
