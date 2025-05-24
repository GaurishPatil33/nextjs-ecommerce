import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useRef } from "react";

interface ConfirmBoxProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  cancelText?: string;
  confirmText?: string;
  variant?: "danger" | "success" | "warning";
}

const variantStyles = {
  danger: {
    button: "bg-red-600 hover:bg-red-700 text-white",
    icon: "❌",
  },
  success: {
    button: "bg-green-600 hover:bg-green-700 text-white",
    icon: "✅",
  },
  warning: {
    button: "bg-yellow-500 hover:bg-yellow-600 text-white",
    icon: "⚠️",
  },
};

const Confirmationbox: React.FC<ConfirmBoxProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = "",
  message = "",
  cancelText = "CANCEL",
  confirmText = "CONFIRM",
  variant = "danger",
}) => {
  const winRef = useRef<HTMLDivElement>(null);
  const { button, icon } = variantStyles[variant];

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.addEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={winRef}
            className="fixed inset-0 z-50 bg-black/50  flex justify-center items-center "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              drag
              dragConstraints={winRef}
              className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center  gap-2 mb-2">
                <span className="text-xl">{icon}</span>
                <h2 className="text-lg font-semibold mb-2">{title}</h2>
              </div>
              <p className="text-sm text-gray-600 mb-6">{message}</p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded border text-gray-700 hover:bg-gray-200"
                >
                  {cancelText}
                </button>
                <button
                  onClick={onConfirm}
                  className={clsx("px-4 py-2 rounded", button)}
                >
                  {confirmText}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Confirmationbox;
