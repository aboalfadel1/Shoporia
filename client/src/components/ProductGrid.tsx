
import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import ProductFilters from "./ProductFilters";
import ProductSort from "./ProductSort";
import ProductStats from "./ProductStats";
import { products } from "@/data/products";
import { useProductFilters } from "@/hooks/useProductFilters";
import { useProductSort } from "@/hooks/useProductSort";
import { usePagination } from "@/hooks/usePagination";
import { Button } from "@/components/ui/button";
import { Filter, Grid, List, Package, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

const ITEMS_PER_PAGE = 12;

const ProductGrid = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("name-asc");

  const {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
    categories,
    filteredProducts,
  } = useProductFilters(products);

  const sortedProducts = useProductSort(filteredProducts, sortBy);
  
  const {
    currentPage,
    totalPages,
    paginatedData,
    goToPage,
    goToNext,
    goToPrevious,
    resetPage,
    hasNext,
    hasPrevious
  } = usePagination({
    totalItems: sortedProducts.length,
    itemsPerPage: ITEMS_PER_PAGE
  });

  // Smart pagination reset: only reset when filters change AND current page becomes invalid
  useEffect(() => {
    const newTotalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);
    
    // Only reset to page 1 if:
    // 1. There are no products (filtered out everything), OR
    // 2. Current page is beyond the new total pages (invalid)
    if (sortedProducts.length === 0 || (currentPage > newTotalPages && newTotalPages > 0)) {
      console.log('Resetting page due to invalid state:', { 
        currentPage, 
        newTotalPages, 
        sortedProductsLength: sortedProducts.length 
      });
      resetPage();
    }
  }, [searchTerm, selectedCategory, priceRange, sortedProducts.length, currentPage, resetPage]);

  const currentProducts = sortedProducts.slice(
    paginatedData.startIndex,
    paginatedData.endIndex
  );

  const totalValue = products.reduce((sum, product) => sum + product.price, 0);

  const handlePageClick = (page: number) => {
    console.log('Clicking page:', page, 'Current page:', currentPage);
    goToPage(page);
  };

  const handleNextClick = () => {
    console.log('Clicking next, current page:', currentPage, 'has next:', hasNext);
    goToNext();
  };

  const handlePreviousClick = () => {
    console.log('Clicking previous, current page:', currentPage, 'has previous:', hasPrevious);
    goToPrevious();
  };

  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (startPage > 1) {
      items.push(
        <li key={1}>
          <Button
            variant={currentPage === 1 ? "outline" : "ghost"}
            size="icon"
            onClick={() => handlePageClick(1)}
            className="h-10 w-10"
          >
            1
          </Button>
        </li>
      );
      if (startPage > 2) {
        items.push(
          <li key="ellipsis1" className="flex h-9 w-9 items-center justify-center">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">More pages</span>
          </li>
        );
      }
    }

    for (let page = startPage; page <= endPage; page++) {
      items.push(
        <li key={page}>
          <Button
            variant={currentPage === page ? "outline" : "ghost"}
            size="icon"
            onClick={() => handlePageClick(page)}
            className="h-10 w-10"
          >
            {page}
          </Button>
        </li>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(
          <li key="ellipsis2" className="flex h-9 w-9 items-center justify-center">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">More pages</span>
          </li>
        );
      }
      items.push(
        <li key={totalPages}>
          <Button
            variant={currentPage === totalPages ? "outline" : "ghost"}
            size="icon"
            onClick={() => handlePageClick(totalPages)}
            className="h-10 w-10"
          >
            {totalPages}
          </Button>
        </li>
      );
    }

    return items;
  };

  console.log('Render - Current page:', currentPage, 'Total pages:', totalPages, 'Sorted products length:', sortedProducts.length);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our carefully curated collection of premium products designed for modern living.
          </p>
        </div>

        <ProductStats 
          totalProducts={products.length}
          filteredProducts={filteredProducts.length}
          totalValue={totalValue}
        />

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <ProductFilters
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                
                <div className="flex items-center gap-1 border rounded-md p-1">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  Showing {paginatedData.startIndex + 1}-{Math.min(paginatedData.endIndex, sortedProducts.length)} of {sortedProducts.length} products
                </span>
                <ProductSort sortBy={sortBy} onSortChange={setSortBy} />
              </div>
            </div>

            {/* Results */}
            {sortedProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Package className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600">Try adjusting your filters or search terms.</p>
              </div>
            ) : (
              <>
                <div className={
                  viewMode === "grid" 
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8"
                    : "space-y-4 mb-8"
                }>
                  {currentProducts.map((product) => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      viewMode={viewMode}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <nav role="navigation" aria-label="pagination" className="mx-auto flex w-full justify-center">
                    <ul className="flex flex-row items-center gap-1">
                      <li>
                        <Button
                          variant="ghost"
                          size="default"
                          onClick={handlePreviousClick}
                          disabled={!hasPrevious}
                          className="gap-1 pl-2.5"
                        >
                          <ChevronLeft className="h-4 w-4" />
                          <span>Previous</span>
                        </Button>
                      </li>
                      
                      {renderPaginationItems()}
                      
                      <li>
                        <Button
                          variant="ghost"
                          size="default"
                          onClick={handleNextClick}
                          disabled={!hasNext}
                          className="gap-1 pr-2.5"
                        >
                          <span>Next</span>
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </li>
                    </ul>
                  </nav>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
