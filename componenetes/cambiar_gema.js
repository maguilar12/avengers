var CambiarGema = Vue.component('CambiarGema', {
    data: function () { //Declaración de la Data
        return {
            errores: [],
            nombre: null,
            poder:null,
            portador:null,
            ubicacion:null
           
        }
    },
    // Aquí comienza nuestro template
    template: `
<div class=" form vill col-12 col-s-12">
 
<p v-if="errores.length">
<b>Por favor, corrija el(los) siguiente(s) error(es):</b>
<ul  style="text-align: center; margin:10px; font-weight: bold;">
<p v-for="error in errores" style="color:red;font-family: sans-serif;text-decoration: none; margin:0 0 -0.3rem 0;font-size: 1.5rem;">{{ error }}</p>
</ul>
</p>
</p>
<h1>Formulario</h1>
<p>
<label for="nombre" class="form-letr">Nombre</label><br>
<input id="nombre" v-model="nombre" type="text"class="caja">
</p>
<p>
<label for="poder"class="form-letr" >Poder</label><br>
<input id="poder" v-model="poder" type="text"class="caja">
</p>
<p>
<label for="portador"class="form-letr" >Portador</label><br>
<input id="portador" v-model="portador" type="text"class="caja">
</p>
<p>
<label for="ubicacion"class="form-letr">Ubicacion</label><br>
<input id="ubicacion" v-model="ubicacion" type="text" class="caja">
</p>

<p>
<button v-on:click="validarFormulario(), cambiar_gema(nombre, poder, portador, ubicacion) " class="botton" style="font-size: 2rem;">Guardar</button>
</p>
</div>`, // Aca termina nuestro Template

    mounted() {
        let self = this;
        fetch('https://avengers-app-98c49.firebaseio.com/gema/'+ this.$route.params.id + '.json')
            .then(r => r.json())
            .then(json => {
                self.nombre = json.nombre,
                    self.poder = json.poder,
                    self.portador = json.portador,
                    self.ubicacion= json.ubicacion
             
            });
    },
    methods: { //Inician los Métodos
        validarFormulario: function (e) { //iniciamos la Funcion que valida elformulario
            this.errores = [];
            if (!this.nombre) {
                this.errores.push("El Nombre es obligatorio.");
            }
           
              if (!this.poder) {
                this.errores.push("El poder es obligatorio.");
            }
            if (!this.portador) {
                this.errores.push("El portador es obligatorio.");
            }
            if (!this.ubicacion) {
                this.errores.push("la ubicacion es obligatoria.");
            }
            if (!this.errores.length) {
                return true;
            }
        },
        cambiar_gema: function (nombre, poder, portador,ubicacion) {
            if (!(Array.isArray(this.errores) && this.errores.length)) {
                let self = this;
                axios.put('https://avengers-app-98c49.firebaseio.com/gema/' + this.$route.params.id + '.json', {
                    nombre: nombre,
                    poder:poder,
                    portador:portador,
                    ubicacion:ubicacion
                }).then((response) => {
                    alert("Datos de Gema ha sido Modificados Exitosamente");
                    router.push({
                        name: "Gemas"
                    });
                }).catch((err) => {
                    self.loading = false;
                    console.log(err);
                });
            }
        } // fin metodo cambiar
    } // Terminan los Métodos
})
