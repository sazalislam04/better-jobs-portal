// // all api method controller
// import Jobs from "../model/job.js";

// // get
// export async function getJobs(req, res) {
//   try {
//     const jobs = await Jobs.find({});
//     if (!jobs) {
//       return res.status(404).json({ error: "Data not found" });
//     }
//     res.status(200).json(jobs);
//   } catch (error) {
//     res.status(404).json({ error: "Error While Fetching Data" });
//   }
// }

// // post
// export async function postJobs(req, res) {
//   try {
//     const jobs = req.body;
//     if (!jobs) return res.status(404).json({ error: "Jobs not provided" });
//     Jobs.create(jobs, function (err, data) {
//       return res.status(200).json(data);
//     });
//   } catch (error) {
//     return res.status(404).json({ error: "Error While Fetching Data" });
//   }
// }

// // put

// // delete
// export async function deleteJobs(req, res) {
//   try {
//     const { jobId } = req.query;
//     console.log(jobId);

//     if (jobId) {
//       const job = await Jobs.findByIdAndDelete(jobId);
//       return res.status(200).json(job);
//     }
//     res.status(404).json({ error: "Job not selected..!" });
//   } catch (error) {
//     return res.status(404).json({ error: "Error While Fetching Data" });
//   }
// }
