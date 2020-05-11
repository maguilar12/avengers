var Gemas = Vue.component('Gemas', {
    template: `
<div class=" listado col-12 col-s-12">
<h1>Gemas del infinito</h1>
 
<p>"Gemas mas poderosas del universo "</p>
  
<a href="/crear_gema"></a>
<router-link class="nav-link" to="/crear_gema"> <button class="botton-agregar">Agregar</button>
</router-link> 

<table class="resp">
<thead>
<tr>
<th scope="col">Nombre</th>
<th scope="col">Poder</th>
<th scope="col">Portador</th>
<th scope="col">Ubicacion</th>
<th scope="col">Acciones</th>
</tr>
</thead>
<tbody>
<tr v-for="(item, index) in gemas">
<td class="td-g">{{ item.nombre }}</td>
<td class="td-g">{{ item.poder }}</td>
<td class="td-g">{{ item.portador}}</td> 
<td class="td-g">{{ item.ubicacion}}</td>

<td><a href="/cambiar_gema"></a>
<router-link class="nav-link" :to="{ name: 'cambiar_gema', params: { id:
index }}"> 

<button class="botton">Editar</button> </router-link>

<button v-on:click="eliminar_gema(index)" class="botton">Eliminar</button>

</td>
</tr>
</tbody>
</table>
</div>
`,
    data: function () {
        return {
            gemas: [],
        }
    },
    mounted() {
        let self = this;
        fetch('https://avengers-app-98c49.firebaseio.com/gema.json')
            .then(r => r.json())
            .then(json => {
                self.gemas = json;
            });
    },
    methods: { //Inician los Métodos
        eliminar_gema: function (id) {
            let self = this;
            axios.delete('https://avengers-app-98c49.firebaseio.com/gema/' + id +
                    '.json')
                .then((response) => {
                    alert("La Gema Fue Eliminada correctamente");
                    location.reload();
                }).catch((err) => {
                    self.loading = false;
                    console.log(err);
                });
        } // fin metodo eliminar_
    }
});
