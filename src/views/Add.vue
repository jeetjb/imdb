<template>
  <div class="Add">
    <div v-show="!newactor && !newproducer">
    <h1><b>Add Movies</b></h1><br>
      <b-form>
         
         
  <b-container fluid class="bv-example-row">
    
        <b-row>
          <b-col sm="6">
            <b-form-group
                      label="Movie Name:"
                      description="This name will be displayed in the Home Page">
          <b-form-input 
                        type="text"
                        v-model="moviesobj.name"
                        placeholder="Enter Name">
          </b-form-input>
        </b-form-group>
          <!-- <span>Name of the Movie  </span>
          <input type="text" v-model="moviesobj.name"><br><br> -->

          <b-form-group
                      label="Date of Release:"
                      >
          <b-form-input 
                        type="date"
                        v-model="moviesobj.yearOfRelease"
                        placeholder="Select Date">
          </b-form-input>
        </b-form-group>

          <!-- <span>Date of Release  </span>
          <input type="date" v-model="moviesobj.yearOfRelease"><br><br> -->
          
          <b-form-group
                      label="Plot of the Movie:">
          <b-form-textarea
                        type="text"
                        rows="3"
                        v-model="moviesobj.plot"
                        placeholder="Enter Plot">
          </b-form-textarea>
        </b-form-group>

          <!-- <span>Plot of the Movie  </span><br>
          <textarea v-model="moviesobj.plot"></textarea><br><br> -->
          
          <b-form-group
                      label="Poster Image Link:">
          <b-form-input 
                        type="text"
                        v-model="moviesobj.poster"
                        placeholder="Enter Link">
          </b-form-input>
        </b-form-group>
        <!-- <b-button v-on:click.prevent="submitMovie">Submit</b-button> -->
        
          </b-col>
          <b-col sm="6">
            <span class="notbold">
                <b-form-group label="Select Actors:">
                  
                <b-form-checkbox-group v-model="moviesobj.actors">
                <ol>
                <li v-for="act in actorsdata" :key="act">
                <b-form-checkbox :value="act.id">&nbsp;&nbsp;{{act.name}}</b-form-checkbox>
                </li>
                </ol>
                </b-form-checkbox-group>
                </b-form-group> 
            </span>
            <b-button type="button" size="sm" variant="primary" @click="newactor=true , lab1=true">Add New</b-button>
      <!-- <b-form-group label="Stacked (vertical) button style checkboxes">
        <b-form-checkbox-group buttons v-model="selected" stacked :options="options">
        </b-form-checkbox-group>
      </b-form-group> -->

            <!-- <span>Actors</span><br>
            <ol>
            <li v-for="act in actorsdata" :key="act">
            <input type="checkbox" 
              :value="act.id"  
              v-model="moviesobj.actors" 
            >   {{act.name}}
            </li>
            </ol> -->
            <!-- <input type="button" value="Add New" @click="newactor=true , lab1=true"> -->
            <br><br>
            
            <b-form-group
                      label="Select Producer:">
            <b-form-select v-model="moviesobj.producer" class="mb-3" size="sm">
                <option v-for="pro in producersdata" :key="pro" :value="pro.id">
              {{ pro.name }} 
            </option>
        
      </b-form-select>
        </b-form-group>
      <b-button type="button" size="sm" variant="primary" @click="newproducer=true , lab2=true">Add New</b-button>
            <!-- Producer :
            <select v-model="moviesobj.producer">
            <option v-for="pro in producersdata" :key="pro" :value="pro.id">
              {{ pro.name }} 
            </option>
            </select>
            &nbsp;&nbsp;&nbsp;
            
            <input type="button" value="Add New" @click="newproducer=true , lab2=true"> -->
            <br><br>
          </b-col>
        </b-row>
    <b-button size="" variant="primary" v-on:click.prevent="submitMovie">Submit</b-button>
    
  </b-container>
        <!-- <span>Poster Image  </span>
        <input type="text" v-model="moviesobj.poster"><br><br> -->
        
        
          <!-- <button v-on:click.prevent="submitMovie">Submit</button> -->
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
      noup:false,

      selected: [], // Must be an array reference!
      options: [
        {text: 'Orange', value: 'orange'},
        {text: 'Apple', value: 'apple'},
        {text: 'Pineapple', value: 'pineapple'},
        {text: 'Grape', value: 'grape'}
      ]
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
               
               self.$router.push({ name : "home", params: {newmov:self.moviesobj.id}})})
      
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
  margin-right:  7%;
  background-color:#ddffd3;
}
.notbold {
  font-weight: normal;
}
</style>
