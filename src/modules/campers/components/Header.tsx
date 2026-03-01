import { useState } from "react";
import styles from "../styles/MainLayout.module.css";

interface HeaderProps {
    usuario: { nombre: string; rol: string; avatar?: string };
}

export default function Header({ usuario }: HeaderProps) {

    const [abierto, setAbierto] = useState(false);

    return (
        <header className={styles.header}>
            <div 
                className={styles.perfil_usuario}
                onClick={() => setAbierto(!abierto)}
            >
                {usuario.avatar ? (
                    <img 
                        src={usuario.avatar} 
                        className={styles.avatar_circulo} 
                        alt="User" 
                    />
                ) : (
                    <div className={styles.avatar_circulo}></div>
                )}

                <div className={styles.info_texto}>
                    <span className={styles.nombre_usuario}>
                        {usuario.nombre}
                    </span>
                    <span className={styles.rol_usuario}>
                        {usuario.rol}
                    </span>
                </div>

                <span className={styles.flecha}>⌄</span>
            </div>

            {abierto && (
                <div className={styles.dropdown_menu}>
                    <a href="#">Perfil</a>
                    <a href="#">Configuración</a>
                    <a href="#">Cerrar sesión</a>
                </div>
            )}
        </header>
    );
}