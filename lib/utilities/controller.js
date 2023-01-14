// controller
import clientPromise from "../mongo";

// role jobs
export async function getRoleJobs(req, res) {
  try {
    const client = await clientPromise;
    const jobsCollection = client.db("Jobs").collection("jobs");
    const { role } = req.query;
    const jobs = await jobsCollection.find({ role }).toArray();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(404).json({ message: "Error while the fatching" });
  }
}
// domain jobs
export async function getDomainJobs(req, res) {
  try {
    const client = await clientPromise;
    const jobsCollection = client.db("Jobs").collection("jobs");
    const { domain } = req.query;
    const jobs = await jobsCollection.find({ domain }).toArray();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(404).json({ message: "Error while the fatching" });
  }
}
