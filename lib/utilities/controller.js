// controller
import { ObjectId } from "mongodb";
import clientPromise from "../mongo";

// role jobs
export async function getRoleJobs(req, res) {
  try {
    const client = await clientPromise;
    const jobsCollection = client.db("Jobs").collection("jobs");
    const { role } = req.query;
    if (role) {
      const jobs = await jobsCollection.find({ role }).toArray();
      return res.status(200).json(jobs);
    }
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
    if (domain) {
      const jobs = await jobsCollection.find({ domain }).toArray();
      return res.status(200).json(jobs);
    }
  } catch (error) {
    res.status(404).json({ message: "Error while the fatching" });
  }
}

// get single jobby id
export async function getJobById(req, res) {
  try {
    const client = await clientPromise;
    const jobsCollection = client.db("Jobs").collection("jobs");

    const { jobId } = req.query;

    if (jobId) {
      const job = await jobsCollection.findOne({ _id: ObjectId(jobId) });
      return res.status(200).json(job);
    }
    res.status(404).json({ message: "Job not selected...!" });
  } catch (error) {
    res.status(404).json({ message: "Error while the fatching" });
  }
}
