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
            const imageUrl = URL.createObjectURL(file);
            manejar_cambio_foto(imageUrl);
        }
    };

    return (
        <div className={styles.contenedor_foto}>
            
            <div 
                className={styles.avatar_preview}
                onClick={abrirSelector}
            >
                {foto_actual ? (
                    <img src={foto_actual} alt="Avatar" />
                ) : (
                    <span></span>
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
                Editar Foto
            </span>
        </div>
    );
}