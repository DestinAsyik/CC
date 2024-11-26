const Destination = require('../Models/destination');

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; 
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; 
}

exports.fuelReccomendations = async (req, res) => {
    try {
        const { userLat, userLon } = req.body; 
        const { item_id } = req.params; 

        const destination = await Destination.findByPk(item_id);
        if (!destination) {
            return res.status(404).json({ error: 'Destinasi tidak ditemukan' });
        }

        // Harga bensin per liter 
        const fuelPricePerLiter = 10000; 
        const averageFuelConsumption = 12; 

        // Hitung jarak antara pengguna dan destinasi
        const distance = calculateDistance(userLat, userLon, destination.latitude, destination.longitude);

        // Hitung kebutuhan bahan bakar dalam liter
        const fuelNeeded = distance / averageFuelConsumption;

        // Hitung biaya bahan bakar
        const fuelCost = fuelNeeded * fuelPricePerLiter;

        // Tambahkan harga tiket destinasi
        const ticketPrice = destination.price || 0;

        // Total biaya
        const totalCost = fuelCost + ticketPrice;

        // Kirim hasil ke klien
        res.status(200).json({
            status: 'success',
            message: 'Rekomendasi biaya berhasil dihitung',
            data: {
                destination: destination.name,
                distance: distance.toFixed(2),
                fuelNeeded: fuelNeeded.toFixed(2),
                fuelCost: fuelCost.toFixed(2),
                ticketPrice: ticketPrice.toFixed(2),
                totalCost: totalCost.toFixed(2)
            }
        });

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Terjadi kesalahan pada server',
            error: error.message
        });
    }
};