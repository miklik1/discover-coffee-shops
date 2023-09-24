import {
  table,
  getMinifiedRecords,
  findRecordByFilter,
} from "../../lib/airtable";

const createCoffeeStore = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { id, name, neighbourhood, address, imgUrl, voting } = req.body;

      if (!id) {
        res.status(400).json({ message: "Id is missing" });
        return;
      }

      const existingRecords = await findRecordByFilter(id);

      if (existingRecords.length !== 0) {
        res.json(existingRecords);
      } else {
        if (!name) {
          res.status(400).json({ message: "Name is missing" });
          return;
        }

        const createRecords = await table.create([
          {
            fields: {
              id,
              name,
              address,
              neighbourhood,
              voting,
              imgUrl,
            },
          },
        ]);

        const records = getMinifiedRecords(createRecords);
        res.json(records);
      }
    } catch (err) {
      console.error("Error creating or finding a store", err);
      res
        .status(500)
        .json({ message: "Error creating or finding a store", err });
    }
  }
};

export default createCoffeeStore;
