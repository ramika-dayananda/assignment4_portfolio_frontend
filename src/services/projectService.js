import axiosClient from "../axiosClient";

export const getAllProjects = async () => {
  const res = await axiosClient.get("/projects");
  return res.data;
};

export const getProject = async (id) => {
  const res = await axiosClient.get(`/projects/${id}`);
  return res.data;
};

export const createProject = async (data) => {
  // If FormData, send it directly and let the browser set headers
  if (data instanceof FormData) {
    const res = await axiosClient.post("/projects", data);
    return res.data;
  }
  const res = await axiosClient.post("/projects", data);
  return res.data;
};

export const updateProject = async (id, data) => {
  if (data instanceof FormData) {
    const res = await axiosClient.put(`/projects/${id}`, data);
    return res.data;
  }
  const res = await axiosClient.put(`/projects/${id}`, data);
  return res.data;
};

export const deleteProject = async (id) => {
  const res = await axiosClient.delete(`/projects/${id}`);
  return res.data;
};

export default {
  getAllProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
};
