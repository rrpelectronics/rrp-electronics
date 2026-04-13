"use client";
import React from "react";
import Sidebar from "@/components/cms/Sidebar";
import DashboardHeader from "@/components/cms/DashboardHeader";
import ContentList from "@/components/cms/ContentList";
import ContentForm from "@/components/cms/ContentForm";
import DeleteModal from "@/components/cms/DeleteModal";
import LoginForm from "@/components/cms/LoginForm";
import { useCMSDashboard } from "@/hooks/useCMSDashboard";

const AdminDashboard = () => {
  const {
    isLoggedIn,
    isVerifying,
    username,
    setUsername,
    password,
    setPassword,
    isSidebarOpen,
    setIsSidebarOpen,
    view,
    setView,
    category,
    setCategory,
    searchTerm,
    setSearchTerm,
    items,
    isLoading,
    editingItem,
    deleteModal,
    setDeleteModal,
    formData,
    setFormData,
    imagePreview,
    isUploading,
    errors,
    setErrors,
    handleLogin,
    handleLogout,
    handleInputChange,
    handleFileChange,
    saveItem,
    handleDelete,
    handleEdit,
    handleAdd,
    getTableName
  } = useCMSDashboard();

  if (isVerifying) {
    return <div className="min-h-screen bg-[#F8F9FA]" />;
  }

  if (!isLoggedIn) {
    return (
      <LoginForm
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        onSubmit={handleLogin}
      />
    );
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full bg-[#FAFAFA] relative font-inter">
      <Sidebar
        view={view}
        category={category}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        setCategory={setCategory}
        setView={setView}
        handleLogout={handleLogout}
      />

      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        <DashboardHeader setIsSidebarOpen={setIsSidebarOpen} />

        <div className="flex-1 p-4 sm:p-6 lg:p-10 max-w-[1400px] w-full mx-auto">
          {view === "list" ? (
            <ContentList
              items={items}
              category={category}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              onAdd={handleAdd}
              onEdit={handleEdit}
              onDelete={(item) => setDeleteModal({ isOpen: true, item })}
              isLoading={isLoading}
            />
          ) : (
            <ContentForm
              formData={formData}
              category={category}
              editingItem={editingItem}
              imagePreview={imagePreview}
              isUploading={isUploading}
              errors={errors}
              setFormData={setFormData as any}
              onBack={() => setView("list")}
              onSubmit={saveItem}
              handleInputChange={handleInputChange}
              handleFileChange={handleFileChange}
              setErrors={setErrors as any}
            />
          )}
        </div>
      </div>

      <DeleteModal
        isOpen={deleteModal.isOpen}
        itemTitle={deleteModal.item?.title}
        onClose={() => setDeleteModal({ isOpen: false, item: null })}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default AdminDashboard;
