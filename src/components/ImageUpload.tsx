
import React, { useState, useRef } from 'react';
import { XIcon, ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const MAX_FILE_SIZE_MB = 5;

interface ImageUploadProps {
  onImageSelected: (file: File) => void;
  onImageRemoved?: () => void;
  className?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ 
  onImageSelected, 
  onImageRemoved,
  className 
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const isFileSizeValid = (file: File) => {
    return file.size / (1024 * 1024) <= MAX_FILE_SIZE_MB;
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
        if (!isFileSizeValid(file)) {
            alert(`File size must be less than ${MAX_FILE_SIZE_MB}MB`);
            return;
          }
      onImageSelected(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleRemoveImage = () => {
    setPreview(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    onImageRemoved?.();
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
        if (!isFileSizeValid(file)) {
            alert(`File size must be less than ${MAX_FILE_SIZE_MB}MB`);
            return;
          }
      onImageSelected(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={cn("w-full", className)}>
      {!preview ? (
        <div 
          className={cn(
            "relative border-2 border-dashed rounded-xl p-6",
            "flex flex-col items-center justify-center text-center",
            "bg-secondary/50 hover:bg-secondary transition-colors",
            isDragging ? "border-primary bg-primary/5" : "border-border",
            "cursor-pointer"
          )}
          onClick={() => inputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <ImageIcon className="h-10 w-10 text-muted-foreground mb-2" />
          <div className="space-y-1">
            <p className="text-sm font-medium">Drag & drop an image or click to browse</p>
            <p className="text-xs text-muted-foreground">
              JPG, PNG or GIF (max. 5MB)
            </p>
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      ) : (
        <div className="relative rounded-xl overflow-hidden">
          <img 
            src={preview} 
            alt="Preview" 
            className="w-full h-48 object-cover rounded-xl"
          />
          <button
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 p-1 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors press-effect"
            aria-label="Remove image"
          >
            <XIcon className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
