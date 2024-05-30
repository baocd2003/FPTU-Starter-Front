import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import projectApiInstance from '../../../utils/apiInstance/projectApiInstance';
import ProjectPackage from '../../../components/ProjectPakage';
import Grid from '@mui/material/Grid';
function ThirdStep() {
  const location = useLocation();
  const [packageName, setPackageName] = useState('');
  const [requiredAmount, setRequiredAmount] = useState(0);
  const [limitQuantity, setLimitQuantity] = useState(0);
  const [packageType, setPackageType] = useState('');
  const [packageDescription, setPackageDescription] = useState('');
  const [newPackage, setNewPackage] = useState({ // State for new package
    packageName,
    requiredAmount,
    limitQuantity,
    packageType,
    rewardItems: [{ name: '', imageUrl: '', description: '', quantity: 0 }],
  }); // Initialize with required reward item
  const [packages, setPackages] = useState([]);
  const [thirdRequest, setThirdRequest] = useState({});

  useEffect(() => {
    // Get selected category from location state
    const pastRequest = location.state?.jsonSecondReq;
    setPackages([...pastRequest?.packages || []]); // Use default empty array if packages not found
    setThirdRequest({ ...pastRequest, packages: packages });
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
      packageDescription: '',
      rewardItems: [{ name: '', imageUrl: '', description: '', quantity: 0 }],
    });
    console.log(packages);
  };

  //remove package
  const removePackage = (index) => {
    const updatedPackages = [...packages]; // Create a copy of the packages state
    updatedPackages.splice(index, 1); // Remove the package at the specified index
    setPackages(updatedPackages); // Update the packages state with the modified array
  };
  //create project
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(packages);
    const jsonThirdReq = {
      ...thirdRequest,
      packages: packages
    }
    console.log(jsonThirdReq);
    setThirdRequest({ ...thirdRequest, packages: packages });
    console.log(thirdRequest);
    const request = JSON.stringify(thirdRequest);
    await projectApiInstance.post('', jsonThirdReq, {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      console.log(res.data);
    })
  }
  return (
    <div className='flex w-full items-center mt-[8rem]'>
      <div className='w-full'>
        <Grid container>
          <Grid item xs={5}> 
            <form onSubmit={createPackage}>
              <h2>Tạo gói</h2>
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
              {newPackage.rewardItems.map((item, index) => (
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
          </Grid>
          <Grid item xs={7}>
            {packages.map((pack, index) => (
              <div className='flex flex-column justify-center items-center'>
                {/* <button type="submit" onClick={() => removePackage(index)}>Remove</button> */}
                <ProjectPackage pack={pack} closeClick={() => removePackage(index)}/>
              </div>
              // <div key={index}>
              //   <div>Name:</div>
              //   <div>{pack.packageName}</div>
              //   <div>Type:</div>
              //   <div>{pack.packageType}</div>
              //   <div>Require Amount:</div>
              //   <div>{pack.requiredAmount}</div>
              //   <div>Limit quantity:</div>
              //   <div>{pack.limitQuantity}</div>
              //   <h2>Reward Items</h2>
              //   {pack.rewardItems.map((item,i) => (
              //     <div key={i}>
              //       <div>{item.name}</div>
              //       <div>{item.imageUrl}</div>
              //       <div>{item.description}</div>
              //       <div>{item.quantity}</div>
              //     </div>
              //   ))}
              // </div>
            ))}
          </Grid>
        </Grid>



        <button type="submit" onClick={handleSubmit}>Create project</button>
      </div>
    </div>
  )
}

export default ThirdStep