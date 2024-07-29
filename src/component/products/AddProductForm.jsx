import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProductForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axios.post(
        "https://shopping-backend-beryl.vercel.app/products/add-product",
        data
      );

      toast.success(response.data.message); // Show success toast
      navigate("/");
    } catch (error) {
      toast.error("An error occured");
    }
  };

  return (
    <div>
      <ToastContainer />
      <h1 style={{textAlign:'center', margin: '1rem'}}>Add New Product</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Product Name</label>
          <input
            type="text"
            placeholder="Jeans"
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
          </select>
          {errors.size && <p>{errors.size.message}</p>}
        </div>

        <div>
          <label>Description</label>
          <input
            type="text"
            placeholder="This is a denim jeans"
            {...register("description", {
              required: "Description is required",
            })}
          />
          {errors.description && <p>{errors.description.message}</p>}
        </div>

        <div>
          <label>Price</label>
          <input
            type="number"
            placeholder="500"
            {...register("price", { required: "Price is required" })}
          />
          {errors.price && <p>{errors.price.message}</p>}
        </div>

        <div>
          <label>Category</label>
          <select
            {...register("category", { required: "Category is required" })}
          >
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kids">Kids</option>
          </select>
          {errors.category && <p>{errors.category.message}</p>}
        </div>

        <div>
          <label>Image URL</label>
          <input
            type="text"
            placeholder="Image URL"
            {...register("img", { required: "Image URL is required" })}
          />
          {errors.img && <p>{errors.img.message}</p>}
        </div>

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProductForm;
