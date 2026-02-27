// import React from "react"; 
import styles from "../styles/RegistroCampers.module.css";

interface InputCampoProps {
    id_campo: string;
    etiqueta_campo: string;
    tipo_input?: "text" | "email" | "tel";
    valor_input: string;
    marcador_posicion?: string;
    es_multilinea?: boolean;
    manejar_cambio: (valor: string) => void;
}

export default function InputCampo({
    id_campo,
    etiqueta_campo,
    tipo_input = "text",
    valor_input,
    marcador_posicion = "",
    es_multilinea = false,
    manejar_cambio,
}: InputCampoProps) {
    return (
        <div className={styles.grupo_campo}>
            <label htmlFor={id_campo} className={styles.etiqueta_campo}>
                {etiqueta_campo}
            </label>
            {es_multilinea ? (
                <textarea
                    id={id_campo}
                    className={styles.textarea_campo}
                    value={valor_input}
                    placeholder={marcador_posicion}
                    onChange={(e) => manejar_cambio(e.target.value)}
                    aria-label={etiqueta_campo}
                />
            ) : (
                <input
                    type={tipo_input}
                    id={id_campo}
                    className={styles.input_campo}
                    value={valor_input}
                    placeholder={marcador_posicion}
                    onChange={(e) => manejar_cambio(e.target.value)}
                    aria-label={etiqueta_campo}
                />
            )}
        </div>
    );
}