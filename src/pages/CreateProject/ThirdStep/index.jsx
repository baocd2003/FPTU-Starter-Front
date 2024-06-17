import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import projectApiInstance from '../../../utils/apiInstance/projectApiInstance';
import ProjectPackage from '../../../components/ProjectPakage';
import Grid from '@mui/material/Grid';
import './index.css'
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { IoMdCloseCircle } from "react-icons/io";
import Card from '@mui/material/Card';
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
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
  const [isLoading,setIsLoading] = useState(false);
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
    setIsLoading(true);
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
      setIsLoading(false);
      console.log(res.data);
    })
  }
//remove item
  const removeRewardItem = (index) => {
    const updatedRewardItems = [...newPackage.rewardItems]; // Create a copy
    updatedRewardItems.splice(index, 1); // Remove the item at the specified index
    setNewPackage((prevState) => ({ ...prevState, rewardItems: updatedRewardItems }));
  };
  return (
    <div className='flex w-full items-center mt-[8rem]'>
      <div className='w-full'>
      <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Typography variant="h4" >Thông tin gói</Typography>
        <Grid container>
          <Grid item xs={5} className="form-package"> 
            <form onSubmit={createPackage} >
              <h2 className='mb-4'>Tạo gói</h2>
              <TextField
                type="text"
                placeholder="Tên gói"
                value={newPackage.packageName}
                onChange={(e) => handlePackageInputChange(e)}
                name="packageName"
                sx={{marginRight : '2rem', marginBottom:'2rem'}}
                required
              />
              <TextField
                type="text"
                placeholder="Mô tả"
                value={newPackage.packageDescription}
                onChange={(e) => handlePackageInputChange(e)}
                name="packageDescription"
                required
              />
              <TextField
                type="number"
                placeholder="Required Amount"
                value={newPackage.requiredAmount}
                onChange={(e) => handlePackageInputChange(e)}
                name="requiredAmount"
                required
              />
              <TextField
                type="number"
                placeholder="Limit Quantity"
                value={newPackage.limitQuantity}
                onChange={(e) => handlePackageInputChange(e)}
                name="limitQuantity"
                sx={{marginLeft : '2rem', marginBottom:'2rem'}}
                required
              
              />
              <TextField
                type="text"
                placeholder="Package Type"
                value={newPackage.packageType}
                onChange={(e) => handlePackageInputChange(e)}
                name="packageType"
                required

              />

              <h2 className='mb-4'>Thông tin phần thưởng</h2>
              {newPackage.rewardItems.map((item, index) => (
                <Card key={index} style={{position:'relative', padding:'20px'}}>
                  <TextField
                    type="text"
                    placeholder="Tên vật phẩm"
                    value={item.name}
                    onChange={(e) => handleRewardItemInputChange(index, e)}
                    name="name"
                    sx={{marginRight : '2rem', marginBottom:'2rem'}}
                required
                  
                  />
                  <TextField
                    type="text"
                    placeholder="Mô tả vật phẩm"
                    value={item.description}
                    onChange={(e) => handleRewardItemInputChange(index, e)}
                    name="description"
                    sx={{marginRight : '1rem', marginBottom:'2rem'}}
                required
                  
                  />
                  {/* <TextField
                    type="text"
                    placeholder="Image"
                    value={item.imageUrl}
                    onChange={(e) => handleRewardItemInputChange(index, e)}
                    name="imageUrl"
                    sx={{marginRight : '2rem', marginBottom:'2rem'}}
                  /> */}
                  <TextField
                    type="number"
                    placeholder="Quantity"
                    value={item.quantity}
                    onChange={(e) => handleRewardItemInputChange(index, e)}
                    name="quantity"
                    required
                  
                  />
                  <IoMdCloseCircle onClick={() => removeRewardItem(index)} style={{position:'absolute' ,right:6,top:6}}/>
                </Card>
              ))}
              <div>

              </div>
              
              <button type="button" onClick={() => addRewardItem()}>Thêm vật phẩm</button>
              <button className='mt-4' type="submit">Tạo gói</button>
            </form>
          </Grid>
          <Grid item xs={7}>
            {packages.map((pack, index) => (
              <div className='flex flex-column justify-center items-center'>
                {/* <button type="submit" onClick={() => removePackage(index)}>Remove</button> */}
                <ProjectPackage pack={pack} closeClick={() => removePackage(index)}/>
              </div>
            ))}
          </Grid>
        </Grid>
        <button className='mt-4' type="submit" onClick={handleSubmit}>Tạo dự án</button>
      </div>
    </div>
  )
}

export default ThirdStep