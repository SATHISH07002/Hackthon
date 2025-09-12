import { useMemo, useState } from 'react'

export default function SalesExpensesPage() {
  const [tab, setTab] = useState('sales')
  const sales = useMemo(() => ([
    { id: 'S-2001', date: '2025-09-10', channel: 'POS', total: 238.50 },
    { id: 'S-2000', date: '2025-09-09', channel: 'Online', total: 640.00 },
  ]), [])
  const expenses = useMemo(() => ([
    { id: 'E-1008', date: '2025-09-08', category: 'Logistics', amount: 120.00 },
    { id: 'E-1007', date: '2025-09-06', category: 'Rent', amount: 1500.00 },
  ]), [])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Sales & Expenses</h2>
        <div className="rounded-lg border border-gray-200 p-1">
          <button onClick={()=>setTab('sales')} className={`rounded-md px-3 py-1.5 text-sm ${tab==='sales' ? 'bg-primary-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}>Sales</button>
          <button onClick={()=>setTab('expenses')} className={`rounded-md px-3 py-1.5 text-sm ${tab==='expenses' ? 'bg-primary-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}>Expenses</button>
        </div>
      </div>

      {tab === 'sales' ? (
        <div className="card overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {['Sale #','Date','Channel','Total'].map(h => (
                  <th key={h} className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sales.map((s) => (
                <tr key={s.id}>
                  <td className="px-4 py-2 text-sm text-gray-700">{s.id}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{s.date}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{s.channel}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">Rs {s.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="card overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {['Expense #','Date','Category','Amount'].map(h => (
                  <th key={h} className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {expenses.map((e) => (
                <tr key={e.id}>
                  <td className="px-4 py-2 text-sm text-gray-700">{e.id}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{e.date}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{e.category}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">Rs {e.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}


