"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { ArrowUpRight, Bookmark, BookmarkCheck, Bot, MessageCircle, Send, X } from "lucide-react";
import { getService } from "@/data/mockServices";
import { useApp } from "@/context/AppContext";
import { getMockAssistantReply } from "@/lib/mockAssistant";

type Message = {
  id: number;
  role: "user" | "assistant";
  text: string;
  serviceIds?: string[];
};

const starterPrompts = [
  "I am having a baby in Ottawa",
  "What if I live in Calgary?",
  "I lost my job in Ontario",
];

export function MockChatbotUI() {
  const { chatOpen, setChatOpen, profile, updateProfile, isSaved, toggleSaved } = useApp();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, role: "assistant", text: "Hello! Tell me about a life event and where you live. I can show matching programs from this demo catalogue with links to official government pages." },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!chatOpen) return;
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setChatOpen(false);
      if (event.key === "Tab" && dialogRef.current) {
        const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled])'));
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!first || !last) return;
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [chatOpen, setChatOpen]);

  useEffect(() => {
    if (chatOpen) endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, chatOpen]);

  const sendMessage = (question: string) => {
    const trimmed = question.trim();
    if (!trimmed) return;
    const reply = getMockAssistantReply(trimmed, profile);
    if (Object.keys(reply.profilePatch).length) updateProfile(reply.profilePatch);
    setMessages((current) => [
      ...current,
      { id: Date.now(), role: "user", text: trimmed },
      { id: Date.now() + 1, role: "assistant", text: reply.text, serviceIds: reply.serviceIds },
    ]);
    setInput("");
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setChatOpen(true)}
        className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-4 z-30 inline-flex min-h-12 items-center gap-2 rounded-full bg-navy px-5 text-sm font-semibold text-white shadow-xl transition hover:bg-[#0d304e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy sm:right-6"
      >
        <MessageCircle size={19} aria-hidden="true" /> Ask Civik Ottawa
      </button>

      {chatOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#102c43]/55 sm:items-center sm:justify-end sm:p-5" onMouseDown={(event) => { if (event.target === event.currentTarget) setChatOpen(false); }}>
          <section ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="chat-title" className="flex h-[min(92dvh,760px)] w-full flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:h-[min(88dvh,760px)] sm:max-w-[460px] sm:rounded-2xl">
            <div className="flex items-center justify-between gap-3 border-b border-line bg-[#f6f9f9] px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal text-[#267266]"><Bot size={21} aria-hidden="true" /></span>
                <div>
                  <h2 id="chat-title" className="font-semibold text-ink">Discovery assistant</h2>
                  <p className="text-xs text-muted">Scripted demo · Official links</p>
                </div>
              </div>
              <button type="button" onClick={() => setChatOpen(false)} aria-label="Close assistant" className="flex h-11 w-11 items-center justify-center rounded-lg text-ink hover:bg-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-navy"><X size={21} /></button>
            </div>

            <div className="flex-1 space-y-5 overflow-y-auto px-4 py-5 sm:px-5" aria-live="polite">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[95%] rounded-2xl px-4 py-3 text-sm leading-6 ${message.role === "user" ? "rounded-br-sm bg-navy text-white" : "rounded-bl-sm bg-[#f0f5f5] text-ink"}`}>
                    <p>{message.text}</p>
                    {message.serviceIds && message.serviceIds.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {message.serviceIds.map((id) => {
                          const service = getService(id);
                          if (!service) return null;
                          const saved = isSaved(id);
                          return (
                            <div key={id} className="rounded-xl border border-line bg-white p-3">
                              <p className="font-semibold leading-5 text-ink">{service.title}</p>
                              <p className="mt-1 text-xs text-muted">{service.regionCode === "CA" ? "Federal" : service.regionCode} · {service.estimatedBenefit}</p>
                              <div className="mt-2 flex flex-wrap items-center gap-3">
                                <a href={service.officialUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1 text-xs font-semibold text-navy underline underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-navy">Official source <ArrowUpRight size={14} aria-hidden="true" /><span className="sr-only">(opens in a new tab)</span></a>
                                <button type="button" onClick={() => toggleSaved(id)} aria-pressed={saved} className="inline-flex min-h-11 items-center gap-1 text-xs font-semibold text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-navy">{saved ? <BookmarkCheck size={14} aria-hidden="true" /> : <Bookmark size={14} aria-hidden="true" />}{saved ? "Saved" : "Save"}</button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={endRef} />
            </div>

            {messages.length === 1 && (
              <div className="flex gap-2 overflow-x-auto border-t border-line px-4 py-3">
                {starterPrompts.map((prompt) => <button key={prompt} type="button" onClick={() => sendMessage(prompt)} className="min-h-11 shrink-0 rounded-full border border-line bg-white px-3 text-xs font-medium text-navy hover:border-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-navy">{prompt}</button>)}
              </div>
            )}
            <form onSubmit={onSubmit} className="flex gap-2 border-t border-line bg-white p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
              <label htmlFor="chat-input" className="sr-only">Ask about a service</label>
              <input ref={inputRef} id="chat-input" value={input} onChange={(event) => setInput(event.target.value)} placeholder="Describe your situation..." className="min-h-12 min-w-0 flex-1 rounded-xl border border-line px-4 text-sm text-ink outline-none focus:border-navy focus:ring-2 focus:ring-navy/15" />
              <button type="submit" disabled={!input.trim()} aria-label="Send message" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy text-white hover:bg-[#0d304e] disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"><Send size={19} /></button>
            </form>
          </section>
        </div>
      )}
    </>
  );
}
