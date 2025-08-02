import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { TrendingUp, TrendingDown, DollarSign, Plus, Download } from "lucide-react"
import Link from "next/link"

interface Sale {
  id: string
  date: string
  transactionId: string
  amount: number
}

interface Expense {
  id: string
  date: string
  description: string
  amount: number
}

export default function FinancialReportPage() {
  const [sales] = useState<Sale[]>([
    { id: "1", date: "2024-01-15", transactionId: "TXN001", amount: 89.99 },
    { id: "2", date: "2024-01-15", transactionId: "TXN002", amount: 156.5 },
    { id: "3", date: "2024-01-15", transactionId: "TXN003", amount: 67.25 },
    { id: "4", date: "2024-01-14", transactionId: "TXN004", amount: 234.75 },
    { id: "5", date: "2024-01-14", transactionId: "TXN005", amount: 45.0 },
    { id: "6", date: "2024-01-13", transactionId: "TXN006", amount: 178.99 },
  ])

  const [expenses, setExpenses] = useState<Expense[]>([
    { id: "1", date: "2024-01-15", description: "Office Supplies", amount: 45.5 },
    { id: "2", date: "2024-01-14", description: "Inventory Purchase", amount: 1200.0 },
    { id: "3", date: "2024-01-13", description: "Utilities", amount: 89.75 },
    { id: "4", date: "2024-01-12", description: "Marketing", amount: 150.0 },
  ])

  const [dateRange, setDateRange] = useState("today")
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false)
  const [newExpense, setNewExpense] = useState({
    date: new Date().toISOString().split("T")[0],
    description: "",
    amount: 0,
  })

  const totalIncome = sales.reduce((sum, sale) => sum + sale.amount, 0)
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  const netBalance = totalIncome - totalExpenses

  const handleAddExpense = () => {
    const expense: Expense = {
      id: Date.now().toString(),
      ...newExpense,
    }
    setExpenses([expense, ...expenses])
    setNewExpense({
      date: new Date().toISOString().split("T")[0],
      description: "",
      amount: 0,
    })
    setIsAddExpenseOpen(false)
  }

  const handleExportCSV = () => {
    alert("Financial report exported to CSV (mock functionality)")
  }

  const getDateRangeLabel = () => {
    switch (dateRange) {
      case "today":
        return "Today"
      case "week":
        return "Last 7 Days"
      case "month":
        return "This Month"
      case "custom":
        return "Custom Range"
      default:
        return "Today"
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
              <Badge variant="secondary">Financial Report</Badge>
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
            <Link href="/stock-report" className="text-gray-600 hover:text-gray-900 pb-2">
              Stock Report
            </Link>
            <Link href="/financial-report" className="text-blue-600 font-medium border-b-2 border-blue-600 pb-2">
              Financial Report
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Financial Report</h1>
            <p className="text-gray-600">Track your income and expenses</p>
          </div>
          <div className="flex items-center space-x-4">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">Last 7 Days</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleExportCSV} variant="outline" className="flex items-center space-x-2 bg-transparent">
              <Download className="h-4 w-4" />
              <span>Export CSV</span>
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Income</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">${totalIncome.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">{getDateRangeLabel()}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">${totalExpenses.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">{getDateRangeLabel()}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Net Balance</CardTitle>
              <DollarSign className={`h-4 w-4 ${netBalance >= 0 ? "text-green-600" : "text-red-600"}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${netBalance >= 0 ? "text-green-600" : "text-red-600"}`}>
                ${netBalance.toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">{getDateRangeLabel()}</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Income Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span>Income (Sales)</span>
              </CardTitle>
              <CardDescription>Recent sales transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Transaction ID</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sales.slice(0, 10).map((sale) => (
                        <TableRow key={sale.id}>
                          <TableCell>{new Date(sale.date).toLocaleDateString()}</TableCell>
                          <TableCell className="font-mono text-sm">{sale.transactionId}</TableCell>
                          <TableCell className="text-right font-medium text-green-600">
                            ${sale.amount.toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                {sales.length > 10 && (
                  <div className="text-center">
                    <Button variant="outline" size="sm">
                      View All Sales ({sales.length})
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Expenses Section */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingDown className="h-5 w-5 text-red-600" />
                    <span>Expenses</span>
                  </CardTitle>
                  <CardDescription>Business expenses and costs</CardDescription>
                </div>
                <Dialog open={isAddExpenseOpen} onOpenChange={setIsAddExpenseOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="flex items-center space-x-2">
                      <Plus className="h-4 w-4" />
                      <span>Add Expense</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Add New Expense</DialogTitle>
                      <DialogDescription>Record a new business expense.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="expense-date">Date</Label>
                        <Input
                          id="expense-date"
                          type="date"
                          value={newExpense.date}
                          onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="expense-description">Description</Label>
                        <Input
                          id="expense-description"
                          value={newExpense.description}
                          onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                          placeholder="Enter expense description"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="expense-amount">Amount ($)</Label>
                        <Input
                          id="expense-amount"
                          type="number"
                          step="0.01"
                          value={newExpense.amount}
                          onChange={(e) =>
                            setNewExpense({ ...newExpense, amount: Number.parseFloat(e.target.value) || 0 })
                          }
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsAddExpenseOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddExpense}>Add Expense</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {expenses.slice(0, 10).map((expense) => (
                        <TableRow key={expense.id}>
                          <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
                          <TableCell>{expense.description}</TableCell>
                          <TableCell className="text-right font-medium text-red-600">
                            ${expense.amount.toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                {expenses.length > 10 && (
                  <div className="text-center">
                    <Button variant="outline" size="sm">
                      View All Expenses ({expenses.length})
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
