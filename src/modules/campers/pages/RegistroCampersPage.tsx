import { useState, useEffect } from "react";
import styles from "../styles/RegistroCampers.module.css";
import InputCampo from "../components/InputCampo";
import SelectorCampo from "../components/SelectorCampo";
import SubidaFoto from "../components/SubidaFoto";
import BotonRegistro from "../components/BotonRegistro";

type RolUsuario = "admin" | "master" | "comercial";

export default function RegistroCampersPage() {
    // SIMULACIÓN DE LOGIN
    const rolUsuarioActual: RolUsuario = "comercial"; 
    const nombreUsuarioActual = "Victor Guzman"; 

    const estadoInicial = {
        nombre_completo: "",
        direccion_residencia: "",
        telefono: "",
        correo_electronico: "",
        jornada_interes: "",
        estado: "",
        observaciones: "", 
        foto_perfil: "",
        comercial_asignado: "", 
    };

    const [formulario, setFormulario] = useState(estadoInicial);
    const [procesando, setProcesando] = useState(false);
    const [comercialesDisponibles, setComercialesDisponibles] = useState<{valor_opcion: string, etiqueta_opcion: string}[]>([]);

    useEffect(() => {
        if (rolUsuarioActual === "admin" || rolUsuarioActual === "master") {
            const cargarComerciales = async () => {
                try {
                    const respuesta = await fetch("http://localhost:4000/comerciales");
                    if (!respuesta.ok) throw new Error("No se pudieron cargar los comerciales");
                    
                    const datos = await respuesta.json();
                    const opcionesFormateadas = datos.map((c: any) => ({
                        valor_opcion: c.nombre,
                        etiqueta_opcion: c.nombre
                    }));

                    setComercialesDisponibles(opcionesFormateadas);
                } catch (error) {
                    console.error("Error cargando comerciales:", error);
                }
            };
            cargarComerciales();
        }
    }, [rolUsuarioActual]);

    const actualizar = (campo: string, valor: string) => {
        setFormulario(prev => ({ ...prev, [campo]: valor }));
    };

    const enviar = async (e: React.FormEvent) => {
        e.preventDefault();
        setProcesando(true);
        
        try {
            const { observaciones, ...restoDatos } = formulario;

            // LÓGICA DE ASIGNACIÓN AUTOMÁTICA
            const comercialFinal = rolUsuarioActual === "comercial" 
                ? nombreUsuarioActual 
                : formulario.comercial_asignado;

            const leadAEnviar = {
                ...restoDatos,
                comercial_asignado: comercialFinal,
                historial_observaciones: [
                    {
                        id_evento: crypto.randomUUID(),
                        fecha: new Date().toISOString(),
                        autor: nombreUsuarioActual,
                        texto: observaciones
                    }
                ]
            };

            const respuesta = await fetch("http://localhost:4000/campers", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(leadAEnviar),
            });

            if (respuesta.ok) {
                alert(`¡Registro exitoso! Asignado a: ${comercialFinal}`);
                setFormulario(estadoInicial);
            } else {
                throw new Error("Error en el servidor");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error al conectar con la base de datos. Verifica que json-server esté corriendo.");
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
                            {valor_opcion: "admitido", etiqueta_opcion: "Admitido"}
                        ]}
                        manejar_cambio={(v) => actualizar("estado", v)} 
                    />

                    {(rolUsuarioActual === "admin" || rolUsuarioActual === "master") && (
                        <div className={styles.columna_completa}>
                            <SelectorCampo 
                                id_campo="asignacion" 
                                etiqueta_campo="Asignar a un Comercial (Obligatorio)" 
                                valor_seleccionado={formulario.comercial_asignado}
                                opciones_disponibles={comercialesDisponibles}
                                manejar_cambio={(v) => actualizar("comercial_asignado", v)} 
                            />
                        </div>
                    )}

                    <div className={styles.columna_completa}>
                        <InputCampo id_campo="obs" etiqueta_campo="Observación" es_multilinea valor_input={formulario.observaciones} manejar_cambio={(v) => actualizar("observaciones", v)} />
                    </div>

                    <BotonRegistro etiqueta_boton={procesando ? "Guardando..." : "Completar Registro"} deshabilitado={procesando} />
                </form>
            </div>
        </div>
    );
}