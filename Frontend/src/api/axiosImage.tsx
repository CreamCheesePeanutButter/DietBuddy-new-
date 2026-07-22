import React, { useState, useEffect } from "react";
import api from "./api"; // Uses your configured Axios instance

interface AxiosImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  dishId: number;
}

export function AxiosImage({
  dishId,
  className,
  alt,
  ...props
}: AxiosImageProps) {
  const [src, setSrc] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let objectUrl = "";

    const fetchImage = async () => {
      try {
        // Points exactly to your [Route("api/[controller]")] -> api/image/{id}
        const response = await api.get(`/image/${dishId}`, {
          responseType: "blob", // Critical: prevents Axios from corrupting image bytes
        });

        objectUrl = URL.createObjectURL(response.data);
        setSrc(objectUrl);
      } catch (error) {
        console.error(`Failed to load image for dish ID ${dishId}:`, error);
        // Fallback placeholder formatting using placehold.co rules
        setSrc("https://placehold.co");
      } finally {
        setLoading(false);
      }
    };

    fetchImage();

    // Memory Cleanup: Frees the browser memory reference when card unmounts
    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [dishId]);

  if (loading) {
    // Beautiful Tailwind skeleton loader matching your original layout intent
    return (
      <div
        className={`${className} bg-gray-200 animate-pulse rounded-lg flex items-center justify-center text-xs text-gray-400`}
      >
        Loading Image...
      </div>
    );
  }

  return <img src={src} alt={alt} className={className} {...props} />;
}
