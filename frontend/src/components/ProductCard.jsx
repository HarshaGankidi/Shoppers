import React, { useContext } from "react";
import { Trash2, Edit } from "lucide-react";
import { AuthContext } from "../context/AuthContext";

const ProductCard = ({ product, onEdit, onDelete }) => {
  const { isAdmin } = useContext(AuthContext);

  return (
    <div className="bg-slate-800/80 border border-white/10 rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.35)] hover:shadow-[0_18px_40px_rgba(0,0,0,0.45)] transition-all">
      <img
        src={product.imageUrl || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80"}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-5">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold text-cyan-100">{product.name}</h3>
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-cyan-500/15 text-cyan-100 uppercase tracking-wider">
            {product.category}
          </span>
        </div>
        <p className="mt-3 text-sm text-slate-300 line-clamp-2">{product.description}</p>
        <div className="mt-5 flex items-center justify-between">
          <span className="text-2xl font-extrabold text-white">${product.price}</span>
          {isAdmin() && (
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit(product)}
                className="p-1.5 rounded-full bg-cyan-500/20 text-cyan-200 hover:bg-cyan-500/40 hover:text-white transition"
              >
                <Edit className="h-4 w-4" />
              </button>
              <button
                onClick={() => onDelete(product.id)}
                className="p-1.5 rounded-full bg-rose-500/20 text-rose-200 hover:bg-rose-500/40 hover:text-white transition"
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
