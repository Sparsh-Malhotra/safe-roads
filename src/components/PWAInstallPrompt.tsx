import React, { useEffect, useState } from 'react';
import { Download, X } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const PWAInstallPrompt = () => {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Store the event for later use
      setInstallPrompt(e as BeforeInstallPromptEvent);
      // Show our install prompt
      setIsVisible(true);
    };

    // Check if the app is already installed
    const isAppInstalled = window.matchMedia('(display-mode: standalone)').matches;
    
    if (!isAppInstalled) {
      // Add the event listener
      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) return;
    
    // Show the install prompt
    await installPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const choiceResult = await installPrompt.userChoice;
    
    // User accepted the install
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
    
    // We no longer need the prompt, clear it
    setInstallPrompt(null);
    setIsVisible(false);
  };

  const handleDismiss = () => {
    setIsVisible(false);
    // Store in localStorage to avoid showing it too frequently
    localStorage.setItem('pwaPromptDismissed', Date.now().toString());
  };

  if (!isVisible) return null;

  return (
    <div 
      className={cn(
        "fixed bottom-20 left-4 right-4 sm:left-auto sm:right-6 sm:w-80 z-50",
        "bg-white rounded-lg shadow-lg border border-gray-200 p-4 animate-slide-up"
      )}
    >
      <button 
        onClick={handleDismiss}
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-500"
        aria-label="Dismiss"
      >
        <X size={18} />
      </button>

      <div className="flex items-start">
        <div className="flex-shrink-0 bg-primary/10 rounded-full p-2 mr-3">
          <Download size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="font-medium text-gray-900">Install Safe Roads</h3>
          <p className="text-sm text-gray-500 mt-1 mb-3">
            Install this app on your device for offline access and a better experience.
          </p>
          <Button 
            onClick={handleInstallClick}
            className="w-full bg-safety text-safety-foreground"
            size="sm"
          >
            Install App
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PWAInstallPrompt;