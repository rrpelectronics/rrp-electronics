import axios from "axios";
import { JOB_DATA } from "@/app/careers/jobData";

/**
 * Fetch jobs data from API with fallback to hardcoded data
 */
export const fetchJobs = async () => {
  try {
    const response = await axios.get(
      "https://eloquent-art-0e51a537b4.strapiapp.com/api/careers?populate=*"
    );
    
    const rawData = response.data.data;
    const sorted = rawData.sort(
      (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
    );
    
    const formattedJobs = sorted.map((item) => ({
      id: item.id,
      title: item.Role,
      department: item.Department,
      location: item.Location,
      type: item.Mode === "Full" ? "Full-time" : item.Mode,
      mode: item.Mode,
      fresherAllowed: item.Fresher,
      experienceMin: item.min_experience,
      experienceMax: item.max_experience,
      description: item.Description,
    }));
    
    return formattedJobs;
  } catch (error) {
    console.error("Error fetching jobs from API, falling back to hardcoded data:", error);
    
    // Fallback to hardcoded data
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
  }
};

/**
 * Fetch single job by slug with fallback to hardcoded data
 */
export const fetchJobBySlug = async (jobSlug) => {
  try {
    const response = await axios.get(
      "https://eloquent-art-0e51a537b4.strapiapp.com/api/careers?populate=*"
    );
    
    const rawData = response.data.data;
    // Find job by matching slug (we'll need to create slugs for API data)
    const item = rawData.find(job => {
      // Create a slug from the job title for comparison
      const jobTitleSlug = job.Role.toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .trim();
      return jobTitleSlug === jobSlug;
    });
    
    if (!item) {
      throw new Error("Job not found in API data");
    }
    
    // Format the job data
    const formattedJob = {
      id: item.id,
      title: item.Role,
      department: item.Department,
      location: item.Location,
      type: item.Mode === "Full" ? "Full-time" : item.Mode,
      mode: item.Mode,
      fresherAllowed: item.Fresher,
      experienceMin: item.min_experience,
      experienceMax: item.max_experience,
      description: item.Description,
    };
    
    return formattedJob;
  } catch (error) {
    console.error("Error fetching job from API, falling back to hardcoded data:", error);
    
    // Fallback to hardcoded data
    // For hardcoded data, we need to find by matching the slug
    const foundJob = JOB_DATA.find(job => {
      // Create a slug from the job title for comparison
      const jobTitleSlug = job.title.toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .trim();
      return jobTitleSlug === jobSlug;
    });
    
    if (!foundJob) {
      throw new Error("Job not found in hardcoded data either");
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
  }
};