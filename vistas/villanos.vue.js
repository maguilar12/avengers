 var Villanos = Vue.component('Villanos', {
    template: `
<div class="col-12 col-s-12" style="margin-top:-3rem;">

<h1 class="">Villanos</h1>

<p>"los villlanosmas peligrosos del universo "</p>

<a href="/crear_villano"></a>
<router-link class="nav-link" to="/crear_villano"> <button 
class="botton-agregar">Agregar</button>
</router-link>

<table class="resp">
<thead>
<tr >
<th scope="col">Nombre</th>
<th scope="col">superPoder</th>
<th scope="col">origen</th>
<th scope="col">derrotado</th>
<th scope="col">Acciones</th>
</tr>
</thead>
<tbody>
<tr v-for="(item, index) in villanos" >
<td class="td-v">{{ item.nombre }}</td>
<td class="td-v">{{ item.superpoder }}</td>
<td class="td-v">{{ item.origen}}</td>
<td class="td-v">{{ item.derrotado}}</td>

<td><a href="/cambiar_villano"></a>
<router-link class="nav-link" :to="{ name: 'cambiar_villano', params: { id:
index }}"> 

<button class="botton">Editar</button> </router-link>

<button v-on:click="eliminar_villano(index) " class="botton">Eliminar</button>
</tr>

</tbody>
</table>
</div>
`,
    data: function () {
        return {
            villanos: [],
        }
    },
    mounted() {
        let self = this;
        fetch('https://avengers-app-98c49.firebaseio.com/villano.json')
            .then(r => r.json())
            .then(json => {
                self.villanos = json;
            });
    },
    methods: { //Inician los Métodos
        eliminar_villano: function (id) {
            let self = this;
            axios.delete('https://avengers-app-98c49.firebaseio.com/villano/' + id +
                    '.json')
                .then((response) => {
                    alert("El Villano Fue Eliminada correctamente");
                    location.reload();
                }).catch((err) => {
                    self.loading = false;
                    console.log(err);
                });
        }
    }
});
