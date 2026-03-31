import { JOB_DATA } from "@/app/careers/jobData";

/**
 * Fetch jobs data from local hardcoded data
 */
export const fetchJobs = async () => {
  return JOB_DATA.map((item) => ({
    id: item.id,
    title: item.title,
    department: item.department,
    location: item.location,
    type: item.type,
    mode: item.type,
    fresherAllowed: item.fresherAllowed,
    experienceMin: item.experienceMin,
    experienceMax: item.experienceMax,
    description: item.description,
  }));
};

/**
 * Fetch single job by slug from local hardcoded data
 */
export const fetchJobBySlug = async (jobSlug: string) => {
  const foundJob = JOB_DATA.find(job => job.id === jobSlug);

  if (!foundJob) {
    throw new Error("Job not found in hardcoded data");
  }

  return {
    id: foundJob.id,
    title: foundJob.title,
    department: foundJob.department,
    location: foundJob.location,
    type: foundJob.type,
    mode: foundJob.type,
    fresherAllowed: foundJob.fresherAllowed,
    experienceMin: foundJob.experienceMin,
    experienceMax: foundJob.experienceMax,
    description: foundJob.description,
  };
};
