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
      const jobs = await jobsCollection
        .find({ role })
        .sort({ updatedAt: -1 })
        .toArray();
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
      const jobs = await jobsCollection
        .find({ domain })
        .sort({ updatedAt: -1 })
        .toArray();
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

// get filter location data
export async function getFilterByLocations(req, res) {
  try {
    const client = await clientPromise;
    const jobsCollection = client.db("Jobs").collection("jobs");

    const { city } = req.query;
    if (city) {
      const result = await jobsCollection
        .find({ city })
        .sort({ updatedAt: -1 })
        .toArray();
      return res.status(200).json(result);
    }
  } catch (error) {
    return res.status(404).json({ message: "Error while the fatching" });
  }
}
// get filter experience_required data
export async function getFilterByExperience(req, res) {
  try {
    const client = await clientPromise;
    const jobsCollection = client.db("Jobs").collection("jobs");

    const { experience_required } = req.query;

    if (experience_required) {
      const result = await jobsCollection
        .find({ experience_required })
        .sort({ updatedAt: -1 })
        .toArray();
      return res.status(200).json(result);
    }
  } catch (error) {
    res.status(404).json({ message: "Error while the fatching" });
  }
}
// get filter type_of_job data
export async function getFilterByJobType(req, res) {
  try {
    const client = await clientPromise;
    const jobsCollection = client.db("Jobs").collection("jobs");

    const { type_of_job } = req.query;

    if (type_of_job) {
      const result = await jobsCollection
        .find({ type_of_job })
        .sort({ updatedAt: -1 })
        .toArray();
      return res.status(200).json(result);
    }
  } catch (error) {
    res.status(404).json({ message: "Error while the fatching" });
  }
}

// filter data by job type

export async function getRemoteType(req, res) {
  try {
    const client = await clientPromise;
    const jobsCollection = client.db("Jobs").collection("jobs");

    // const { allows_work_from_home } = req.query;

    const result = await jobsCollection
      .find({ allows_work_from_home: true })
      .sort({ updatedAt: -1 })
      .toArray();
    return res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: "Error while the fatching" });
  }
}

// get all jobs,

export async function getAllJobs(req, res) {
  try {
    const client = await clientPromise;
    const jobsCollection = client.db("Jobs").collection("jobs");

    const result = await jobsCollection
      .find({})
      .sort({ updatedAt: -1 })
      .toArray();
    return res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: "Error while the fatching" });
  }
}
