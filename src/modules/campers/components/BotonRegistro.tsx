import styles from "../styles/RegistroCampers.module.css";

interface Props {
    etiqueta_boton: string;
    deshabilitado?: boolean;
}

export default function BotonRegistro({ etiqueta_boton, deshabilitado }: Props) {
    return (
        <button
            type="submit"
            disabled={deshabilitado}
            className={styles.boton_registro}
        >
            {etiqueta_boton}
        </button>
    );
}