var CambiarVengador = Vue.component('Cambiarvengador', {
    data: function () { //Declaración de la Data
        return {
            errores: [],
            nombres: null,
            apellidos: null,
            nombredesuperheroe: null,
            trabajoactual: null,
            superpoder: null,
            telefono: null,
            email: null
        }
    },
    // Aquí comienza nuestro template
    template: `
<div class="form  col-12 col-s-12" >

<p v-if="errores.length">
<b>Por favor, corrija el(los) siguiente(s) error(es):</b>
<ul  style="text-align: center; margin:10px; font-weight: bold;"> 
<p v-for="error in errores" style="color:red;font-family: sans-serif;text-decoration: none; margin:0 0 -0.3rem 0;   font-size: 1.5rem;">{{ error }}</p>
</ul>
</p>
<h1>Formulario</h1>
<h4>

<label for="nombres">Nombres</label>
<input id="nombres" v-model="nombres" type="text" >

<label for="nombredesuperheroe">Nombre de Superheróe</label>
<input id="nombredesuperheroe" v-model="nombredesuperheroe" type="text">

</h4>
<h4>
<label for="apellidos">Apellidos</label>
<input id="apellidos" v-model="apellidos" type="text">

<label for="superpoder">Superpoder</label>
<input id="superpoder" v-model="superpoder" type="text">
</h4>

<h4>
<label for="trabajoactual" >Trabajo Actual</label>
<input id="trabajoactual" v-model="trabajoactual" type="text">

<label for="telefono" >Teléfono</label>
<input id="telefono" v-model="telefono" type="text">
</h4>

<h4>
<label for="email">Email</label>
<input id="email" v-model="email" type="text" >

<button v-on:click="validarFormulario(), cambiar_vengador(nombres, apellidos, nombredesuperheroe, superpoder, trabajoactual, telefono, email)" class="botton" style="  font-size: 2rem;">Guardar</button> 
</h4>
</div>`, // Aca termina nuestro Template

    mounted() {
        let self = this;
        fetch('https://avengers-app-98c49.firebaseio.com/vengadores/'+ this.$route.params.id + '.json')
            .then(r => r.json())
            .then(json => {
                self.nombres = json.nombres,
                    self.apellidos = json.apellidos,
                    self.nombredesuperheroe = json.nombredesuperheroe,
                    self.superpoder = json.superpoder ,
                    self.trabajoactual = json.trabajoactual,
                    self.telefono = json.telefono ,
                    self.email = json.email 
            });
    },
    methods: { //Inician los Métodos
        validarFormulario: function (e) { //iniciamos la Funcion que valida elformulario
            this.errores = [];
            if (!this.nombres) {
                this.errores.push("El Nombre es obligatorio.");
            }
            if (!this.apellidos) {
                this.errores.push("El Apellido es obligatorio.");
            }
             if (!this.nombredesuperheroe) {
                this.errores.push("El nombre del superheroe es obligatorio.");
            }
            if (!this.superpoder) {
                this.errores.push("El superpoder es obligatorio.");
            }
            if (!this.trabajoactual) {
                this.errores.push("El trabajo actual es obligatorio.");
            }
            if (!this.telefono) {
                this.errores.push("El telefono es obligatorio.");
            }
            if (!this.email) {
                this.errores.push("El email es obligatorio.");
            }
            if (!this.errores.length) {
                return true;
            }
        },
        cambiar_vengador: function (nombres, apellidos, nombredesuperheroe,superpoder,trabajoactual,telefono,email) {
            if (!(Array.isArray(this.errores) && this.errores.length)) {
                let self = this;
                axios.put('https://avengers-app-98c49.firebaseio.com/vengadores/' + this.$route.params.id + '.json', {
                    nombres: nombres,
                    apellidos: apellidos,
                    nombredesuperheroe:nombredesuperheroe,
                    superpoder:superpoder,
                    trabajoactual:trabajoactual,
                    telefono:telefono,
                    email:email
                }).then((response) => {
                    alert("Datos vengadore ha sido Modificados Exitosamente");
                    router.push({
                        name: "LosVengadores"
                    });
                }).catch((err) => {
                    self.loading = false;
                    console.log(err);
                });
            }
        } // fin metodo cambiar_alumno
    } // Terminan los Métodos
})
