// Photo upload component with drag-and-drop, preview, and client-side compression
import { useState, useRef, useCallback } from 'react';

interface PhotoUploadProps {
  photos: string[];
  onPhotosChange: (photos: string[]) => void;
  maxPhotos?: number;
  maxWidth?: number;
  quality?: number;
}

// Compress and resize an image file to a data URL
function compressImage(
  file: File,
  maxWidth: number,
  quality: number
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let { width, height } = img;

        // Scale down if wider than maxWidth
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

export function PhotoUpload({
  photos,
  onPhotosChange,
  maxPhotos = 5,
  maxWidth = 800,
  quality = 0.8,
}: PhotoUploadProps) {
  const [dragOver, setDragOver] = useState(false);
  const [processing, setProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0) return;

      const remaining = maxPhotos - photos.length;
      if (remaining <= 0) return;

      setProcessing(true);
      const newPhotos: string[] = [];

      const filesToProcess = Array.from(files).slice(0, remaining);

      for (const file of filesToProcess) {
        // Only accept image files
        if (!file.type.startsWith('image/')) continue;

        try {
          const dataUrl = await compressImage(file, maxWidth, quality);
          newPhotos.push(dataUrl);
        } catch (err) {
          console.error('Failed to process image:', file.name, err);
        }
      }

      if (newPhotos.length > 0) {
        onPhotosChange([...photos, ...newPhotos]);
      }
      setProcessing(false);
    },
    [photos, onPhotosChange, maxPhotos, maxWidth, quality]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragOver(false);
  }, []);

  const removePhoto = (index: number) => {
    onPhotosChange(photos.filter((_, i) => i !== index));
  };

  return (
    <div>
      {/* Drop zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            fileInputRef.current?.click();
          }
        }}
        className={`
          relative cursor-pointer rounded-lg border-2 border-dashed p-6 text-center transition-colors
          ${dragOver
            ? 'border-primary bg-primary-light/20'
            : 'border-border hover:border-primary/50 hover:bg-bg-hover'
          }
          ${photos.length >= maxPhotos ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        aria-label={`Upload photos. ${photos.length} of ${maxPhotos} uploaded.`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="sr-only"
          onChange={(e) => {
            handleFiles(e.target.files);
            e.target.value = '';
          }}
          disabled={photos.length >= maxPhotos}
        />

        {processing ? (
          <div className="flex items-center justify-center gap-2 text-text-secondary">
            <span className="spinner-sm" />
            Processing image...
          </div>
        ) : (
          <>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto mb-2 text-text-muted" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            <p className="text-text-secondary text-sm">
              <span className="font-medium text-primary">Click to upload</span> or drag and drop
            </p>
            <p className="text-text-muted text-xs mt-1">
              JPG, PNG, WebP — max {maxPhotos} photos
            </p>
          </>
        )}
      </div>

      {/* Photo previews */}
      {photos.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mt-4">
          {photos.map((photo, index) => (
            <div key={index} className="relative group">
              <img
                src={photo}
                alt={`Upload ${index + 1}`}
                className="w-full h-24 object-cover rounded-lg border border-border"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removePhoto(index);
                }}
                className="absolute -top-2 -right-2 w-6 h-6 bg-danger text-white rounded-full flex items-center justify-center text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                aria-label={`Remove photo ${index + 1}`}
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
