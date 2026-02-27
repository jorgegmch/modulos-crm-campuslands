// import React from "react";
import styles from "../styles/RegistroCampers.module.css";

interface BotonRegistroProps {
    etiqueta_boton: string;
    tipo_boton?: "button" | "submit";
    deshabilitado?: boolean;
}

export default function BotonRegistro({
    etiqueta_boton,
    tipo_boton = "submit",
    deshabilitado = false,
}: BotonRegistroProps) {
    return (
        <div className={styles.contenedor_boton}>
            <button
                type={tipo_boton}
                className={styles.boton_accion}
                disabled={deshabilitado}
                aria-label={etiqueta_boton}
            >
                {etiqueta_boton}
            </button>
        </div>
    );
}