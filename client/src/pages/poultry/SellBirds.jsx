import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import { IoIosAdd, IoIosRemove } from 'react-icons/io';

const SellBirds = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    sales: [
      {
        batchNumber: '',
        quantity: '', // changed from 0 to ''
        unitPricePerBird: '', // changed from 0 to ''
      },
    ],
    soldBy: currentUser ? currentUser.userName : '',
  });

  const [batchOptions, setBatchOptions] = useState([]);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    // Fetch available batch options when the component mounts
    fetchBatchOptions();
  }, []);

  const fetchBatchOptions = async () => {
    try {
      const response = await fetch('/api/all-batchesNoDates');
      if (!response.ok) {
        throw new Error('Error fetching batch options');
      }
      const data = await response.json();
      const options = data.data.map((batch) => ({
        value: batch.batchNumber,
        label: `${batch.batchNumber} - Stock: ${batch.quantity}`,
        quantity: parseInt(batch.quantity, 10) || 0,
      }));
      setBatchOptions(options);
    } catch (error) {
      console.error('Error fetching batch options:', error.message);
    }
  };

  const handleBatchSelectChange = (selectedOption, index) => {
    const updatedSales = [...formData.sales];
    updatedSales[index].batch = selectedOption.value;
    updatedSales[index].quantity = ''; // Set the quantity to zero or an empty value
    setFormData({
      ...formData,
      sales: updatedSales,
    });
  };
  
  
  const handleSaleInputChange = (index, field, value) => {
    const updatedSales = [...formData.sales];
    updatedSales[index][field] = field === 'quantity' ? value.replace(/\D/g, '') : value; // Allow only digits in quantity
    setFormData({
      ...formData,
      sales: updatedSales,
    });
  };

  const handleAddSale = () => {
    setFormData({
      ...formData,
      sales: [
        ...formData.sales,
        {
          batchNumber: '',
          quantity: '', // changed from 0 to ''
          unitPricePerBird: '', // changed from 0 to ''
        },
      ],
    });
  };

  const handleRemoveSale = (index) => {
    const updatedSales = [...formData.sales];
    updatedSales.splice(index, 1);
    setFormData({
      ...formData,
      sales: updatedSales,
    });
  };

  const calculateTotalAmount = () => {
    return formData.sales.reduce((sum, sale) => sum + sale.quantity * sale.unitPricePerBird, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/sell-birds', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sales: formData.sales,
          soldBy: formData.soldBy,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
  
      // Set success message
      setMessage('Bird sale recorded successfully');
  
      // Clear the message after a delay (e.g., 3 seconds)
      setTimeout(() => {
        setMessage(null);
  
        // Navigate the user to /poultry-dashboard
        window.location.href = '/poultry-dashboard';
      }, 3000);
    } catch (error) {
      // Set error message
      setMessage(`Error recording bird sale: ${error}`);
  
      // Clear the error message after a delay (e.g., 3 seconds)
      setTimeout(() => {
        setMessage(null);
  
        // Refresh the page
        window.location.reload();
      }, 3000);
    }
  };
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#d3d3d3' : 'white',
      color: state.isFocused ? 'black' : 'black',
    }),
    control: (provided) => ({
      ...provided,
      backgroundColor: 'white',
    }),
  };

  return (
    <Container>
      <Row>
        <Col sm="12" md={{ size: 8, offset: 2 }}>
          <h2 className="mb-4 text-center">Record Bird Sale</h2>
          {message && (
            <div className={`alert ${message.includes('Error') ? 'alert-danger' : 'alert-success'}`}>
              {message}
            </div>
          )}
          <Form onSubmit={handleSubmit}>
            {formData.sales.map((sale, index) => (
              <div key={index} className="mb-3">
                <FormGroup>
      <Label for={`batchNumber-${index}`}>Batch Number:</Label>
      <Select
        id={`batchNumber-${index}`}
        name={`batchNumber-${index}`}
        value={batchOptions.find((opt) => opt.value === sale.batch)}
        onChange={(selectedOption) => handleBatchSelectChange(selectedOption, index)}
        options={batchOptions}
        isSearchable
        styles={customStyles}
      />
    </FormGroup>
                <FormGroup>
                  <Label for={`quantity-${index}`}>Quantity:</Label>
                  <Input
                    type="number"
                    id={`quantity-${index}`}
                    name={`quantity-${index}`}
                    value={sale.quantity}
                    onChange={(e) => handleSaleInputChange(index, 'quantity', e.target.value)}
                    autoComplete="off"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for={`unitPricePerBird-${index}`}>Unit Price Per Bird:</Label>
                  <Input
                    type="number"
                    id={`unitPricePerBird-${index}`}
                    name={`unitPricePerBird-${index}`}
                    value={sale.unitPricePerBird}
                    onChange={(e) => handleSaleInputChange(index, 'unitPricePerBird', e.target.value)}
                  />
                </FormGroup>
                {formData.sales.length > 1 && (
                  <Button type="button" onClick={() => handleRemoveSale(index)} className="mr-2">
                    <IoIosRemove />
                  </Button>
                )}
              </div>
            ))}
            <Button type="button" onClick={handleAddSale} className="mb-3">
              <IoIosAdd /> Add Batch
            </Button>
            <FormGroup>
              <Label>Total Amount:</Label>
              <Input type="text" value={calculateTotalAmount()} readOnly />
            </FormGroup>
            <FormGroup>
              <Label for="soldBy">Sold By:</Label>
              <Input type="text" id="soldBy" name="soldBy" value={formData.soldBy} readOnly />
            </FormGroup>
            <Button type="submit">Record Bird Sale</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SellBirds;
