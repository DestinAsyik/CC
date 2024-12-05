const { Destination } = require('../Models');

// Constants
const FUEL_TYPES = {
  pertalite: { price: 10000, consumption: 12 }, // Harga per liter dan konsumsi per 12 km
  pertamax: { price: 12000, consumption: 10 },  // Harga per liter dan konsumsi per 10 km
  solar: { price: 9500, consumption: 14 }       // Harga per liter dan konsumsi per 14 km
};

const EARTH_RADIUS = 6371; // Radius bumi dalam kilometer

// Fungsi untuk menghitung jarak menggunakan rumus Haversine
function calculateDistance(lat1, lon1, lat2, lon2) {
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return EARTH_RADIUS * c;
}

// Fungsi untuk menghitung biaya bahan bakar berdasarkan jenis bahan bakar
function calculateFuelCost(distance, fuelType) {
  const { price, consumption } = FUEL_TYPES[fuelType];
  const fuelNeeded = distance / consumption;  
  const fuelCost = fuelNeeded * price; 
  return { fuelNeeded, fuelCost };
}

// Fungsi untuk format angka dengan pemisah ribuan
function formatCurrency(value) {
  return `Rp ${value.toLocaleString('id-ID')}`;
}

// Fungsi untuk format angka dengan 2 angka desimal dan tambahkan satuan
function formatNumber(value, unit = '') {
  return `${value.toFixed(2)} ${unit}`;
}

exports.fuelReccomendations = async (req, res) => {
  try {
    const { userLat, userLon } = req.body;
    const { item_id } = req.params;

    // Validasi input lat, lon user
    if (isNaN(userLat) || isNaN(userLon)) {
      return res.status(400).json({ error: 'Latitude dan Longitude tidak valid' });
    }

    const destination = await Destination.findByPk(item_id);
    if (!destination) {
      return res.status(404).json({ error: 'Destinasi tidak ditemukan' });
    }

    // Mengonversi nilai latitude dan longitude yang disimpan dalam mikroderajat menjadi desimal
    const lat = destination.latitude / 10000000;  
    const lon = destination.longitude / 10000000; 

    console.log(lat);
    console.log(lon);

    // Menghitung jarak antara pengguna dan destinasi
    const distance = calculateDistance(userLat, userLon, lat, lon);

    // Menghitung biaya bahan bakar untuk setiap jenis bahan bakar
    const fuelCalculations = Object.keys(FUEL_TYPES).map(fuelType => {
      const { fuelNeeded, fuelCost } = calculateFuelCost(distance, fuelType);
      return {
        fuelType: fuelType.charAt(0).toUpperCase() + fuelType.slice(1),  // Kapitalisasi nama bahan bakar
        fuelNeeded: formatNumber(fuelNeeded, 'liter'),
        fuelCost: formatCurrency(fuelCost),
      };
    });

    // Mendapatkan harga tiket destinasi
    const ticketPrice = destination.price || 0;

    // Menghitung total biaya (biaya bahan bakar + harga tiket)
    const totalCosts = fuelCalculations.map(fuelCalculation => {
      const totalCost = (parseFloat(fuelCalculation.fuelCost.replace('Rp ', '').replace(/\./g, '')) + ticketPrice).toFixed(2);
      return {
        ...fuelCalculation,
        totalCost: formatCurrency(totalCost),
      };
    });

    // Mengirimkan response ke client
    res.status(200).json({
      destination: destination.place_name,
      distance: formatNumber(distance, 'km'),
      ticketPrice: formatCurrency(ticketPrice),
      fuelDetails: totalCosts,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};