// import React from "react";
import styles from "../styles/RegistroCampers.module.css";

interface OpcionSelector {
    valor_opcion: string;
    etiqueta_opcion: string;
}

interface SelectorCampoProps {
    id_campo: string;
    etiqueta_campo: string;
    valor_seleccionado: string;
    opciones_disponibles: OpcionSelector[];
    manejar_cambio: (valor: string) => void;
}

export default function SelectorCampo({
    id_campo,
    etiqueta_campo,
    valor_seleccionado,
    opciones_disponibles,
    manejar_cambio,
}: SelectorCampoProps) {
    return (
        <div className={styles.grupo_campo}>
            <label htmlFor={id_campo} className={styles.etiqueta_campo}>
                {etiqueta_campo}
            </label>
            <select
                id={id_campo}
                className={styles.selector_campo}
                value={valor_seleccionado}
                onChange={(e) => manejar_cambio(e.target.value)}
                aria-label={etiqueta_campo}
            >
                <option value="" disabled>
                    Seleccione una opción
                </option>
                {opciones_disponibles.map((opcion) => (
                    <option key={opcion.valor_opcion} value={opcion.valor_opcion}>
                        {opcion.etiqueta_opcion}
                    </option>
                ))}
            </select>
        </div>
    );
}