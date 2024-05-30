
import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';

function ThirdStep() {
  const location = useLocation();
  const [packageName, setPackageName] = useState('');
  const [requiredAmount, setRequiredAmount] = useState(0);
  const [limitQuantity, setLimitQuantity] = useState(0);
  const [packageType, setPackageType] = useState('');
  const [newPackage, setNewPackage] = useState({ // State for new package
    packageName,
    requiredAmount,
    limitQuantity,
    packageType,
    rewardItems: [{ name: '', imageUrl: '', description: '', quantity: 0 }],
  }); // Initialize with required reward item
  const [packages, setPackages] = useState([]); // State for all packages

  useEffect(() => {
    // Get selected category from location state
    const pastRequest = location.state?.projectAddRequest;
    setPackages([...pastRequest?.packages || []]); // Use default empty array if packages not found
  }, []);

  // Function to handle package input changes
  const handlePackageInputChange = (event) => {
    const { name, value } = event.target;
    setNewPackage((prevState) => ({ ...prevState, [name]: value }));
    console.log(newPackage)
  };

  // Function to add a new reward item
  const addRewardItem = () => {
    const updatedRewardItems = [...newPackage.rewardItems];
    updatedRewardItems.push({ name: '', imageUrl: '', description: '', quantity: 0 });
    setNewPackage((prevState) => ({ ...prevState, rewardItems: updatedRewardItems }));
  };

  // Function to handle reward item input changes
  const handleRewardItemInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedRewardItems = [...newPackage.rewardItems];
    updatedRewardItems[index] = { ...updatedRewardItems[index], [name]: value };
    setNewPackage((prevState) => ({ ...prevState, rewardItems: updatedRewardItems }));
  };

  // Function to create the package
  const createPackage = (e) => {
    e.preventDefault();
    setPackages([...packages, newPackage]); // Add new package to packages state
    setNewPackage({ // Reset new package state
      packageName: '',
      requiredAmount: 0,
      limitQuantity: 0,
      packageType: '',
      rewardItems: [{ name: '', imageUrl: '', description: '', quantity: 0 }],
    });
    console.log(packages);
  };

  const handleSubmit = () => {
    
  }
  return (
    <div>
      <form onSubmit={createPackage}>
        <h2>Create Package</h2>
        <input
          type="text"
          placeholder="Package Name"
          value={newPackage.packageName}
          onChange={(e) => handlePackageInputChange(e)}
          name="packageName"
        />
        <input
          type="number"
          placeholder="Required Amount"
          value={newPackage.requiredAmount}
          onChange={(e) => handlePackageInputChange(e)}
          name="requiredAmount"
        />
        <input
          type="number"
          placeholder="Limit Quantity"
          value={newPackage.limitQuantity}
          onChange={(e) => handlePackageInputChange(e)}
          name="limitQuantity"
        />
        <input
          type="text"
          placeholder="Package Type"
          value={newPackage.packageType}
          onChange={(e) => handlePackageInputChange(e)}
          name="packageType"
        />

        <h2>Reward Items</h2>
        {newPackage.rewardItems.map((item,index) => (
          <div key={index}>
          <input
            type="text"
            placeholder="Name"
            value={item.name}
            onChange={(e) => handleRewardItemInputChange(index, e)}
            name="name"
          />
          <input
            type="text"
            placeholder="Description"
            value={item.description}
            onChange={(e) => handleRewardItemInputChange(index, e)}
            name="description"
          />
          <input
            type="text"
            placeholder="Image"
            value={item.imageUrl}
            onChange={(e) => handleRewardItemInputChange(index, e)}
            name="imageUrl"
          />
          <input
            type="number"
            placeholder="Quantity"
            value={item.quantity}
            onChange={(e) => handleRewardItemInputChange(index, e)}
            name="quantity"
          />
          </div>
        ))}
        <button type="button" onClick={() => addRewardItem()}>Create item</button>
        <button type="submit">Create</button>
      </form>
        {packages.map((pack, index) => (
          <div>{pack.packageName}</div>
        ))}
    </div>
  )
}

export default ThirdStep