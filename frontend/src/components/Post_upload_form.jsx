import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select } from "../components/index";
import mySQLService from "../services/mysql_service";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export function PostForm({ post }) {
  const [error, setError] = useState("");
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    try {
      setError("");
      if (!userData?.id) {
        setError("User must be logged in");
        return;
      }

      let imageFile = null;
      if (data.image?.[0]) {
        const uploadResult = await mySQLService.uploadImage(data.image[0]);
        if (uploadResult?.fileID) {
          imageFile = uploadResult.fileID;
        }
      }

      const postData = {
        title: data.title.trim(),
        slug: data.slug.trim(),
        content: data.content.trim(),
        status: data.status,
        featuredImage: imageFile,
        userId: userData.id
      };

      // Validate all required fields
      if (!postData.title || !postData.content || !postData.slug || !imageFile) {
        setError("All fields are required");
        return;
      }

      console.log('Submitting post data:', postData);
      const dbPost = await mySQLService.createPost(postData);
      
      if (dbPost) {
        navigate(`/post/${dbPost.slug}`);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setError(error.message || "Failed to create post");
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
        <div className="w-2/3 px-2">
          <Input
            label="Title :"
            placeholder="Title"
            className="mb-4"
            {...register("title", { 
              required: "Title is required",
              minLength: { value: 3, message: "Title must be at least 3 characters" }
            })}
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          
          <Input
            label="Slug :"
            placeholder="Slug"
            className="mb-4"
            {...register("slug", { required: "Slug is required" })}
            onInput={(e) => {
              setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
            }}
          />
          {errors.slug && <p className="text-red-500 text-sm">{errors.slug.message}</p>}
          
          <div className="mb-4">
            <label className="block font-medium text-gray-700">Content :</label>
            <textarea
              {...register("content", { required: "Content is required" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              rows="8"
            />
            {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}
          </div>
        </div>
        <div className="w-1/3 px-2">
          <Input
            label="Featured Image :"
            type="file"
            className="mb-4"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: "Featured image is required" })}
          />
          {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
          
          <Select
            options={["active", "inactive"]}
            label="Status"
            className="mb-4"
            {...register("status", { required: true })}
          />
          
          <Button 
            type="submit" 
            className="w-full bg-blue hover:bg-deepBlue"
          >
            Create Post
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PostForm;
