import { fetchCoffeeStores } from "../../lib/coffee-stores";

const getCoffeeStoresByLocation = async (req, res) => {
  try {
    const { latLong, limit } = req.query;
    const response = await fetchCoffeeStores(latLong, limit);

    res.status(200).json(response);
  } catch (err) {
    console.error("Error fetching coffee stores by location", err);
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};

export default getCoffeeStoresByLocation;
