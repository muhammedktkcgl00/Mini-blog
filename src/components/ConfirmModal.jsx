function ConfirmModal({ open, onCancel, onConfirm }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 grid place-items-center">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} />

      <div className="relative rounded-2xl bg-white p-5 w-[300px]">
        <p className="text-sm mb-4">Silmek istediğine emin misin?</p>

        <div className="flex justify-end gap-2">
          <button
            onClick={onConfirm} className="bg-red-600 text-white px-3 py-1 rounded">
            Evet
          </button>
          <button onClick={onCancel} className="border px-3 py-1 rounded">
            Hayır
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal
