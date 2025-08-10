import { useState } from 'react';
import { apiUrl } from '../api.js';

export default function DishForm({ initial = {}, onSave, onCancel }) {
  const [form, setForm] = useState({
    name: initial.name || '',
    price: initial.price || '',
    description: initial.description || '',
    image: initial.image || '',
    badgeIcon: initial.badge?.icon || '',
    badgeText: initial.badge?.text || '',
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      name: form.name,
      price: Number(form.price),
      description: form.description,
      image: form.image,
      badge: form.badgeIcon || form.badgeText ? { icon: form.badgeIcon, text: form.badgeText } : undefined,
    };
    onSave(payload);
  }

  async function handleImageChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const res = await fetch(apiUrl('/api/upload'), {
        method: 'POST',
        headers: { Authorization: `Basic ${btoa('Gedo:Gedo1999')}` },
        body: (() => {
          const fd = new FormData();
          fd.append('image', file);
          return fd;
        })(),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      // If dev server proxies /media to backend, we can use relative URL as-is
      setForm((p) => ({ ...p, image: data.url }));
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-lg p-6 rounded-lg shadow-md overflow-y-auto max-h-[90vh]"
      >
        <h2 className="text-xl font-semibold mb-4">{initial.id ? 'Edit Dish' : 'Add New Dish'}</h2>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="name">Name</label>
          <input id="name" name="name" type="text" value={form.name} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
        </div>
        {/* Price */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="price">Price</label>
          <input id="price" name="price" type="number" value={form.price} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
        </div>
        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="description">Description</label>
          <input id="description" name="description" type="text" value={form.description} onChange={handleChange} className="w-full border rounded px-3 py-2" />
        </div>
        {/* Image upload */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="imageFile">Image</label>
          {form.image && (
            <div className="mb-2">
              <img src={form.image} alt="preview" className="h-24 w-24 object-cover rounded" />
            </div>
          )}
          <input id="imageFile" name="imageFile" type="file" accept="image/*" onChange={handleImageChange} className="w-full" />
        </div>
        {/* Badge icon/text */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="badgeIcon">Badge Icon</label>
          <input id="badgeIcon" name="badgeIcon" type="text" value={form.badgeIcon} onChange={handleChange} className="w-full border rounded px-3 py-2" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="badgeText">Badge Text</label>
          <input id="badgeText" name="badgeText" type="text" value={form.badgeText} onChange={handleChange} className="w-full border rounded px-3 py-2" />
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-200 rounded">
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 bg-gedo-green text-white rounded">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
