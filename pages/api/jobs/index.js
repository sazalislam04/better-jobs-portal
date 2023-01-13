import clientPromise from "../../../lib/mongo";

const handler = async (req, res) => {
  try {
    const client = await clientPromise;
    const jobsCollection = client.db("Jobs").collection("jobs");

    if (req.method === "GET") {
      try {
        const { role } = req.query;

        const jobs = await jobsCollection.find({ role }).toArray();
        res.status(200).json(jobs);
      } catch (error) {
        return res.status(404).json({ error: error.message });
      }
    }
  } catch (error) {
    console.error(error.message);
  }
};

export default handler;
