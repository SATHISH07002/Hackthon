import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'

export default function InventoryLocationsPage() {
  const [locations, setLocations] = useState([
    { id: 'LOC-01', name: 'Main Warehouse', address: '123 Industrial Ave', items: 248 },
    { id: 'LOC-02', name: 'Retail Store', address: '45 Market St', items: 136 },
    { id: 'LOC-03', name: 'Cold Storage', address: '12 Freezer Rd', items: 58 },
  ])

  const [isOpen, setIsOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ name: '', address: '' })

  function openCreate() {
    setEditing(null)
    setForm({ name: '', address: '' })
    setIsOpen(true)
  }
  function openEdit(loc) {
    setEditing(loc)
    setForm({ name: loc.name, address: loc.address })
    setIsOpen(true)
  }
  function closeModal() { setIsOpen(false) }
  function handleSubmit(e) {
    e.preventDefault()
    if (editing) {
      setLocations(prev => prev.map(l => l.id === editing.id ? { ...l, ...form } : l))
    } else {
      const newId = `LOC-${String(Math.max(0, ...locations.map(l=>Number(l.id.split('-')[1])||0)) + 1).padStart(2,'0')}`
      setLocations(prev => [{ id: newId, items: 0, ...form }, ...prev])
    }
    setIsOpen(false)
  }
  function handleDelete(id) {
    if (confirm('Delete this location?')) setLocations(prev => prev.filter(l => l.id !== id))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Inventory Locations</h2>
        <button onClick={openCreate} className="btn-primary">Add location</button>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {locations.map((loc) => (
          <div key={loc.id} className="card p-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500">{loc.id}</div>
                <div className="text-lg font-semibold text-gray-800">{loc.name}</div>
              </div>
              <span className="rounded-full bg-primary-50 px-3 py-1 text-sm text-primary-700">{loc.items} items</span>
            </div>
            <div className="mt-3 text-sm text-gray-600">{loc.address}</div>
            <div className="mt-4 flex gap-2">
              <button onClick={()=>openEdit(loc)} className="rounded-md border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-50">Edit</button>
              <button onClick={()=>handleDelete(loc.id)} className="rounded-md border border-red-300 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50">Delete</button>
            </div>
          </div>
        ))}
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child as={Fragment} enter="ease-out duration-200" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-150" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black/30" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child as={Fragment} enter="ease-out duration-200" enterFrom="opacity-0 translate-y-2" enterTo="opacity-100 translate-y-0" leave="ease-in duration-150" leaveFrom="opacity-100 translate-y-0" leaveTo="opacity-0 translate-y-2">
                <Dialog.Panel className="w-full max-w-md transform rounded-xl bg-white p-6 shadow-xl">
                  <Dialog.Title className="text-lg font-semibold text-gray-800">{editing ? 'Edit location' : 'Add location'}</Dialog.Title>
                  <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                    <div>
                      <label className="mb-1 block text-sm text-gray-700">Name</label>
                      <input value={form.name} onChange={(e)=>setForm(f=>({...f,name:e.target.value}))} required className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500" />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm text-gray-700">Address</label>
                      <input value={form.address} onChange={(e)=>setForm(f=>({...f,address:e.target.value}))} required className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500" />
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
