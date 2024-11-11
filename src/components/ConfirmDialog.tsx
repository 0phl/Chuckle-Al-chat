import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

export const ConfirmDialog: React.FC<Props> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}) => {
  return (
    <Transition show={isOpen} as={React.Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />
        
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-modern-dark p-6 text-left align-middle shadow-modern-lg border border-gray-200 dark:border-modern-gray/20 transition-all">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-modern-warning/10 flex items-center justify-center">
                <ExclamationTriangleIcon className="h-6 w-6 text-modern-warning" />
              </div>
              <div>
                <Dialog.Title className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  {title}
                </Dialog.Title>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  {message}
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                className="inline-flex justify-center rounded-lg px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-modern-gray/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-modern-primary/50 transition-all duration-200"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="button"
                className="inline-flex justify-center rounded-lg px-4 py-2 text-sm font-medium text-white bg-gradient-modern hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-modern-primary/50 transition-all duration-200 shadow-modern"
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
              >
                Confirm
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
}; 