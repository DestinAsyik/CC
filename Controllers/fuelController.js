const { Destination } = require('../Models');

// Constants
const FUEL_TYPES = {
  pertalite: { price: 10000, consumption: 12 }, // Harga per liter dan konsumsi per 12 km
  pertamax: { price: 12000, consumption: 10 },  // Harga per liter dan konsumsi per 10 km
  solar: { price: 9500, consumption: 14 }       // Harga per liter dan konsumsi per 14 km
};

const EARTH_RADIUS = 6371; 

function calculateDistance(lat1, lon1, lat2, lon2) {
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return EARTH_RADIUS * c; 
}

function calculateFuelCost(distance, fuelType) {
  const { price, consumption } = FUEL_TYPES[fuelType];
  const fuelNeeded = distance / consumption;
  const fuelCost = fuelNeeded * price;
  return { fuelNeeded, fuelCost };
}

exports.fuelReccomendations = async (req, res) => {
  try {
    const { userLat, userLon } = req.body;
    const { item_id } = req.params;

    const destination = await Destination.findByPk(item_id);
    if (!destination) {
      return res.status(404).json({ error: 'Destinasi tidak ditemukan' });
    }

    const distance = calculateDistance(userLat, userLon, destination.latitude, destination.longitude);

    const fuelCalculations = Object.keys(FUEL_TYPES).map(fuelType => {
      const { fuelNeeded, fuelCost } = calculateFuelCost(distance, fuelType);
      return {
        fuelType,
        fuelNeeded: fuelNeeded.toFixed(2),
        fuelCost: fuelCost.toFixed(2),
      };
    });

    const ticketPrice = destination.price || 0;

    const totalCosts = fuelCalculations.map(fuelCalculation => {
      const totalCost = parseFloat(fuelCalculation.fuelCost) + ticketPrice;
      return {
        ...fuelCalculation,
        totalCost: totalCost.toFixed(2),
      };
    });

    res.status(200).json({
      destination: destination.name,
      distance: distance.toFixed(2),
      ticketPrice: ticketPrice.toFixed(2),
      fuelDetails: totalCosts
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};