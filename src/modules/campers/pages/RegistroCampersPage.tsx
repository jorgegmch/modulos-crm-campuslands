import { useState } from "react";
import styles from "../styles/RegistroCampers.module.css";
import type { Campers } from "../types/campers_types";

// Componentes modulares
import InputCampo from "../components/InputCampo";
import SelectorCampo from "../components/SelectorCampo";
import SubidaFoto from "../components/SubidaFoto";
import BotonRegistro from "../components/BotonRegistro";

export default function RegistroCampersPage() {
    const estado_inicial: Campers = {
        nombre_completo: "",
        direccion_residencia: "",
        telefono_campers: "",
        correo_electronico: "",
        jornada_interes: "",
        estado_campers: "",
        observaciones_campers: "",
        foto_perfil: "",
    };

    const [estado_formulario, set_estado_formulario] = useState<Campers>(estado_inicial);
    const [esta_procesando, set_esta_procesando] = useState<boolean>(false);

    // ESTADOS PARA LOS DESPLEGABLES DEL SIDEBAR
    const [menuCampersAbierto, setMenuCampersAbierto] = useState(true); 
    const [menuContratosAbierto, setMenuContratosAbierto] = useState(false);

    const actualizar_campo = (clave_campo: keyof Campers, valor: string) => {
        set_estado_formulario((previo) => ({
            ...previo,
            [clave_campo]: valor,
        }));
    };

    const manejar_envio = async (evento: React.FormEvent) => {
        evento.preventDefault();
        set_esta_procesando(true);
        try {
            console.log("Datos listos:", estado_formulario);
            await new Promise(resolve => setTimeout(resolve, 1000));
            alert("Registro completado exitosamente.");
            set_estado_formulario(estado_inicial);
        } catch (error) {
            console.error("Error:", error);
        } finally {
            set_esta_procesando(false);
        }
    };

    return (
        <div className={styles.layout_principal}>
            {/* --- SIDEBAR CORREGIDO --- */}
            <aside className={styles.sidebar_simulada}>
                <div className={styles.contenedor_logo}>
                    <span className={styles.logo_texto}>Campus</span>
                    <span className={styles.logo_resaltado}>Lands</span>
                </div>

                <nav className={styles.menu_navegacion}>
                    <div className={styles.item_menu}><span>📊</span> Dashboard</div>
                    
                    {/* DESPLEGABLE CAMPERS */}
                    <div 
                        className={styles.item_menu_desplegable} 
                        onClick={() => setMenuCampersAbierto(!menuCampersAbierto)}
                    >
                        <div className={styles.item_menu_info}><span>🎓</span> Campers</div>
                        <span className={`${styles.flecha} ${menuCampersAbierto ? styles.flecha_arriba : ''}`}>▼</span>
                    </div>
                    
                    {menuCampersAbierto && (
                        <div className={styles.contenedor_sub_items}>
                            <div className={`${styles.sub_item} ${styles.sub_item_activo}`}>
                                <span>🆔</span> Registro
                            </div>
                            <div className={styles.sub_item}>
                                <span>🔍</span> Consultar
                            </div>
                        </div>
                    )}

                    {/* DESPLEGABLE CONTRATOS (VACÍO POR AHORA) */}
                    <div 
                        className={styles.item_menu_desplegable}
                        onClick={() => setMenuContratosAbierto(!menuContratosAbierto)}
                    >
                        <div className={styles.item_menu_info}><span>📝</span> Contratos</div>
                        <span className={`${styles.flecha} ${menuContratosAbierto ? styles.flecha_arriba : ''}`}>▼</span>
                    </div>

                    <div className={styles.item_menu}><span>🧾</span> Facturacion</div>
                    <div className={styles.item_menu}><span>💰</span> Recaudo</div>
                </nav>

                <div className={styles.boton_cerrar_sesion}>
                    <span>🚪</span> Cerrar Sesion
                </div>
            </aside>

            {/* --- CONTENEDOR DERECHO (ESTRUCTURA PROTEGIDA) --- */}
            <div className={styles.contenedor_derecho}>
                <header className={styles.header_simulado}>
                    <div className={styles.perfil_usuario}>
                        <div className={styles.info_texto}>
                            <span className={styles.nombre_usuario}>Admin</span>
                            <span className={styles.rol_usuario}>Administrador</span>
                        </div>
                        <div className={styles.avatar_circulo}></div>
                    </div>
                </header>

                <main className={styles.area_contenido}>
                    <div className={styles.tarjeta_formulario}>
                        <h1 className={styles.titulo_formulario}>Registro de Campers</h1>

                        <form onSubmit={manejar_envio} className={styles.grid_formulario}>
                            <SubidaFoto
                                foto_actual={estado_formulario.foto_perfil}
                                manejar_cambio_foto={(foto) => actualizar_campo("foto_perfil", foto)}
                            />

                            <InputCampo
                                id_campo="input_nombre_completo"
                                etiqueta_campo="Nombre Completo"
                                valor_input={estado_formulario.nombre_completo}
                                manejar_cambio={(v) => actualizar_campo("nombre_completo", v)}
                            />
                            <InputCampo
                                id_campo="input_direccion_residencia"
                                etiqueta_campo="Dirección residencia"
                                valor_input={estado_formulario.direccion_residencia}
                                manejar_cambio={(v) => actualizar_campo("direccion_residencia", v)}
                            />

                            <InputCampo
                                id_campo="input_telefono"
                                etiqueta_campo="Teléfono"
                                tipo_input="tel"
                                valor_input={estado_formulario.telefono_campers}
                                manejar_cambio={(v) => actualizar_campo("telefono_campers", v)}
                            />
                            <InputCampo
                                id_campo="input_correo"
                                etiqueta_campo="Correo"
                                tipo_input="email"
                                valor_input={estado_formulario.correo_electronico}
                                manejar_cambio={(v) => actualizar_campo("correo_electronico", v)}
                            />

                            <SelectorCampo
                                id_campo="selector_jornada"
                                etiqueta_campo="Jornada Interés"
                                valor_seleccionado={estado_formulario.jornada_interes}
                                opciones_disponibles={[
                                    { valor_opcion: "manana", etiqueta_opcion: "Mañana" },
                                    { valor_opcion: "tarde", etiqueta_opcion: "Tarde" },
                                    { valor_opcion: "noche", etiqueta_opcion: "Noche" },
                                ]}
                                manejar_cambio={(v) => actualizar_campo("jornada_interes", v)}
                            />
                            <SelectorCampo
                                id_campo="selector_estado"
                                etiqueta_campo="Estado"
                                valor_seleccionado={estado_formulario.estado_campers}
                                opciones_disponibles={[
                                    { valor_opcion: "activo", etiqueta_opcion: "Activo" },
                                    { valor_opcion: "inactivo", etiqueta_opcion: "Inactivo" },
                                    { valor_opcion: "en_proceso", etiqueta_opcion: "En Proceso" },
                                ]}
                                manejar_cambio={(v) => actualizar_campo("estado_campers", v)}
                            />

                            <div className={styles.columna_completa}>
                                <InputCampo
                                    id_campo="input_observaciones"
                                    etiqueta_campo="Observaciones"
                                    valor_input={estado_formulario.observaciones_campers}
                                    es_multilinea={true}
                                    manejar_cambio={(v) => actualizar_campo("observaciones_campers", v)}
                                />
                            </div>

                            <div className={styles.contenedor_boton}>
                                <BotonRegistro 
                                    etiqueta_boton={esta_procesando ? "Guardando..." : "Completar Registro"} 
                                />
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    );
}