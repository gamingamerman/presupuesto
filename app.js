const { createApp } = Vue;

createApp({
    data() {
        return {
            cliente: "",
            personas: 0,
            dias: 0,
            habitaciones: 0,
            comidas: [
                {nombre: 'No se come', precio: 0},
                {nombre: 'Comidas para llevar', precio: 5.5},
                {nombre: 'Guachinche', precio: 8.75},
                {nombre: 'Bar de pueblo', precio: 11},
                {nombre: 'Restaurante', precio: 15.5},
                {nombre: 'Restaurante *', precio: 35.15},
                {nombre: 'Restaurante **', precio: 75},
                {nombre: 'Restaurante ***', precio: 199.99},
              ],
            alojamientos: [
                {nombre: 'En la calle', precio: 0},
                {nombre: 'Albergue', precio: 8.5},
                {nombre: 'Pensión', precio: 16.5},
                {nombre: 'Hotel **', precio: 29},
                {nombre: 'Hotel ***', precio: 50.95},
                {nombre: 'Hotel ****', precio: 115.05},
                {nombre: 'Hotel *****', precio: 350.25},
                {nombre: 'Hotel Resort Palace', precio: 999.99},
              ],
            extras: [
                {nombre: 'Excursión', precio: 70, seleccionada: false, tipo: "cultural ocio"},
                {nombre: 'Visita museo', precio: 20, seleccionada: false, tipo: "cultural"},
                {nombre: 'Concierto', precio: 50, seleccionada: false, tipo: "cultural"},
                {nombre: 'Salir de fiesta', precio: 60, seleccionada: false, tipo: "ocio"},
              ],
              comidaSeleccionada: 0,
              alojamientoSeleccionada: 0,
        }
    },
    methods: {
        marcarTodos() {
            this.extras.forEach(extra => extra.seleccionada = true)
        },
        desmarcarTodos() {
            this.extras.forEach(extra => extra.seleccionada = false)
        },
        pobre() {
            this.comidaSeleccionada = 0;
            this.alojamientoSeleccionada = 0;
            this.desmarcarTodos();
        },
        cultural() {
            this.desmarcarTodos();
            this.comidaSeleccionada = 4;
            this.alojamientoSeleccionada = 4;
            this.extras.forEach(extra => {
                if (extra.tipo.includes("cultural")) {
                    extra.seleccionada = true;
                }
            })
        },
        aventurero() {
            this.desmarcarTodos();
            this.comidaSeleccionada = 1;
            this.alojamientoSeleccionada = 1;
            this.extras.forEach(extra => {
                if (extra.tipo.includes("ocio")) {
                    extra.seleccionada = true;
                }
            })
        },
        granLujo() {
            this.desmarcarTodos();
            this.comidaSeleccionada = 7;
            this.alojamientoSeleccionada = 7;
            this.marcarTodos();
        }
    },
    watch: {
        habitaciones(newHab, oldHab) {
            if (newHab > parseInt(this.personas)) this.habitaciones = this.personas;
            if (newHab < (parseInt(this.personas) / 3)) this.habitaciones = Math.ceil(this.personas / 3)
        },
        personas(newPer, oldPer) {
            this.habitaciones = Math.ceil(parseInt(this.personas) / 2)
        }
    },
    computed: {
        precioComida() {
            return this.comidas[this.comidaSeleccionada].precio;
        },
        precioHabitacion() {
            return this.alojamientos[this.alojamientoSeleccionada].precio;
        },
        subtotalComida() {
            return Math.ceil(this.precioComida * 2 * this.personas * this.dias);
        },
        subtotalAlojamiento() {
            return this.precioHabitacion * this.habitaciones * (this.dias-1);
        },
        subtotalExtras() {
            let total = 0;
            this.extras.forEach(extra => {
                if (extra.seleccionada == true) {
                    total += extra.precio;
                }
            })
            return total;
        },
        presupuestoFinal() {
            return Math.round(this.subtotalAlojamiento + this.subtotalComida + this.subtotalExtras, 2);
        },
        clasePresupuesto() {
            if (this.presupuestoFinal < 50) return "barato";
            if (this.presupuestoFinal >= 50 && this.presupuestoFinal < 120) return "medio";
            if (this.presupuestoFinal >= 120 && this.presupuestoFinal < 300) return "alto";
            if (this.presupuestoFinal >= 300) return "lujoso";
        },
        personaDia() {
            return this.personas * this.precioHabitacion;
        }
    }

}).mount("#app");