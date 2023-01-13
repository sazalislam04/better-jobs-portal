import React from "react";

const JobsDetails = ({ job }) => {
  const {
    active,
    company_name,
    domain,
    role,
    city,
    type_of_job,
    allows_work_from_home,
    is_night_shift,
    experience_required,
    min_monthly_salary,
    max_monthly_salary,
    number_of_openings,
    includes_incentives,
    minimum_education,
    assets_or_documents_required,
    preferred_skills,
    desc,
    approved,
    posted_by,
    interviewer_details,
    applicants,
    shortlisted,
    views,
    createdAt,
    updatedAt,
  } = job;

  return (
    <div>
      <h2>{job._id}</h2>
    </div>
  );
};

export default JobsDetails;
