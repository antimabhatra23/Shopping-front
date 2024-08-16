import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./product.css"; // Import the CSS file

const Product = () => {
  // const [loading, setloading] = useState();
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await axios.get("https://clothing-backend-two.vercel.app/products");
      // console.log({ response });
      setProductList(response?.data?.products);
    } catch (error) {
      toast.error("");
    }
  };

  // console.log({ productList });

  return (
    <div className="product-container">
      <table className="product-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Color</th>
            <th>Price</th>
            <th>Image</th>

          </tr>
        </thead>
        <tbody>
          {productList.length > 0 ? (
            productList.map((item) => (
              <tr key={item._id  }>
                <td>{item?.name}</td>
                <td>{item?.color}</td>
                <td>{item?.price}</td>
                <td><img alt="" width={90} src={item?.img}/> </td>

              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="no-data">No Data</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Product;
