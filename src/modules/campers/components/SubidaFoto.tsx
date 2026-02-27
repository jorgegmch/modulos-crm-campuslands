import React, { useRef } from "react";
import styles from "../styles/RegistroCampers.module.css";

interface SubidaFotoProps {
    foto_actual?: string;
    manejar_cambio_foto: (foto_base64: string) => void;
}

export default function SubidaFoto({ foto_actual, manejar_cambio_foto }: SubidaFotoProps) {
    const input_referencia = useRef<HTMLInputElement>(null);

    const procesar_archivo = (evento: React.ChangeEvent<HTMLInputElement>) => {
        const archivo = evento.target.files?.[0];
        if (archivo) {
            const lector = new FileReader();
            lector.onloadend = () => {
                manejar_cambio_foto(lector.result as string);
            };
            lector.readAsDataURL(archivo);
        }
    };

    const disparar_input = () => {
        input_referencia.current?.click();
    };

    return (
        <div className={styles.contenedor_foto}>
            <div 
                className={styles.circulo_foto} 
                onClick={disparar_input}
                role="button"
                tabIndex={0}
                aria-label="Subir foto de perfil"
            >
                {foto_actual && (
                    <img src={foto_actual} alt="Vista previa" className={styles.imagen_preview} />
                )}
                <input
                    type="file"
                    accept="image/*"
                    ref={input_referencia}
                    className={styles.input_oculto}
                    onChange={procesar_archivo}
                />
            </div>
            {/* Movimos el texto afuera del círculo */}
            <span className={styles.texto_foto} onClick={disparar_input}>
                Editar Foto
            </span>
        </div>
    );
}