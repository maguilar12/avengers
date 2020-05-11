Vue.component('formula', {
    data: function () { //Declaración de la Data
        return {
            errores: [],
            superheroe: null,
            descripciondetrabajo: null,
            telefono:null,
            email: null
        } 
    }, 
    // Aquí comienza nuestro template
    template: `
    <div class="form vill col-12 col-s-12">
        <form id="aveng" 
         @submit="validarFormulario" 
          method="post" 
          action="./Aveng.html#/contacto"   
          novalidate="true">

             
<p v-if="errores.length" style="width:90% ">
<b>Por favor, corrija el(los) siguiente(s) error(es):</b>
<ul style="text-align: center; margin:10px; font-weight: bold;">
<p v-for="error in errores" style="color:red;font-family:sans-serif;text-decoration: none; margin:0 0 -0.3rem 0;font-size: 1.5rem; ">{{ error }}</p>
</ul>
</p>
</p>
<form class="formulario" id="formulario" name="forms" >
<h1>Formulario</h1>

<p>
<label for="descripciondetrabajo"class="form-letr" >Descripcion de trabajo</label><br>
<input id="descripciondetrabajo" v-model="descripciondetrabajo" type="text"class="caja" name="descripcion">
</p>
<p>
<label for="telefono"class="form-letr" >Teléfono</label><br>
<input id="telefono" v-model="telefono" type="text"class="caja" name="telefono">
</p>
<p>
<label for="email"class="form-letr">Email</label><br>
<input id="email" v-model="email" type="text" class="caja" name="email">
</p>

<p>
<label for="superheroe">Superhéroe</label><br>
<select id="superheroe" v-model="seleccionado" nombre="superheroe">
<option v-for="option in losvengadores" :value="option">{{option.nombredesuperheroe}}</option></select>
</p>

<p>
<input type="submit" class="botton" value="Enviar">
</p>
        </form>
    </div>`,
    // Aca termina nuestro Template



    methods: {//Inician los métodos
        validarFormulario: function (e) {//iniciamos la fincion que valida el formulario
            this.errores = [];
            if (!this.descripciondetrabajo) {
                this.errores.push("la descripcion es  obligatoria.");
            }

            if (!this.email) {
                this.errores.push('El email es obligatorio.');
            } else if (!this.validaremail(this.email)) {
                this.errores.push("El email debe ser valido.");
            }
            if (!this.telefono) {
                this.errores.push("El numero de telefono es obligatorio.");
            }else if (!this.validartelefono(this.telefono)){
                alert('el numero de telefono solo permite 8 caracteres numericos');
            } 
 
            if (!this.errores.length) {
                return true;
            }

            e.preventDefault();
        },
        validartelefono: function (telefono){
        var re=/^\d{8}$/;
        return re.test(telefono);
    },
        validaremail: function (email) {
            var re = /^[^@\s]+@[^@\.\s]+(\.[^@\.\s]+)+$/;

            return re.test(email);
        }
    }
    
})