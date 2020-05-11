var LosVengadores = Vue.component('LosVengadores',
{
template: `  
<div class=" listado col-12 col-s-12">

<h1>Vengadores</h1>
<p>"Listado de los superhéroes"
    

<a href="/crear_vengadores"></a>
<router-link class="nav-link" to="/crear_vengadores"> <button class="botton-agregar">Agregar</button>
</router-link>
</p>
<table class="resp">
<thead> 
<tr>
<th scope="col">Nombres</th>
<th scope="col">Apellidos</th>
<th scope="col">Nombre de Superhéroe</th>
<th scope="col">superpoder</th>
<th scope="col">Trabajo Actual</th>
<th scope="col">Teléfono</th>
<th scope="col">Email</th>
<th scope="col">Acciones</th>
</tr>
</thead>
<tbody> 
<tr v-for="(item, index) in losvengadores">
<td class="td-vg">{{ item.nombres }}</td>
<td class="td-vg">{{ item.apellidos }}</td>
<td class="td-vg">{{ item.nombredesuperheroe }}</td>
<td class="td-vg">{{ item.superpoder }}</td>
<td class="td-vg">{{ item.trabajoactual }}</td>
<td class="td-vg">{{ item.telefono }}</td>
<td class="td-vg">{{ item.email }}</td>

<td><a href="/cambiar_vengador"></a>
<router-link class="nav-link" :to="{ name: 'cambiar_vengador', params: { id:
index }}"> <button class="botton">Editar</button> </router-link>

<button v-on:click="eliminar_vengador(index) " class="botton">Eliminar</button>
</td>
</tr>
</tbody>
</table>

</div>
`,
data: function () {
return {
losvengadores: [],
}
},
mounted() {
let self = this;
fetch('https://avengers-app-98c49.firebaseio.com/vengadores.json')
.then(r => r.json())
.then(json => {
self.losvengadores = json;
});
},
     
    methods: { //Inician los Métodos
eliminar_vengador: function(id){
let self = this;
axios.delete('https://avengers-app-98c49.firebaseio.com/vengadores/'+ id
+'.json')
.then((response) => {
alert("El vengador Fue Eliminado correctamente");
location.reload();
}).catch((err) => {
self.loading = false; console.log(err);
});
} // fin metodo eliminar
}
});