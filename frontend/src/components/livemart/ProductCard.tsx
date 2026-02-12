/**
 * Product Card Component
 * 
 * Displays individual product information with role-based pricing.
 */

'use client';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string;
    category: string;
    image_url?: string;
    customer_price: number;
    retailer_price: number;
    wholesaler_price: number;
    stock_quantity: number;
  };
  userRole?: 'customer' | 'retailer' | 'wholesaler';
  onAddToCart?: (productId: string) => void;
}

export function ProductCard({ product, userRole = 'customer', onAddToCart }: ProductCardProps) {
  // Determine price based on user role
  const getPrice = () => {
    switch (userRole) {
      case 'customer':
        return product.customer_price;
      case 'retailer':
        return product.retailer_price;
      case 'wholesaler':
        return product.wholesaler_price;
      default:
        return product.customer_price;
    }
  };

  const price = getPrice();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Product Image */}
      <div className="relative h-48 bg-gray-200">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-gray-400 text-4xl">📦</span>
          </div>
        )}
        {product.stock_quantity < 10 && product.stock_quantity > 0 && (
          <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded text-xs font-semibold">
            Low Stock
          </div>
        )}
        {product.stock_quantity === 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
            Out of Stock
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="mb-2">
          <span className="text-xs font-medium text-indigo-600 uppercase tracking-wide">
            {product.category}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Pricing */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-2xl font-bold text-indigo-600">
              ${price.toFixed(2)}
            </p>
            <p className="text-xs text-gray-500">
              {userRole.charAt(0).toUpperCase() + userRole.slice(1)} Price
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">
              {product.stock_quantity} in stock
            </p>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => onAddToCart?.(product.id)}
          disabled={product.stock_quantity === 0}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {product.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
