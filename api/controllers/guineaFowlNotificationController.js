// controllers/guineaFowl.controller.js
import GuineaFowlStock from '../models/guineaFowl.model.js';
import Vaccination from '../models/vaccination.model.js';

// Helper function to convert age to days
const convertAgeToDays = (age) => {
  const [months, days] = age.match(/\d+/g).map(Number);
  const totalDays = months * 30 + days;
  return totalDays;
};

// Controller function to fetch guinea fowls with vaccination due
const fetchGuineaFowlsWithVaccinationDue = async () => {
  try {
    // Fetch guinea fowls and their vaccinations
    const guineaFowls = await GuineaFowlStock.find();
    const vaccinations = await Vaccination.find();

    // Check vaccination due for each guinea fowl
    const guineaFowlsWithVaccinationDue = guineaFowls.reduce((result, guineaFowl) => {
      // Convert guinea fowl's current age to days
      const guineaFowlAgeInDays = convertAgeToDays(guineaFowl.currentAge);

      // Find the vaccination due for the guinea fowl
      const vaccinationDue = vaccinations.find((vaccination) => {
        return guineaFowlAgeInDays >= vaccination.ageRangeStart && guineaFowlAgeInDays <= vaccination.ageRangeEnd;
      });

      if (vaccinationDue) {
        result.push({
          guineaFowl,
          vaccinationDue: vaccinationDue.name,
        });
      }

      return result;
    }, []);

    return guineaFowlsWithVaccinationDue;
  } catch (error) {
    console.error('Error fetching guinea fowls and checking vaccination due:', error);
    throw error;
  }
};

export { fetchGuineaFowlsWithVaccinationDue, convertAgeToDays };
