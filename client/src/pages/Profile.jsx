// src/pages/Profile.jsx
import { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import {
  Camera, ShieldCheck, Mail, Smartphone, Bell,
  Trash2, Monitor, User, ArrowUpRight, Lock,
  Eye, EyeOff, LogOut, Zap, Check, X,
  Edit3, Save, ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

// ── Toggle Switch ──
const Toggle = ({ enabled, onToggle, color = 'bg-red-600' }) => (
  <button
    onClick={onToggle}
    className={`w-12 h-6 flex items-center rounded-full px-0.5 transition-all duration-300 ${
      enabled ? color : 'bg-gray-800'
    }`}
  >
    <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-all duration-300 ${
      enabled ? 'translate-x-6' : 'translate-x-0'
    }`} />
  </button>
);

// ── Stat pill ──
const StatPill = ({ label, value }) => (
  <div className="text-center">
    <p className="text-xl font-black text-white">{value}</p>
    <p className="text-gray-600 text-[10px] uppercase tracking-widest">{label}</p>
  </div>
);

export default function ProfilePage() {
  const navigate          = useNavigate();
  const { user, logout }  = useAuth();
  const { addToast }      = useToast();
  const fileRef           = useRef(null);

  // ── Tabs ──
  const [activeTab, setActiveTab] = useState('profile');

  // ── Profile form ──
  const [editing,     setEditing]     = useState(false);
  const [fullName,    setFullName]    = useState(user?.name  || '');
  const [phone,       setPhone]       = useState(user?.phone || '');
  const [email,       setEmail]       = useState(user?.email || '');
  const [saving,      setSaving]      = useState(false);
  const [avatarSrc,   setAvatarSrc]   = useState(user?.profilePic || null);

  // ── Password form ──
  const [currentPw,   setCurrentPw]   = useState('');
  const [newPw,       setNewPw]       = useState('');
  const [confirmPw,   setConfirmPw]   = useState('');
  const [showPw,      setShowPw]      = useState(false);
  const [pwSaving,    setPwSaving]    = useState(false);

  // ── Security toggles ──
  const [twoFA,       setTwoFA]       = useState(true);
  const [emailNotif,  setEmailNotif]  = useState(true);
  const [smsNotif,    setSmsNotif]    = useState(false);
  const [systemNotif, setSystemNotif] = useState(true);

  // ── Avatar preview ──
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setAvatarSrc(reader.result);
    reader.readAsDataURL(file);
  };

  // ── Save profile ──
  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put('/api/auth/profile', { name: fullName, email, phone });
      addToast?.('Profile updated successfully!', 'success');
      setEditing(false);
    } catch {
      addToast?.('Failed to update profile.', 'error');
    } finally {
      setSaving(false);
    }
  };

  // ── Change password ──
  const handlePasswordChange = async () => {
    if (newPw.length < 6)         { addToast?.('Password must be at least 6 characters.', 'error'); return; }
    if (newPw !== confirmPw)      { addToast?.('Passwords do not match.', 'error'); return; }
    setPwSaving(true);
    try {
      await api.put('/api/auth/change-password', { currentPassword: currentPw, newPassword: newPw });
      addToast?.('Password changed successfully!', 'success');
      setCurrentPw(''); setNewPw(''); setConfirmPw('');
    } catch (err) {
      addToast?.(err.response?.data?.message || 'Failed to change password.', 'error');
    } finally {
      setPwSaving(false);
    }
  };

  const handleLogout = () => { logout(); navigate('/login'); };

  const tabs = [
    { id: 'profile',  label: 'Profile'  },
    { id: 'security', label: 'Security' },
    { id: 'account',  label: 'Account'  },
  ];

  const securityItems = [
    { icon: ShieldCheck, label: 'Two-Factor Authentication', sub: 'Extra login protection',       state: twoFA,       set: setTwoFA       },
    { icon: Mail,        label: 'Email Notifications',       sub: 'Updates & promotions',         state: emailNotif,  set: setEmailNotif  },
    { icon: Smartphone,  label: 'SMS Notifications',         sub: 'Text message alerts',          state: smsNotif,    set: setSmsNotif    },
    { icon: Bell,        label: 'System Alerts',             sub: 'App activity notifications',   state: systemNotif, set: setSystemNotif },
  ];

  return (
    <div className="min-h-screen bg-black text-white">

      {/* ── Hero header band ── */}
      <div className="relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-[url('/h1_hero.png')] bg-center bg-cover opacity-10" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(220,38,38,0.08) 0%, #000 100%)' }} />
        <div className="absolute top-0 left-0 w-1.5 h-full bg-red-600" />

        <div className="relative max-w-6xl mx-auto px-8 md:px-12 pt-12 pb-10">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-8">

            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-28 h-28 rounded-2xl border-2 border-red-600/50 overflow-hidden bg-gray-900 flex items-center justify-center shadow-2xl shadow-red-900/30">
                {avatarSrc
                  ? <img src={avatarSrc} alt="avatar" className="w-full h-full object-cover" />
                  : <User size={44} className="text-gray-600" />
                }
              </div>
              <button
                onClick={() => fileRef.current?.click()}
                className="absolute -bottom-2 -right-2 w-8 h-8 bg-red-600 hover:bg-red-700 rounded-lg flex items-center justify-center transition shadow-lg"
              >
                <Camera size={14} className="text-white" />
              </button>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
            </div>

            {/* Name + role */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Zap size={12} className="text-red-500 fill-red-500" />
                <span className="text-red-500 text-[10px] font-bold uppercase tracking-[0.25em]">Member Profile</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
                {user?.name || 'Your Name'}
              </h1>
              <div className="flex flex-wrap items-center gap-3">
                <span className="bg-red-600/15 border border-red-600/30 text-red-400 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                  {user?.role || 'Athlete'}
                </span>
                <span className="text-gray-600 text-xs">{user?.email}</span>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 bg-gray-950 border border-gray-800 rounded-2xl px-8 py-5">
              <StatPill label="Workouts" value="48" />
              <div className="w-px h-8 bg-gray-800" />
              <StatPill label="Streak"   value="7d" />
              <div className="w-px h-8 bg-gray-800" />
              <StatPill label="Member"   value="6mo" />
            </div>
          </div>
        </div>
      </div>

      {/* ── Page body ── */}
      <div className="max-w-6xl mx-auto px-8 md:px-12 py-10">

        {/* Tabs */}
        <div className="flex gap-1 mb-10 bg-gray-950 border border-gray-800 rounded-xl p-1 w-fit">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`px-6 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                activeTab === t.id
                  ? 'bg-red-600 text-white shadow-lg shadow-red-900/30'
                  : 'text-gray-500 hover:text-white'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ══════════ PROFILE TAB ══════════ */}
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Personal info form */}
            <div className="lg:col-span-2 bg-[#0a0a0a] border border-gray-800 rounded-2xl overflow-hidden">
              <div className="p-8 border-b border-gray-800 flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Personal Info</p>
                  <h3 className="text-white font-black text-lg uppercase">Your Details</h3>
                </div>
                <button
                  onClick={() => editing ? handleSave() : setEditing(true)}
                  disabled={saving}
                  className={`flex items-center gap-2 font-bold px-5 py-2.5 rounded-full text-sm uppercase tracking-wider transition-all duration-300 ${
                    editing
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : 'border border-gray-700 hover:border-gray-500 text-gray-400 hover:text-white'
                  }`}
                >
                  {editing
                    ? saving ? <><div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" /> Saving...</> : <><Save size={14}/> Save</>
                    : <><Edit3 size={14}/> Edit</>
                  }
                </button>
              </div>

              <div className="p-8 space-y-6">
                {/* Full name */}
                <div>
                  <label className="text-gray-500 text-xs uppercase tracking-widest font-semibold mb-2 block">Full Name</label>
                  {editing
                    ? <input value={fullName} onChange={e => setFullName(e.target.value)}
                        className="w-full px-5 py-3.5 bg-gray-950 border border-gray-700 rounded-xl focus:outline-none focus:border-red-600 text-white transition-colors"
                        placeholder="Enter full name" />
                    : <p className="text-white font-semibold text-lg px-1">{fullName || '—'}</p>
                  }
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Email */}
                  <div>
                    <label className="text-gray-500 text-xs uppercase tracking-widest font-semibold mb-2 block">Email</label>
                    {editing
                      ? <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                          className="w-full px-5 py-3.5 bg-gray-950 border border-gray-700 rounded-xl focus:outline-none focus:border-red-600 text-white transition-colors"
                          placeholder="you@example.com" />
                      : <p className="text-white font-semibold px-1">{email || '—'}</p>
                    }
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="text-gray-500 text-xs uppercase tracking-widest font-semibold mb-2 block">Phone</label>
                    {editing
                      ? <input type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                          className="w-full px-5 py-3.5 bg-gray-950 border border-gray-700 rounded-xl focus:outline-none focus:border-red-600 text-white transition-colors"
                          placeholder="+94 77 123 4567" />
                      : <p className="text-white font-semibold px-1">{phone || '—'}</p>
                    }
                  </div>
                </div>

                {/* Role (read-only) */}
                <div>
                  <label className="text-gray-500 text-xs uppercase tracking-widest font-semibold mb-2 block">Role</label>
                  <div className="flex items-center gap-3 px-1">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <p className="text-white font-semibold capitalize">{user?.role || 'athlete'}</p>
                  </div>
                </div>

                {editing && (
                  <button onClick={() => { setEditing(false); setFullName(user?.name||''); setEmail(user?.email||''); setPhone(user?.phone||''); }}
                    className="flex items-center gap-2 text-gray-500 hover:text-white text-sm transition">
                    <X size={14}/> Cancel
                  </button>
                )}
              </div>
            </div>

            {/* Right col — membership card + quick links */}
            <div className="space-y-4">

              {/* Membership */}
              <div className="bg-gradient-to-br from-red-900/25 to-black border border-red-800/30 rounded-2xl p-6">
                <p className="text-red-400 text-[10px] font-bold uppercase tracking-widest mb-3">Active Plan</p>
                <h4 className="text-white font-black text-lg mb-1">Individual Gents</h4>
                <p className="text-gray-500 text-xs mb-4">Colombo 7 • Expires Dec 2025</p>
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-green-400 text-xs font-bold">Active</span>
                </div>
                <button onClick={() => navigate('/membership')}
                  className="w-full flex items-center justify-center gap-2 border border-red-600/40 hover:border-red-500 text-red-400 hover:text-white font-bold py-3 rounded-xl text-sm transition-all duration-300 hover:bg-red-600/10">
                  Manage Plan <ArrowUpRight size={14}/>
                </button>
              </div>

              {/* Quick links */}
              <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl overflow-hidden">
                {[
                  { label: 'Change Password', icon: Lock,    tab: 'security' },
                  { label: 'Notifications',   icon: Bell,    tab: 'security' },
                  { label: 'Manage Devices',  icon: Monitor, tab: 'account'  },
                ].map((item, i) => (
                  <button key={i} onClick={() => setActiveTab(item.tab)}
                    className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-900 transition-colors border-b border-gray-800 last:border-0 group">
                    <div className="flex items-center gap-3">
                      <item.icon size={16} className="text-gray-600 group-hover:text-red-500 transition-colors" />
                      <span className="text-gray-400 group-hover:text-white text-sm transition-colors">{item.label}</span>
                    </div>
                    <ChevronRight size={14} className="text-gray-700 group-hover:text-gray-400 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ══════════ SECURITY TAB ══════════ */}
        {activeTab === 'security' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Change password */}
            <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl overflow-hidden">
              <div className="p-8 border-b border-gray-800">
                <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Credentials</p>
                <h3 className="text-white font-black text-lg uppercase">Change Password</h3>
              </div>
              <div className="p-8 space-y-5">
                {[
                  { label: 'Current Password', val: currentPw, set: setCurrentPw, placeholder: '••••••••' },
                  { label: 'New Password',      val: newPw,     set: setNewPw,     placeholder: 'Min 6 characters' },
                  { label: 'Confirm Password',  val: confirmPw, set: setConfirmPw, placeholder: 'Repeat new password' },
                ].map((f, i) => (
                  <div key={i}>
                    <label className="text-gray-500 text-xs uppercase tracking-widest font-semibold mb-2 block">{f.label}</label>
                    <div className="relative">
                      <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
                      <input
                        type={showPw ? 'text' : 'password'}
                        value={f.val}
                        onChange={e => f.set(e.target.value)}
                        placeholder={f.placeholder}
                        className="w-full pl-10 pr-12 py-3.5 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none focus:border-red-600 text-white placeholder-gray-700 transition-colors text-sm"
                      />
                      {i === 0 && (
                        <button onClick={() => setShowPw(!showPw)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white transition">
                          {showPw ? <EyeOff size={15}/> : <Eye size={15}/>}
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {/* Password strength indicator */}
                {newPw && (
                  <div>
                    <div className="flex gap-1 mb-1">
                      {[1,2,3,4].map(n => (
                        <div key={n} className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                          newPw.length >= n * 2
                            ? n <= 2 ? 'bg-red-500' : n === 3 ? 'bg-yellow-500' : 'bg-green-500'
                            : 'bg-gray-800'
                        }`} />
                      ))}
                    </div>
                    <p className="text-gray-600 text-xs">
                      {newPw.length < 4 ? 'Too weak' : newPw.length < 6 ? 'Weak' : newPw.length < 8 ? 'Fair' : 'Strong'}
                    </p>
                  </div>
                )}

                <button onClick={handlePasswordChange} disabled={pwSaving}
                  className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 disabled:bg-red-900 text-white font-bold py-4 rounded-xl text-sm uppercase tracking-wider transition-all duration-300">
                  {pwSaving
                    ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Updating...</>
                    : <><Check size={15}/> Update Password</>
                  }
                </button>
              </div>
            </div>

            {/* Notification toggles */}
            <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl overflow-hidden">
              <div className="p-8 border-b border-gray-800">
                <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Preferences</p>
                <h3 className="text-white font-black text-lg uppercase">Notifications & Security</h3>
              </div>
              <div className="divide-y divide-gray-800">
                {securityItems.map((item, i) => (
                  <div key={i} className="flex items-center justify-between px-8 py-5 hover:bg-gray-950 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        item.state ? 'bg-red-600/15 border border-red-600/30' : 'bg-gray-900 border border-gray-800'
                      }`}>
                        <item.icon size={16} className={item.state ? 'text-red-500' : 'text-gray-600'} />
                      </div>
                      <div>
                        <p className="text-white text-sm font-semibold">{item.label}</p>
                        <p className="text-gray-600 text-xs">{item.sub}</p>
                      </div>
                    </div>
                    <Toggle enabled={item.state} onToggle={() => item.set(!item.state)} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ══════════ ACCOUNT TAB ══════════ */}
        {activeTab === 'account' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Devices */}
            <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl overflow-hidden">
              <div className="p-8 border-b border-gray-800">
                <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Sessions</p>
                <h3 className="text-white font-black text-lg uppercase">Active Devices</h3>
              </div>
              <div className="divide-y divide-gray-800">
                {[
                  { device: 'Chrome — Windows 11',  location: 'Colombo, Sri Lanka', time: 'Now',        current: true  },
                  { device: 'Safari — iPhone 15',   location: 'Colombo, Sri Lanka', time: '2h ago',     current: false },
                  { device: 'Firefox — MacOS',      location: 'Gampaha, Sri Lanka', time: 'Yesterday',  current: false },
                ].map((d, i) => (
                  <div key={i} className="flex items-center justify-between px-8 py-5 hover:bg-gray-950 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-9 h-9 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center">
                        <Monitor size={16} className="text-gray-500" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-white text-sm font-semibold">{d.device}</p>
                          {d.current && (
                            <span className="text-[9px] bg-green-600/20 text-green-400 border border-green-600/30 px-2 py-0.5 rounded-full font-bold uppercase">
                              Current
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 text-xs">{d.location} • {d.time}</p>
                      </div>
                    </div>
                    {!d.current && (
                      <button className="text-xs text-red-500 hover:text-red-400 font-bold transition">
                        Revoke
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Danger zone */}
            <div className="space-y-4">

              {/* Logout */}
              <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-8">
                <h3 className="text-white font-black uppercase text-sm mb-2">Sign Out</h3>
                <p className="text-gray-500 text-xs mb-5">Sign out from your current session on this device.</p>
                <button onClick={handleLogout}
                  className="flex items-center gap-2 border border-gray-700 hover:border-gray-500 text-gray-400 hover:text-white font-bold px-6 py-3 rounded-xl text-sm transition-all duration-300">
                  <LogOut size={15}/> Sign Out
                </button>
              </div>

              {/* Delete account */}
              <div className="bg-red-950/20 border border-red-800/30 rounded-2xl p-8">
                <h3 className="text-red-400 font-black uppercase text-sm mb-2">Danger Zone</h3>
                <p className="text-gray-500 text-xs mb-5">
                  Permanently delete your account and all associated data. This action cannot be undone.
                </p>
                <button className="flex items-center gap-2 bg-red-600/10 hover:bg-red-600 border border-red-600/30 hover:border-red-600 text-red-400 hover:text-white font-bold px-6 py-3 rounded-xl text-sm transition-all duration-300">
                  <Trash2 size={15}/> Delete Account
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}