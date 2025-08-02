"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Edit, Trash2, QrCode, Search, Package } from "lucide-react"
import Link from "next/link"
import axios from "axios"

interface Product {
  id: string
  name: string
  sku: string
  price: number
  stock: number
  description: string
  image?: string
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Cotton T-Shirt",
      sku: "CT001",
      price: 29.99,
      stock: 45,
      description: "Comfortable cotton t-shirt",
    },
    { id: "2", name: "Denim Jeans", sku: "DJ002", price: 79.99, stock: 23, description: "Classic blue denim jeans" },
    { id: "3", name: "Summer Dress", sku: "SD003", price: 59.99, stock: 12, description: "Light summer dress" },
    { id: "4", name: "Leather Jacket", sku: "LJ004", price: 199.99, stock: 3, description: "Premium leather jacket" },
  ])

  const [searchQuery, setSearchQuery] = useState("")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isBarcodeModalOpen, setIsBarcodeModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [barcodeQuantity, setBarcodeQuantity] = useState(1)

  const [newProduct, setNewProduct] = useState({
    name: "",
    sku: "",
    price: 0,
    stock: 0,
    description: "",
  })

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const postData = async (product: Product) => {
    try {
      const response = await axios.post(`http://localhost:3001/products`, product);
      console.log("Produk berhasil ditambahkan:", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddProduct = () => {
    const product: Product = {
      id: Date.now().toString(),
      ...newProduct,
      sku: newProduct.sku || `SKU${Date.now()}`,
    }
    postData(product);
    setProducts([...products, product])
    setNewProduct({ name: "", sku: "", price: 0, stock: 0, description: "" })
    setIsAddModalOpen(false)
  }

  const handleGenerateBarcode = (product: Product) => {
    setSelectedProduct(product)
    setIsBarcodeModalOpen(true)
  }

  const handlePrintBarcodes = () => {
    // Visual feedback only
    alert(`Printing ${barcodeQuantity} barcode(s) for ${selectedProduct?.name}`)
    setIsBarcodeModalOpen(false)
    setBarcodeQuantity(1)
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
              <Badge variant="secondary">Products</Badge>
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
            <Link href="/products" className="text-blue-600 font-medium border-b-2 border-blue-600 pb-2">
              Products
            </Link>
            <Link href="/sales" className="text-gray-600 hover:text-gray-900 pb-2">
              Sales
            </Link>
            <Link href="/stock-report" className="text-gray-600 hover:text-gray-900 pb-2">
              Stock Report
            </Link>
            <Link href="/financial-report" className="text-gray-600 hover:text-gray-900 pb-2">
              Financial Report
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
            <p className="text-gray-600">Manage your clothing inventory</p>
          </div>
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Add Product</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogDescription>Enter the details for the new product.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    placeholder="Enter product name"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="sku">SKU/Product ID</Label>
                  <Input
                    id="sku"
                    value={newProduct.sku}
                    onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
                    placeholder="Auto-generated if empty"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: Number.parseFloat(e.target.value) || 0 })}
                    placeholder="0.00"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="stock">Initial Stock</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: Number.parseInt(e.target.value) || 0 })}
                    placeholder="0"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    placeholder="Product description"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="image">Product Image</Label>
                  <Input id="image" type="file" accept="image/*" />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddProduct}>Save Product</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Products Table */}
        <Card>
          <CardHeader>
            <CardTitle>Products ({filteredProducts.length})</CardTitle>
            <CardDescription>Manage your product inventory</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Product Name</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                          <Package className="h-6 w-6 text-gray-400" />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.sku}</TableCell>
                      <TableCell>${product.price.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge variant={product.stock < 5 ? "destructive" : "secondary"}>{product.stock}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleGenerateBarcode(product)}>
                            <QrCode className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Barcode Generation Modal */}
        <Dialog open={isBarcodeModalOpen} onOpenChange={setIsBarcodeModalOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Generate Barcode</DialogTitle>
              <DialogDescription>Generate barcode for {selectedProduct?.name}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex justify-center">
                <div className="bg-white border-2 border-gray-300 p-4 rounded-lg">
                  <div className="flex flex-col items-center space-y-2">
                    <div className="flex space-x-1">
                      {Array.from({ length: 30 }).map((_, i) => (
                        <div key={i} className={`w-1 h-12 ${i % 2 === 0 ? "bg-black" : "bg-white"}`} />
                      ))}
                    </div>
                    <p className="text-sm font-mono">{selectedProduct?.sku}</p>
                  </div>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="quantity">Quantity to Print</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={barcodeQuantity}
                  onChange={(e) => setBarcodeQuantity(Number.parseInt(e.target.value) || 1)}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsBarcodeModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handlePrintBarcodes}>Print Barcodes</Button>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}
