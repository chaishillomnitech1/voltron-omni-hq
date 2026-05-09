import React, { useState } from 'react';
import { Download, Filter, Search, ChevronDown, Eye, EyeOff } from 'lucide-react';
import { trpc } from '@/lib/trpc';

/**
 * TRANSACTION HISTORY COMPONENT
 * 
 * Features:
 * - Display all user transactions
 * - Filter by status, date range, amount
 * - Search functionality
 * - Download receipts
 * - Real-time status updates
 * - Export to CSV
 */

interface Transaction {
  id: string;
  description: string;
  amount: number;
  currency: string;
  status: 'pending' | 'succeeded' | 'failed' | 'refunded';
  createdAt: Date;
  receiptUrl?: string;
  paymentMethod?: string;
}

type SortField = 'date' | 'amount' | 'status';
type SortOrder = 'asc' | 'desc';
type StatusFilter = 'all' | 'pending' | 'succeeded' | 'failed' | 'refunded';

export function TransactionHistory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [showFilters, setShowFilters] = useState(false);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  // Mock data - replace with actual tRPC query
  const transactions: Transaction[] = [
    {
      id: 'txn_001',
      description: 'Platinum Guardian Tier Upgrade',
      amount: 100000,
      currency: 'usd',
      status: 'succeeded',
      createdAt: new Date('2026-05-09'),
      receiptUrl: '/receipts/txn_001.pdf',
      paymentMethod: 'Visa ending in 4242',
    },
    {
      id: 'txn_002',
      description: '$CHAISHILL Token Purchase',
      amount: 50000,
      currency: 'usd',
      status: 'succeeded',
      createdAt: new Date('2026-05-08'),
      receiptUrl: '/receipts/txn_002.pdf',
      paymentMethod: 'Visa ending in 4242',
    },
    {
      id: 'txn_003',
      description: 'NFT Collection Mint',
      amount: 25000,
      currency: 'usd',
      status: 'pending',
      createdAt: new Date('2026-05-07'),
      paymentMethod: 'Visa ending in 4242',
    },
    {
      id: 'txn_004',
      description: 'Sacred Books Access',
      amount: 10000,
      currency: 'usd',
      status: 'succeeded',
      createdAt: new Date('2026-05-06'),
      receiptUrl: '/receipts/txn_004.pdf',
      paymentMethod: 'Visa ending in 4242',
    },
    {
      id: 'txn_005',
      description: 'Refunded: NFT Purchase',
      amount: 15000,
      currency: 'usd',
      status: 'refunded',
      createdAt: new Date('2026-05-05'),
      receiptUrl: '/receipts/txn_005.pdf',
      paymentMethod: 'Visa ending in 4242',
    },
  ];

  // Filter transactions
  const filteredTransactions = transactions
    .filter((tx) => {
      const matchesSearch =
        tx.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || tx.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      let aVal: any = a[sortField === 'date' ? 'createdAt' : sortField];
      let bVal: any = b[sortField === 'date' ? 'createdAt' : sortField];

      if (sortField === 'date') {
        aVal = new Date(aVal).getTime();
        bVal = new Date(bVal).getTime();
      }

      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const handleDownloadReceipt = (transaction: Transaction) => {
    if (transaction.receiptUrl) {
      const link = document.createElement('a');
      link.href = transaction.receiptUrl;
      link.download = `receipt-${transaction.id}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleExportCSV = () => {
    const csv = [
      ['Date', 'Description', 'Amount', 'Currency', 'Status', 'Payment Method'],
      ...filteredTransactions.map((tx) => [
        new Date(tx.createdAt).toLocaleDateString(),
        tx.description,
        (tx.amount / 100).toFixed(2),
        tx.currency.toUpperCase(),
        tx.status,
        tx.paymentMethod || 'N/A',
      ]),
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `transaction-history-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'succeeded':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'refunded':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const totalAmount = filteredTransactions
    .filter((tx) => tx.status === 'succeeded')
    .reduce((sum, tx) => sum + tx.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Transaction History</h2>
          <p className="text-gray-600 mt-1">
            {filteredTransactions.length} transaction{filteredTransactions.length !== 1 ? 's' : ''}
          </p>
        </div>
        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-all"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <p className="text-gray-600 text-sm">Total Transactions</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{filteredTransactions.length}</p>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <p className="text-gray-600 text-sm">Successful Payments</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {filteredTransactions.filter((tx) => tx.status === 'succeeded').length}
          </p>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <p className="text-gray-600 text-sm">Total Spent</p>
          <p className="text-2xl font-bold text-cyan-600 mt-1">
            USD {(totalAmount / 100).toFixed(2)}
          </p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="space-y-4">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by description or transaction ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
          >
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>

        {showFilters && (
          <div className="bg-gray-50 p-4 rounded-lg space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status Filter
              </label>
              <div className="flex gap-2 flex-wrap">
                {(['all', 'pending', 'succeeded', 'failed', 'refunded'] as const).map(
                  (status) => (
                    <button
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                        statusFilter === status
                          ? 'bg-cyan-600 text-white'
                          : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Transactions Table */}
      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('date')}
                  className="flex items-center gap-2 font-semibold text-gray-900 hover:text-cyan-600"
                >
                  Date
                  {sortField === 'date' && (
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        sortOrder === 'asc' ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                </button>
              </th>
              <th className="px-6 py-3 text-left font-semibold text-gray-900">Description</th>
              <th className="px-6 py-3 text-right">
                <button
                  onClick={() => handleSort('amount')}
                  className="flex items-center justify-end gap-2 font-semibold text-gray-900 hover:text-cyan-600 w-full"
                >
                  Amount
                  {sortField === 'amount' && (
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        sortOrder === 'asc' ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('status')}
                  className="flex items-center gap-2 font-semibold text-gray-900 hover:text-cyan-600"
                >
                  Status
                  {sortField === 'status' && (
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        sortOrder === 'asc' ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                </button>
              </th>
              <th className="px-6 py-3 text-center font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => (
                <React.Fragment key={transaction.id}>
                  <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {new Date(transaction.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{transaction.description}</td>
                    <td className="px-6 py-4 text-sm text-right font-semibold text-gray-900">
                      {transaction.currency.toUpperCase()} {(transaction.amount / 100).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          transaction.status
                        )}`}
                      >
                        {transaction.status.charAt(0).toUpperCase() +
                          transaction.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() =>
                            setExpandedRow(
                              expandedRow === transaction.id ? null : transaction.id
                            )
                          }
                          className="p-1 hover:bg-gray-200 rounded transition-all"
                          title="View details"
                        >
                          {expandedRow === transaction.id ? (
                            <EyeOff className="w-4 h-4 text-gray-600" />
                          ) : (
                            <Eye className="w-4 h-4 text-gray-600" />
                          )}
                        </button>
                        {transaction.receiptUrl && (
                          <button
                            onClick={() => handleDownloadReceipt(transaction)}
                            className="p-1 hover:bg-gray-200 rounded transition-all text-cyan-600"
                            title="Download receipt"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                  {expandedRow === transaction.id && (
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <td colSpan={5} className="px-6 py-4">
                        <div className="space-y-2 text-sm">
                          <p>
                            <strong>Transaction ID:</strong> {transaction.id}
                          </p>
                          <p>
                            <strong>Payment Method:</strong> {transaction.paymentMethod || 'N/A'}
                          </p>
                          <p>
                            <strong>Amount:</strong> {transaction.currency.toUpperCase()}{' '}
                            {(transaction.amount / 100).toFixed(2)}
                          </p>
                          <p>
                            <strong>Date:</strong>{' '}
                            {new Date(transaction.createdAt).toLocaleString()}
                          </p>
                          {transaction.receiptUrl && (
                            <p>
                              <strong>Receipt:</strong>{' '}
                              <a
                                href={transaction.receiptUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-cyan-600 hover:underline"
                              >
                                View PDF
                              </a>
                            </p>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Info */}
      <div className="flex justify-between items-center text-sm text-gray-600">
        <p>Showing {filteredTransactions.length} of {transactions.length} transactions</p>
        <p>Page 1 of 1</p>
      </div>
    </div>
  );
}

export default TransactionHistory;
