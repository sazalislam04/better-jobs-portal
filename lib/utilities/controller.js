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

// get filter location data
export async function getFilterByLocations(req, res) {
  try {
    const client = await clientPromise;
    const jobsCollection = client.db("Jobs").collection("jobs");

    const { city } = req.query;
    if (city) {
      const result = await jobsCollection.find({ city }).toArray();
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
      const result = await jobsCollection.find({ type_of_job }).toArray();
      return res.status(200).json(result);
    }
  } catch (error) {
    res.status(404).json({ message: "Error while the fatching" });
  }
}

// export async function getMultiQuery(req, res) {
//   try {
//     const client = await clientPromise;
//     const jobsCollection = client.db("Jobs").collection("jobs");

//     // const { city, type_of_job, experience_required } = req.query;
//     console.log(req.query);

//     // console.log(city, type_of_job, experience_required);
//   } catch (error) {
//     console.log(error);
//   }
// }

// filter data
// export async function getFilterJob(req, res) {
//   try {
//     const client = await clientPromise;
//     const jobsCollection = client.db("Jobs").collection("jobs");

//     const { city, type_of_job, experience_required } = req.query;
//     if (
//       city === "Location" &&
//       experience_required === "Experience" &&
//       type_of_job === "Employment Type"
//     ) {
//       const result = await jobsCollection.find({}).toArray();
//       return res.status(200).json(result);
//     }
//     if (
//       city === "Location" &&
//       experience_required === "Experience" &&
//       type_of_job === "Employment Type"
//     ) {
//       const result = await jobsCollection.find({ type_of_job }).toArray();

//       return res.status(200).json(result);
//     }
//     if (
//       experience_required === "Experience" &&
//       type_of_job === "Employment Type"
//     ) {
//       const result = await jobsCollection.find({ city }).toArray();

//       return res.status(200).json(result);
//     }
//     if (
//       city === "Location" &&
//       experience_required !== "Experience" &&
//       type_of_job === "Employment Type"
//     ) {
//       const filter = {
//         experience_required: experience_required,
//         type_of_job: type_of_job,
//       };
//       const result = await jobsCollection.find(filter).toArray();
//       return res.status(200).json(result);
//     }
//     if (city && experience_required === "Experience" && type_of_job) {
//       const filter = { city: city, type_of_job: type_of_job };
//       const result = await jobsCollection.find(filter).toArray();
//       return res.status(200).json(result);
//     }
//     if (
//       city !== "Location" &&
//       experience_required !== "Experience" &&
//       type_of_job === "Employment Type"
//     ) {
//       const filter = {
//         city: city,
//         experience_required: experience_required,
//         type_of_job: type_of_job,
//       };
//       const result = await jobsCollection.find(filter).toArray();
//       return res.status(200).json(result);
//     }
//     if (
//       city === "Location" &&
//       experience_required !== "Experience" &&
//       type_of_job === "Employment Type"
//     ) {
//       const filter = { experience_required: experience_required };
//       const result = await jobsCollection.find(filter).toArray();
//       return res.status(200).json(result);
//     }

//     if (
//       city !== "Location" &&
//       experience_required === "Experience" &&
//       type_of_job === "Employment Type"
//     ) {
//       const filter = { city: city };
//       const result = await jobsCollection.find(filter).toArray();
//       return res.status(200).json(result);
//     }
//     if (city && experience_required) {
//       const filter = {
//         city: city,
//         experience_required: experience_required,
//       };
//       const result = await jobsCollection.find(filter).toArray();
//       return res.status(200).json(result);
//     }
//   } catch (error) {
//     res.status(404).json({ message: "Error while the fatching" });
//   }
// }
