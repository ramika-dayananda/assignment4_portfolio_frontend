import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Home from "../components/Home.jsx";
import Layout from "../components/Layout.jsx";

import About from "./about.jsx";
import Contact from "./contact.jsx";
import Services from "./services.jsx";
import Education from "./education.jsx";
import Project from "./project.jsx";

import SignUp from "./SignUp.jsx";
import SignIn from "./SignIn.jsx";

import ProtectedRoute from "./ProtectedRoute.jsx";

// projects pages
import ProjectList from "./pages/ProjectList.jsx";
import ProjectCreate from "./pages/ProjectCreate.jsx";
import ProjectEdit from "./pages/ProjectEdit.jsx";

// contacts pages
import ContactForm from "./pages/ContactForm.jsx";
import ContactList from "./pages/ContactList.jsx";

// qualifications pages
import QualificationList from "./pages/QualificationList.jsx";
import QualificationCreate from "./pages/QualificationCreate.jsx";
import QualificationEdit from "./pages/QualificationEdit.jsx";

// admin
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import UserList from "./pages/admin/UserList.jsx";

export default function MainRouter() {
  return (
    <div>
      <Layout />

      <Routes>
        {/* auth */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* public */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/education" element={<Education />} />

        {/* Public Contact Form */}
        <Route path="/contact" element={<ContactForm />} />

        {/* Admin Contact List */}
        <Route
          path="/admin/contacts"
          element={
            <ProtectedRoute adminOnly={true}>
              <ContactList />
            </ProtectedRoute>
          }
        />

        {/* Projects */}
        <Route path="/projects" element={<ProjectList />} />
        <Route
          path="/projects/new"
          element={
            <ProtectedRoute adminOnly={true}>
              <ProjectCreate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects/edit/:id"
          element={
            <ProtectedRoute adminOnly={true}>
              <ProjectEdit />
            </ProtectedRoute>
          }
        />

        {/* Qualifications */}
        <Route path="/qualifications" element={<QualificationList />} />
        <Route
          path="/qualifications/new"
          element={
            <ProtectedRoute adminOnly={true}>
              <QualificationCreate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/qualifications/edit/:id"
          element={
            <ProtectedRoute adminOnly={true}>
              <QualificationEdit />
            </ProtectedRoute>
          }
        />

        {/* Admin Dashboard */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Admin Users */}
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute adminOnly={true}>
              <UserList />
            </ProtectedRoute>
          }
        />

        {/* legacy protected pages */}
        <Route
          path="/project"
          element={
            <ProtectedRoute>
              <Project />
            </ProtectedRoute>
          }
        />

        <Route
          path="/services"
          element={
            <ProtectedRoute>
              <Services />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
