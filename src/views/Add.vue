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
          <ul>
          <li v-for="act in actorsdata" :key="act">
          <input type="checkbox" 
            :value="act.id"  
            v-model="moviesobj.actors" 
          > {{act.id}}.  {{act.name}}
          </li>
          <li><input type="checkbox" @click="newactor=true"> 4.  Add new</li>
          
          </ul>

          Producer :
          <select v-model="moviesobj.producer">
          <option v-for="pro in producersdata" :key="pro" :value="pro.id">
          {{ pro.id }}.  {{ pro.name }}
          </option>
          <option>New Producer</option>
          </select>
          
          <template v-if="moviesobj.producer == 'New Producer'">
            {{ newproducer=true }}
          </template>
          <br><br>
          <button v-on:click="submit1">Submit</button>
          </form>
          
        </div>
        


        <div v-show="newactor">
          <h3>New Actor</h3>
          
            <form>
        
        <span>Name  </span>
        <input type="text" v-model="actorsobj.name"><br><br>

        <span>Sex  </span><br>
        <input type="radio" value="M" v-model="actorsobj.sex">
        <label>Male</label><br>
        <input type="radio" value="F" v-model="actorsobj.sex">
        <label>Female</label>
        <br><br>

        <span>Date of Birth  </span>
        <input type="date" v-model="actorsobj.dateOfBirth"><br><br>
        
        <span>Bio  </span>
        <input type="text" v-model="actorsobj.bio"><br><br>
        
        <span>Movies</span><br>
          <ul>
          <li v-for="mov in moviesdata" :key="mov">
          <input type="checkbox" 
            :value="mov.id"  
            v-model="actorsobj.movies" 
          > {{mov.id}}.  {{mov.name}}
          </li>
          <!-- <li><input type="checkbox" @click="newactor=true"> 4.  Add new</li> -->
          
          </ul>
          <br><br>
          <button v-on:click="submit2">Submit</button>
            </form>

            
        </div>

        <div v-show="newproducer">
          <h3>New Producer</h3>
          
            <form>
        
        <span>Name  </span>
        <input type="text" v-model="producersobj.name"><br><br>

        <span>Sex  </span><br>
        <input type="radio" value="M" v-model="producersobj.sex">
        <label>Male</label><br>
        <input type="radio" value="F" v-model="producersobj.sex">
        <label>Female</label>
        <br><br>

        <span>Date of Birth  </span>
        <input type="date" v-model="producersobj.dateOfBirth"><br><br>
        
        <span>Bio  </span>
        <input type="text" v-model="producersobj.bio"><br><br>
        
        <span>Movies</span><br>
          <ul>
          <li v-for="mov in moviesdata" :key="mov">
          <input type="checkbox" 
            :value="mov.id"  
            v-model="producersobj.movies" 
          > {{mov.id}}.  {{mov.name}}
          </li>
          <!-- <li><input type="checkbox" @click="newactor=true"> 4.  Add new</li> -->
          
          </ul>
          <br><br>
          <button v-on:click="submit3">Submit</button>
            </form>
        </div>
    
  </div>
</template>
<script>
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
  methods: {
    submit1() {
      this.moviesobj.id++;
      axios.post('http://localhost:3000/movies',this.moviesobj);
      
    },
    submit2() {
      this.actorsobj.id++;
      axios.post('http://localhost:3000/actors',this.actorsobj);
      this.newactor=false;
      
    },
    submit3() {
      this.producersobj.id++;
      axios.post('http://localhost:3000/producers',this.producersobj);
      this.newproducer=false;
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
    }
  // }
 
}
</script>
