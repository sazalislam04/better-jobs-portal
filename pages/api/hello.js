// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import clientPromise from "../../lib/mongo";

export default function handler(req, res) {
  clientPromise();
  res.status(200).json({ message: "Server Active" });
}
