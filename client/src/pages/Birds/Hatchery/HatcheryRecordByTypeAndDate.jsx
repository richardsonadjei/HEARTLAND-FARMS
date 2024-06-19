import React, { useState, useEffect } from 'react';
import { Button, Container } from 'reactstrap';
import { format } from 'date-fns';
import Select from 'react-select'; // Import react-select for searchable dropdown

const HatchedEggsByTypeAndPeriod = () => {
  const [hatchedEggs, setHatchedEggs] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [typeOptions, setTypeOptions] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Fetch types from API and format for dropdown
  const fetchTypeOptions = async () => {
    try {
      const response = await fetch('/api/all-birds-types');
      if (!response.ok) {
        throw new Error('Failed to fetch bird types');
      }
      const types = await response.json();
      const sortedTypes = types.sort((a, b) => a.name.localeCompare(b.name));
      const options = sortedTypes.map((type) => ({ value: type.name, label: type.name }));
      setTypeOptions(options);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchTypeOptions();
  }, []);

  // Fetch hatched eggs based on type and date range
  const fetchHatchedEggsByTypeAndPeriod = async () => {
    try {
      const response = await fetch(`/api/hatched-eggs-by-type-and-period?type=${selectedType.value}&startDate=${startDate}&endDate=${endDate}`);
      if (!response.ok) {
        throw new Error('Failed to fetch hatched eggs');
      }
      const data = await response.json();
      setHatchedEggs(data);
      setErrorMessage('');
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'EEEE do MMMM yyyy');
  };

  const calculatePercentageHatched = (numberOfEggsHatched, numberOfEggs) => {
    if (!numberOfEggs || numberOfEggs === 0) return 0;
    return Math.round((numberOfEggsHatched / numberOfEggs) * 100);
  };

  const calculateSummary = (records) => {
    const totalEggsLoaded = records.reduce((sum, record) => sum + record.numberOfEggs, 0);
    const totalEggsHatched = records.reduce((sum, record) => sum + record.numberOfEggsHatched, 0);
    const averagePercentageHatched = records.length > 0
      ? Math.round(records.reduce((sum, record) => sum + calculatePercentageHatched(record.numberOfEggsHatched, record.numberOfEggs), 0) / records.length)
      : 0;
    return { totalEggsLoaded, totalEggsHatched, averagePercentageHatched };
  };

  const summary = calculateSummary(hatchedEggs);

  return (
    <Container fluid>
      <h2 className="mt-4">Hatched Eggs By Type and Period</h2>
      {errorMessage && <p>{errorMessage}</p>}

      <div className="mb-4">
        <label>Type:</label>
        <Select
          options={typeOptions}
          value={selectedType}
          onChange={setSelectedType}
          placeholder="Select type..."
        />
        <label className="mt-2">Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="form-control"
        />
        <label>End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="form-control"
        />
        <Button color="primary" onClick={fetchHatchedEggsByTypeAndPeriod} className="mt-2">
          Fetch Records
        </Button>
      </div>

      {/* Conditionally render the table only if hatchedEggs array has data */}
      {hatchedEggs.length > 0 && (
        <div className="table-responsive" >
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Type</th>
                <th>Batch Number</th>
                <th>Hatching Date</th>
                <th>Number of Eggs Loaded</th>
                <th>Number of Eggs Hatched</th>
                <th>% Hatch</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {hatchedEggs.map((record, index) => (
                <tr key={record._id}>
                  <td>{index + 1}</td>
                  <td>{record.type}</td>
                  <td>{record.batchNumber}</td>
                  <td>{formatDate(record.hatchingDate)}</td>
                  <td>{record.numberOfEggs}</td>
                  <td>{record.numberOfEggsHatched}</td>
                  <td>{calculatePercentageHatched(record.numberOfEggsHatched, record.numberOfEggs)}%</td>
                  <td>{record.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Render summary table only if hatchedEggs array has data */}
      {hatchedEggs.length > 0 && (
        <div className="mt-4">
          <h3>Summary</h3>
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Total Eggs Loaded</th>
                <th>Total Eggs Hatched</th>
                <th>Average % Hatch</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{summary.totalEggsLoaded}</td>
                <td>{summary.totalEggsHatched}</td>
                <td>{summary.averagePercentageHatched}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </Container>
  );
};

export default HatchedEggsByTypeAndPeriod;
