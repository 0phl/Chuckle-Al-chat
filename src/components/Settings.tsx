import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ChatSettings } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  settings: ChatSettings;
  onUpdateSettings: (settings: Partial<ChatSettings>) => void;
}

export const Settings: React.FC<Props> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
}) => {
  return (
    <Transition show={isOpen} as={React.Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded-2xl bg-white dark:bg-modern-dark p-6 shadow-modern-lg border border-gray-200 dark:border-modern-gray/20">
            <Dialog.Title className="text-xl font-bold bg-gradient-modern text-transparent bg-clip-text mb-6">
              Settings
            </Dialog.Title>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-modern-gray dark:text-gray-300">AI Tone</label>
                <select
                  value={settings.tone}
                  onChange={(e) => onUpdateSettings({ tone: e.target.value as ChatSettings['tone'] })}
                  className="w-full p-3 rounded-lg border border-gray-200 dark:border-modern-gray/20 bg-white dark:bg-modern-dark text-modern-gray dark:text-gray-300 focus:border-modern-primary focus:ring-1 focus:ring-modern-primary"
                >
                  <option value="formal">Formal</option>
                  <option value="friendly">Friendly</option>
                  <option value="humorous">Humorous</option>
                  <option value="informative">Informative</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-modern-gray dark:text-gray-300">Font Size</label>
                <div className="grid grid-cols-3 gap-3">
                  {['small', 'medium', 'large'].map((size) => (
                    <button
                      key={size}
                      onClick={() => onUpdateSettings({ fontSize: size as ChatSettings['fontSize'] })}
                      className={`p-3 rounded-lg border transition-all ${
                        settings.fontSize === size
                          ? 'border-modern-primary bg-modern-primary/10 text-modern-primary'
                          : 'border-gray-200 dark:border-modern-gray/20 text-modern-gray dark:text-gray-300 hover:border-modern-primary/50'
                      }`}
                    >
                      {size.charAt(0).toUpperCase() + size.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="mt-6 w-full p-3 rounded-lg bg-gradient-modern text-white hover:opacity-90 transition-all shadow-modern"
            >
              Close
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
};