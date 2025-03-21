
import React from 'react';
import { cn } from '@/lib/utils';
import { MapIcon } from 'lucide-react';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 h-16 z-20 glass-morphism flex items-center justify-between px-4 sm:px-6",
      className
    )}>
      <div className="flex items-center space-x-2">
        <MapIcon className="h-5 w-5 text-primary" strokeWidth={2.5} />
        <h1 className="text-lg font-semibold tracking-tight">Roads Untravelled</h1>
      </div>
    </header>
  );
};

export default Header;
