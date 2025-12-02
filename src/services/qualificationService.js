import axiosClient from "../axiosClient";

export const getAllQualifications = async () => {
  const res = await axiosClient.get("/qualifications");
  return res.data;
};

export const getQualification = async (id) => {
  const res = await axiosClient.get(`/qualifications/${id}`);
  return res.data;
};

export const createQualification = async (data) => {
  console.log("Service: creating qualification with data:", data);
  const res = await axiosClient.post("/qualifications", data);
  console.log("Service: response from create:", res.data);
  return res.data;
};

export const updateQualification = async (id, data) => {
  console.log("Service: updating qualification", id, "with data:", data);
  const res = await axiosClient.put(`/qualifications/${id}`, data);
  console.log("Service: response from update:", res.data);
  return res.data;
};

export const deleteQualification = async (id) => {
  const res = await axiosClient.delete(`/qualifications/${id}`);
  return res.data;
};

export default {
  getAllQualifications,
  getQualification,
  createQualification,
  updateQualification,
  deleteQualification,
};
