new Vue({
  el: '#app',
  data: {
      token: '',
      message: '',
      todos: [],
      username: '',
      newtodo: '',
      newtag: '',
      arrtag: [],
      mytag: [],
      status: '',
      todoEdit: '',
      todoTag: [],
      todoTagString: ''
  },
  methods: {
    getTodo: function(){
      axios.get('http://vps.masfaris.com:3001/api/mytodo',{
        'headers': {'token': this.token}
      })
      .then((response)=>{
        this.username = response.data.user.email
        this.todos = response.data.todos
      })
      .catch((error)=>{
        console.log(error);
        alert("Please login");
        localStorage.removeItem('token');
        window.location.replace("index.html");
        
      });
    },
    getTag: function(){
      axios.get('http://vps.masfaris.com:3001/api/mytagged',{
        'headers': {'token': this.token}
      })
      .then((response)=>{
        console.log(response)
        this.mytag = response.data.todos
      })
      .catch((error)=>{
        console.log(error);
        alert("Please login");
        localStorage.removeItem('token');
        window.location.replace("index.html");
        
      });
    },
    addTodo: function(){
      var tagged = this.tagHandler();
      axios.post('http://vps.masfaris.com:3001/api/todo',{
        todo: this.newtodo,
        tag: this.arrtag
      },{
        'headers': {'token': this.token}
      })
      .then(response=>{
        this.todos.unshift(response.data.inserted)
        this.newtodo = ''
        this.newtag = ''
        this.arrtag = []
        this.status = 'success'
        $('#addTodo').modal('hide')
        // $('.navbar').collapse('hide')
      })
      .catch(err=>{
        console.log(err)
        this.status = 'fails'
      })
    },
    tagHandler: function(){
      var tags = this.newtag.replace(/\s/g, '');
      this.arrtag = tags.split(',')
      return this.arrtag
    },
    tagReverse: function(tag, cb){
      //send array of id
      axios.post('http://vps.masfaris.com:3001/api/user/',{
        user: tag
      })
      .then(result=>{
        //return string email separated by coma
        //mungkin callback
        cb(null, result.data.result)
      })
      .catch(err=>{
        console.log(err)
        cb(err, null)
      })
    },
    editHandler: function(payload){
      this.todoEdit = payload.todo
      this.todoTag = payload.todo.tag
      var tagged = this.tagReverse(payload.todo.tag,(err,result)=>{
        if(err) console.log(err)
        else {
          this.todoTagString = result
          $('#editTodo').modal('show')
        }
      })
    },
    editTodo: function(){
      var tags = this.todoTagString.replace(/\s/g, '');
      this.arrtag = tags.split(',')
      axios.put('http://vps.masfaris.com:3001/api/todo/'+this.todoEdit._id,{
        todo: this.todoEdit.todo,
        tag: this.arrtag
      },{
        'headers': {'token': this.token}
      })
      .then(response=>{
        this.todoEdit = ''
        this.status = 'success'
        $('#editTodo').modal('hide')
        // $('.navbar').collapse('hide')
      })
      .catch(err=>{
        console.log(err)
        this.status = 'fails'
      })
    },
    clearStatus: function(){
      this.status = ''
    },
    gettoken: function(){
      let token = localStorage.getItem('token')
      if(token){
        this.token = token
      } else {
         alert("Please login");
         localStorage.removeItem('token');
         window.location.replace("index.html");
      }
    },
    logout: function(){
      localStorage.removeItem('token');
      window.location.replace("index.html");
    }
  },
  created(){
    this.gettoken()
    this.getTodo()
  }
})
Vue.config.devtools = true;