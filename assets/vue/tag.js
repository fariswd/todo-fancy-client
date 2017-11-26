Vue.component('my-tag', {
  template: `
  <div class="container">
    <h2>My Todo</h2>
    <div class="card" v-for="(t, index) in todos">
      <div class="card-header left">
        <p class="card-text left">From: {{ t.from }}</p>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-10 col-sm-9">
            <p class="card-text right">{{ t.createdAt }}</p>
            <p class="card-text">{{ t.todo }}</p>
            
          </div>
          <div class="col-md-2 col-sm-3 right">
            <button v-if="t.status == true" type="button" class="btn btn-success btn-sm right" @click="undone(t._id)">Done</button>
            <button v-else type="button" class="btn btn-danger btn-sm right" @click="done(t._id)">Not done</button>
          </div>
        </div>
      </div>
      <div class="card-footer">
        <button class="badge badge-pill badge-danger" @click="remove(t._id)">Delete Todo</button>
      </div>
    </div>
  </div>
  `,
  props: ['todos','token'],
  data: function () {
    return {
      name: ''
    }
  },
  methods: {
    done: function(id){
      axios.put('http://localhost:3000/api/done/tag/'+id,[],{
        'headers': {'token': this.token}
      })
      .then((response)=>{
        var pos = this.todos.findIndex(function(e){
          return e._id == response.data.before._id;
        })
        this.todos[pos].status = true
      })
      .catch((error)=>{
        console.log(error);
      });
    },
    undone: function(id){
      axios.put('http://localhost:3000/api/undone/tag/'+id,[],{
        'headers': {'token': this.token}
      })
      .then((response)=>{
        var pos = this.todos.findIndex(function(e){
          return e._id == response.data.before._id;
        })
        this.todos[pos].status = false
      })
      .catch((error)=>{
        console.log(error);
      });
    },
    remove: function(id){
      axios.delete('http://localhost:3000/api/todo/tag/'+id,{
        'headers': {'token': this.token}
      })
      .then((response)=>{
        var pos = this.todos.findIndex(function(e){
          return e._id == response.data.before._id;
        })
        this.todos.splice(pos,1)
      })
      .catch((error)=>{
        console.log(error);
      });
    }
  },
  created(){
    // this.getTodo()
  }
})