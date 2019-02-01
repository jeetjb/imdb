<template>
  <div class="Add">
    
    <div v-show="!newactor && !newproducer">
    <h1><b>Add Movies</b></h1><br>
      <b-form>
         
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
          <input type="button" value="Add New" @click="newactor=true , lab1=true">
          <br><br>
          
          
          Producer :
          <select v-model="moviesobj.producer">
          <option v-for="pro in producersdata" :key="pro" :value="pro.id">
             {{ pro.name }} 
          </option>
          </select>
          &nbsp&nbsp&nbsp
          
          <input type="button" value="Add New" @click="newproducer=true , lab2=true">
          <br><br>
          <button v-on:click.prevent="submitMovie">Submit</button>
          </b-form>
          
        </div>
        

        <div v-show="newactor">
          <newact @newValue="actfunc"></newact>
          <!-- <template v-if="lab1">
          {{moviesobj.actors.push(actorsdata[actorsdata.length-1].id)}}
          {{lab1=false}}
          </template> -->
        </div>

        <div v-show="newproducer">
          <newprod @newValue="prodfunc"></newprod>
          
          <!-- <template v-if="lab2">
          {{moviesobj.producer=producersdata[producersdata.length-1].id}}
          {{lab2=false}}
          </template> -->
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
        producer:1,
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
      lab1:false,
      lab2:false,
      lab:false,
      lab3:false,
      noup:false
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
        if(!this.noup) {
        if(this.lab1 && this.lab) {
        this.moviesobj.actors.push(this.actorsdata[this.actorsdata.length-1].id)
        this.lab1=false
        }
        this.lab=!this.lab
      }
      })
      .catch(error => console.log(error))
      
      
    },
    newproducer :function() {

      axios.get('http://localhost:3000/producers')
      .then(res => {
        console.log(res)
        this.producersdata = res.data
        this.producersobj.id=this.producersdata.length
        if(!this.noup) {
        if(this.lab2 && this.lab3) {
        this.moviesobj.producer=this.producersdata[this.producersdata.length-1].id
        this.lab2=false
      }
      this.lab3=!this.lab3
      }
      })
      .catch(error => console.log(error))
      
    },
  },
  methods: {
    submitMovie() {
      this.moviesobj.id++
      var self = this
      axios.post('http://localhost:3000/movies',this.moviesobj).then(function(){
               self.$router.push({ name : "home", params: {newmov:true}})})
      
    },
    prodfunc(p,c) {
      
        this.newproducer=p
        this.noup=c
      },
      actfunc(a,c) {
      
        this.newactor=a
        this.noup=c
      }
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
<style>
.Add {
  margin-left: 7%;
  
}
</style>
