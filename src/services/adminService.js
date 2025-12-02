import axiosClient from "../axiosClient";

export const getDashboardStats = async () => {
  const [projectsRes, qualsRes, contactsRes, usersRes] = await Promise.all([
    axiosClient.get("/projects"),
    axiosClient.get("/qualifications"),
    axiosClient.get("/contacts"),
    axiosClient.get("/users").catch(() => ({ data: [] })), // fallback if /users endpoint doesn't exist
  ]);

  const projects = projectsRes.data || [];
  const qualifications = qualsRes.data || [];
  const contacts = contactsRes.data || [];
  const users = usersRes.data || [];

  // sort recent contacts by createdAt if available, otherwise leave order
  const recentContacts = Array.isArray(contacts)
    ? contacts
        .slice()
        .sort((a, b) => {
          const ta = new Date(a.createdAt || a.created_at || a.date || 0).getTime();
          const tb = new Date(b.createdAt || b.created_at || b.date || 0).getTime();
          return tb - ta;
        })
        .slice(0, 6)
    : [];

  return {
    totalProjects: projects.length,
    totalQualifications: qualifications.length,
    totalContacts: contacts.length,
    totalUsers: users.length,
    recentContacts,
  };
};

export default {
  getDashboardStats,
};
