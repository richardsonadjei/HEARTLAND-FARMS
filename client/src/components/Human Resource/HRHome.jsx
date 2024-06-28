import React, { useState } from 'react';
import RegisterEmployee from './extras/RegisterEmployee';
import AllEmployeesReport from './reports/AllEmployees';
import DepartmentRegistration from './extras/RegisterDepartment';
import PositionRegistration from './extras/Positions';
import FinanceCategoryRegistration from './extras/NewFinanceCategories';
import AddPayroll from './finance/RecordPayRoll';
import AllPayrollsReport from './reports/AllPayRollsReport';
import FinanceCategories from './extras/AllFinanceCategories';
import RecordOtherPayments from './finance/OtherPayments';
import ViewOtherPayments from './reports/AllOtherPaymentReport';
import OtherPaymentsForEmployee from './reports/EmployeeOtherPayments';
import AllUsers from './reports/AllUsers';
import RegisterPartner from './extras/NewPartner';
import AllPartners from './extras/AllPartners';


const hrmActivities = [
  {
    id: 1,
    title: 'Employee Management',
    subItems: [
      { id: 11, title: 'Add New Employee' },
      { id: 14, title: 'View All Employee' },
      { id: 15, title: 'All User-Account Holders' },
     
    ],
  },
  {
    id: 2,
    title: 'Leave Management',
    subItems: [
      { id: 21, title: 'Submit Leave Request' },
      { id: 22, title: 'Approve Leave Request' },
    ],
  },
  {
    id: 3,
    title: 'Financial Management',
    subItems: [
      { id: 31, title: 'Generate Payroll' },
      { id: 32, title: 'View Payroll Reports' },
      { id: 33, title: 'Record Other Payments' },
      { id: 34, title: 'View Employee Payments' }
    ],
  },
 
  {
    id: 5,
    title: 'Performance Management',
    subItems: [
      { id: 51, title: 'Conduct Performance Review' },
    ],
  },
  {
    id: 6,
    title: 'Departments And Positions',
    subItems: [
      { id: 61, title: 'Add New Department' },
      { id: 63, title: 'All Department Staff' },
      { id: 62, title: 'Add New Position' },
      { id: 64, title: 'Add All Staff Positions' },
    ],
  },
  {
    id: 7,
    title: 'Extras',
    subItems: [
      { id: 71, title: 'New Finance Category' },
      { id: 83, title: 'Register New Partner' },
      { id: 84, title: 'View All Partners' },
      { id: 72, title: 'All Finance Categories' },
      
    ],
  },
];

function HumanResourceManagement() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedSubItem, setSelectedSubItem] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setSelectedSubItem(null); // Reset selected sub-item when main item is clicked
    setSelectedAction(null); // Reset selected action when main item is clicked
  };

  const handleSubItemClick = (subItem) => {
    setSelectedSubItem(subItem);
    setSelectedAction(null); // Reset selected action when sub-item is clicked
  };

  const handleActionClick = (action) => {
    setSelectedAction(action);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 sidebar">
          <h2 style={{ fontWeight: 'bold', color: 'blue' }}>HRM Activities</h2>
          <ul className="list-group">
            {hrmActivities.map((item) => (
              <li
                key={item.id}
                className={`list-group-item ${selectedItem && selectedItem.id === item.id ? 'active' : ''}`}
                onClick={() => handleItemClick(item)}
              >
                {item.title}
                {selectedItem && selectedItem.id === item.id && selectedItem.subItems && (
                  <ul className="list-group">
                    {item.subItems.map((subItem) => (
                      <li
                        key={subItem.id}
                        className={`list-group-item ${selectedSubItem && selectedSubItem.id === subItem.id ? 'active' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent click on sub-item from propagating to parent item
                          handleSubItemClick(subItem);
                        }}
                      >
                        {subItem.title}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="col-md-9 details">
          {/* Render details based on selected main item, sub-item, and action */}
          {selectedSubItem && selectedSubItem.id === 11 && <RegisterEmployee />}
          {selectedSubItem && selectedSubItem.id === 14 && <AllEmployeesReport />}
          {selectedSubItem && selectedSubItem.id === 15 && <AllUsers />}
          {selectedSubItem && selectedSubItem.id === 61 && <DepartmentRegistration />}
          {selectedSubItem && selectedSubItem.id === 62 && <PositionRegistration />}
          {selectedSubItem && selectedSubItem.id === 71 && <FinanceCategoryRegistration />}
          {selectedSubItem && selectedSubItem.id === 31 && <AddPayroll />}
          {selectedSubItem && selectedSubItem.id === 32 && <AllPayrollsReport />}
          {selectedSubItem && selectedSubItem.id === 72 && <FinanceCategories />}
          {selectedSubItem && selectedSubItem.id === 33 && <RecordOtherPayments />}
          {selectedSubItem && selectedSubItem.id === 83 && <RegisterPartner />}
          {selectedSubItem && selectedSubItem.id === 84 && <AllPartners />}
          {selectedSubItem && selectedSubItem.id === 34 && (
  <div>
    <button
      className="btn btn-primary me-2 mr-2"
      onClick={() => handleActionClick('viewAllEmployeePayments')}
    >
      View All Other Payments
    </button>
    <button
      className="btn btn-secondary me-2 mr-2"
      onClick={() => handleActionClick('employeeOtherPayment')}
    >
      Employee Other Payment
    </button>
    {/* Render components based on selected action */}
    {selectedAction === 'viewAllEmployeePayments' && (
      <div>
        {/* Render View Employee Payments component */}
        <ViewOtherPayments />
      </div>
    )}
    {selectedAction === 'employeeOtherPayment' && (
      <div>
        {/* Render Record Employee Payment component */}
        {/* Replace with the appropriate component */}
        <OtherPaymentsForEmployee />
      </div>
    )}
  </div>
)}

          {!selectedSubItem && <p>Select an item from the sidebar to view details.</p>}
        </div>
      </div>
    </div>
  );
}

export default HumanResourceManagement;
