"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const t = localStorage.getItem('adminToken');
    if (!t) return;
    // Verify token with a quick ping; if valid, redirect. If invalid, clear it.
    (async () => {
      try {
        const res = await fetch('/api/admin/bookings', { headers: { Authorization: `Bearer ${t}` } });
        if (res.ok) {
          router.replace('/admin/bookings');
        } else if (res.status === 401 || res.status === 403) {
          localStorage.removeItem('adminToken');
        }
      } catch {
        // ignore
      }
    })();
  }, [router]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');
      if (!data.token) throw new Error('No token in response');
      localStorage.setItem('adminToken', data.token);
      router.replace('/admin/bookings');
    } catch (e) {
      setError(e.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-[70vh] pt-28 flex items-center justify-center bg-[#f8faff] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-6">
        <h1 className="text-xl font-bold text-gray-900">Admin Login</h1>
        <p className="text-sm text-gray-600 mt-1">Enter the admin password to continue.</p>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-white p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {error && <div className="text-sm text-red-600">{error}</div>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 text-white py-2.5 font-semibold hover:bg-blue-700 disabled:opacity-60"
          >{loading ? 'Signing in…' : 'Sign In'}</button>
        </form>
      </div>
    </section>
  );
}
