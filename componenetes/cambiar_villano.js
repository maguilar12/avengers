var CambiarVillano = Vue.component('CambiarVillano', {
    data: function () { //Declaración de la Data
        return {
            errores: [],
            nombre: null,
            superpoder: null,
            origen: null,
            derrotado: null

        }
    },
    // Aquí comienza nuestro template
    template: `
<div class=" form vill col-12 col-s-12" style="">

<p v-if="errores.length">
<b>Por favor, corrija el(los) siguiente(s) error(es):</b>
<ul  style="text-align: center; margin:10px; font-weight: bold;">
<p v-for="error in errores" style="color:red;font-family: sans-serif;text-decoration: none; margin:0 0 -0.3rem 0;font-size: 1.5rem;">{{ error }}</p>
</ul>
</p>
</p>
<h1>Formulario</h1>
<p>
<label for="nombre" >Nombre</label><br>
<input id="nombre" v-model="nombre" type="text" class="caja" >
</p>
<p>
<label for="superpoder">Superpoder</label><br>
<input id="superpoder" v-model="superpoder" type="text"class="caja">
</p>
<p>
<label for="origen"  >origen</label><br>
<input id="origen" v-model="origen" type="text"class="caja">
</p>
<p>
<label for="derrotado" >Derrotado</label><br>
<input id="derrotado" v-model="derrotado" type="text"class="caja">
</p>

<p>
<button v-on:click="validarFormulario(), cambiar_villano(nombre, superpoder, origen, derrotado) "  class="botton"style="font-size: 2rem;">Guardar</button>
</p>
</div>`, // Aca termina nuestro Template

    mounted() {
        let self = this;
        fetch('https://avengers-app-98c49.firebaseio.com/villano/' + this.$route.params.id + '.json')
            .then(r => r.json())
            .then(json => {
                self.nombre = json.nombre,
                    self.superpoder = json.superpoder,
                    self.origen = json.origen,
                    self.derrotado = json.derrotado

            });
    },
    methods: { //Inician los Métodos
        validarFormulario: function (e) { //iniciamos la Funcion que valida elformulario
            this.errores = [];
            if (!this.nombre) {
                this.errores.push("El Nombre es obligatorio.");
            }

            if (!this.superpoder) {
                this.errores.push("El superpoder es obligatorio.");
            }
            if (!this.origen) {
                this.errores.push("El origen es obligatorio.");
            }
            if (!this.derrotado) {
                this.errores.push("por quien fue derrotado es obligatoria.");
            }
            if (!this.errores.length) {
                return true;
            }
        },
        cambiar_villano: function (nombre, superpoder, origen, derrotado) {
            if (!(Array.isArray(this.errores) && this.errores.length)) {
                let self = this;
                axios.put('https://avengers-app-98c49.firebaseio.com/villano/' + this.$route.params.id + '.json', {
                    nombre: nombre,
                    superpoder: superpoder,
                    origen: origen,
                    derrotado: derrotado
                }).then((response) => {
                    alert("Datos del Villano ha sido Modificados Exitosamente");
                    router.push({
                        name: "Villanos"
                    });
                }).catch((err) => {
                    self.loading = false;
                    console.log(err);
                });
            }
        } // fin metodo cambiar
    } // Terminan los Métodos
})
