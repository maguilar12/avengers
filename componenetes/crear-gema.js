var CrearGema = Vue.component('CrearGema', {

    data: function () {
        return {
            errores: [],
            nombre: null,
            poder: null,
            portador: null,
            ubicacion: null
        }
    },
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
<button v-on:click="validarFormulario(), crear_gema(nombre, poder, portador, ubicacion) " class="botton" style="font-size: 2rem;">Agregar</button>
</p>
</div>`, // Aca termina nuestro Template
    methods: { //Inician los Métodos
        validarFormulario: function (e) { //iniciamos la Funcion que valida el formulario
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
        crear_gema: function (nombre, poder, portador, ubicacion) {
            if (!(Array.isArray(this.errores) && this.errores.length)) {
                let self = this;
                axios.post('https://avengers-app-98c49.firebaseio.com/gema.json', {
                        nombre: nombre,
                        poder: poder,
                        portador: portador,
                        ubicacion: ubicacion
                    })
                    .then((response) => {
                        alert("Se Agregó a la Lista Exitosamente");
                        router.push({
                            name: "Gemas"
                        });
                    }).catch((err) => {
                        self.loading = false;
                        console.log(err);
                    });
            }
        } // fin metodo de crear
    } // Terminan los Métodos
})
