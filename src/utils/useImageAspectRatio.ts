import { useEffect, useState } from "react";
import { Image as RNImage } from "react-native";

const aspectRatioCache: Record<string, number> = {};

export function useImageAspectRatio(uri: string | undefined): number | null {
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);

  useEffect(() => {
    if (!uri) return;

    if (aspectRatioCache[uri]) {
      setAspectRatio(aspectRatioCache[uri]);
      return;
    }

    RNImage.getSize(
      uri,
      (width, height) => {
        const ratio = width / height;
        aspectRatioCache[uri] = ratio;
        setAspectRatio(ratio);
      },
      (error) => {
        console.warn("Failed to get image size:", error);
        setAspectRatio(null);
      }
    );
  }, [uri]);

  return aspectRatio;
}
