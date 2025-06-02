
import { Card, CardContent } from "@/components/ui/card";
import { Package, TrendingUp, Star, Users } from "lucide-react";
import { products } from "@/data/products";

interface ProductStatsProps {
  totalProducts: number;
  filteredProducts: number;
  totalValue: number;
}

const ProductStats = ({ totalProducts, filteredProducts, totalValue }: ProductStatsProps) => {
  // Get actual categories from products data
  const uniqueCategories = new Set(products.map(product => product.category));
  
  const stats = [
    {
      icon: Package,
      label: "Total Products",
      value: totalProducts,
      color: "text-blue-600"
    },
    {
      icon: TrendingUp,
      label: "Showing",
      value: filteredProducts,
      color: "text-green-600"
    },
    {
      icon: Star,
      label: "Avg. Price",
      value: `$${totalProducts > 0 ? Math.round(totalValue / totalProducts) : 0}`,
      color: "text-purple-600"
    },
    {
      icon: Users,
      label: "Categories",
      value: uniqueCategories.size,
      color: "text-orange-600"
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-gray-100 ${stat.color}`}>
                <stat.icon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-lg font-semibold">{stat.value}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProductStats;
