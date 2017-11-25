Vue.component('my-todo', {
  template: `
  <div class="container">
    <h2>My Todo</h2>
    <div class="card" v-for="(t, index) in todos">
      <div class="card-header left">
        <p class="card-text left">{{ username }}</p>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-10 col-sm-10">
            <p class="card-text right">{{ t.createdAt }}</p>
            <p class="card-text">{{ t.todo }}</p>
            
          </div>
          <div class="col-md-2 col-sm-2 right">
            <button v-if="t.status == true" type="button" class="btn btn-success btn-sm" @click="undone(t._id)">Done</button>
            <button v-else type="button" class="btn btn-danger btn-sm" @click="done(t._id)">Not done</button>
          </div>
        </div>
      </div>
      <div class="card-footer">
        <a href="#" class="badge badge-pill badge-warning" >Edit Todo</a>
        <a href="#" class="badge badge-pill badge-danger" >Delete Todo</a>
      </div>
    </div>
  </div>
  `,
  props: ['todos','username'],
  data: function () {
    return {
      
    }
  },
  methods: {
    done: function(id){
      axios.put('http://localhost:3000/api/done/'+id,[],{
        'headers': {'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhMTA1Mzg2NDExZjNlN2Q4ZGMxNjNhYiIsImVtYWlsIjoicmFkZW5mYXJpc0BnbWFpbC5jb20iLCJpYXQiOjE1MTEwMTkzOTh9._3mopJCs703DWdPGq_kxYuW2Qd98r4zB6XJBLYFaJoY'}
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
      axios.put('http://localhost:3000/api/undone/'+id,[],{
        'headers': {'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhMTA1Mzg2NDExZjNlN2Q4ZGMxNjNhYiIsImVtYWlsIjoicmFkZW5mYXJpc0BnbWFpbC5jb20iLCJpYXQiOjE1MTEwMTkzOTh9._3mopJCs703DWdPGq_kxYuW2Qd98r4zB6XJBLYFaJoY'}
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
    }
  },
  created(){
    // this.getTodo()
  }
})