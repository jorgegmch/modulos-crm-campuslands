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
            // Scrum Master Note: Convertimos a Base64 para que el JSON sea portable
            const lector = new FileReader();
            lector.onloadend = () => {
                const base64 = lector.result as string;
                manejar_cambio_foto(base64);
            };
            lector.readAsDataURL(file);
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