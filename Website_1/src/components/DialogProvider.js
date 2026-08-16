"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";

const DialogContext = createContext(null);

export function useDialog() {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog must be used within a DialogProvider");
  }
  return context;
}

export default function DialogProvider({ children }) {
  const [dialog, setDialog] = useState({
    isOpen: false,
    type: "alert", // "alert" | "confirm"
    title: "",
    message: "",
    resolveRef: null,
  });

  const modalRef = useRef(null);
  const confirmBtnRef = useRef(null);

  const showAlert = (message, title = "Notification") => {
    return new Promise((resolve) => {
      setDialog({
        isOpen: true,
        type: "alert",
        title,
        message,
        resolveRef: resolve,
      });
    });
  };

  const showConfirm = (message, title = "Confirm Action") => {
    return new Promise((resolve) => {
      setDialog({
        isOpen: true,
        type: "confirm",
        title,
        message,
        resolveRef: resolve,
      });
    });
  };

  const handleConfirm = () => {
    if (dialog.resolveRef) {
      dialog.resolveRef(true);
    }
    setDialog((prev) => ({ ...prev, isOpen: false }));
  };

  const handleCancel = () => {
    if (dialog.resolveRef) {
      dialog.resolveRef(false);
    }
    setDialog((prev) => ({ ...prev, isOpen: false }));
  };

  // Close dialog on Escape keypress
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (dialog.isOpen && e.key === "Escape") {
        handleCancel();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [dialog.isOpen, dialog.resolveRef]);

  // Focus trap: automatically focus the confirm button when opened
  useEffect(() => {
    if (dialog.isOpen && confirmBtnRef.current) {
      confirmBtnRef.current.focus();
    }
  }, [dialog.isOpen]);

  // Check if warning / danger context (e.g. Account Deletion)
  const isDanger =
    dialog.title.toLowerCase().includes("delete") ||
    dialog.title.toLowerCase().includes("warning") ||
    dialog.message.toLowerCase().includes("delete") ||
    dialog.message.toLowerCase().includes("permanently");

  return (
    <DialogContext.Provider value={{ showAlert, showConfirm }}>
      {children}

      {dialog.isOpen && (
        <div className="custom-dialog-backdrop" onClick={handleCancel}>
          <div
            className="custom-dialog-modal"
            ref={modalRef}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="dialog-title"
          >
            {/* Header / Icon */}
            <div className="custom-dialog-header">
              <div className={`custom-dialog-icon-wrapper ${isDanger ? "danger" : "normal"}`}>
                {isDanger ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                    <line x1="12" y1="9" x2="12" y2="13"></line>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                ) : dialog.type === "confirm" ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                )}
              </div>
              <h2 id="dialog-title">{dialog.title}</h2>
            </div>

            {/* Message Body */}
            <div className="custom-dialog-body">
              <p>{dialog.message}</p>
            </div>

            {/* Action Buttons */}
            <div className="custom-dialog-footer">
              {dialog.type === "confirm" && (
                <button
                  type="button"
                  className="dialog-btn secondary"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              )}
              <button
                type="button"
                className={`dialog-btn ${isDanger ? "danger" : "primary"}`}
                onClick={handleConfirm}
                ref={confirmBtnRef}
              >
                {dialog.type === "confirm" ? (isDanger ? "Delete" : "Confirm") : "OK"}
              </button>
            </div>
          </div>

          <style jsx global>{`
            .custom-dialog-backdrop {
              position: fixed;
              inset: 0;
              background: rgba(15, 23, 42, 0.4);
              backdrop-filter: blur(8px);
              z-index: 10000;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 20px;
              animation: dialogFadeIn 0.2s ease-out forwards;
            }

            .custom-dialog-modal {
              background: #ffffff;
              border-radius: 16px;
              width: 100%;
              max-width: 440px;
              box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
              border: 1px solid var(--border-color, rgba(16, 24, 40, 0.08));
              overflow: hidden;
              display: flex;
              flex-direction: column;
              animation: dialogScaleUp 0.25s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
            }

            .custom-dialog-header {
              padding: 24px 24px 8px;
              display: flex;
              flex-direction: column;
              align-items: center;
              text-align: center;
              gap: 16px;
            }

            .custom-dialog-icon-wrapper {
              width: 48px;
              height: 48px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 4px 10px rgba(0,0,0,0.02);
            }

            .custom-dialog-icon-wrapper.normal {
              background: rgba(124, 58, 237, 0.08);
              color: var(--brand, #7C3AED);
            }

            .custom-dialog-icon-wrapper.danger {
              background: rgba(239, 68, 68, 0.08);
              color: var(--danger, #ef4444);
            }

            .custom-dialog-header h2 {
              font-family: var(--font-title, inherit);
              font-size: 20px;
              font-weight: 800;
              color: var(--navy, #062244);
              margin: 0;
            }

            .custom-dialog-body {
              padding: 8px 24px 24px;
              text-align: center;
            }

            .custom-dialog-body p {
              font-family: var(--font-body, inherit);
              font-size: 14px;
              line-height: 1.6;
              color: var(--muted, #64748b);
              margin: 0;
              white-space: pre-wrap;
            }

            .custom-dialog-footer {
              padding: 16px 24px 24px;
              display: flex;
              gap: 12px;
              justify-content: center;
              background: #fafafa;
              border-top: 1px solid var(--border-color, rgba(16, 24, 40, 0.08));
            }

            .dialog-btn {
              padding: 12px 20px;
              border-radius: 8px;
              font-family: var(--font-body, inherit);
              font-weight: 600;
              font-size: 14px;
              border: 0;
              cursor: pointer;
              transition: all 0.15s ease;
              flex: 1;
              text-align: center;
              outline: none;
            }

            .dialog-btn.primary {
              background: var(--brand, #7C3AED);
              color: white;
              box-shadow: 0 4px 10px rgba(124, 58, 237, 0.15);
            }

            .dialog-btn.primary:hover {
              background: var(--brand-hover, #6D28D9);
              transform: translateY(-1px);
              box-shadow: 0 6px 14px rgba(124, 58, 237, 0.2);
            }

            .dialog-btn.primary:focus-visible {
              box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.3);
            }

            .dialog-btn.secondary {
              background: white;
              color: var(--navy, #062244);
              border: 1px solid rgba(16, 24, 40, 0.12);
            }

            .dialog-btn.secondary:hover {
              background: #f1f5f9;
              border-color: rgba(16, 24, 40, 0.2);
            }

            .dialog-btn.secondary:focus-visible {
              box-shadow: 0 0 0 3px rgba(16, 24, 40, 0.1);
            }

            .dialog-btn.danger {
              background: var(--danger, #ef4444);
              color: white;
              box-shadow: 0 4px 10px rgba(239, 68, 68, 0.15);
            }

            .dialog-btn.danger:hover {
              background: #dc2626;
              transform: translateY(-1px);
              box-shadow: 0 6px 14px rgba(239, 68, 68, 0.2);
            }

            .dialog-btn.danger:focus-visible {
              box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.3);
            }

            @keyframes dialogFadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }

            @keyframes dialogScaleUp {
              from {
                transform: scale(0.9);
                opacity: 0;
              }
              to {
                transform: scale(1);
                opacity: 1;
              }
            }
          `}</style>
        </div>
      )}
    </DialogContext.Provider>
  );
}
