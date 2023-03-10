import { getAllJobs } from "../../../lib/utilities/controller";
export default function handler(req, res) {
  // type of req

  const { method } = req;

  switch (method) {
    case "GET":
      getAllJobs(req, res);
      break;
    case "POST":
      res.status(200).json({ name: "post req" });
      break;

    case "PUT":
      res.status(200).json({ name: "put req" });
      break;

    case "DELETE":
      res.status(200).json({ name: "delete req" });
      break;

    default:
      res.setHeader("Access-Control-Allow-Origin", [
        "GET",
        "POST",
        "PUT",
        "DELETE",
        "HEAD",
      ]);
      res.status(405).end(`Method ${method} not allowd`);
      break;
  }
}
