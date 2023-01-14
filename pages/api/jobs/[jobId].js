import { getJobById } from "../../../lib/utilities/controller";
export default function handler(req, res) {
  // type of req
  const { method } = req;

  switch (method) {
    case "GET":
      getJobById(req, res);
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
