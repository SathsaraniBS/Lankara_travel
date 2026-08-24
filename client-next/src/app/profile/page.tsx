'use client';
import { useState } from 'react';
import { useStore } from '@/store';
import { Initiative } from '@/types';
import { Badge, ProgressBar } from '@/components/ui';
import { X, ChevronRight, Upload } from 'lucide-react';
import InitiativeDetail from './detail/InitiativeDetail';
import BulkUploadModal from './BulkUploadModal';

const WORKSTREAM_SUBS: Record<string, string[]> = {
  'Revenue Offence': [
    'Non-tech pack business',
    'Onboarding with new strategic customers',
    'Grow with existing customers',
    'India',
    'Accessories',
  ],
  'Manufacturing': [
    'Overhead reduction',
    'Autonomation / deskilling / method improvements',
    'Product capability improvements',
    'Productivity improvements',
  ],
  'Raw Material': [
    'Consumption / market efficiency / wastage minimizing',
    'Pricing & counter sourcing',
    'Logistics inbound / verticality',
    'Stock holding',
  ],
  'SG&A and Finance': [
    'Marketing & Development Cost',
    'Employee related Cost',
    'Administration Cost',
    'Borrowing and Interest Cost',
    'Cost Validity',
  ],
};

const STAGE_FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'L0',  label: 'L0 — Idea' },
  { key: 'L1',  label: 'L1 — Identified' },
  { key: 'L2',  label: 'L2 — Validated' },
  { key: 'L3',  label: 'L3 — Planned' },
  { key: 'L4',  label: 'L4 — Executed' },
  { key: 'L5',  label: 'L5 — Realized' },
];

function AddInitiativeModal({ onClose }: { onClose: () => void }) {
  const { addInitiative, fetchInitiatives } = useStore();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    workstream: 'Revenue Offence',
    subWorkstream: '',
    owner: '',
    valueTarget: '',
    description: '',
  });

  const subOptions = WORKSTREAM_SUBS[form.workstream] || [];
  const nameError = submitted && !form.name.trim();
  const ownerError = submitted && !form.owner.trim();
  const subError = submitted && !form.subWorkstream;

const handleSubmit = async () => {
    setSubmitted(true);
    if (!form.name.trim() || !form.owner.trim() || !form.subWorkstream) return;

    await addInitiative({
      name: form.name,
      owner: form.owner,
      department: form.subWorkstream || form.workstream,
      workstream: form.workstream,
      status: 'L0',
      progress: 0,
      valueTarget: parseFloat(form.valueTarget) || 0,
      savedValuetured: 0,
      timeline: '',
      description: form.description,
    });

    // Notify workstream leader
    try {
      const { getApproversForStage } = await import('@/lib/approvals');
      const approvers = getApproversForStage('L0', form.workstream);
      if (approvers.length > 0) {
        await fetch('/api/notify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: approvers.map((a: { name: string; email: string }) => a.email),
            initiativeName: form.name,
            workstream: form.workstream,
            currentStage: 'L0',
            nextStage: 'L1',
            submittedBy: form.owner,
            initiativeId: '',
          }),
        });
      }
    } catch (e) {
      console.error('Notification failed:', e);
    }

    await fetchInitiatives();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl border border-gray-100 w-full max-w-md shadow-lg">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-900">New initiative</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={16} /></button>
        </div>
        <div className="px-5 py-4 space-y-3">
          <div>
            <label className="block text-[11px] font-medium text-gray-500 mb-1">
              Initiative name <span className="text-red-500">*</span>
            </label>
            <input type="text" placeholder="e.g. Supplier consolidation" value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={`w-full border rounded-lg px-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 ${nameError ? 'border-red-400 bg-red-50' : 'border-gray-200'}`} />
            {nameError && <p className="text-[10px] text-red-500 mt-1">Initiative name is required.</p>}
          </div>
          <div>
            <label className="block text-[11px] font-medium text-gray-500 mb-1">Workstream</label>
            <select value={form.workstream}
              onChange={(e) => setForm({ ...form, workstream: e.target.value, subWorkstream: '' })}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500">
              {Object.keys(WORKSTREAM_SUBS).map((w) => <option key={w}>{w}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[11px] font-medium text-gray-500 mb-1">
              Sub-workstream <span className="text-red-500">*</span>
            </label>
            <select value={form.subWorkstream}
              onChange={(e) => setForm({ ...form, subWorkstream: e.target.value })}
              className={`w-full border rounded-lg px-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 ${subError ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}>
              <option value="">Select sub-workstream...</option>
              {subOptions.map((s) => <option key={s}>{s}</option>)}
            </select>
            {subError && <p className="text-[10px] text-red-500 mt-1">Please select a sub-workstream.</p>}
          </div>
          <div>
            <label className="block text-[11px] font-medium text-gray-500 mb-1">
              Owner <span className="text-red-500">*</span>
            </label>
            <input type="text" placeholder="Name · Department" value={form.owner}
              onChange={(e) => setForm({ ...form, owner: e.target.value })}
              className={`w-full border rounded-lg px-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 ${ownerError ? 'border-red-400 bg-red-50' : 'border-gray-200'}`} />
            {ownerError && <p className="text-[10px] text-red-500 mt-1">Owner is required.</p>}
          </div>
          <div>
            <label className="block text-[11px] font-medium text-gray-500 mb-1">Value target ($)</label>
            <input type="number" placeholder="0.0" value={form.valueTarget}
              onChange={(e) => setForm({ ...form, valueTarget: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-gray-500 mb-1">Description</label>
            <textarea placeholder="Briefly describe this initiative..." value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-20" />
          </div>
        </div>
        <div className="flex justify-end gap-2 px-5 py-4 border-t border-gray-100">
          <button onClick={onClose} className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">Cancel</button>
          <button onClick={handleSubmit} className="px-3 py-1.5 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">Create initiative</button>
        </div>
      </div>
    </div>
  );
}

export default function Initiatives({ showAdd, onCloseAdd, currentUserEmail }: { showAdd: boolean; onCloseAdd: () => void; currentUserEmail: string }) {
  const { initiatives, fetchInitiatives } = useStore();
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState<Initiative | null>(null);
  const [showBulk, setShowBulk] = useState(false);

  // Separate active vs declined
  const activeInitiatives = initiatives.filter(i => i.status !== 'declined');
  const declinedInitiatives = initiatives.filter(i => i.status === 'declined');

  const isDeclinedTab = filter === 'declined';

  const filtered = isDeclinedTab
    ? declinedInitiatives
    : filter === 'all'
      ? activeInitiatives
      : activeInitiatives.filter(i => i.status === filter);

  if (selected) {
    return (
      <InitiativeDetail
      init={selected}
      onClose={() => setSelected(null)}
      onRefresh={fetchInitiatives}
      currentUserEmail={currentUserEmail}
    />
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 p-5 overflow-y-auto">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Initiatives</h1>
            <p className="text-xs text-gray-400 mt-0.5">{activeInitiatives.length} active · {declinedInitiatives.length} declined</p>
          </div>
          <button
            onClick={() => setShowBulk(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
            <Upload size={12} /> Bulk upload
          </button>
        </div>

        {/* Stage filter tabs */}
        <div className="flex gap-2 mb-3 flex-wrap">
          {STAGE_FILTERS.map((f) => {
            const count = f.key === 'all'
              ? activeInitiatives.length
              : activeInitiatives.filter(i => i.status === f.key).length;
            return (
              <button key={f.key} onClick={() => setFilter(f.key)}
                className={`px-3 py-1 rounded-full text-xs border transition-colors ${
                  filter === f.key && !isDeclinedTab
                    ? 'bg-blue-50 text-blue-700 border-blue-300 font-medium'
                    : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
                }`}>
                {f.label} ({count})
              </button>
            );
          })}
        </div>

        {/* Declined tab — separated with a divider */}
        <div className="flex gap-2 mb-4 items-center">
          <div className="h-px bg-gray-100 flex-1" />
          <button
            onClick={() => setFilter('declined')}
            className={`px-3 py-1 rounded-full text-xs border transition-colors flex items-center gap-1.5 ${
              isDeclinedTab
                ? 'bg-red-50 text-red-600 border-red-300 font-medium'
                : 'bg-white text-gray-400 border-gray-200 hover:border-red-200 hover:text-red-400'
            }`}>
            <span className="text-[10px]">⊘</span>
            Declined ({declinedInitiatives.length})
          </button>
        </div>

        {/* Declined section banner */}
        {isDeclinedTab && (
          <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3 mb-4 flex items-center gap-3">
            <span className="text-red-400 text-lg">⊘</span>
            <div>
              <p className="text-xs font-medium text-red-700">Declined initiatives</p>
              <p className="text-[11px] text-red-400 mt-0.5">These initiatives have been removed from the active pipeline. You can reactivate them from the initiative detail view.</p>
            </div>
          </div>
        )}

        {filtered.length === 0 ? (
          <div className="bg-white border border-gray-100 rounded-xl p-12 text-center">
            <p className="text-sm text-gray-400 mb-1">
              {isDeclinedTab ? 'No declined initiatives' : 'No initiatives found'}
            </p>
            <p className="text-xs text-gray-300">
              {isDeclinedTab ? 'Initiatives you decline will appear here' : 'Add a new initiative or use bulk upload to get started'}
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((init) => (
              <div key={init.id} onClick={() => setSelected(init)}
                className={`bg-white border rounded-xl p-4 cursor-pointer transition-all ${
                  isDeclinedTab
                    ? 'border-red-100 hover:border-red-200 opacity-75 hover:opacity-100'
                    : 'border-gray-100 hover:border-blue-200 hover:shadow-sm'
                }`}>
                <div className="flex items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className={`font-medium text-sm ${isDeclinedTab ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
                      {init.name}
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">
                      {init.owner} · {init.workstream}
                      {init.department && init.department !== init.workstream && (
                        <span className="text-gray-300"> · {init.department}</span>
                      )}
                    </div>
                  </div>
                  <Badge status={init.status} />
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-800">${init.savedValuetured.toLocaleString()}</div>
                    <div className="text-[10px] text-gray-400">of ${init.valueTarget.toLocaleString()}</div>
                  </div>
                  <div className="w-28"><ProgressBar pct={init.progress} status={init.status} /></div>
                  <ChevronRight size={14} className="text-gray-300" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showAdd && <AddInitiativeModal onClose={onCloseAdd} />}
      {showBulk && (
        <BulkUploadModal
          onClose={() => setShowBulk(false)}
          onSuccess={() => { fetchInitiatives(); setShowBulk(false); }}
        />
      )}
    </div>
  );
}