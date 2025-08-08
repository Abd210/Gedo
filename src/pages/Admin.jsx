import { useEffect, useState } from 'react';
import DishForm from '../components/DishForm';
import TestimonialForm from '../components/TestimonialForm';

export default function Admin() {
  const ADMIN_USER = 'Gedo';
  const ADMIN_PASS = 'Gedo1999';
  const BASIC_AUTH = `Basic ${btoa(`${ADMIN_USER}:${ADMIN_PASS}`)}`;
  const [user, setUser] = useState(null);
  const [dishes, setDishes] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState({ show: false, editing: null, type: 'dish' });
  const [section, setSection] = useState('dishes'); // 'dishes' | 'testimonials'

  useEffect(() => {
    if (user) {
      fetchCollection('dishes');
      fetchCollection('testimonials');
    }
  }, [user]);

  async function fetchCollection(col) {
    try {
      const res = await fetch(`/api/${col}`);
      const data = await res.json();
      if (col === 'dishes') setDishes(data);
      else setTestimonials(data);
    } catch (err) {
      console.error(err);
      alert(`Failed to load ${col}`);
    }
  }

  async function upsert(col, payload, id) {
    try {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: BASIC_AUTH,
      };
      const res = await fetch(id ? `/api/${col}/${id}` : `/api/${col}`, {
        method: id ? 'PUT' : 'POST',
        headers,
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Request failed');
      if (col === 'dishes') {
        if (id) setDishes((p) => p.map((d) => (d.id === id ? { ...d, ...payload } : d)));
        else setDishes((p) => [...p, { ...payload, id: json.id }]);
      } else {
        if (id) setTestimonials((p) => p.map((t) => (t.id === id ? { ...t, ...payload } : t)));
        else setTestimonials((p) => [...p, { ...payload, id: json.id }]);
      }
    } catch (err) {
      alert(err.message);
    }
  }

  async function handleDelete(col, id) {
    if (!window.confirm('Delete?')) return;
    try {
      await fetch(`/api/${col}/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: BASIC_AUTH,
        },
      });
      if (col === 'dishes') setDishes((p) => p.filter((d) => d.id !== id));
      else setTestimonials((p) => p.filter((t) => t.id !== id));
    } catch (err) {
      alert('Delete failed');
    }
  }

  if (!user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <form
          className="space-y-4 w-full max-w-sm"
          onSubmit={(e) => {
            e.preventDefault();
            const username = e.currentTarget.username.value;
            const password = e.currentTarget.password.value;
            if (username === ADMIN_USER && password === ADMIN_PASS) setUser({ username });
            else alert('Invalid credentials');
          }}
        >
          <input name="username" placeholder="Username" className="w-full border rounded px-3 py-2" required />
          <input name="password" type="password" placeholder="Password" className="w-full border rounded px-3 py-2" required />
          <button className="px-6 py-3 bg-gedo-green text-white rounded-full hover:bg-gedo-gold" type="submit">
            Sign in
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 min-h-[60vh]">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-playfair text-3xl text-gedo-green">Admin Panel</h1>
        <div className="space-x-4">
          <button
            className="px-4 py-2 bg-gedo-green text-white rounded"
            onClick={() =>
              setFormState({ show: true, editing: null, type: section === 'dishes' ? 'dish' : 'testimonial' })
            }
          >
            + Add {section === 'dishes' ? 'Dish' : 'Testimonial'}
          </button>
          <button className="text-gedo-red underline" onClick={() => setUser(null)}>
            Sign out
          </button>
        </div>
      </div>

      <div className="mb-6 space-x-4">
        <button
          className={`px-4 py-2 rounded ${section === 'dishes' ? 'bg-gedo-green text-white' : 'bg-gray-200'}`}
          onClick={() => setSection('dishes')}
        >
          Dishes
        </button>
        <button
          className={`px-4 py-2 rounded ${
            section === 'testimonials' ? 'bg-gedo-green text-white' : 'bg-gray-200'
          }`}
          onClick={() => setSection('testimonials')}
        >
          Testimonials
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : section === 'dishes' ? (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gedo-green text-white">
              <th className="p-2">Name</th>
              <th className="p-2">Price</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {dishes.map((d) => (
              <tr key={d.id} className="border-b">
                <td className="p-2">{d.name}</td>
                <td className="p-2">{d.price}</td>
                <td className="p-2 space-x-4">
                  <button
                    className="text-gedo-green"
                    onClick={() => setFormState({ show: true, editing: d, type: 'dish' })}
                  >
                    Edit
                  </button>
                  <button className="text-gedo-red" onClick={() => handleDelete('dishes', d.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gedo-green text-white">
              <th className="p-2">Name</th>
              <th className="p-2">Quote</th>
              <th className="p-2">Stars</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {testimonials.map((t) => (
              <tr key={t.id} className="border-b">
                <td className="p-2">{t.name}</td>
                <td className="p-2 max-w-sm truncate">{t.quote}</td>
                <td className="p-2">{t.stars}</td>
                <td className="p-2 space-x-4">
                  <button
                    className="text-gedo-green"
                    onClick={() => setFormState({ show: true, editing: t, type: 'testimonial' })}
                  >
                    Edit
                  </button>
                  <button className="text-gedo-red" onClick={() => handleDelete('testimonials', t.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {formState.show &&
        (formState.type === 'dish' ? (
          <DishForm
            initial={formState.editing || {}}
            onCancel={() => setFormState({ show: false, editing: null, type: 'dish' })}
            onSave={async (payload) => {
              await upsert('dishes', payload, formState.editing?.id);
              setFormState({ show: false, editing: null, type: 'dish' });
            }}
          />
        ) : (
          <TestimonialForm
            initial={formState.editing || {}}
            onCancel={() => setFormState({ show: false, editing: null, type: 'testimonial' })}
            onSave={async (payload) => {
              await upsert('testimonials', payload, formState.editing?.id);
              setFormState({ show: false, editing: null, type: 'testimonial' });
            }}
          />
        ))}
    </div>
  );
}
