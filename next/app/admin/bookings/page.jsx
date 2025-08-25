"use client";
import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { getToken } from '@/lib/clientAuth';

export default function AdminBookingsPage() {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Prefer adminToken; else fall back to user token (server will validate admin email)
    const adminT = localStorage.getItem('adminToken');
    const userT = getToken();
    const t = adminT || userT;
    if (!t) {
      router.replace('/admin');
      return;
    }
    setToken(t);
  }, [router]);

  const handleUnauthorized = useCallback(() => {
    try { localStorage.removeItem('adminToken'); } catch {}
    router.replace('/admin');
  }, [router]);

  const load = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch('/api/admin/bookings', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.status === 401 || res.status === 403) {
        handleUnauthorized();
        return;
      }
      if (!res.ok) throw new Error(data.error || 'Failed to load bookings');
      setBookings(Array.isArray(data) ? data : (data.items || []));
    } catch (e) {
      setError(e.message || 'Failed to load bookings');
    } finally {
      setLoading(false);
    }
  }, [token, handleUnauthorized]);

  // Trigger load when token becomes available
  useEffect(() => { load(); }, [load]);

  const doAction = async (id, action) => {
    if (!token) return;
    try {
      const url = action === 'confirm' ? `/api/admin/bookings/${id}/confirm` : `/api/admin/bookings/${id}/delivered`;
      const res = await fetch(url, { method: 'POST', headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json().catch(()=>({}));
      if (res.status === 401 || res.status === 403) {
        handleUnauthorized();
        return;
      }
      if (!res.ok) throw new Error(data.error || 'Action failed');
      await load();
    } catch (e) {
      alert(e.message || 'Action failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    router.replace('/admin');
  };

  return (
    <section className="min-h-[80vh] pt-24 sm:pt-28 bg-[#f8faff] py-6 sm:py-10 px-3 sm:px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Admin • Bookings</h1>
          <div className="flex gap-2">
            <button onClick={load} className="px-3 py-2 rounded-lg border border-blue-600 text-blue-700 hover:bg-blue-50 text-sm">Refresh</button>
            <button onClick={logout} className="px-3 py-2 rounded-lg bg-gray-800 text-white hover:bg-black text-sm">Logout</button>
          </div>
        </div>

        {error && <div className="mb-3 sm:mb-4 text-sm text-red-700">{error}</div>}
        {loading ? (
          <div>Loading…</div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-xl sm:rounded-2xl shadow">
            <table className="min-w-full text-xs sm:text-sm">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 font-semibold">ID</th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 font-semibold">Customer</th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 font-semibold hidden md:table-cell">Product</th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 font-semibold">Amount</th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 font-semibold hidden sm:table-cell">Status</th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 font-semibold hidden lg:table-cell">Proof</th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-3 sm:px-4 py-6 sm:py-8 text-center text-gray-500">No bookings yet.</td>
                  </tr>
                )}
                {bookings.map((b) => (
                  <tr key={b.id} className="border-t">
                    <td className="px-3 sm:px-4 py-2 sm:py-3 font-mono text-[10px] sm:text-xs">{b.id}</td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3">{b.customerEmail || b.email || '—'}</td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 hidden md:table-cell">{b.productId || b.category || '—'}</td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3">₹{b.bookingAmount || b.amount || '—'}</td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 hidden sm:table-cell">
                      <span className="inline-block px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs bg-gray-100 text-gray-700">{b.status || 'pending'}</span>
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 hidden lg:table-cell">
                      {b.paymentProofUrl ? (
                        <a className="text-blue-700 underline" href={b.paymentProofUrl} target="_blank">View</a>
                      ) : '—'}
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3">
                      <div className="flex flex-wrap gap-2">
                        <button onClick={()=>doAction(b.id,'confirm')} className="px-2 py-1 rounded-md border border-green-600 text-green-700 hover:bg-green-50 text-xs">Confirm</button>
                        <button onClick={()=>doAction(b.id,'delivered')} className="px-2 py-1 rounded-md border border-blue-600 text-blue-700 hover:bg-blue-50 text-xs">Delivered</button>
                        {b.paymentProofUrl && (
                          <a className="px-2 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs sm:hidden" href={b.paymentProofUrl} target="_blank">Proof</a>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
