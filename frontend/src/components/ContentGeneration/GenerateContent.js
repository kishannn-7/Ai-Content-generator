import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUserProfileAPI, registerAPI } from "../../apis/user/usersAPI";
import StatusMessage from "../Alert/StatusMessage";
import GenerateContentAPI from "../../apis/googleAI/geminiAI";
import ReactMarkdown from 'react-markdown';
const BlogPostAIAssistant = () => {
  const [generatedContent, setGeneratedContent] = useState("");
  const { isLoading, isError, data, error, refetch } = useQuery({
    queryFn: getUserProfileAPI,
    queryKey: ["Profile"],
  });
  //Mutation
  const mutation = useMutation({
    mutationFn: GenerateContentAPI,
  });
  // Formik setup for handling form data
  const formik = useFormik({
    initialValues: {
      prompt: "",
      tone: "",
      category: "",
    },
    validationSchema: Yup.object({
      prompt: Yup.string().required("A prompt is required"),
      tone: Yup.string().required("Selecting a tone is required"),
      category: Yup.string().required("Selecting a category is required"),
    }),
    onSubmit: (values) => {
      // Simulate content generation based on form values
      console.log(values);
      const content = {
        prompt: `Generate a blog post based ${values.prompt}, ${values.category}, ${values.tone}`,
        heading: values.prompt,
      }
      mutation.mutate(content);

    },
  });
  useEffect(() => {
    if (mutation.isSuccess && mutation.data) {
      setGeneratedContent(`Generated content: ${mutation.data}`);
      refetch();
    }
  }, [mutation.isSuccess, mutation.data]);
  //Display loading
  // console.log(data);
  if (isLoading) {
    return <StatusMessage type="loading" message="Loading Please Wait" />
  }
  else if (isError) {
    return <StatusMessage type="error" message={error?.response?.data?.message} />
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-900 flex justify-center items-center p-6">
      <div className="bg-white rounded-xl shadow-xl overflow-hidden max-w-2xl w-full p-6">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          AI Blog Post Generator
        </h2>
        {mutation?.isPending && <StatusMessage type="loading" message="Loading Please Wait" />}
        {mutation?.isError && <StatusMessage type="error" message={mutation?.error?.response?.data?.message} />}
        {mutation?.isSuccess && <StatusMessage type="success" message="Content Generated Successfully" />}
        {/* Static display for Plan and Credits */}
        <div className="flex mt-2">
          <div className="m-3">
            <span className="text-gray-500 text-sm font-semibold 
            bg-green-200 px-4 py-2 rounded-full">  Plan: {data?.user?.subscriptionPlan}</span>
          </div>
          <div className="m-3">
            <span className="text-gray-500 text-sm font-semibold 
            bg-green-200 px-4 py-2 rounded-full"> Credit: {data?.user?.apirequestCount}/{" "}
              {data?.user?.monthlyRequestCount}</span>
          </div>
        </div>
        {/* ... */}

        {/* Form for generating content */}
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Prompt input field */}
          <div>
            <label
              htmlFor="prompt"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Enter a topic or idea
            </label>
            <input
              id="prompt"
              type="text"
              {...formik.getFieldProps("prompt")}
              className="px-4 py-2 w-full border rounded-md focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter a topic or idea"
            />
            {formik.touched.prompt && formik.errors.prompt && (
              <div className="text-red-500 mt-1">{formik.errors.prompt}</div>
            )}
          </div>

          {/* Tone selection field */}
          <div>
            <label
              htmlFor="tone"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Select Tone
            </label>
            <select
              id="tone"
              {...formik.getFieldProps("tone")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Choose a tone...</option>
              <option value="formal">Formal</option>
              <option value="informal">Informal</option>
              <option value="informative">Informative</option>
              <option value="humorous">Humorous</option>
              <option value="conversational">Conversational</option>
              <option value="inspirational">Inspirational</option>
              <option value="analytical">Analytical</option>
              <option value="nostalgic">Nostalgic</option>
            </select>
            {formik.touched.tone && formik.errors.tone && (
              <div className="text-red-500 mt-1">{formik.errors.tone}</div>
            )}
          </div>

          {/* Category selection field */}
          <div>
            <label
              htmlFor="category"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Select Category
            </label>
            <select
              id="category"
              {...formik.getFieldProps("category")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Choose a category...</option>
              <option value="technology">Technology</option>
              <option value="health">Health</option>
              <option value="business">Business</option>
              <option value="lifestyle">Lifestyle</option>
              <option value="food and drink">Food and Drink</option>
              <option value="education">Education</option>
              <option value="entertainment">Entertainment</option>
              <option value="pets">Pets</option>
              <option value="nature">Nature</option>
            </select>
            {formik.touched.category && formik.errors.category && (
              <div className="text-red-500 mt-1">{formik.errors.category}</div>
            )}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Generate Content
          </button>
          {/* Link to view history */}
          <Link to="/history">View history</Link>
        </form>

        {/* Display generated content */}
        {generatedContent && (
          <div className="mt-6 p-4 bg-gray-100 rounded-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Generated Content:
            </h3>
            <p className="text-gray-600"><ReactMarkdown>{mutation.data}</ReactMarkdown></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPostAIAssistant;
