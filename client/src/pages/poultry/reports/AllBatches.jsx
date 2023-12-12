import React, { useState } from 'react';

const AllBatches = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Fetch data from the server
      const response = await fetch(`/api/all-batches?startDate=${startDate}&endDate=${endDate}`);
      const data = await response.json();

      // Update state with fetched data
      setBatches(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Function to calculate breed-wise summary
  const calculateBreedSummary = () => {
    const breedSummary = {};
    batches.forEach((batch) => {
      if (breedSummary[batch.breed]) {
        breedSummary[batch.breed] += batch.quantity;
      } else {
        breedSummary[batch.breed] = batch.quantity;
      }
    });
    return breedSummary;
  };

  const breedSummary = calculateBreedSummary();

  const calculateSummary = () => {
    const summary = {};
  
    batches.forEach((batch) => {
      const key = `${batch.breed}_${batch.farmSection}`;
  
      if (summary[key]) {
        summary[key] += batch.quantity;
      } else {
        summary[key] = batch.quantity;
      }
    });
  
    return summary;
  };
  
  const summary = calculateSummary();

  return (
    <div className="container mx-auto mt-5 px-4">
      <h1 className="text-3xl font-bold mb-4">All Batches Of Birds Report</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="startDate" className="block text-gray-700 text-sm font-bold mb-2">
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border rounded py-2 px-3 w-full focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="endDate" className="block text-gray-700 text-sm font-bold mb-2">
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border rounded py-2 px-3 w-full focus:outline-none focus:shadow-outline"
          />
        </div>

        <button
          type="submit"
          className="bg-green-500 text-black py-2 px-4 rounded hover:bg-green-700 focus:outline-none focus:shadow-outline"
        >
          Generate Report
        </button>
      </form>

      {loading && <p>Loading...</p>}

      {batches.length > 0 && (
        <div>
          {/* Batches Table */}
          <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">General Report</h2>
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Batch Number</th>
                  <th className="border px-4 py-2">Quantity</th>
                  <th className="border px-4 py-2">Breed</th>
                  <th className="border px-4 py-2">Current Age</th>
                  <th className="border px-4 py-2">Arrival Date</th>
                  <th className="border px-4 py-2">Farm Section</th>
                  <th className="border px-4 py-2">Created By</th>
                  <th className="border px-4 py-2">Created At</th>
                  {/* Add more table headers based on your data fields */}
                </tr>
              </thead>
              <tbody>
                {batches.map((batch) => (
                  <tr key={batch._id}>
                    <td className="border px-4 py-2">{batch.batchNumber}</td>
                    <td className="border px-4 py-2">{batch.quantity}</td>
                    <td className="border px-4 py-2">{batch.breed}</td>
                    <td className="border px-4 py-2">{batch.currentAge}</td>
                    <td className="border px-4 py-2">{new Date(batch.arrivalDate).toLocaleDateString()}</td>
                    <td className="border px-4 py-2">{batch.farmSection}</td>
                    <td className="border px-4 py-2">{batch.createdBy}</td>
                    <td className="border px-4 py-2">{new Date(batch.createdAt).toLocaleDateString()}</td>
                    {/* Add more table data cells based on your data fields */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Breed-wise Summary Table */}
          <div className="mt-4">
            <h2 className="text-xl font-bold mb-2">Breed-wise Summary</h2>
            <table className="table-auto">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Breed</th>
                  <th className="border px-4 py-2">Total Quantity</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(breedSummary).map((breed) => (
                  <tr key={breed}>
                    <td className="border px-4 py-2">{breed}</td>
                    <td className="border px-4 py-2">{breedSummary[breed]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4">
  <h2 className="text-xl font-bold mb-2">Farm Section-wise Summary</h2>
  <table className="table-auto">
    <thead>
      <tr>
        <th className="border px-4 py-2">Farm Section</th>
        <th className="border px-4 py-2">Breed</th>
        <th className="border px-4 py-2">Total Quantity</th>
      </tr>
    </thead>
    <tbody>
      {Object.keys(summary).map((key) => {
        const [breed, farmSection] = key.split('_');
        return (
          <tr key={key}>
            <td className="border px-4 py-2">{farmSection}</td>
            <td className="border px-4 py-2">{breed}</td>
            <td className="border px-4 py-2">{summary[key]}</td>
          </tr>
        );
      })}
    </tbody>
  </table>
</div>
        </div>
      )}
    </div>
  );
};

export default AllBatches;
