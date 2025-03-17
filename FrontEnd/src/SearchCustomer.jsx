import React, { useState } from 'react';

// Mock customer data (You can replace this with your imported list)
const customerList = [
  { name: 'Jeremy Clarke', age: 21, location: 'Seattle', gender: 'Male', income: '$120,000' },
  { name: 'Philip Anderson', age: 34, location: 'Philadelphia', gender: 'Male', income: '$85,000' },
  { name: 'Sara White', age: 29, location: 'Boston', gender: 'Female', income: '$110,000' },
  // Add more customers as needed
];

// SearchCustomer Component
const SearchCustomer = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Function to filter customers based on the search term
  const filterCustomers = (term) => {
    console.log(term)
    console.log(customerList);
    return customerList.filter((customer) => {
      return (
        customer.name.startsWith(term) || customer.location.startsWith(term)
      );
    });
  };

  // Pass the search term to the filtering function
  const filteredCustomers = filterCustomers(searchTerm);

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name or location..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <CustomerList customers={filteredCustomers} />
    </div>
  );
};

// CustomerList Component
const CustomerList = ({ customers }) => {
  if (customers.length === 0) {
    return <p>No Results Found!</p>;
  }

  return (
    <table border="1">
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Location</th>
          <th>Gender</th>
          <th>Income</th>
        </tr>
      </thead>
      <tbody>
        {customers.map((customer, index) => (
          <tr key={index}>
            <td>{customer.name}</td>
            <td>{customer.age}</td>
            <td>{customer.location}</td>
            <td>{customer.gender}</td>
            <td>{customer.income}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SearchCustomer;
