// controllers/notifications.controller.js
import Bird from '../models/poultry.model.js';
import Vaccination from '../models/vaccination.model.js';

// Helper function to convert age to days
const convertAgeToDays = (age) => {
  const [months, days] = age.match(/\d+/g).map(Number);
  const totalDays = months * 30 + days;
  return totalDays;
};

// Controller function to fetch birds with vaccination due
const fetchBirdsWithVaccinationDue = async () => {
  try {
    // Fetch birds and their vaccinations
    const birds = await Bird.find();
    const vaccinations = await Vaccination.find();

    // Check vaccination due for each bird
    const birdsWithVaccinationDue = birds.reduce((result, bird) => {
      // Convert bird's current age to days
      const birdAgeInDays = convertAgeToDays(bird.currentAge);

      // Find the vaccination due for the bird
      const vaccinationDue = vaccinations.find((vaccination) => {
        return birdAgeInDays >= vaccination.ageRangeStart && birdAgeInDays <= vaccination.ageRangeEnd;
      });

      if (vaccinationDue) {
        result.push({
          bird,
          vaccinationDue: vaccinationDue.name,
        });
      }

      return result;
    }, []);

    return birdsWithVaccinationDue;
  } catch (error) {
    console.error('Error fetching birds and checking vaccination due:', error);
    throw error;
  }
};

export { fetchBirdsWithVaccinationDue, convertAgeToDays };  // Export the function if needed
