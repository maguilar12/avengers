var CrearVengadores = Vue.component(' CrearVengadores', {
    data: function () { //Declaración de la Data
        return {
            errores: [],
            nombres: null,
            apellidos: null,
            nombredesuperheroe: null,
            superpoder: null,
            trabajoactual: null,
            telefono: null,
            email: null
        }
    },
    // Aquí comienza nuestro template
    template: `
<div class="form  col-12 col-s-12"  name="miFormulario">
 
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

<label for="nombredesuperheroe">Nombre Superheróe</label>
<input id="nombredesuperheroe" v-model="nombredesuperheroe" type="text">

</h4>
<h4>
<label for="apellidos">Apellidos</label>
<input id="apellidos" v-model="apellidos" type="text" name="apellidos">

<label for="superpoder">Superpoder</label>
<input id="superpoder" v-model="superpoder" type="text" >
</h4>

<h4>
<label for="trabajoactual" >Trabajo Actual</label>
<input id="trabajoactual" v-model="trabajoactual" type="text" >

<label for="telefono" >Teléfono</label>
<input id="telefono" v-model="telefono" type="text" name="ltelefono">
</h4>

<h4>
<label for="email">Email</label>
<input id="email" v-model="email" type="text" placeholder="nombre@vengadores.com">

<button v-on:click="validarFormulario(), crear_vengadores(nombres, apellidos, nombredesuperheroe, superpoder, trabajoactual, telefono, email)" class="botton" style="  font-size: 2rem;">Agregar</button> 
</h4>

</div>`, // Aca termina nuestro Template

    methods: { //Inician los Métodos
        validarFormulario: function (e) { //iniciamos la Funcion que valida el formulario
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
                this.errores.push("El numero de telefono es obligatorio.");
            } else if (!this.validartelefono(this.telefono)) {
                this.errores.push("solo se permite el ingreso de 8 digitos que sean numeros.");
            }
            if (!this.email) {
                this.errores.push("El email es obligatorio");
            }  else if (!this.validaremail(this.email)) {
                this.errores.push("solo se permite el ingreso de la siguiente manera nombre@vengadores.com.");
            }
            if (!this.errores.length ) {
                return true;
            }
               e.preventDefault();
             
        },
          validaremail: function (email){
        var re=/^.+@vengadores.com/;
        return re.test(email);
    },
        validartelefono: function (telefono){
        var re=/^\d{8}$/;
        return re.test(telefono);
    },
       
        

        crear_vengadores: function (nombres, apellidos, nombredesuperheroe, superpoder, trabajoactual, telefono, email) {
            if (!(Array.isArray(this.errores) && this.errores.length)) {
                let self = this;
                axios.post('https://avengers-app-98c49.firebaseio.com/vengadores.json', {
                        nombres: nombres,
                        apellidos: apellidos,
                        nombredesuperheroe: nombredesuperheroe,
                        superpoder: superpoder,
                        trabajoactual: trabajoactual,
                        telefono: telefono,
                        email: email
                    })
                    .then((response) => {
                        alert("Se Agregó a la Lista Exitosamente");
                        router.push({
                            name: "LosVengadores"
                        });
                    }).catch((err) => {
                        self.loading = false;
                        console.log(err);
                    });
            }
        } // fin metodo crear
    } // Terminan los Métodos
})
