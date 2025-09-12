import { Fragment, useMemo, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'

export default function SuppliersPOPage() {
  const [suppliers, setSuppliers] = useState([
    { id: 'SUP-01', name: 'Global Textiles', contact: 'sales@globaltextiles.com', phone: '+1 555-0199' },
    { id: 'SUP-02', name: 'Coffee Co', contact: 'orders@coffeeco.io', phone: '+1 555-1222' },
  ])
  const [purchaseOrders] = useState([
    { id: 'PO-1007', supplier: 'Global Textiles', status: 'Open', eta: '2025-09-28', total: 'Rs 1,240' },
    { id: 'PO-1006', supplier: 'Coffee Co', status: 'Receiving', eta: '2025-09-20', total: 'Rs 3,480' },
  ])

  const [isOpen, setIsOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ name: '', contact: '', phone: '' })

  function openCreate() {
    setEditing(null)
    setForm({ name: '', contact: '', phone: '' })
    setIsOpen(true)
  }
  function openEdit(s) {
    setEditing(s)
    setForm({ name: s.name, contact: s.contact, phone: s.phone })
    setIsOpen(true)
  }
  function closeModal() {
    setIsOpen(false)
  }
  function handleSubmit(e) {
    e.preventDefault()
    if (editing) {
      setSuppliers(prev => prev.map(s => s.id === editing.id ? { ...s, ...form } : s))
    } else {
      const newId = `SUP-${String(Math.max(0, ...suppliers.map(s=>Number(s.id.split('-')[1])||0)) + 1).padStart(2,'0')}`
      setSuppliers(prev => [{ id: newId, ...form }, ...prev])
    }
    setIsOpen(false)
  }
  function handleDelete(id) {
    if (confirm('Delete this supplier?')) {
      setSuppliers(prev => prev.filter(s => s.id !== id))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Suppliers</h2>
        <button className="btn-primary" onClick={openCreate}>Add supplier</button>
      </div>
      <div className="card divide-y divide-gray-200">
        {suppliers.map((s)=> (
          <div key={s.id} className="flex items-center justify-between gap-3 p-4">
            <div>
              <div className="font-medium text-gray-800">{s.name}</div>
              <div className="text-sm text-gray-600">{s.contact} · {s.phone}</div>
            </div>
            <div className="flex gap-2">
              <button onClick={()=>openEdit(s)} className="rounded-md border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-50">Edit</button>
              <button onClick={()=>handleDelete(s.id)} className="rounded-md border border-red-300 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50">Delete</button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Purchase Orders</h2>
        <button className="btn-primary">Create PO</button>
      </div>
      <div className="card overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {['PO #', 'Supplier', 'Status', 'ETA', 'Total', ''].map((h)=> (
                <th key={h} className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {purchaseOrders.map((po)=> (
              <tr key={po.id}>
                <td className="px-4 py-2 text-sm text-gray-700">{po.id}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{po.supplier}</td>
                <td className="px-4 py-2 text-sm">
                  <span className={`rounded-full px-2 py-0.5 text-xs ${po.status === 'Open' ? 'bg-yellow-50 text-yellow-700' : 'bg-blue-50 text-blue-700'}`}>{po.status}</span>
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">{po.eta}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{po.total}</td>
                <td className="px-4 py-2 text-sm">
                  <button className="rounded-md border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-50">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-200"
                enterFrom="opacity-0 translate-y-2"
                enterTo="opacity-100 translate-y-0"
                leave="ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-2"
              >
                <Dialog.Panel className="w-full max-w-md transform rounded-xl bg-white p-6 shadow-xl">
                  <Dialog.Title className="text-lg font-semibold text-gray-800">
                    {editing ? 'Edit supplier' : 'Add supplier'}
                  </Dialog.Title>
                  <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                    <div>
                      <label className="mb-1 block text-sm text-gray-700">Name</label>
                      <input value={form.name} onChange={(e)=>setForm(f=>({...f,name:e.target.value}))} required className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500" />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm text-gray-700">Email</label>
                      <input value={form.contact} onChange={(e)=>setForm(f=>({...f,contact:e.target.value}))} type="email" required className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500" />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm text-gray-700">Phone</label>
                      <input value={form.phone} onChange={(e)=>setForm(f=>({...f,phone:e.target.value}))} required className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500" />
                    </div>
                    <div className="mt-6 flex justify-end gap-2">
                      <button type="button" onClick={closeModal} className="rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Cancel</button>
                      <button type="submit" className="btn-primary">Save</button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}
