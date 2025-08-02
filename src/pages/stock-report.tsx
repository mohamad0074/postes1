"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Download, AlertTriangle, Package } from "lucide-react"
import Link from "next/link"

interface Product {
  id: string
  name: string
  sku: string
  stock: number
  lowStockThreshold: number
}

export default function StockReportPage() {
  const [products] = useState<Product[]>([
    { id: "1", name: "Cotton T-Shirt", sku: "CT001", stock: 45, lowStockThreshold: 10 },
    { id: "2", name: "Denim Jeans", sku: "DJ002", stock: 23, lowStockThreshold: 15 },
    { id: "3", name: "Summer Dress", sku: "SD003", stock: 4, lowStockThreshold: 5 },
    { id: "4", name: "Leather Jacket", sku: "LJ004", stock: 3, lowStockThreshold: 5 },
    { id: "5", name: "Polo Shirt", sku: "PS005", stock: 67, lowStockThreshold: 20 },
    { id: "6", name: "Casual Shorts", sku: "CS006", stock: 2, lowStockThreshold: 8 },
    { id: "7", name: "Winter Coat", sku: "WC007", stock: 15, lowStockThreshold: 5 },
    { id: "8", name: "Sneakers", sku: "SN008", stock: 1, lowStockThreshold: 3 },
  ])

  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState<"all" | "low-stock">("all")
  const [sortBy, setSortBy] = useState<"name" | "stock" | "sku">("name")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesFilter = filter === "all" || (filter === "low-stock" && product.stock <= product.lowStockThreshold)
      return matchesSearch && matchesFilter
    })
    .sort((a, b) => {
      let aValue: string | number
      let bValue: string | number

      switch (sortBy) {
        case "stock":
          aValue = a.stock
          bValue = b.stock
          break
        case "sku":
          aValue = a.sku
          bValue = b.sku
          break
        default:
          aValue = a.name
          bValue = b.name
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortOrder === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      } else {
        return sortOrder === "asc" ? (aValue as number) - (bValue as number) : (bValue as number) - (aValue as number)
      }
    })

  const lowStockCount = products.filter((p) => p.stock <= p.lowStockThreshold).length
  const totalProducts = products.length
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0)

  const handleExportCSV = () => {
    // Mock CSV export
    alert("Stock report exported to CSV (mock functionality)")
  }

  const handleSort = (column: "name" | "stock" | "sku") => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(column)
      setSortOrder("asc")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-2xl font-bold text-gray-900">
                ClothingPOS
              </Link>
              <Badge variant="secondary">Stock Report</Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 h-12 items-center">
            <Link href="/" className="text-gray-600 hover:text-gray-900 pb-2">
              Dashboard
            </Link>
            <Link href="/products" className="text-gray-600 hover:text-gray-900 pb-2">
              Products
            </Link>
            <Link href="/sales" className="text-gray-600 hover:text-gray-900 pb-2">
              Sales
            </Link>
            <Link href="/stock-report" className="text-blue-600 font-medium border-b-2 border-blue-600 pb-2">
              Stock Report
            </Link>
            <Link href="/financial-report" className="text-gray-600 hover:text-gray-900 pb-2">
              Financial Report
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Stock Report</h1>
          <p className="text-gray-600">Monitor your inventory levels and low stock alerts</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{totalProducts}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Stock Units</CardTitle>
              <Package className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{totalStock}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Low Stock Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{lowStockCount}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Controls */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filters & Controls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={filter} onValueChange={(value: "all" | "low-stock") => setFilter(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by stock" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Products</SelectItem>
                  <SelectItem value="low-stock">Low Stock Only</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleExportCSV} className="flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Export CSV</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stock Table */}
        <Card>
          <CardHeader>
            <CardTitle>Stock Levels ({filteredProducts.length} products)</CardTitle>
            <CardDescription>
              {filter === "low-stock" ? "Products with low stock levels" : "All products in inventory"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="cursor-pointer hover:bg-gray-50" onClick={() => handleSort("name")}>
                      Product Name {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
                    </TableHead>
                    <TableHead className="cursor-pointer hover:bg-gray-50" onClick={() => handleSort("sku")}>
                      SKU {sortBy === "sku" && (sortOrder === "asc" ? "↑" : "↓")}
                    </TableHead>
                    <TableHead className="cursor-pointer hover:bg-gray-50" onClick={() => handleSort("stock")}>
                      Current Stock {sortBy === "stock" && (sortOrder === "asc" ? "↑" : "↓")}
                    </TableHead>
                    <TableHead>Low Stock Alert</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => {
                    const isLowStock = product.stock <= product.lowStockThreshold
                    const isCritical = product.stock <= 3

                    return (
                      <TableRow key={product.id} className={isLowStock ? "bg-red-50" : ""}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.sku}</TableCell>
                        <TableCell>
                          <span
                            className={`font-medium ${isCritical ? "text-red-600" : isLowStock ? "text-orange-600" : "text-green-600"}`}
                          >
                            {product.stock}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-gray-600">Below {product.lowStockThreshold}</span>
                        </TableCell>
                        <TableCell>
                          {isCritical ? (
                            <Badge variant="destructive" className="flex items-center space-x-1 w-fit">
                              <AlertTriangle className="h-3 w-3" />
                              <span>Critical</span>
                            </Badge>
                          ) : isLowStock ? (
                            <Badge
                              variant="secondary"
                              className="bg-orange-100 text-orange-800 flex items-center space-x-1 w-fit"
                            >
                              <AlertTriangle className="h-3 w-3" />
                              <span>Low Stock</span>
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              In Stock
                            </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
