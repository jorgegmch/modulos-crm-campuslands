import { useState } from "react";
import styles from "../styles/RegistroCampers.module.css";
import type { Camper } from "../types/campers_types";
import InputCampo from "../components/InputCampo";
import SelectorCampo from "../components/SelectorCampo";
import SubidaFoto from "../components/SubidaFoto";
import BotonRegistro from "../components/BotonRegistro";

export default function RegistroCampersPage() {
    const estadoInicial: Camper = {
        nombre_completo: "",
        direccion_residencia: "",
        telefono: "",
        correo_electronico: "",
        jornada_interes: "",
        estado: "",
        observaciones: "",
        foto_perfil: "",
    };

    const [formulario, setFormulario] = useState<Camper>(estadoInicial);
    const [procesando, setProcesando] = useState(false);

    const actualizar = (campo: keyof Camper, valor: string) => {
        setFormulario(prev => ({ ...prev, [campo]: valor }));
    };

    const enviar = async (e: React.FormEvent) => {
        e.preventDefault();
        setProcesando(true);
        setTimeout(() => {
            console.log("Datos:", formulario);
            alert("¡Registro exitoso!");
            setProcesando(false);
            setFormulario(estadoInicial);
        }, 1000);
    };

    return (
        <div className={styles.wrapper_registro}> {/* Contenedor para controlar el título y la tarjeta */}
            <h1 className={styles.titulo_formulario}>Registro de Campers</h1>
            <div className={styles.tarjeta_formulario}>
                <form onSubmit={enviar} className={styles.grid_formulario}>
                    <SubidaFoto 
                        foto_actual={formulario.foto_perfil} 
                        manejar_cambio_foto={(foto) => actualizar("foto_perfil", foto)} 
                    />
                    
                    <InputCampo id_campo="nom" etiqueta_campo="Nombre" valor_input={formulario.nombre_completo} manejar_cambio={(v) => actualizar("nombre_completo", v)} />
                    <InputCampo id_campo="dir" etiqueta_campo="Dirección" valor_input={formulario.direccion_residencia} manejar_cambio={(v) => actualizar("direccion_residencia", v)} />
                    <InputCampo id_campo="tel" etiqueta_campo="Teléfono" valor_input={formulario.telefono} manejar_cambio={(v) => actualizar("telefono", v)} />
                    <InputCampo id_campo="mail" etiqueta_campo="Correo" tipo_input="email" valor_input={formulario.correo_electronico} manejar_cambio={(v) => actualizar("correo_electronico", v)} />

                    <SelectorCampo 
                        id_campo="jor" 
                        etiqueta_campo="Jornada" 
                        valor_seleccionado={formulario.jornada_interes}
                        opciones_disponibles={[
                            {valor_opcion: "manana", etiqueta_opcion: "Mañana"},
                            {valor_opcion: "tarde", etiqueta_opcion: "Tarde"}
                        ]}
                        manejar_cambio={(v) => actualizar("jornada_interes", v)} 
                    />

                    <SelectorCampo 
                        id_campo="estado" 
                        etiqueta_campo="Estado" 
                        valor_seleccionado={formulario.estado}
                        opciones_disponibles={[
                            {valor_opcion: "activo", etiqueta_opcion: "Activo"},
                            {valor_opcion: "inactivo", etiqueta_opcion: "Inactivo"},
                            {valor_opcion: "en_proceso", etiqueta_opcion: "En Proceso"}
                        ]}
                        manejar_cambio={(v) => actualizar("estado", v)} 
                    />

                    <div className={styles.columna_completa}>
                        <InputCampo id_campo="obs" etiqueta_campo="Observaciones" es_multilinea valor_input={formulario.observaciones} manejar_cambio={(v) => actualizar("observaciones", v)} />
                    </div>

                    <BotonRegistro etiqueta_boton={procesando ? "Guardando..." : "Completar Registro"} deshabilitado={procesando} />
                </form>
            </div>
        </div>
    );
}