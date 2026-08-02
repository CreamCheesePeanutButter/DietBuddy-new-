import { useEffect, useState } from "react";
import api from "./api";

interface AxiosImageProps
    extends React.ImgHTMLAttributes<HTMLImageElement> {
    dishId: number;
}

export function AxiosImage({
    dishId,
    className,
    alt,
    ...props
}: AxiosImageProps) {
    const [src, setSrc] = useState("");

    useEffect(() => {
        let objectUrl: string;

        api.get(`/image/${dishId}`, {
            responseType: "blob",
        })
            .then((response) => {
                objectUrl = URL.createObjectURL(response.data);
                setSrc(objectUrl);
            })
            .catch(() => {
                setSrc("https://placehold.co/600x600");
            });

        return () => {
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
            }
        };
    }, [dishId]);

    return (
        <img
            src={src}
            alt={alt}
            className={className}
            {...props}
        />
    );
}