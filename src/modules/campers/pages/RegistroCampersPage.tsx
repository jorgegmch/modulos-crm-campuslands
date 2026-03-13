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
        
        try {
            const respuesta = await fetch("http://localhost:4000/campers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formulario),
            });

            if (respuesta.ok) {
                alert("¡Camper registrado exitosamente en la base de datos!");
                setFormulario(estadoInicial); // Limpia el formulario para el siguiente registro
            } else {
                throw new Error("Error en el servidor");
            }
        } catch (error) {
            console.error("Error conectando con la BD:", error);
            alert("No se pudo conectar con la base de datos. ¿Está encendido el servidor?");
        } finally {
            setProcesando(false);
        }
    };

    return (
        <div className={styles.wrapper_registro}>
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
                            {valor_opcion: "tarde", etiqueta_opcion: "Tarde"},
                            {valor_opcion: "noche", etiqueta_opcion: "Noche"}
                        ]}
                        manejar_cambio={(v) => actualizar("jornada_interes", v)} 
                    />

                    <SelectorCampo 
                        id_campo="estado" 
                        etiqueta_campo="Estado" 
                        valor_seleccionado={formulario.estado}
                        opciones_disponibles={[
                            {valor_opcion: "registrado", etiqueta_opcion: "Registrado"},
                            {valor_opcion: "preseleccionado", etiqueta_opcion: "Pre-seleccionado"},
                            {valor_opcion: "admitido", etiqueta_opcion: "Admitido"},
                            {valor_opcion: "rechazado", etiqueta_opcion: "Rechazado"},
                            {valor_opcion: "agendado", etiqueta_opcion: "Agendado"},
                            {valor_opcion: "activo", etiqueta_opcion: "Activo"}
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