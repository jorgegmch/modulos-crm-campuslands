import { type ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import styles from "../styles/MainLayout.module.css";

export default function MainLayout({ children }: { children: ReactNode }) {
    const usuarioSimulado = { nombre: "Admin", rol: "Administrador" };

    return (
        <div className={styles.layout_principal}>
            <Sidebar />
            <div className={styles.contenedor_derecho}>
                <Header usuario={usuarioSimulado} />
                <main className={styles.main_content}>
                    {children}
                </main>
            </div>
        </div>
    );
}