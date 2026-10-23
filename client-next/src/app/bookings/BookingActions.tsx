"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, Loader2 } from "lucide-react";

interface BookingActionsProps {
  bookingId: string;
  canPay: boolean;
  canCancel: boolean;
}

async function readDetail(res: Response): Promise<string> {
  const data = await res.json().catch(() => null);
  return typeof data?.detail === "string" ? data.detail : "Something went wrong. Please try again.";
}

export default function BookingActions({ bookingId, canPay, canCancel }: BookingActionsProps) {
  const router = useRouter();
  const [busy, setBusy] = useState<"pay" | "cancel" | null>(null);
  const [askCancel, setAskCancel] = useState(false);
  const [error, setError] = useState("");

  const goToLogin = () => {
    window.location.href = `/login?next=${encodeURIComponent(window.location.pathname)}`;
  };

  const pay = async () => {
    setError("");
    setBusy("pay");
    try {
      const res = await fetch("/api/v1/payments/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ booking_id: bookingId }),
      });
      if (res.status === 401) return goToLogin();
      if (!res.ok) {
        setError(await readDetail(res));
        setBusy(null);
        return;
      }
      const data = await res.json();
      if (typeof data?.url !== "string") {
        setError("The payment page is unavailable right now. Please try again.");
        setBusy(null);
        return;
      }
      // Keep the button disabled while the browser leaves for Stripe
      window.location.assign(data.url);
    } catch {
      setError("Could not reach the server. Please try again.");
      setBusy(null);
    }
  };

  const cancel = async () => {
    setError("");
    setBusy("cancel");
    try {
      const res = await fetch(`/api/bookings/${bookingId}/cancel`, { method: "PATCH" });
      if (res.status === 401) return goToLogin();
      if (!res.ok) {
        setError(await readDetail(res));
      } else {
        router.refresh();
      }
    } catch {
      setError("Could not reach the server. Please try again.");
    } finally {
      setBusy(null);
      setAskCancel(false);
    }
  };

  if (!canPay && !canCancel) return null;

  return (
    <div className="flex flex-col items-end gap-1.5">
      <div className="flex items-center gap-2">
        {canCancel &&
          (askCancel ? (
            <>
              <span className="text-[11px] text-gray-500">Cancel this booking?</span>
              <button
                onClick={cancel}
                disabled={busy !== null}
                className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 disabled:opacity-60 text-white font-semibold text-xs rounded-xl transition cursor-pointer flex items-center gap-1"
              >
                {busy === "cancel" && <Loader2 size={12} className="animate-spin" />} Yes, cancel
              </button>
              <button
                onClick={() => setAskCancel(false)}
                disabled={busy !== null}
                className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold text-xs rounded-xl transition cursor-pointer"
              >
                Keep
              </button>
            </>
          ) : (
            <button
              onClick={() => setAskCancel(true)}
              disabled={busy !== null}
              className="px-3 py-1.5 bg-white border border-gray-200 hover:bg-rose-50 hover:border-rose-200 hover:text-rose-700 text-gray-700 font-semibold text-xs rounded-xl transition cursor-pointer"
            >
              Cancel
            </button>
          ))}

        {canPay && !askCancel && (
          <button
            onClick={pay}
            disabled={busy !== null}
            className="px-3.5 py-1.5 bg-emerald-800 hover:bg-emerald-900 disabled:opacity-60 text-white font-semibold text-xs rounded-xl transition cursor-pointer flex items-center gap-1.5"
          >
            {busy === "pay" ? <Loader2 size={13} className="animate-spin" /> : <CreditCard size={13} />}
            Pay now
          </button>
        )}
      </div>
      {error && <p className="text-[11px] text-rose-600 font-medium text-right max-w-xs">{error}</p>}
    </div>
  );
}
