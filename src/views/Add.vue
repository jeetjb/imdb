<template>
  <div class="Add">
    
    <div v-show="!newactor && !newproducer">
    <h1>Add Movies</h1>
      <form>
         
        <span>Name of the Movie  </span>
        <input type="text" v-model="moviesobj.name"><br><br>

        <span>Date of Release  </span>
        <input type="date" v-model="moviesobj.yearOfRelease"><br><br>
        
        <span>Plot of the Movie  </span><br>
        <textarea v-model="moviesobj.plot"></textarea><br><br>
        
        <span>Poster Image  </span>
        <input type="text" v-model="moviesobj.poster"><br><br>
        
        <span>Actors</span><br>
          <ol>
          <li v-for="act in actorsdata" :key="act">
          <input type="checkbox" 
            :value="act.id"  
            v-model="moviesobj.actors" 
          >   {{act.name}}
          </li>
          </ol>
          <input type="button" value="Add New" @click="newactor=true">
          <br><br>
          

          Producer :
          <select v-model="moviesobj.producer">
          <option v-for="pro in producersdata" :key="pro" :value="pro.id">
          {{ pro.id }}.  {{ pro.name }}
          </option>
          
          </select>
          
          <input type="button" value="Add New" @click="newproducer=true">
          <br><br>
          <button v-on:click.prevent="submitMovie">Submit</button>
          </form>
          
        </div>
        

        <div v-show="newactor">
          <newact @newValue="newactor = $event"></newact>
          
        </div>

        <div v-show="newproducer">
          <newprod @newValue="newproducer = $event"></newprod>
          
        </div>
    
    
  </div>
</template>
<script>
import newact from '../components/newActor'
import newprod from '../components/newProducer'
import axios from 'axios'
export default {
  data()  {
    return   {
      
      moviesobj: {
        id:0,
        name:'',
        yearOfRelease:'',
        plot:'',
        poster:'',
        actors:[],
        producer:'',
      },
      actorsobj: {
        id:0,
        name:'',
        sex:'',
        dateOfBirth:'',
        bio:'',
        movies:[],
      },
      producersobj: {
        id:0,
        name:'',
        sex:'',
        dateOfBirth:'',
        bio:'',
        movies:[],
      },
      moviesdata: '' ,
      actorsdata: '',
      producersdata: '',
      newactor:false,
      newproducer:false,
      
    }
  },
  components : {
    newact,
    newprod
  },
//   computed: {
//     computedProperty() {
//         return this.newactor, this.newproducer, Date.now();
//     }
// },
  watch : {
    newactor :function() {

      axios.get('http://localhost:3000/actors')
      .then(res => {
        console.log(res)
        this.actorsdata = res.data
        this.actorsobj.id=this.actorsdata.length
      })
      .catch(error => console.log(error))
      
    },
    newproducer :function() {

      axios.get('http://localhost:3000/producers')
      .then(res => {
        console.log(res)
        this.producersdata = res.data
        this.producersobj.id=this.producersdata.length
      })
      .catch(error => console.log(error))
      
    },
  },
  methods: {
    submitMovie() {
      this.moviesobj.id++;
      axios.post('http://localhost:3000/movies',this.moviesobj);
      
    },
    
  },

    created()
    {
      axios.get('http://localhost:3000/movies')
      .then(res => {
        console.log(res)
        this.moviesdata = res.data
        this.moviesobj.id=this.moviesdata.length
      })
      .catch(error => console.log(error))

      axios.get('http://localhost:3000/actors')
      .then(res => {
        console.log(res)
        this.actorsdata = res.data
        this.actorsobj.id=this.actorsdata.length
      })
      .catch(error => console.log(error))

      axios.get('http://localhost:3000/producers')
      .then(res => {
        console.log(res)
        this.producersdata = res.data
        this.producersobj.id=this.producersdata.length
      })
      .catch(error => console.log(error))
    },

    
    }
  // }
 

</script>
