import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import { IoMdAdd } from 'react-icons/io';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Select from 'react-select';

const Treatment = () => {
  const [batchNumbers, setBatchNumbers] = useState([]);
  const [medications, setMedications] = useState([]);
  const [batchNumber, setBatchNumber] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [medicationList, setMedicationList] = useState([{ medication: '', dosage: '' }]);
  const [notes, setNotes] = useState('');
  const [treatmentDoneBy, setTreatmentDoneBy] = useState('');

  useEffect(() => {
    // Fetch batch numbers
    const fetchBatchNumbers = async () => {
      try {
        const response = await fetch('/api/all-batchesNoDates');
        if (!response.ok) {
          throw new Error('Error fetching batch numbers');
        }
        const data = await response.json();
    
        // Check if the data.data.batches property exists and is an array
        if (data && data.data && data.data.batches && Array.isArray(data.data.batches)) {
          const formattedBatchNumbers = data.data.batches.map((batch) => ({
            value: batch.batchNumber,
            label: batch.batchNumber,
          }));
          setBatchNumbers(formattedBatchNumbers);
        } else {
          setBatchNumbers([]);
        }
      } catch (error) {
        console.error('Error fetching batch numbers:', error.message);
      }
    };
    
    // Fetch medications
    const fetchMedications = async () => {
      try {
        const medicationResponse = await fetch('/api/all-drugs');
        if (!medicationResponse.ok) {
          throw new Error('Error fetching medications');
        }
        const medicationData = await medicationResponse.json();

        if (medicationData && Array.isArray(medicationData)) {
          const formattedMedications = medicationData.map((med) => ({
            value: med.name,
            label: med.name,
          }));
          setMedications(formattedMedications);
        } else {
          setMedications([]);
        }
      } catch (error) {
        console.error('Error fetching medications:', error.message);
      }
    };

    fetchBatchNumbers();
    fetchMedications();
  }, []);

  const handleAddMedication = () => {
    setMedicationList([...medicationList, { medication: '', dosage: '' }]);
  };

  const handleRemoveMedication = (index) => {
    const updatedMedicationList = [...medicationList];
    updatedMedicationList.splice(index, 1);
    setMedicationList(updatedMedicationList);
  };

  const handleMedicationChange = (index, field, value) => {
    const updatedMedicationList = [...medicationList];
    updatedMedicationList[index][field] = value;
    setMedicationList(updatedMedicationList);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/add-bird-treatment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          batchNumber,
          diagnosis,
          medications: medicationList,
          notes,
          treatmentDoneBy,
        }),
      });

      if (!response.ok) {
        throw new Error('Error creating bird treatment record');
      }

      alert('Bird treatment record has been created successfully!');
      window.location.href = '/poultry-getting-started';
    } catch (error) {
      console.error('Error creating bird treatment record:', error.message);
      alert('Error creating bird treatment record. Please try again.');
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
          <h2 className="text-white">Create Bird Medication Record</h2>
          <Form onSubmit={handleSubmit}>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="batchNumber" className="text-white">
                    Batch Number
                  </Label>
                  <Select
                    id="batchNumber"
                    name="batchNumber"
                    value={batchNumbers.find((option) => option.value === batchNumber)}
                    onChange={(selectedOption) => setBatchNumber(selectedOption.value)}
                    options={batchNumbers}
                    placeholder="Select Batch Number"
                    isSearchable
                    styles={customStyles}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="diagnosis" className="text-white">
                    Diagnosis
                  </Label>
                  <Input
                    type="text"
                    id="diagnosis"
                    name="diagnosis"
                    value={diagnosis}
                    onChange={(e) => setDiagnosis(e.target.value)}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={12}>
                <FormGroup>
                  <Label className="text-white">Medications</Label>
                  {medicationList.map((medication, index) => (
                    <div key={index} className="d-flex align-items-center mb-2">
                      <Select
                        className="mr-2"
                        value={medications.find((option) => option.value === medication.medication)}
                        onChange={(selectedOption) =>
                          handleMedicationChange(index, 'medication', selectedOption.value)
                        }
                        options={medications}
                        placeholder="Select Medication"
                        isSearchable
                        styles={customStyles}
                        width="200px"  
                      />
                      <Input
                        className="mr-2"
                        type="text"
                        value={medication.dosage}
                        onChange={(e) => handleMedicationChange(index, 'dosage', e.target.value)}
                        placeholder="Dosage"
                        width="200px"  
                      />
                      {index > 0 && (
                        <RiDeleteBin6Line
                          className="cursor-pointer"
                          onClick={() => handleRemoveMedication(index)}
                        />
                      )}
                    </div>
                  ))}
                  <IoMdAdd className="cursor-pointer" onClick={handleAddMedication} />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={12}>
                <FormGroup>
                  <Label for="notes" className="text-white">
                    Notes
                  </Label>
                  <Input
                    type="textarea"
                    id="notes"
                    name="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    style={{ height: '120px' }}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="treatmentDoneBy" className="text-white">
                    Treatment Done By
                  </Label>
                  <Input
                    type="text"
                    id="treatmentDoneBy"
                    name="treatmentDoneBy"
                    value={treatmentDoneBy}
                    onChange={(e) => setTreatmentDoneBy(e.target.value)}
                  />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Input type="submit" color="primary" value="Create Bird Medication Record" />
            </FormGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Treatment;
