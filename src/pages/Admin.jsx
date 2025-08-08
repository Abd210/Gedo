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
  const [site, setSite] = useState(null);

  useEffect(() => {
    if (user) {
      fetchCollection('dishes');
      fetchCollection('testimonials');
      fetchSite();
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

  async function fetchSite() {
    try {
      const res = await fetch('/api/site');
      const data = await res.json();
      setSite(data);
    } catch (e) {
      console.error(e);
    }
  }

  async function saveSite(partial) {
    try {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: BASIC_AUTH,
      };
      const res = await fetch('/api/site', { method: 'PUT', headers, body: JSON.stringify(partial) });
      if (!res.ok) throw new Error('Failed to save');
      setSite((p) => ({ ...(p || {}), ...partial }));
    } catch (e) {
      alert('Save failed');
    }
  }

  async function saveSiteAll() {
    try {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: BASIC_AUTH,
      };
      const res = await fetch('/api/site', { method: 'PUT', headers, body: JSON.stringify(site || {}) });
      if (!res.ok) throw new Error('Failed to save');
      alert('Site settings saved');
    } catch (e) {
      alert('Save failed');
    }
  }

  async function revertSiteChanges() {
    await fetchSite();
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
        <button
          className={`px-4 py-2 rounded ${section === 'site' ? 'bg-gedo-green text-white' : 'bg-gray-200'}`}
          onClick={() => setSection('site')}
        >
          Site Settings
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
      ) : section === 'testimonials' ? (
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
      ) : (
        <div className="max-w-4xl space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Site Settings</h2>
            <div className="space-x-2">
              <button className="px-4 py-2 bg-gray-200 rounded" onClick={revertSiteChanges}>Revert</button>
              <button className="px-4 py-2 bg-gedo-green text-white rounded" onClick={saveSiteAll}>Save Changes</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Today's Special</label>
                <select
                  className="w-full border rounded px-3 py-2"
                  value={site?.todaysSpecialDishId || ''}
                  onChange={(e) => setSite((p) => ({ ...(p || {}), todaysSpecialDishId: e.target.value || null }))}
                >
                  <option value="">— None —</option>
                  {dishes.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gedo-brown mt-1">Pick one of your dishes to feature on the homepage.</p>
              </div>

              <div>
                <label className="block text-sm mb-1">Hero Title</label>
                <input className="w-full border rounded px-3 py-2" placeholder="Large title at the top of Home" value={site?.heroTitle || ''} onChange={(e) => setSite((p) => ({ ...(p || {}), heroTitle: e.target.value }))} />
              </div>
              <div>
                <label className="block text-sm mb-1">Hero Subtitle</label>
                <input className="w-full border rounded px-3 py-2" placeholder="Short supporting line under the title" value={site?.heroSubtitle || ''} onChange={(e) => setSite((p) => ({ ...(p || {}), heroSubtitle: e.target.value }))} />
              </div>

              <div>
                <label className="block text-sm mb-1">Welcome Title</label>
                <input className="w-full border rounded px-3 py-2" value={site?.welcomeTitle || ''} onChange={(e) => setSite((p) => ({ ...(p || {}), welcomeTitle: e.target.value }))} />
              </div>
              <div>
                <label className="block text-sm mb-1">Welcome Text</label>
                <textarea className="w-full border rounded px-3 py-2" rows={3} value={site?.welcomeText || ''} onChange={(e) => setSite((p) => ({ ...(p || {}), welcomeText: e.target.value }))} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">Phone</label>
                  <input className="w-full border rounded px-3 py-2" placeholder="Display phone number" value={site?.contactPhone || ''} onChange={(e) => setSite((p) => ({ ...(p || {}), contactPhone: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-sm mb-1">Address</label>
                  <input className="w-full border rounded px-3 py-2" placeholder="Street, City, Country" value={site?.contactAddress || ''} onChange={(e) => setSite((p) => ({ ...(p || {}), contactAddress: e.target.value }))} />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2">Opening Hours</label>
                <div className="space-y-2">
                  {(site?.openingHours || []).map((h, idx) => (
                    <div key={idx} className="flex flex-wrap gap-2 items-center">
                      <select
                        className="border rounded px-3 py-2"
                        value={h.label}
                        onChange={(e) => setSite((p) => ({ ...(p || {}), openingHours: (p?.openingHours || []).map((x, i) => i === idx ? { ...x, label: e.target.value } : x) }))}
                      >
                        {['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday','Monday - Thursday','Friday - Saturday'].map((d) => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                      <input type="time" className="border rounded px-3 py-2" value={(h.value || '').split(' - ')[0] || ''} onChange={(e) => setSite((p) => ({ ...(p || {}), openingHours: (p?.openingHours || []).map((x, i) => i === idx ? { ...x, value: `${e.target.value} - ${(x.value || '').split(' - ')[1] || ''}` } : x) }))} />
                      <span>to</span>
                      <input type="time" className="border rounded px-3 py-2" value={(h.value || '').split(' - ')[1] || ''} onChange={(e) => setSite((p) => ({ ...(p || {}), openingHours: (p?.openingHours || []).map((x, i) => i === idx ? { ...x, value: `${(x.value || '').split(' - ')[0] || ''} - ${e.target.value}` } : x) }))} />
                      <button className="px-3 py-2 bg-gedo-red text-white rounded" onClick={() => setSite((p) => ({ ...(p || {}), openingHours: (p?.openingHours || []).filter((_, i) => i !== idx) }))}>Remove</button>
                    </div>
                  ))}
                  <div className="space-x-2">
                    <button className="px-4 py-2 bg-gray-200 rounded" onClick={() => setSite((p) => ({ ...(p || {}), openingHours: [ ...(p?.openingHours || []), { label: 'Monday - Thursday', value: '11:00 - 22:00' } ] }))}>+ Add Row</button>
                    <button className="px-4 py-2 bg-gray-200 rounded" onClick={() => setSite((p) => ({ ...(p || {}), openingHours: [
                      { label: 'Monday - Thursday', value: '11:00 - 22:00' },
                      { label: 'Friday - Saturday', value: '11:00 - 23:00' },
                      { label: 'Sunday', value: '12:00 - 21:00' },
                    ] }))}>Use Defaults</button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm mb-1">Facebook</label>
                  <input className="w-full border rounded px-3 py-2" placeholder="https://facebook.com/yourpage" value={site?.social?.facebook || ''} onChange={(e) => setSite((p) => ({ ...(p || {}), social: { ...(p?.social || {}), facebook: e.target.value } }))} />
                </div>
                <div>
                  <label className="block text-sm mb-1">Instagram</label>
                  <input className="w-full border rounded px-3 py-2" placeholder="https://instagram.com/yourhandle" value={site?.social?.instagram || ''} onChange={(e) => setSite((p) => ({ ...(p || {}), social: { ...(p?.social || {}), instagram: e.target.value } }))} />
                </div>
                <div>
                  <label className="block text-sm mb-1">TikTok</label>
                  <input className="w-full border rounded px-3 py-2" placeholder="https://tiktok.com/@yourhandle" value={site?.social?.tiktok || ''} onChange={(e) => setSite((p) => ({ ...(p || {}), social: { ...(p?.social || {}), tiktok: e.target.value } }))} />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-1">Google Map Embed URL</label>
                <input className="w-full border rounded px-3 py-2" placeholder="Paste Google Maps embed URL" value={site?.mapEmbedUrl || ''} onChange={(e) => setSite((p) => ({ ...(p || {}), mapEmbedUrl: e.target.value }))} />
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-4 border rounded">
                <div className="text-xs text-gedo-brown mb-2">Hero Preview</div>
                <div className="bg-gedo-green text-white p-4 rounded">
                  <div className="text-xl font-playfair">{site?.heroTitle || 'Title'}</div>
                  <div className="opacity-80">{site?.heroSubtitle || 'Subtitle'}</div>
                </div>
              </div>
              <div className="p-4 border rounded">
                <div className="text-xs text-gedo-brown mb-2">Welcome Preview</div>
                <div>
                  <div className="font-semibold">{site?.welcomeTitle || 'Welcome Title'}</div>
                  <div className="text-sm text-gedo-brown">{site?.welcomeText || 'Welcome text...'}</div>
                </div>
              </div>
              <div className="p-4 border rounded">
                <div className="text-xs text-gedo-brown mb-2">Opening Hours Preview</div>
                <div className="space-y-1 text-sm">
                  {(site?.openingHours || []).map((h, i) => (
                    <div key={i} className="flex justify-between"><span>{h.label}</span><span>{h.value}</span></div>
                  ))}
                </div>
              </div>
              <div className="p-4 border rounded">
                <div className="text-xs text-gedo-brown mb-2">Map Preview</div>
                {site?.mapEmbedUrl ? (
                  <iframe title="map" src={site.mapEmbedUrl} className="w-full h-48 border" allowFullScreen="" loading="lazy"></iframe>
                ) : (
                  <div className="text-sm text-gedo-brown">Paste an embed URL to preview the map here.</div>
                )}
              </div>
            </div>
          </div>
        </div>
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
