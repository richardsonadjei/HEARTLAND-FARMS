import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import Select from 'react-select';

const DewormBirds = () => {
  const [batchNumbers, setBatchNumbers] = useState([]);
  const [dewormerOptions, setDewormerOptions] = useState([]); // Added dewormerOptions state
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [dewormingDate, setDewormingDate] = useState('');
  const [selectedDrug, setSelectedDrug] = useState(null);
  const [dewormedBy, setDewormedBy] = useState('');

  useEffect(() => {
    const fetchBatchNumbers = async () => {
      try {
        const batchResponse = await fetch('/api/all-batchesNoDates');
        if (!batchResponse.ok) {
          throw new Error('Error fetching batch numbers');
        }
        const batchData = await batchResponse.json();

        if (batchData && batchData.data && Array.isArray(batchData.data)) {
          const formattedBatchNumbers = batchData.data.map(batch => ({
            value: batch.batchNumber,
            label: batch.batchNumber
          }));
          setBatchNumbers(formattedBatchNumbers);
        } else {
          setBatchNumbers([]);
        }
      } catch (error) {
        console.error('Error fetching batch numbers:', error.message);
      }
    };

    const fetchDrugNames = async () => {
      try {
        const response = await fetch('/api/all-drugs');
        if (!response.ok) {
          throw new Error('Error fetching drug names');
        }
        const responseData = await response.json();

        if (Array.isArray(responseData)) {
          const dewormerDrugs = responseData.filter(drug => drug.category === 'Dewormer');
          const formattedDewormerNames = dewormerDrugs.map(drug => ({
            value: drug.name,
            label: drug.name,
          }));
          setDewormerOptions(formattedDewormerNames);
        } else {
          setDewormerOptions([]);
        }
      } catch (error) {
        console.error('Error fetching dewormer names:', error.message);
      }
    };

    fetchBatchNumbers();
    fetchDrugNames();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/add-deworming', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          batchNumber: selectedBatch.value,
          dewormingDate,
          dewormerName: selectedDrug.value,
          dewormedBy,
        }),
      });

      if (!response.ok) {
        throw new Error('Error creating deworming record');
      }

      alert('Medication has been created successfully!');
      window.location.href = '/medication'; // Navigate to /medication
    } catch (error) {
      console.error('Error creating deworming record:', error.message);
    }
  };

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? 'white' : 'black',
      backgroundColor: state.isSelected ? 'blue' : 'white',
    }),
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={{ size: 6, offset: 3 }}>
          <h2 className="text-white">Deworm Birds</h2>
          <Form onSubmit={handleSubmit}>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="batchNumber" className="text-white">
                    Select Batch Number
                  </Label>
                  <Select
                    id="batchNumber"
                    name="batchNumber"
                    value={selectedBatch}
                    onChange={(selectedOption) => setSelectedBatch(selectedOption)}
                    options={batchNumbers}
                    placeholder="Select Batch Number"
                    isSearchable
                    styles={customStyles}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="dewormingDate" className="text-white">
                    Deworming Date
                  </Label>
                  <Input
                    type="date"
                    id="dewormingDate"
                    name="dewormingDate"
                    value={dewormingDate}
                    onChange={(e) => setDewormingDate(e.target.value)}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="dewormerName" className="text-white">
                    Dewormer Name
                  </Label>
                  <Select
                    id="dewormerName"
                    name="dewormerName"
                    value={selectedDrug}
                    onChange={(selectedOption) => {
                      console.log('Selected Drug:', selectedOption);
                      setSelectedDrug(selectedOption);
                    }}
                    options={dewormerOptions}
                    placeholder="Select Dewormer Name"
                    isSearchable
                    styles={customStyles}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="dewormedBy" className="text-white">
                    Dewormed By
                  </Label>
                  <Input
                    type="text"
                    id="dewormedBy"
                    name="dewormedBy"
                    value={dewormedBy}
                    onChange={(e) => setDewormedBy(e.target.value)}
                  />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Button type="submit" color="primary">
                Deworm Birds
              </Button>
            </FormGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default DewormBirds;
