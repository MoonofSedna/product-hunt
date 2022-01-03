import React, { useState, useContext } from "react";
import styled from "@emotion/styled";
import { getStorage, ref } from "firebase/storage";
import { uploadBytes, getDownloadURL } from "firebase/storage";
import FileUploader from "react-firebase-file-uploader";
import Router, { useRouter } from "next/router";
import Form from "../components/ui/form";
import Images from "../components/ui/Images";
import useValidation from "../hooks/useValidation";
import { uid } from "uid";

// utils
import ValidateNewProduct from "../utils/validations/validate-new-product";
// firebase\
import FirebaseContext from "../firebase/context";

const Title = styled.h1`
  font-size: 3.5rem;
  margin: 0.5rem 0 1.5rem 0;
`;

export default function NewProduct() {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(false);
  const [imageName, setImageName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [uploadError, setUploadError] = useState("");

  const initialState = {
    name: "",
    company: "",
    url: "",
    description: "",
  };

  const router = useRouter();

  const { user, firebase } = useContext(FirebaseContext);

  async function createProduct() {
    try {
      if (!user) {
        return router.push("/login");
      }
      if (!imageUrl) {
        setUploadError("Image is required");
        return;
      }
      const product = {
        name: name,
        company: company,
        url: url,
        description: description,
        imageUrl: imageUrl,
        votes: 0,
        comments: [],
        createdAt: Date.now(),
        creator: {
          id: user.uid,
          name: user.displayName,
        },
        hasVoted: [],
      };
      await firebase.addProduct(product);
      resetForm();
      document.getElementById("image").value = "";
    } catch (e) {
      setError(e.message);
    } finally {
      setIsUploading(false);
    }
  }

  const { values, errors, handleChange, handleSubmit, resetForm } =
    useValidation(initialState, ValidateNewProduct, createProduct);
  const { name, company, url, description } = values;

  if (!user) {
    Router.push("/");
    return null;
  }

  const handleUploadError = (error) => {
    setIsUploading(false);
    setUploadError(error);
  };

  const handleUploadSuccess = async (filename) => {
    if (filename.target.files.length === 0) {
      setImageUrl("");
      setImageUrl("");
      return;
    }
    setImageName(filename.target.files[0] ? filename.target.files[0].name : "");
    const fileRef = ref(firebase.storage, `products-${uid()}`);
    await uploadBytes(fileRef, filename.target.files[0]).then(() => {
      setIsUploading(true);
    });
    getDownloadURL(fileRef).then((url) => {
      setImageUrl(url);
      !url ? setUploadError("Image is required") : setUploadError("");
    });
    setIsUploading(true);
  };

  return (
    <>
      <Images name="Logo" width={150} height={150} />
      <Form onSubmit={handleSubmit} noValidate>
        <Title>Create New Product</Title>
        <div>
          <label htmlFor="name">Product Name</label>
          <input
            type="name"
            id="name"
            placeholder="Name"
            name="name"
            value={name}
            onChange={handleChange}
          />
          {errors.name && <span>{errors.name}</span>}
        </div>
        <div>
          <label htmlFor="company">Company</label>
          <input
            type="company"
            id="company"
            placeholder="Company"
            name="company"
            value={company}
            onChange={handleChange}
          />
          {errors.company && <span>{errors.company}</span>}
        </div>
        <div>
          <label htmlFor="image">Image</label>
          <FileUploader
            accept="image/*"
            name="image"
            id="image"
            filename={imageName}
            randomizeFilename
            onChange={handleUploadSuccess}
            storageRef={ref(firebase.storage, `products-${uid()}`)}
            onUploadError={handleUploadError}
          />
          {uploadError && <span>{uploadError}</span>}
        </div>
        <div>
          <label htmlFor="url">Url</label>
          <input
            type="url"
            id="url"
            name="url"
            placeholder="Product Url"
            value={url}
            onChange={handleChange}
          />
          {errors.url && <span>{errors.url}</span>}
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={handleChange}
          />
          {errors.description && <span>{errors.description}</span>}
        </div>
        <input type="submit" value="Create" />
        {error && <span>{error}</span>}
      </Form>
    </>
  );
}
