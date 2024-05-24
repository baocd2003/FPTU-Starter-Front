import React,{useState} from 'react'

function CreateProject() {
    const [thumbnailFormData, setThumbNailFormData] = useState(new FormData());
    const [liveDemoFormData, setLiveDemoFormData] = useState(new FormData());
    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [projectTarget, setProjectTarget] = useState('');
    const [projectBalance, setProjectBalance] = useState('');
    const [projectBankAccount, setProjectBankAccount] = useState('');
    const [projectOwnerEmail, setProjectOwnerEmail] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [packageName, setPackageName] = useState('');
    const [requiredAmount, setRequiredAmount] = useState('');
    const [limitQuantity, setLimitQuantity] = useState('');
    const [packageType, setPackageType] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        const thumbnailUrl = await fetch('https://localhost:7235/api/projects/add-thumbnail', {
        method: 'POST',
        body: thumbnailFormData
        });
        const thumbnailData = await thumbnailUrl.json();
        const liveDemoUrl = await fetch('https://localhost:7235/api/projects/add-live-demo', {
            method: 'POST',
            body: liveDemoFormData
        });
        const liveDemoData = await liveDemoUrl.json();
        console.log(thumbnailData);
        console.log(liveDemoData);
        const projectAddRequest = {
            ProjectName: projectName,
            ProjectDescription: projectDescription,
            StartDate: startDate,
            EndDate: endDate,
            ProjectTarget: projectTarget,
            ProjectBalance: projectBalance,
            ProjectBankAccount: projectBankAccount,
            ProjectOwnerEmail: projectOwnerEmail,
            CategoryId: categoryId,
            ProjectThumbnail: thumbnailData,
            ProjectLiveDemo: liveDemoData,
            Packages: [
              {
                PackageName: packageName,
                RequiredAmount: requiredAmount,
                LimitQuantity: limitQuantity,
                PackageType: packageType
              }
            ]
          };
          console.log(projectAddRequest)
        const response = await fetch('https://localhost:7235/api/projects', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
        },
          body: JSON.stringify(projectAddRequest)
        })
        ;
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        console.log('Project added successfully:', data);
        // Handle success response, e.g., show a success message to the user
      } catch (error) {
        console.error('Error adding project:', error);
        // Handle error, e.g., show an error message to the user
      }
    };
  const handleChange = (e) => {
    // const { name, value } = e.target;
    // formData.set(name, value);
  };

  const handleThumbnailFileChange = (e) => {
    const { name, files } = e.target;
    thumbnailFormData.set(name, files[0]);
    console.log(thumbnailFormData)
  };

  const handleLiveDemoChange = (e) => {
    const { name, files } = e.target;
    liveDemoFormData.set(name, files[0]);
    console.log(liveDemoFormData)
  }


  const handleFileSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://localhost:7235/api/ProjectManagement/add-thumbnail', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Project added successfully:', data);
      // Handle success response, e.g., show a success message to the user
    } catch (error) {
      console.error('Error adding project:', error);
      // Handle error, e.g., show an error message to the user
    }
  };

  return (
    <form onSubmit={handleSubmit}>
  <label>
    Project Name:
    <input
      type="text"
      value={projectName}
      onChange={(e) => setProjectName(e.target.value)}
    />
  </label>
  <br />
  <label>
    Project Description:
    <textarea
      value={projectDescription}
      onChange={(e) => setProjectDescription(e.target.value)}
    />
  </label>
  <br />
  <label>
    Start Date:
    <input
      type="date"
      value={startDate}
      onChange={(e) => setStartDate(e.target.value)}
    />
  </label>
  <br />
  <label>
    End Date:
    <input
      type="date"
      value={endDate}
      onChange={(e) => setEndDate(e.target.value)}
    />
  </label>
  <br />
  <label>
    Project Target:
    <input
      type="text"
      value={projectTarget}
      onChange={(e) => setProjectTarget(e.target.value)}
    />
  </label>
  <br />
  <label>
    Project Balance:
    <input
      type="number"
      value={projectBalance}
      onChange={(e) => setProjectBalance(e.target.value)}
    />
  </label>
  <br />
  <label>
    Project Bank Account:
    <input
      type="text"
      value={projectBankAccount}
      onChange={(e) => setProjectBankAccount(e.target.value)}
    />
  </label>
  <br />
  <label>
    Project Owner ID:
    <input
      type="text"
      value={projectOwnerEmail}
      onChange={(e) => setProjectOwnerEmail(e.target.value)}
    />
  </label>
  <br />
  <label>
    Category ID:
    <input
      type="text"
      value={categoryId}
      onChange={(e) => setCategoryId(e.target.value)}
    />
  </label>
  <br />
  <label>
    Package Name:
    <input
      type="text"
      value={packageName}
      onChange={(e) => setPackageName(e.target.value)}
    />
  </label>
  <br />
  <label>
    Required Amount:
    <input
      type="number"
      value={requiredAmount}
      onChange={(e) => setRequiredAmount(e.target.value)}
    />
  </label>
  <br />
  <label>
    Limit Quantity:
    <input
      type="number"
      value={limitQuantity}
      onChange={(e) => setLimitQuantity(e.target.value)}
    />
  </label>
  <br />
  <label>
    Package Type:
    <input
      type="text"
      value={packageType}
      onChange={(e) => setPackageType(e.target.value)}
    />
  </label>
  <label>ThumbNail</label>
  <input type="file" name ="thumbnailFile" onChange={handleThumbnailFileChange}/>
  <label>Live demo</label>
  <input type="file" name ="liveDemoFile" onChange={handleLiveDemoChange}/>
  <br />
  <button type="submit">Submit</button>
</form>
  );
}

export default CreateProject