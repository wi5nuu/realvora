"use client";

import * as React from "react";
import { Send } from "lucide-react";
import toast from "react-hot-toast";

type ChatMsg = {
  role: "user" | "assistant";
  content: string;
  createdAt: number;
};

const SUGGESTED = [
  "Cara naikan margin saya?",
  "Strategi marketing yang cocok?",
  "Cara kelola cashflow lebih baik?",
  "Apa prioritas perbaikan pertama?",
];

export function AIChat({ diagnosisId }: { diagnosisId: string }) {
  const [messages, setMessages] = React.useState<ChatMsg[]>([]);
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const remaining = Math.max(0, 10 - messages.length);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    if (messages.length >= 10) {
      toast.error("Anda sudah menggunakan 10 pesan untuk sesi ini. Login untuk unlock lebih banyak pesan.");
      return;
    }

    const userMsg: ChatMsg = {
      role: "user",
      content: trimmed,
      createdAt: Date.now(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          diagnosisId,
          chatHistory: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });
      const data = await res.json();
      if (!res.ok || data?.error) {
        toast.error(data?.message ?? "Gagal memproses jawaban AI.");
        return;
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response, createdAt: Date.now() },
      ]);
    } catch (_e) {
      toast.error("Gagal memproses jawaban AI.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rounded-lg border border-gray-100 bg-white p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center">
            🤖
          </div>
          <div>
            <div className="font-semibold text-gray-900">Realvora AI</div>
            <div className="text-xs text-gray-500">Online</div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {SUGGESTED.map((q) => (
          <button
            key={q}
            type="button"
            onClick={() => send(q)}
            className="px-3 py-2 rounded-full border border-gray-100 bg-gray-50 hover:bg-indigo-50 active:scale-95 text-xs font-semibold text-gray-700"
            disabled={loading}
          >
            {q}
          </button>
        ))}
      </div>

      <div className="mt-4 h-64 md:h-80 overflow-y-auto scroll-hidden pr-1">
        <div className="space-y-3">
          {messages.length === 0 ? (
            <div className="text-sm text-gray-500">
              Tanyakan seputar bisnis Anda...
            </div>
          ) : null}

          {messages.map((m) => (
            <div
              key={m.createdAt + m.role}
              className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
            >
              <div
                className={[
                  "max-w-[85%] rounded-lg px-4 py-3 text-sm leading-relaxed border",
                  m.role === "user"
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-gray-100 text-gray-800 border-gray-100",
                ].join(" ")}
              >
                {m.content}
                <div className="mt-2 text-[11px] opacity-80">
                  {new Date(m.createdAt).toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          ))}

          {loading ? (
            <div className="flex gap-2 items-center text-gray-600 text-sm">
              <span className="inline-flex w-2 h-2 bg-indigo-600 rounded-full animate-bounce" />
              <span className="inline-flex w-2 h-2 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.2s]" />
              <span className="inline-flex w-2 h-2 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.4s]" />
              <span>AI sedang mengetik...</span>
            </div>
          ) : null}
        </div>
      </div>

      {messages.length >= 10 ? (
        <div className="mt-3 text-sm text-amber-700 font-semibold">
          Anda sudah menggunakan 10 pesan untuk sesi ini. Login untuk unlock lebih banyak pesan.
        </div>
      ) : null}

      <div className="mt-4">
        <div className="flex items-end gap-3">
          <div className="flex-1">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tanya seputar bisnis Anda..."
              className="w-full min-h-[48px] max-h-32 resize-none rounded-lg border border-gray-200 bg-white px-4 py-3 text-base outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              disabled={loading || messages.length >= 10}
            />
            <div className="mt-2 text-[12px] text-gray-500">
              {remaining}/10 pesan tersisa
            </div>
          </div>

          <button
            type="button"
            onClick={() => send(input)}
            disabled={loading || messages.length >= 10 || !input.trim()}
            className="h-12 w-12 rounded-lg bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-500 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            aria-label="Kirim pesan"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

