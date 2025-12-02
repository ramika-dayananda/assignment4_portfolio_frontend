import axiosClient from "../axiosClient";

export const sendMessage = async (data) => {
  const res = await axiosClient.post("/contacts", data);
  return res.data;
};

export const getMessages = async () => {
  const res = await axiosClient.get("/contacts");
  return res.data;
};

export const deleteMessage = async (id) => {
  const res = await axiosClient.delete(`/contacts/${id}`);
  return res.data;
};

export default {
  sendMessage,
  getMessages,
  deleteMessage,
};
