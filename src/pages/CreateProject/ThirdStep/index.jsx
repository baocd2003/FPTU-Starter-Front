
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';

function ThirdStep() {
    const location = useLocation();
    const [packageName, setPackageName] = useState('');
    const [requiredAmount, setRequiredAmount] = useState(0);
    const [limitQuantity, setLimitQuantity] = useState(0);
    const [packageType, setPackageType] = useState('');
    //get selected category
    const selectedCategory = location.state?.projectAddRequest;
    // State for all packages
  const [packages, setPackages] = useState([]);
    // Function to create a new package object
    const createNewPackage = () => {
        const newPackage = {
          packageName: packageName,
          requiredAmount: requiredAmount,
          limitQuantity: limitQuantity,
          packageType: packageType,
          rewardItems: [], // Initialize empty reward items array
        };
        setPackages([...packages, newPackage]); // Add new package to state
        // Clear input fields
        setPackageName('');
        setRequiredAmount(0);
        setLimitQuantity(0);
        setPackageType('');
      };
    
      // Function to add a new reward item
      const addRewardItem = (packageIndex) => {
        const updatedPackages = [...packages]; // Copy the packages array
        const updatedPackage = { ...updatedPackages[packageIndex] }; // Copy the specific package
        updatedPackage.rewardItems.push({ name: '', imageUrl: '', description: '', quantity: 0 }); // Add new reward item
        updatedPackages[packageIndex] = updatedPackage; // Update package in the array
        setPackages(updatedPackages); // Update state with modified packages
      };
    const nextStep = {
        ...selectedCategory,
        packages: packages,
    }
    return (
        <div>
      <h2>Create Package</h2>
      <input
        type="text"
        placeholder="Package Name"
        value={packageName}
        onChange={(e) => setPackageName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Required Amount"
        value={requiredAmount}
        onChange={(e) => setRequiredAmount(parseInt(e.target.value))}
      />
      <input
        type="number"
        placeholder="Limit Quantity"
        value={limitQuantity}
        onChange={(e) => setLimitQuantity(parseInt(e.target.value))}
      />
      <input
        type="text"
        placeholder="Package Type"
        value={packageType}
        onChange={(e) => setPackageType(e.target.value)}
      />
      <button onClick={createNewPackage}>Create Package</button>

      <h2>Packages</h2>
      {packages.map((pack, index) => (
        <div key={index}>
          <h3>Package {index + 1}</h3>
          <p>
            Name: {pack.packageName} | Required Amount: {pack.requiredAmount} |
            Limit Quantity: {pack.limitQuantity} | Package Type: {pack.packageType}
          </p>
          <button onClick={() => addRewardItem(index)}>Add Reward Item</button>
          {/* Display and manage reward items within each package (implement logic as needed) */}
        </div>
      ))}
    </div>
    )
}

export default ThirdStep