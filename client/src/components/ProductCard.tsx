
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingBag, Heart, Eye } from "lucide-react";
import { Product, useCart } from "@/context/CartContext";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  product: Product;
  viewMode?: "grid" | "list";
}

const ProductCard = ({ product, viewMode = "grid" }: ProductCardProps) => {
  const { dispatch } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({ type: 'ADD_TO_CART', product });
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
    console.log(`Added ${product.name} to cart`);
  };

  const handleViewProduct = () => {
    navigate(`/product/${product.id}`);
  };

  if (viewMode === "list") {
    return (
      <Card 
        className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
        onClick={handleViewProduct}
      >
        <div className="flex gap-4 p-4">
          <div className="w-24 h-24 flex-shrink-0">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover rounded-md"
            />
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex justify-between items-start">
              <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">
                {product.name}
              </h3>
              <Button
                variant="ghost"
                size="icon"
                className={`rounded-full transition-colors ${
                  isLiked ? 'text-red-500' : 'text-gray-400'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsLiked(!isLiked);
                }}
              >
                <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
              </Button>
            </div>
            <p className="text-sm text-gray-600 line-clamp-2">
              {product.description}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-gray-900">
                  ${product.price}
                </span>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {product.category}
                </span>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewProduct();
                  }}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  View
                </Button>
                <Button onClick={handleAddToCart} size="sm" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card 
      className="group cursor-pointer overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleViewProduct}
    >
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-4 right-4">
          <Button
            variant="ghost"
            size="icon"
            className={`rounded-full bg-white/80 backdrop-blur-sm transition-all duration-200 ${
              isLiked ? 'text-red-500' : 'text-gray-600'
            } hover:bg-white hover:scale-110`}
            onClick={(e) => {
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
          </Button>
        </div>
        <div className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
        <div className={`absolute bottom-4 left-4 right-4 transition-transform duration-300 ${isHovered ? 'translate-y-0' : 'translate-y-8'}`}>
          <div className="flex gap-2">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                handleViewProduct();
              }}
              variant="outline"
              className="flex-1 bg-white text-gray-900 hover:bg-gray-100 transition-all duration-200"
            >
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </Button>
            <Button
              onClick={handleAddToCart}
              className="flex-1 bg-white text-gray-900 hover:bg-gray-100 transition-all duration-200"
            >
              <ShoppingBag className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 group-hover:text-purple-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center justify-between pt-2">
            <span className="text-2xl font-bold text-gray-900">
              ${product.price}
            </span>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {product.category}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
