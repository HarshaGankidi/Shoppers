import React, { useContext } from "react";
import { Trash2, Edit } from "lucide-react";
import { AuthContext } from "../context/AuthContext";

const ProductCard = ({ product, onEdit, onDelete }) => {
  const { isAdmin } = useContext(AuthContext);

  return (
    <div className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <img
        src={product.imageUrl || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80"}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800 uppercase tracking-wide">
            {product.category}
          </span>
        </div>
        <p className="mt-1 text-sm text-gray-500 line-clamp-2">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">${product.price}</span>
          {isAdmin() && (
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit(product)}
                className="p-1.5 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors"
              >
                <Edit className="h-4 w-4" />
              </button>
              <button
                onClick={() => onDelete(product.id)}
                className="p-1.5 rounded-full bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-900 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
