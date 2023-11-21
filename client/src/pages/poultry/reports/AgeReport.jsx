import React, { useState } from 'react';
const AgeReport = () => {
  const [minAge, setMinAge] = useState('');
  const [maxAge, setMaxAge] = useState('');
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // Fetch data from the server
      const response = await fetch(`/api/age-report?minAge=${minAge}&maxAge=${maxAge}`);
      const data = await response.json();
      // Update state with fetched data
      setReportData(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const classifyAge = (currentAge) => {
    const ageParts = currentAge.split(' ');
    const months = parseInt(ageParts[0], 10);
    const days = parseInt(ageParts[2], 10);
  
    const totalWeeks = (months * 30.44 + days) / 7; // Using a more accurate conversion for months to weeks
    console.log(`Current Age: ${currentAge}, Total Weeks: ${totalWeeks}`);

    if (totalWeeks >= 0 && totalWeeks <= 1) {
      return 'DayOld';
    } else if (totalWeeks > 1 && totalWeeks <= 6) {
      return 'Chick';
    } else if (totalWeeks > 6 && totalWeeks <= 20) {
      return 'Pullet';
    } else {
      return 'Point Of Lay or Sale';
    }
  };
  const calculateAgeSummary = () => {
    const ageSummary = {
      DayOld: { ageRange: '0-1 week', quantity: 0, breakdown: {} },
      Chick: { ageRange: '1-6 weeks', quantity: 0, breakdown: {} },
      Pullet: { ageRange: '6-20 weeks', quantity: 0, breakdown: {} },
      'Point Of Lay or Sale': { ageRange: '20 weeks and older', quantity: 0, breakdown: {} },
    };
    reportData.forEach((bird) => {
      const category = classifyAge(bird.currentAge);
      ageSummary[category].quantity += bird.quantity;
      // Breakdown by breed
      const breed = bird.breed;
      if (!ageSummary[category].breakdown[breed]) {
        ageSummary[category].breakdown[breed] = 0;
      }
      ageSummary[category].breakdown[breed] += bird.quantity;
    });
    return ageSummary;
  };
  const ageSummary = calculateAgeSummary();
  return (
    <div className="container mt-5">
      <h1 className="text-3xl font-bold mb-4">Age-Based Bird Report</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="minAge" className="block text-gray-700 text-sm font-bold mb-2">
            Minimum Age (weeks)
          </label>
          <input
            type="number"
            id="minAge"
            value={minAge}
            onChange={(e) => setMinAge(e.target.value)}
            className="border rounded py-2 px-3 w-full focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="maxAge" className="block text-gray-700 text-sm font-bold mb-2">
            Maximum Age (weeks)
          </label>
          <input
            type="number"
            id="maxAge"
            value={maxAge}
            onChange={(e) => setMaxAge(e.target.value)}
            className="border rounded py-2 px-3 w-full focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-50
          
          hover:bg-blue-100 text-blue-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {loading ? 'Loading...' : 'Generate Report'}
        </button>
      </form>
      {reportData.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Age Summary</h2>
          <table className="table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Age Range</th>
                <th className="px-4 py-2">Quantity</th>
                <th className="px-4 py-2">Breakdown</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(ageSummary).map((category) => (
                <tr key={category}>
                  <td className="border px-4 py-2">{ageSummary[category].ageRange}</td>
                  <td className="border px-4 py-2">{ageSummary[category].quantity}</td>
                  <td className="border px-4 py-2">
                    {Object.keys(ageSummary[category].breakdown).map((breed) => (
                      <div key={breed}>
                        {breed}: {ageSummary[category].breakdown[breed]}
                      </div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AgeReport;