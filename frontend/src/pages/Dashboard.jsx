import React, { useState, useEffect, useContext } from "react";
import productService from "../services/product.service";
import ProductCard from "../components/ProductCard";
import { AuthContext } from "../context/AuthContext";
import { Plus, X } from "lucide-react";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    imageUrl: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  const { isAdmin } = useContext(AuthContext);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    setLoading(true);
    productService.getAllProducts().then(
      (response) => {
        setProducts(response.data);
        setLoading(false);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setError(resMessage);
        setLoading(false);
      }
    );
  };

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      productService.deleteProduct(id).then(
        () => {
          fetchProducts();
        },
        (error) => {
          console.error("Error deleting product", error);
        }
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const action = isEditing
      ? productService.updateProduct(currentProduct.id, currentProduct)
      : productService.createProduct(currentProduct);

    action.then(
      () => {
        setShowModal(false);
        setIsEditing(false);
        setCurrentProduct({
          name: "",
          description: "",
          price: "",
          category: "",
          imageUrl: "",
        });
        fetchProducts();
      },
      (error) => {
        console.error("Error saving product", error);
      }
    );
  };

  const openAddModal = () => {
    setCurrentProduct({
      name: "",
      description: "",
      price: "",
      category: "",
      imageUrl: "",
    });
    setIsEditing(false);
    setShowModal(true);
  };

  if (loading)
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-cyan-100 text-lg">
        Loading products...
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-4xl font-bold tracking-tight text-cyan-50">Featured Products</h1>
          {isAdmin() && (
          <button
            onClick={openAddModal}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Product
          </button>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded mb-8">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      {isEditing ? "Edit Product" : "Add New Product"}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <input
                        type="text"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={currentProduct.name}
                        onChange={(e) =>
                          setCurrentProduct({
                            ...currentProduct,
                            name: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Description
                      </label>
                      <textarea
                        required
                        rows="3"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={currentProduct.description}
                        onChange={(e) =>
                          setCurrentProduct({
                            ...currentProduct,
                            description: e.target.value,
                          })
                        }
                      ></textarea>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Price ($)
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          required
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          value={currentProduct.price}
                          onChange={(e) =>
                            setCurrentProduct({
                              ...currentProduct,
                              price: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Category
                        </label>
                        <input
                          type="text"
                          required
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          value={currentProduct.category}
                          onChange={(e) =>
                            setCurrentProduct({
                              ...currentProduct,
                              category: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Image URL
                      </label>
                      <input
                        type="text"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={currentProduct.imageUrl}
                        onChange={(e) =>
                          setCurrentProduct({
                            ...currentProduct,
                            imageUrl: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    {isEditing ? "Update" : "Create"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
