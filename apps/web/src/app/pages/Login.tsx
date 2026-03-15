import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../lib/auth-context';

export function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(email, password);
            navigate('/', { replace: true });
        } catch (err: any) {
            setError(err?.response?.data?.error ?? 'Invalid credentials. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F4F6F8]">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-teal-50 via-transparent to-emerald-50"
            />
            <div className="w-full max-w-sm mx-4">
                {/* Logo / Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-teal-600 mb-4 shadow-sm shadow-teal-200">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-slate-800">ADA Clinic System</h1>
                    <p className="text-slate-500 text-sm mt-1">Cabantian Stand-Alone SHS</p>
                </div>

                {/* Card */}
                <div className="bg-white rounded-2xl p-8 shadow-xl border border-slate-200 relative">
                    <h2 className="text-lg font-semibold text-slate-800 mb-6">Sign in to your account</h2>

                    <form onSubmit={handleSubmit} className="space-y-4" data-testid="login-form">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                                data-testid="login-email"
                                className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                                placeholder="ada.clinic@gmail.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                    data-testid="login-password"
                                    className="w-full px-3 py-2.5 pr-10 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(p => !p)}
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    aria-pressed={showPassword}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500 rounded"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-800 text-sm" data-testid="login-error">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            data-testid="login-submit"
                            className="w-full py-2.5 px-4 bg-teal-600 hover:bg-teal-700 disabled:bg-teal-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors text-sm mt-2"
                        >
                            {loading ? 'Signing in…' : 'Sign in'}
                        </button>
                    </form>
                </div>

                <p className="text-center text-slate-500 text-xs mt-6 relative">
                    ADA Clinic Management System © 2026
                </p>
            </div>
        </div>
    );
}
