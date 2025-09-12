import { useMemo, useState } from 'react'
import { useReactTable, getCoreRowModel, flexRender, createColumnHelper } from '@tanstack/react-table'
import { 
  CubeIcon, 
  MagnifyingGlassIcon,
  FunnelIcon,
  PlusIcon
} from '@heroicons/react/24/outline'

const columnHelper = createColumnHelper()

const categories = [
  'All',
  'Sports',
  'Groceries', 
  'Dairy Products',
  'Stationary',
  'Electronics'
]

export default function ProductsPage() {
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [showFilters, setShowFilters] = useState(false)
  
  const allProducts = useMemo(() => [
    // Sports
    { sku: 'BALL-FOOT-001', name: 'Football', category: 'Sports', variant: 'Size 5', stock: 15, price: 1200, expiresAt: 'N/A' },
    { sku: 'RACKET-BAD-001', name: 'Badminton Racket', category: 'Sports', variant: 'Professional', stock: 8, price: 2500, expiresAt: 'N/A' },
    { sku: 'SHOES-RUN-001', name: 'Running Shoes', category: 'Sports', variant: 'Size 9', stock: 12, price: 4500, expiresAt: 'N/A' },
    
    // Groceries
    { sku: 'RICE-BAS-001', name: 'Basmati Rice', category: 'Groceries', variant: '1kg', stock: 25, price: 180, expiresAt: '2026-12-01' },
    { sku: 'OIL-SUN-001', name: 'Sunflower Oil', category: 'Groceries', variant: '1L', stock: 18, price: 120, expiresAt: '2025-11-15' },
    { sku: 'SUGAR-WHT-001', name: 'White Sugar', category: 'Groceries', variant: '500g', stock: 30, price: 45, expiresAt: '2026-06-01' },
    
    // Dairy Products
    { sku: 'MILK-FRESH-001', name: 'Fresh Milk', category: 'Dairy Products', variant: '1L', stock: 20, price: 60, expiresAt: '2025-09-20' },
    { sku: 'CHEESE-CHE-001', name: 'Cheddar Cheese', category: 'Dairy Products', variant: '200g', stock: 10, price: 150, expiresAt: '2025-10-15' },
    { sku: 'YOGURT-PLAIN-001', name: 'Plain Yogurt', category: 'Dairy Products', variant: '500g', stock: 15, price: 80, expiresAt: '2025-09-25' },
    
    // Stationary
    { sku: 'PEN-BLUE-001', name: 'Blue Pen', category: 'Stationary', variant: 'Ball Point', stock: 50, price: 15, expiresAt: 'N/A' },
    { sku: 'NOTEBOOK-A4-001', name: 'A4 Notebook', category: 'Stationary', variant: '200 pages', stock: 25, price: 120, expiresAt: 'N/A' },
    { sku: 'PENCIL-HB-001', name: 'HB Pencil', category: 'Stationary', variant: 'Pack of 10', stock: 40, price: 50, expiresAt: 'N/A' },
    
    // Electronics
    { sku: 'BATTERY-AA-001', name: 'AA Batteries', category: 'Electronics', variant: 'Pack of 4', stock: 25, price: 120, expiresAt: 'N/A' },
    { sku: 'CABLE-USB-001', name: 'USB Cable', category: 'Electronics', variant: '1m', stock: 15, price: 150, expiresAt: 'N/A' },
    { sku: 'CHARGER-PHONE-001', name: 'Phone Charger', category: 'Electronics', variant: 'Type-C', stock: 12, price: 300, expiresAt: 'N/A' },
    { sku: 'EARPHONE-WIRE-001', name: 'Wired Earphones', category: 'Electronics', variant: '3.5mm', stock: 18, price: 250, expiresAt: 'N/A' },
    { sku: 'POWERBANK-10000-001', name: 'Power Bank', category: 'Electronics', variant: '10000mAh', stock: 8, price: 1200, expiresAt: 'N/A' },
    { sku: 'MEMORY-CARD-001', name: 'Memory Card', category: 'Electronics', variant: '32GB', stock: 10, price: 400, expiresAt: 'N/A' },
  ], [])

  const products = useMemo(() => {
    let filtered = allProducts
    
    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === selectedCategory)
    }
    
    // Filter by search query
    if (query) {
      filtered = filtered.filter(p => 
        [p.sku, p.name, p.category, p.variant].join(' ').toLowerCase().includes(query.toLowerCase())
      )
    }
    
    return filtered
  }, [allProducts, selectedCategory, query])

  const columns = useMemo(() => ([
    columnHelper.accessor('sku', { header: 'SKU' }),
    columnHelper.accessor('name', { header: 'Product' }),
    columnHelper.accessor('category', { header: 'Category' }),
    columnHelper.accessor('variant', { header: 'Variant' }),
    columnHelper.accessor('stock', { header: 'Stock' }),
    columnHelper.accessor('price', { header: 'Price', cell: ({ getValue }) => `Rs ${getValue()}` }),
    columnHelper.accessor('expiresAt', { header: 'Expires' }),
    columnHelper.display({ id: 'actions', header: 'Actions', cell: () => (
      <div className="flex gap-2">
        <button className="rounded-md border border-gray-300 px-2 py-1 text-xs hover:bg-gray-50">Edit</button>
        <button className="rounded-md border border-red-300 px-2 py-1 text-xs text-red-600 hover:bg-red-50">Delete</button>
      </div>
    ) })
  ]), [])

  const table = useReactTable({ data: products, columns, getCoreRowModel: getCoreRowModel() })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="mt-1 text-sm text-gray-500">Manage your inventory across different categories</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <PlusIcon className="h-4 w-4" />
          Add Product
        </button>
      </div>

      {/* Category Filter */}
      <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Categories</h3>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 rounded-md border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50"
          >
            <FunnelIcon className="h-4 w-4" />
            Filters
          </button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Search and Results */}
      <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
        <div className="mb-6 flex items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input 
              value={query} 
              onChange={(e) => setQuery(e.target.value)} 
              placeholder="Search products, SKU, category..." 
              className="w-full rounded-md border border-gray-300 pl-10 pr-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500" 
            />
          </div>
          <div className="text-sm text-gray-500">
            {products.length} product{products.length !== 1 ? 's' : ''} found
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              {table.getHeaderGroups().map(hg => (
                <tr key={hg.id}>
                  {hg.headers.map(header => (
                    <th key={header.id} className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {table.getRowModel().rows.map(row => (
                <tr key={row.id} className="hover:bg-gray-50">
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <CubeIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No products found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {query ? 'Try adjusting your search or filter criteria.' : 'Get started by adding a new product.'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}


