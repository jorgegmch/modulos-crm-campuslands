import styles from "../styles/RegistroCampers.module.css";

interface Props {
    id_campo: string;
    etiqueta_campo: string;
    valor_input: string;
    manejar_cambio: (valor: string) => void;
    tipo_input?: string;
    es_multilinea?: boolean;
}

export default function InputCampo({
    id_campo,
    etiqueta_campo,
    valor_input,
    manejar_cambio,
    tipo_input = "text",
    es_multilinea = false
}: Props) {

    return (
        <div className={styles.campo}>
            <label htmlFor={id_campo} className={styles.label}>
                {etiqueta_campo}
            </label>

            {es_multilinea ? (
                <textarea
                    id={id_campo}
                    className={styles.textarea_estilizado}
                    value={valor_input}
                    onChange={(e) => manejar_cambio(e.target.value)}
                />
            ) : (
                <input
                    id={id_campo}
                    type={tipo_input}
                    className={styles.input_estilizado}
                    value={valor_input}
                    onChange={(e) => manejar_cambio(e.target.value)}
                />
            )}
        </div>
    );
}