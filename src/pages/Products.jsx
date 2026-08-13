import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { GlassCard } from '../components/common/GlassCard';
import { StatusBadge } from '../components/common/StatusBadge';
import { ProductModal } from '../components/products/ProductModal';
import { formatCurrency } from '../utils/helpers';
import { exportToCSV } from '../utils/csvExport';
import { Search, Plus, Download, Filter, LayoutGrid, List, Edit2, Star } from 'lucide-react';

export const Products = () => {
  const { products } = useData();

  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [stockFilter, setStockFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.sku.toLowerCase().includes(search.toLowerCase());

      const matchesCategory = categoryFilter === 'All' || p.category === categoryFilter;
      const matchesStock = stockFilter === 'All' || p.status === stockFilter;

      return matchesSearch && matchesCategory && matchesStock;
    });
  }, [products, search, categoryFilter, stockFilter]);

  const handleExportCSV = () => {
    const exportData = filteredProducts.map((p) => ({
      ID: p.id,
      Name: p.name,
      Category: p.category,
      SKU: p.sku,
      Price: p.price,
      Stock: p.stock,
      Status: p.status,
      Rating: p.rating,
    }));
    exportToCSV(exportData, `evocommerce_products_${new Date().toISOString().split('T')[0]}.csv`);
  };

  const handleEditProduct = (prod) => {
    setEditingProduct(prod);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header Actions & Search */}
      <GlassCard className="w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products by title or SKU..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-brand-500"
            />
          </div>

          {/* Filters & Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 px-3 py-1.5 rounded-xl text-xs">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="bg-transparent text-slate-800 dark:text-slate-200 focus:outline-none font-semibold"
              >
                <option value="All">All Categories</option>
                <option value="Electronics">Electronics</option>
                <option value="Fashion">Fashion</option>
                <option value="Home & Fitness">Home & Fitness</option>
                <option value="Home & Living">Home & Living</option>
              </select>
            </div>

            {/* Grid / Table View Mode Switcher */}
            <div className="flex items-center p-1 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-xs">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'grid'
                    ? 'bg-brand-500 text-white shadow-md'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'table'
                    ? 'bg-brand-500 text-white shadow-md'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 font-bold text-xs hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
            >
              <Download className="w-4 h-4" /> Export CSV
            </button>

            <button
              onClick={() => {
                setEditingProduct(null);
                setIsModalOpen(true);
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 text-white font-bold text-xs shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 transition-all"
            >
              <Plus className="w-4 h-4" /> Add Product
            </button>
          </div>
        </div>
      </GlassCard>

      {/* Grid View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((p) => (
            <GlassCard key={p.id} className="flex flex-col justify-between group overflow-hidden">
              <div>
                {/* Product Image */}
                <div className="relative h-44 w-full rounded-xl overflow-hidden mb-4 bg-slate-900">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2">
                    <StatusBadge status={p.status} />
                  </div>
                </div>

                {/* Details */}
                <span className="text-[10px] font-bold text-brand-500 uppercase tracking-widest">
                  {p.category}
                </span>
                <h4 className="text-base font-extrabold text-slate-900 dark:text-white line-clamp-1 mt-0.5">
                  {p.name}
                </h4>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {p.description}
                </p>

                <div className="flex items-center gap-1.5 mt-3 text-xs text-amber-400 font-bold">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{p.rating}</span>
                  <span className="text-slate-400 font-normal">({p.reviewsCount} reviews)</span>
                </div>
              </div>

              {/* Price & Actions */}
              <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100 dark:border-white/5">
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">Price</span>
                  <p className="text-lg font-extrabold text-slate-900 dark:text-white">
                    {formatCurrency(p.price)}
                  </p>
                </div>

                <button
                  onClick={() => handleEditProduct(p)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-brand-500 hover:text-white hover:border-brand-500 transition-all"
                >
                  <Edit2 className="w-3.5 h-3.5" /> Edit
                </button>
              </div>
            </GlassCard>
          ))}
        </div>
      ) : (
        /* Table View */
        <GlassCard className="w-full overflow-hidden">
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-white/10 text-slate-400 uppercase font-bold tracking-wider">
                  <th className="pb-3 px-3">Product</th>
                  <th className="pb-3 px-3">Category</th>
                  <th className="pb-3 px-3">SKU</th>
                  <th className="pb-3 px-3">Price</th>
                  <th className="pb-3 px-3">Stock</th>
                  <th className="pb-3 px-3">Status</th>
                  <th className="pb-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-3">
                        <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white">{p.name}</p>
                          <p className="text-[11px] text-slate-400">{p.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 font-semibold text-slate-700 dark:text-slate-300">
                      {p.category}
                    </td>
                    <td className="py-3.5 px-3 text-slate-400 font-mono text-xs">{p.sku}</td>
                    <td className="py-3.5 px-3 font-extrabold text-slate-900 dark:text-white">
                      {formatCurrency(p.price)}
                    </td>
                    <td className="py-3.5 px-3 font-bold text-slate-800 dark:text-slate-200">
                      {p.stock} units
                    </td>
                    <td className="py-3.5 px-3">
                      <StatusBadge status={p.status} />
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <button
                        onClick={() => handleEditProduct(p)}
                        className="p-2 rounded-xl text-slate-400 hover:text-brand-500 hover:bg-brand-500/10 transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      )}

      {/* Product Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productToEdit={editingProduct}
      />
    </div>
  );
};
