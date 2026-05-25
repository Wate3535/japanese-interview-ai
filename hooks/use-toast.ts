'use client';

import * as React from 'react';

export interface ToastProps {
  id?: string;
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive';
  action?: React.ReactNode;
}

interface ToastContextType {
  toasts: ToastProps[];
  toast: (props: ToastProps) => void;
  dismiss: (id?: string) => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastProps[]>([]);

  const toast = React.useCallback((props: ToastProps) => {
    const id = props.id || Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { ...props, id }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  }, []);

  const dismiss = React.useCallback((id?: string) => {
    setToasts((prev) =>
      id ? prev.filter((t) => t.id !== id) : []
    );
  }, []);

  const contextValue = React.useMemo(() => ({ toasts, toast, dismiss }), [toasts, toast, dismiss]);

  return React.createElement(ToastContext.Provider, { value: contextValue }, children);
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    return { toasts: [], toast: () => {}, dismiss: () => {} };
  }
  return context;
}
