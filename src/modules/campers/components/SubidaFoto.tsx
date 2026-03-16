"use client";
import { useRef } from "react";
import styles from "../styles/RegistroCampers.module.css";

interface Props {
    foto_actual: string;
    manejar_cambio_foto: (foto: string) => void;
}

export default function SubidaFoto({ foto_actual, manejar_cambio_foto }: Props) {
    const inputRef = useRef<HTMLInputElement>(null);

    const abrirSelector = () => {
        inputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        const lector = new FileReader();
        lector.readAsDataURL(file);
        
        lector.onload = (event) => {
            const img = new Image();
            img.src = event.target?.result as string;

            img.onload = () => {
                // 1. Creamos un canvas para redimensionar
                const canvas = document.createElement("canvas");
                const MAX_WIDTH = 400; // Tamaño máximo de ancho
                const MAX_HEIGHT = 400; // Tamaño máximo de alto
                let width = img.width;
                let height = img.height;

                // 2. Calculamos las nuevas proporciones
                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }

                canvas.width = width;
                canvas.height = height;

                // 3. Dibujamos la imagen optimizada
                const ctx = canvas.getContext("2d");
                ctx?.drawImage(img, 0, 0, width, height);

                // 4. Convertimos a Base64 con calidad reducida (0.7 es excelente balance)
                // Usamos image/jpeg porque el base64 es mucho más corto que en PNG
                const base64Optimizado = canvas.toDataURL("image/jpeg", 0.7);
                
                manejar_cambio_foto(base64Optimizado);
            };
        };
    }
};

    return (
        <div className={styles.contenedor_foto}>
            <div 
                className={styles.avatar_preview}
                onClick={abrirSelector}
            >
                {foto_actual ? (
                    <img 
                        src={foto_actual} 
                        alt="Vista previa" 
                        onError={(e) => {
                            e.currentTarget.src = "https://via.placeholder.com/150";
                            console.error("Error cargando imagen.");
                        }}
                    />
                ) : (
                    <span className={styles.placeholder_texto}>Sin Foto</span>
                )}
            </div>

            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
            />

            <span 
                className={styles.editar_foto}
                onClick={abrirSelector}
            >
                {foto_actual ? "Cambiar Foto" : "Subir Foto"}
            </span>
        </div>
    );
}