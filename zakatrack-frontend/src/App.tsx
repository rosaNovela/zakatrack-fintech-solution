import { useEffect, useState } from 'react';
import axios from 'axios';
import { Wallet, PlusCircle } from 'lucide-react';

interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
  timestamp: string;
}

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Operations');

  // Logic to get data from Backend
  const fetchExpenses = () => {
    axios.get('http://localhost:8081/api/expenses')
        .then(response => setExpenses(response.data))
        .catch(error => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // Logic to send data to Backend
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newExpense = {
      description,
      amount: parseFloat(amount),
      category
    };

    axios.post('http://localhost:8081/api/expenses', newExpense)
        .then(() => {
          fetchExpenses(); // Refresh the list automatically
          setDescription(''); // Clear the input
          setAmount('');      // Clear the input
        })
        .catch(error => console.error("Error saving expense:", error));
  };

  return (
      <div className="min-h-screen bg-slate-50 p-8 font-sans">
        <div className="max-w-4xl mx-auto">

          {/* Header Section */}
          <header className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
              <Wallet className="text-blue-600" size={32} /> ZakaTrack
            </h1>
            <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200">
              <p className="text-xs text-slate-500 uppercase font-bold">Total Spend</p>
              <p className="text-xl font-bold text-blue-900">
                R {expenses.reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()}
              </p>
            </div>
          </header>

          {/* 1. THE ADD EXPENSE FORM */}
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md mb-8 grid grid-cols-1 md:grid-cols-4 gap-4 items-end border border-slate-100">
            <div>
              <label className="block text-sm font-medium text-slate-700">Description</label>
              <input value={description} onChange={e => setDescription(e.target.value)} className="mt-1 block w-full border border-slate-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Office Rent" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Amount (R)</label>
              <input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="mt-1 block w-full border border-slate-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="5500" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Category</label>
              <select value={category} onChange={e => setCategory(e.target.value)} className="mt-1 block w-full border border-slate-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none">
                <option>Operations</option>
                <option>Marketing</option>
                <option>Supplies</option>
                <option>Travel</option>
              </select>
            </div>
            <button type="submit" className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-semibold">
              <PlusCircle size={20} /> Record
            </button>
          </form>

          {/* 2. THE TRANSACTION HISTORY TABLE */}
          <div className="bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden">
            <div className="p-4 border-b border-slate-100 bg-slate-50">
              <h2 className="text-lg font-bold text-slate-700">Transaction History</h2>
            </div>
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-500 uppercase text-xs">
              <tr>
                <th className="p-4 font-semibold">Description</th>
                <th className="p-4 font-semibold">Category</th>
                <th className="p-4 font-semibold text-right">Amount</th>
              </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
              {expenses.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="p-8 text-center text-slate-400 italic">No transactions recorded yet.</td>
                  </tr>
              ) : (
                  expenses.map(expense => (
                      <tr key={expense.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-4 text-slate-700">{expense.description}</td>
                        <td className="p-4">
                      <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs font-medium">
                        {expense.category}
                      </span>
                        </td>
                        <td className="p-4 font-bold text-blue-700 text-right">R {expense.amount.toFixed(2)}</td>
                      </tr>
                  ))
              )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
  );
}

export default App;