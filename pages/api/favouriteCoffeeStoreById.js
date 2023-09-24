import {
  table,
  findRecordByFilter,
  getMinifiedRecords,
} from "../../lib/airtable";

const favouriteCoffeeStoreById = async (req, res) => {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Id is missing" });
    }

    const records = await findRecordByFilter(id);

    if (records.length === 0) {
      return res.json({ message: "Coffee store id doesn't exist", id });
    }

    const record = records[0];
    const calculateVoting = parseInt(record.voting) + 1;

    // Update the record
    const updateRecord = await table.update([
      {
        id: record.recordId,
        fields: {
          voting: calculateVoting,
        },
      },
    ]);

    if (!updateRecord) {
      return res.status(500).json({ message: "Failed to update coffee store" });
    }

    const minifiedRecords = getMinifiedRecords(updateRecord);
    res.json(minifiedRecords);
  } catch (error) {
    res.status(500).json({ message: "Error upvoting coffee store", error });
  }
};

export default favouriteCoffeeStoreById;
