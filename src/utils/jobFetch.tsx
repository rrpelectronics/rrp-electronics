import { getAllItems } from "@/lib/cms-actions";
import { TABLES } from "@/lib/aws";

/**
 * Fetch jobs data from local JSON database
 */
export const fetchJobs = async () => {
  const data = await getAllItems(TABLES.CAREERS);
  return data.map((item: any) => ({
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
 * Fetch single job by slug from local JSON database
 */
export const fetchJobBySlug = async (jobSlug: string) => {
  const data = await getAllItems(TABLES.CAREERS);
  const foundJob = data.find((job: any) => job.id === jobSlug);

  if (!foundJob) {
    throw new Error("Job not found in database");
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
