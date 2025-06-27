
import React, { useState, useRef } from 'react';
import { Camera, Upload, X, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface DocumentScannerProps {
  isOpen: boolean;
  onClose: () => void;
  onDocumentCaptured: (file: File) => void;
}

const DocumentScanner: React.FC<DocumentScannerProps> = ({
  isOpen,
  onClose,
  onDocumentCaptured
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startCamera = async () => {
    try {
      setIsScanning(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      setIsScanning(false);
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext('2d');
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      context?.drawImage(video, 0, 0);
      
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], 'scanned-document.jpg', { type: 'image/jpeg' });
          onDocumentCaptured(file);
          setCapturedImage(canvas.toDataURL());
          stopCamera();
        }
      });
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
    }
    setIsScanning(false);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onDocumentCaptured(file);
      onClose();
    }
  };

  const resetScanner = () => {
    setCapturedImage(null);
    stopCamera();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl glass-strong border-white/40 dark:border-slate-700/50">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Document Scanner
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {!isScanning && !capturedImage && (
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={startCamera}
                className="flex-1 h-32 flex flex-col gap-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-0 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Camera className="h-8 w-8" />
                <span className="font-semibold">Scan Document</span>
              </Button>
              
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 h-32 flex flex-col gap-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Upload className="h-8 w-8" />
                <span className="font-semibold">Upload Document</span>
              </Button>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          )}

          {isScanning && (
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl bg-black">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-96 object-cover"
                />
                
                {/* Scanner Overlay */}
                <div className="absolute inset-0 pointer-events-none">
                  {/* Corner brackets */}
                  <div className="absolute top-8 left-8 w-8 h-8 border-l-4 border-t-4 border-white rounded-tl-lg animate-pulse"></div>
                  <div className="absolute top-8 right-8 w-8 h-8 border-r-4 border-t-4 border-white rounded-tr-lg animate-pulse"></div>
                  <div className="absolute bottom-8 left-8 w-8 h-8 border-l-4 border-b-4 border-white rounded-bl-lg animate-pulse"></div>
                  <div className="absolute bottom-8 right-8 w-8 h-8 border-r-4 border-b-4 border-white rounded-br-lg animate-pulse"></div>
                  
                  {/* Scanning line */}
                  <div className="absolute top-1/2 left-8 right-8 h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent animate-pulse"></div>
                  
                  {/* Instructions */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm font-medium bg-black/50 px-4 py-2 rounded-lg backdrop-blur-sm">
                    Position document within the frame
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center gap-4 mt-6">
                <Button
                  onClick={captureImage}
                  className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-0 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <Camera className="h-5 w-5 mr-2" />
                  Capture
                </Button>
                
                <Button
                  onClick={resetScanner}
                  variant="outline"
                  className="px-8 py-3 backdrop-blur-sm bg-white/20 dark:bg-slate-800/20 border-white/30 dark:border-slate-700/50 hover:bg-white/30 dark:hover:bg-slate-800/30 rounded-xl"
                >
                  <X className="h-5 w-5 mr-2" />
                  Cancel
                </Button>
              </div>
            </div>
          )}

          <canvas ref={canvasRef} className="hidden" />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentScanner;
