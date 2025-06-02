
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, X } from "lucide-react";

interface ProductFiltersProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
}

const ProductFilters = ({
  categories,
  selectedCategory,
  onCategoryChange,
  searchTerm,
  onSearchChange,
  priceRange,
  onPriceRangeChange,
}: ProductFiltersProps) => {
  const [localPriceRange, setLocalPriceRange] = useState(priceRange);

  const handlePriceChange = () => {
    onPriceRangeChange(localPriceRange);
  };

  const clearFilters = () => {
    onCategoryChange("");
    onSearchChange("");
    onPriceRangeChange([0, 1000]);
    setLocalPriceRange([0, 1000]);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Filters
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <X className="h-4 w-4 mr-1" />
            Clear
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Search Products</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Categories</label>
          <div className="flex flex-wrap gap-2">
            <Badge
              variant={selectedCategory === "" ? "default" : "secondary"}
              className="cursor-pointer"
              onClick={() => onCategoryChange("")}
            >
              All
            </Badge>
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "secondary"}
                className="cursor-pointer"
                onClick={() => onCategoryChange(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Price Range</label>
          <div className="space-y-3">
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Min"
                value={localPriceRange[0]}
                onChange={(e) => setLocalPriceRange([parseInt(e.target.value) || 0, localPriceRange[1]])}
                className="flex-1"
              />
              <Input
                type="number"
                placeholder="Max"
                value={localPriceRange[1]}
                onChange={(e) => setLocalPriceRange([localPriceRange[0], parseInt(e.target.value) || 1000])}
                className="flex-1"
              />
            </div>
            <Button size="sm" onClick={handlePriceChange} className="w-full">
              Apply Price Filter
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductFilters;
