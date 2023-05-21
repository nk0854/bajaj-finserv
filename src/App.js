// import logo from './logo.svg';
// import Home from './pages/home'
// import './App.css';

// function App() {
//   return (
    
//   )
// }

// export default App;


import React,{ useEffect, useState } from 'react';

function App() {
  const [employeeData, setEmployeeData] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  const fetchEmployeeData = () => {
    fetch('https://raw.githubusercontent.com/dixitsoham7/dixitsoham7.github.io/main/index.json')
      .then(response => response.json())
      .then(data => {
        setEmployeeData(data.employees);
        extractDesignations(data.employees);
        extractSkills(data.employees);
      })
      .catch(error => {
        console.log('An error occurred while fetching the data:', error);
      });
  };

  const extractDesignations = employees => {
    const uniqueDesignations = Array.from(new Set(employees.map(employee => employee.designation)));
    setDesignations(uniqueDesignations);
  };

  const extractSkills = employees => {
    let uniqueSkills = [];
    employees.forEach(employee => {
      employee.skills.forEach(skill => {
        if (!uniqueSkills.includes(skill)) {
          uniqueSkills.push(skill);
        }
      });
    });
    setSkills(uniqueSkills);
  };

  const populateOptions = (array) => {
    return array.map((item, index) => (
      <option key={index} value={item}>{item}</option>
    ));
  };

  const displayEmployees = employees => {
    return employees.map((employee, index) => (
      <tr key={index}>
        <td>{employee.id}</td>
        <td>{employee.name || '-'}</td>
        <td>{employee.designation || '-'}</td>
        <td>{employee.skills.length > 0 ? employee.skills.join(', ') : '-'}</td>
      </tr>
    ));
  };

  const filterEmployees = () => {
    const searchInput = document.getElementById('searchInput').value.trim().toLowerCase();
    const designationSelect = document.getElementById('designationSelect');
    const selectedDesignation = designationSelect.value.trim().toLowerCase();
    const skillSelect = document.getElementById('skillSelect');
    const selectedSkill = skillSelect.value.trim().toLowerCase();

    let filteredEmployees = employeeData;

    if (searchInput !== '') {
      filteredEmployees = filteredEmployees.filter(employee => employee.name && employee.name.toLowerCase().includes(searchInput));
    }

    if (selectedDesignation !== '') {
      filteredEmployees = filteredEmployees.filter(employee => employee.designation && employee.designation.toLowerCase() === selectedDesignation);
    }

    if (selectedSkill !== '') {
      filteredEmployees = filteredEmployees.filter(employee => employee.skills.includes(selectedSkill));
    }

    return filteredEmployees;
  };

  return (
    <div>
      <h1>Employee Data</h1>

      <div style={{ marginTop: '20px' }}>
        <label htmlFor="searchInput">Search by Name:</label>
        <input type="text" id="searchInput" />
        <label htmlFor="designationSelect">Filter by Designation:</label>
        <select id="designationSelect">
          <option value="">All</option>
          {populateOptions(designations)}
        </select>
        <label htmlFor="skillSelect">Filter by Skill:</label>
        <select id="skillSelect">
          <option value="">All</option>
          {populateOptions(skills)}
        </select>
        <button onClick={() => setEmployeeData(filterEmployees())}>Apply Filter</button>
      </div>

      <table>
        <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Designation</th>
          <th>Skills</th>
        </tr>
      </thead>
      <tbody>
        {displayEmployees(employeeData)}
      </tbody>
    </table>
  </div>
);
}

export default App;
