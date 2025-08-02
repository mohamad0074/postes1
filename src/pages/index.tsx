"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, ShoppingCart, Package, TrendingUp, DollarSign, Clock, Calendar } from "lucide-react"
import Link from "next/link"

function ClientOnlyTime() {
  const [time, setTime] = useState(new Date().toLocaleTimeString())

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date().toLocaleTimeString())
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  return <span>{time}</span>
}

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const currentDate = new Date().toLocaleDateString()

  const quickStats = [
    { title: "Today's Sales", value: "$1,247.50", icon: DollarSign, color: "text-green-600" },
    { title: "Products in Stock", value: "342", icon: Package, color: "text-blue-600" },
    { title: "Low Stock Items", value: "12", icon: TrendingUp, color: "text-orange-600" },
    { title: "Transactions", value: "28", icon: ShoppingCart, color: "text-purple-600" },
  ]

  const recentSales = [
    { id: "TXN001", time: "2:30 PM", amount: "$89.99", items: "3 items" },
    { id: "TXN002", time: "2:15 PM", amount: "$156.50", items: "5 items" },
    { id: "TXN003", time: "1:45 PM", amount: "$67.25", items: "2 items" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">ClothingPOS</h1>
              <Badge variant="secondary">Dashboard</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>{currentDate}</span>
                <Clock className="h-4 w-4 ml-2" />
                <ClientOnlyTime />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 h-12 items-center">
            <Link href="/" className="text-blue-600 font-medium border-b-2 border-blue-600 pb-2">
              Dashboard
            </Link>
            <Link href="/products" className="text-gray-600 hover:text-gray-900 pb-2">
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
        {/* Search Bar */}
        <div className="mb-8">
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

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <Link href="/sales">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ShoppingCart className="h-5 w-5 text-green-600" />
                  <span>New Sale</span>
                </CardTitle>
                <CardDescription>Start a new transaction</CardDescription>
              </CardHeader>
            </Link>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <Link href="/products">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Package className="h-5 w-5 text-blue-600" />
                  <span>Manage Products</span>
                </CardTitle>
                <CardDescription>Add or edit products</CardDescription>
              </CardHeader>
            </Link>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <Link href="/stock-report">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-orange-600" />
                  <span>View Reports</span>
                </CardTitle>
                <CardDescription>Check stock and sales</CardDescription>
              </CardHeader>
            </Link>
          </Card>
        </div>

        {/* Recent Sales */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>Latest transactions from today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSales.map((sale) => (
                <div key={sale.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="font-medium">{sale.id}</p>
                      <p className="text-sm text-gray-600">{sale.items}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">{sale.amount}</p>
                    <p className="text-sm text-gray-600">{sale.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
