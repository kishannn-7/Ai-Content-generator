import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { FaRegEdit, FaTrashAlt, FaEye, FaPlusSquare } from "react-icons/fa";
import { deleteHistoryAPI, getUserProfileAPI, updateUserContentAPI } from "../../apis/user/usersAPI";
import StatusMessage from "../Alert/StatusMessage";
import { Link } from "react-router-dom";
import ReactMarkdown from 'react-markdown';
// Modal component to display full content
const Modal = ({ content, onClose }) => {
  if (!content) return null;
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-md max-w-lg w-full max-h-full overflow-y-auto">
        <h3 className="text-2xl font-bold mb-4">Content Detail</h3>
        <div className="text-gray-700 mb-4 overflow-y-auto max-h-96">
          <ReactMarkdown>{content.content}</ReactMarkdown>
        </div>
        <button
          onClick={onClose}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

// Edit Modal component to edit content
const EditModal = ({ content, onClose, onSave }) => {
  const [editedContent, setEditedContent] = useState(content.content);

  const handleSave = () => {
    onSave({ ...content, content: editedContent });
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-md max-w-[600px] w-full h-[630px] overflow-y-auto">
        <h3 className="text-2xl font-bold mb-4">Edit Content</h3>
        <textarea
          className="w-full h-[450px] p-2 border border-gray-300 rounded-md"
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
        />
        <div className="flex justify-end space-x-4 mt-4">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );

};

const ContentGenerationHistory = () => {
  const [selectedContent, setSelectedContent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();

  //Mutation function for update Content History
  const updateContentMutation = useMutation({
    mutationFn: (content) => updateUserContentAPI(content),
    onSuccess: () => {
      queryClient.invalidateQueries(["Profile"]);
    },
  });

  //Mutation function for delete History
  const mutation = useMutation({
    mutationFn: (content) => deleteHistoryAPI(content._id),
    mutationKey: ["deletehistory"],
    onSuccess: () => {
      refetch();
    }
  });

  const { isLoading, isError, data, error, refetch } = useQuery({
    queryFn: getUserProfileAPI,
    queryKey: ["Profile"],
  });

  //Handler function for delete History
  const handleDeleteHistory = (content) => {
    mutation.mutate(content);
    setSelectedContent(null);

  };

  const handleViewContent = (content) => {
    setSelectedContent(content);
  };

  const handleEditContent = (content) => {
    setSelectedContent(content);
    setIsEditing(true);
  };

  const handleSaveContent = (content) => {
    updateContentMutation.mutate(content);
    setIsEditing(false);
    setSelectedContent(null);
  };

  const handleCloseModal = () => {
    setSelectedContent(null);
    setIsEditing(false);
  };

  if (isLoading) {
    return <StatusMessage type="loading" message="Loading Please Wait" />;
  }

  if (isError) {
    return <StatusMessage type="error" message={error?.response?.data?.message} />;
  }

  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
          Content Generation History
        </h2>
        <Link
          to={"/generate-content"}
          className="mb-4 w-60 bg-blue-500 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-600 flex items-center justify-center"
        >
          <FaPlusSquare className="mr-2" /> Create New Content
        </Link>
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          {data?.user?.history?.length <= 0 ? (
            <h1 className="text-2xl  text-gray-800 m-4">No Content Generated</h1>
          ) : (
            <ul className="divide-y divide-gray-200">
              {data?.user?.history?.map((content) => (
                <li
                  key={content._id}
                  className="px-6 py-4 flex items-center justify-between space-x-4"
                >
                  <div className="flex-1 min-w-0">
                    <h5 className="text-sm font-medium text-gray-900 truncate pb-">
                      {content?.heading}
                    </h5>
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {content?.content}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(content?.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <FaEye
                      className="text-green-500 hover:text-green-600 cursor-pointer"
                      onClick={() => handleViewContent(content)}
                    />
                    <FaRegEdit className="text-blue-500 hover:text-blue-600 cursor-pointer"
                      onClick={() => handleEditContent(content)} />
                    <FaTrashAlt className="text-red-500 hover:text-red-600 cursor-pointer"
                      onClick={() => handleDeleteHistory(content)} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      {selectedContent && !isEditing && (
        <Modal content={selectedContent} onClose={handleCloseModal} />
      )}
      {selectedContent && isEditing && (
        <EditModal
          content={selectedContent}
          onClose={handleCloseModal}
          onSave={handleSaveContent}
        />
      )}
    </div>
  );
};

export default ContentGenerationHistory;
