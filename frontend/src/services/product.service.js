import axios from "axios";
import authHeader from "./auth-header";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";
const API_URL = `${BASE_URL}/products/`;

const getAllProducts = () => {
  return axios.get(API_URL, { headers: authHeader() });
};

const getProductById = (id) => {
  return axios.get(API_URL + id, { headers: authHeader() });
};

const createProduct = (product) => {
  return axios.post(API_URL, product, { headers: authHeader() });
};

const updateProduct = (id, product) => {
  return axios.put(API_URL + id, product, { headers: authHeader() });
};

const deleteProduct = (id) => {
  return axios.delete(API_URL + id, { headers: authHeader() });
};

const productService = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};

export default productService;
