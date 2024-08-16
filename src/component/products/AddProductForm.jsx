import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProductForm = () => {
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file); // Store the file directly
    }
  };

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      // Append form fields to FormData
      for (const key in data) {
        if (data[key]) {
          formData.append(key, data[key]);
        }
      }

      // Append the image file to FormData
      if (imageFile) {
        formData.append('img', imageFile);
      }

      const response = await axios.post(
        "http://localhost:5000/products/add-product",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      if (response.status === 201) {
        toast.success(response.data.message);
        navigate("/");
      } else {
        toast.error("An error occurred: " + response.data.error);
      }
    } catch (error) {
      toast.error("An error occurred: " + (error.response?.data?.error || error.message));
    }
  };

  return (
    <div>
      <ToastContainer />
      <h1 style={{ textAlign: 'center', margin: '1rem' }}>Add New Product</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Product Name</label>
          <input
            type="text"
            placeholder=""
            {...register("name", { required: "Product name is required" })}
          />
          {errors.name && <p>{errors.name.message}</p>}
        </div>

        <div>
          <label>Color</label>
          <select {...register("color", { required: "Color is required" })}>
            <option value="red">Red</option>
            <option value="pink">Pink</option>
            <option value="yellow">Yellow</option>
            <option value="black">Black</option>
            <option value="white">White</option>
            <option value="sky blue">Sky Blue</option>
            <option value="orange">Orange</option>
            <option value="gray">Gray</option>
            <option value="brown">Brown</option>
          </select>
          {errors.color && <p>{errors.color.message}</p>}
        </div>

        <div>
          <label>Size</label>
          <select {...register("size", { required: "Size is required" })}>
            <option value="xs">XS</option>
            <option value="s">S</option>
            <option value="m">M</option>
            <option value="l">L</option>
            <option value="xl">XL</option>
            <option value="xxl">XXL</option>
          </select>
          {errors.size && <p>{errors.size.message}</p>}
        </div>

        <div>
          <label>Description</label>
          <input
            type="text"
            placeholder=""
            {...register("description", { required: "Description is required" })}
          />
          {errors.description && <p>{errors.description.message}</p>}
        </div>

        <div>
          <label>Price</label>
          <input
            type="number"
            placeholder=""
            {...register("price", { required: "Price is required" })}
          />
          {errors.price && <p>{errors.price.message}</p>}
        </div>

        <div>
          <label>Category</label>
          <select {...register("category", { required: "Category is required" })}>
            <option value="all">All</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kids">Kids</option>
          </select>
          {errors.category && <p>{errors.category.message}</p>}
        </div>

        <div>
          <label>Image File</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          {imageFile && (
            <div>
              <img
                src={URL.createObjectURL(imageFile)}
                alt="Preview"
                style={{ width: '100px', height: '100px', marginTop: '10px' }}
              />
            </div>
          )}
          {errors.img && <p>{errors.img.message}</p>}
        </div>

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProductForm;
