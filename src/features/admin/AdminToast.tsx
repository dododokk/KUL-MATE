import { useEffect, useState } from 'react';

export interface ToastMsg {
  text: string;
  variant: 'success' | 'dark';
  showIcon?: boolean;
}

interface AdminToastProps {
  messages: ToastMsg[];
  visible: boolean;
}

export default function AdminToast({ messages, visible }: AdminToastProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (visible) {
      setMounted(true);
    } else {
      const t = setTimeout(() => setMounted(false), 300);
      return () => clearTimeout(t);
    }
  }, [visible]);

  if (!mounted) return null;

  return (
    <div
      className="fixed left-0 right-0 top-4 z-50 flex flex-col gap-2 items-center px-4"
      style={{ transition: 'opacity 0.3s ease', opacity: visible ? 1 : 0 }}
    >
      {messages.map((msg, i) => (
        <div
          key={i}
          className="flex items-center gap-2.5 px-4 py-3 rounded-2xl w-full max-w-[343px]"
          style={{
            backgroundColor: msg.variant === 'success' ? '#10b981' : '#1f2937',
            boxShadow:
              '0px 4px 6px -4px rgba(0,0,0,0.1), 0px 10px 15px -3px rgba(0,0,0,0.1)',
          }}
        >
          <div className="w-5 h-5 flex items-center justify-center shrink-0">
            {msg.variant === 'dark' && msg.showIcon && (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <circle cx="12" cy="16" r="0.5" fill="white" strokeWidth="2.5" />
              </svg>
            )}
          </div>
          <p className="text-white text-sm font-medium leading-5">{msg.text}</p>
        </div>
      ))}
    </div>
  );
}
