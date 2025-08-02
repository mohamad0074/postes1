import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Scan, Plus, Minus, Trash2, CreditCard, Banknote, ShoppingCart } from "lucide-react"
import Link from "next/link"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  sku: string
}

interface Product {
  id: string
  name: string
  sku: string
  price: number
  stock: number
}

export default function SalesPage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [scanInput, setScanInput] = useState("")
  const [discount, setDiscount] = useState(0)
  const [amountReceived, setAmountReceived] = useState(0)
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "card" | null>(null)

  // Mock products database
  const products: Product[] = [
    { id: "1", name: "Cotton T-Shirt", sku: "CT001", price: 29.99, stock: 45 },
    { id: "2", name: "Denim Jeans", sku: "DJ002", price: 79.99, stock: 23 },
    { id: "3", name: "Summer Dress", sku: "SD003", price: 59.99, stock: 12 },
    { id: "4", name: "Leather Jacket", sku: "LJ004", price: 199.99, stock: 3 },
  ]

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.1 // 10% tax
  const discountAmount = discount > 0 ? (discount > 1 ? discount : subtotal * (discount / 100)) : 0
  const grandTotal = subtotal + tax - discountAmount
  const changeDue = paymentMethod === "cash" ? Math.max(0, amountReceived - grandTotal) : 0

  const handleScan = () => {
    const product = products.find((p) => p.sku === scanInput || p.id === scanInput)
    if (product) {
      const existingItem = cart.find((item) => item.id === product.id)
      if (existingItem) {
        setCart(cart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)))
      } else {
        setCart([
          ...cart,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            sku: product.sku,
          },
        ])
      }
      setScanInput("")
    } else {
      alert("Product not found!")
    }
  }

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCart(cart.filter((item) => item.id !== id))
    } else {
      setCart(cart.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
    }
  }

  const removeItem = (id: string) => {
    setCart(cart.filter((item) => item.id !== id))
  }

  const completeSale = () => {
    if (cart.length === 0) {
      alert("Cart is empty!")
      return
    }
    if (!paymentMethod) {
      alert("Please select a payment method!")
      return
    }
    if (paymentMethod === "cash" && amountReceived < grandTotal) {
      alert("Insufficient payment amount!")
      return
    }

    // Mock sale completion
    const transactionId = `TXN${Date.now()}`
    alert(`Sale completed! Transaction ID: ${transactionId}`)

    // Reset form
    setCart([])
    setDiscount(0)
    setAmountReceived(0)
    setPaymentMethod(null)
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
              <Badge variant="secondary">Sales</Badge>
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
            <Link href="/sales" className="text-blue-600 font-medium border-b-2 border-blue-600 pb-2">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Product Scan & Cart */}
          <div className="space-y-6">
            {/* Product Scan Area */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Scan className="h-5 w-5" />
                  <span>Scan Product</span>
                </CardTitle>
                <CardDescription>Scan or enter product barcode/SKU</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Scan product barcode..."
                    value={scanInput}
                    onChange={(e) => setScanInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleScan()}
                    className="flex-1"
                    autoFocus
                  />
                  <Button onClick={handleScan}>
                    <Scan className="h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-4 text-sm text-gray-600">
                  <p>Available SKUs for testing: CT001, DJ002, SD003, LJ004</p>
                </div>
              </CardContent>
            </Card>

            {/* Sales Cart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ShoppingCart className="h-5 w-5" />
                  <span>Shopping Cart ({cart.length})</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {cart.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <ShoppingCart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Cart is empty</p>
                    <p className="text-sm">Scan products to add them to cart</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-gray-600">SKU: {item.sku}</p>
                          <p className="text-sm font-medium">${item.price.toFixed(2)} each</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="text-right ml-4">
                          <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Order Summary & Payment */}
          <div className="space-y-6">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (10%):</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Discount:</span>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="number"
                      placeholder="0"
                      value={discount || ""}
                      onChange={(e) => setDiscount(Number.parseFloat(e.target.value) || 0)}
                      className="w-20 text-right"
                    />
                    <span className="text-sm text-gray-600">$/%</span>
                  </div>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount Applied:</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Grand Total:</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>

            {/* Payment Section */}
            <Card>
              <CardHeader>
                <CardTitle>Payment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant={paymentMethod === "cash" ? "default" : "outline"}
                    onClick={() => setPaymentMethod("cash")}
                    className="flex items-center space-x-2"
                  >
                    <Banknote className="h-4 w-4" />
                    <span>Cash</span>
                  </Button>
                  <Button
                    variant={paymentMethod === "card" ? "default" : "outline"}
                    onClick={() => setPaymentMethod("card")}
                    className="flex items-center space-x-2"
                  >
                    <CreditCard className="h-4 w-4" />
                    <span>Card</span>
                  </Button>
                </div>

                {paymentMethod === "cash" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Amount Received</label>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={amountReceived || ""}
                        onChange={(e) => setAmountReceived(Number.parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    {amountReceived > 0 && (
                      <div className="flex justify-between text-lg">
                        <span>Change Due:</span>
                        <span className="font-bold text-green-600">${changeDue.toFixed(2)}</span>
                      </div>
                    )}
                  </div>
                )}

                <Button onClick={completeSale} className="w-full" size="lg" disabled={cart.length === 0}>
                  Complete Sale
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
