import { model, models, Schema } from "mongoose";

const jobSchema = new Schema({
  active: Boolean,
  company_name: String,
  domain: String,
  role: String,
  city: String,
  type_of_job: String,
  allows_work_from_home: Boolean,
  is_night_shift: Boolean,
  experience_required: String,
  min_monthly_salary: Number,
  max_monthly_salary: Number,
  number_of_openings: Number,
  includes_incentives: Boolean,
  minimum_education: String,
  assets_or_documents_required: Array,
  preferred_skills: Array,
  interviewer_details: Object,
  applicants: Array,
  shortlisted: Array,
  views: Number,
});

const Jobs = models.jobs || model("jobs", jobSchema);

export default Jobs;
