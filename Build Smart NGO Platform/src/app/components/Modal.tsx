import React, { ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-background-dark/90 border border-white/10 p-6 rounded-2xl shadow-[0_0_40px_rgba(124,92,255,0.15)] w-full max-w-2xl backdrop-blur-xl relative pointer-events-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">{title}</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/70 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
                {children}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
