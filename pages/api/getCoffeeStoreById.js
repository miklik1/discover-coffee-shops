import { findRecordByFilter } from "../../lib/airtable";

const getCoffeeStoreById = async (req, res) => {
  const { id } = req.query;

  try {
    if (!id) {
      res.status(400).json({ message: "Id is missing" });
      return;
    }

    const records = await findRecordByFilter(id);

    if (records.length !== 0) {
      res.json(records);
    } else {
      res.json({ message: `id could not be found` });
    }
  } catch (error) {
    console.error("Error fetching coffee store by id", error);
    res.status(500).json({ message: "Something went wrong", error });
  }
};

export default getCoffeeStoreById;
