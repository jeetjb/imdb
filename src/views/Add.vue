<template>
  <div class="Add">
    <!-- <div v-show="!newactor && !newproducer"> -->
      <div>
    <h1><b>Add Movies</b></h1><br>
      <b-form>
         
  <b-container fluid class="bv-example-row">
    
        <b-row>
          <b-col sm="6">
            <b-form-group
                      label="Movie Name: *"
                      description="This name will be displayed in the Home Page">
          <b-form-input v-validate="'alpha_spaces|required'"
                        name = "movie name"
                        type="text"
                        v-model="moviesobj.name"
                        placeholder="Enter Name">
                        
          </b-form-input>
          <span>
                          {{ errors.first('movie name')}}
                        </span>
        </b-form-group>

          <b-form-group
                      label="Date of Release:"
                      >
          <b-form-input 
                        type="date"
                        v-model="moviesobj.yearOfRelease"
                        placeholder="Select Date">
          </b-form-input>
        </b-form-group>

          
          <b-form-group
                      label="Plot of the Movie: *">
          <b-form-textarea
          v-validate="'alpha_spaces|required'"
                        name = "plot"
                        type="text"
                        rows="3"
                        v-model="moviesobj.plot"
                        placeholder="Enter Plot">
          </b-form-textarea>
           <span>
                          {{ errors.first('plot')}}
                        </span>
        </b-form-group>

          
          <b-form-group
                      label="Poster Image Link:">
          <b-form-input 
                        type="text"
                        v-model="moviesobj.poster"
                        placeholder="Enter Link">
          </b-form-input>
        </b-form-group>
        
          </b-col>
          <b-col sm="6">
            <span class="notbold">
                <b-form-group label="Select Actors: *">
                  
                <b-form-checkbox-group v-model="moviesobj.actors"
                v-validate="'required'"
                name = "actors">
                <ol>
                <li v-for="act in actorsdata" >
                <b-form-checkbox :value="act.id">&nbsp;&nbsp;{{act.name}}</b-form-checkbox>
                </li>
                </ol>
                </b-form-checkbox-group>
                 <span>
                          {{ errors.first('actors')}}
                        </span>
                </b-form-group> 
            </span>
            <b-button type="button" size="sm" variant="primary" @click="newactor=true">Add New</b-button>
     <br><br>
            
            <b-form-group
                      label="Select Producer:">
            <b-form-select v-model="moviesobj.producer" class="mb-3" size="sm">
                <option v-for="pro in producersdata"  :value="pro.id">
              {{ pro.name }} 
            </option>
        
      </b-form-select>
        </b-form-group>
      <b-button type="button" size="sm" variant="primary" @click="newproducer=true">Add New</b-button>
            
            <br><br>
          </b-col>
        </b-row>
    <b-button size="" variant="primary" v-on:click.prevent="submitMovie">Submit</b-button>
    
  </b-container>
        
          </b-form>
          
        </div>
        

        <div v-show="newactor">
          <newact @newValue="toggleActor"></newact>
          
        </div>

        <div v-show="newproducer">
          <newprod @newValue="toggleProducer"></newprod>
          
          
        </div>
        
  </div>
</template>
<script>
import newact from '../components/newActor'
import newprod from '../components/newProducer'
import axios from 'axios'
export default {
  props : ["movid"],
  data()  {
    
    return   {
      mov:-1,
      moviesobj: {
        id:0,
        name:'',
        yearOfRelease:'',
        plot:'',
        poster:'',
        actors:[],
        producer:1,
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
  methods: {
    submitMovie() {
      
      var self = this
    this.$validator.validateAll().then(result => {
      if(result) {
      if(this.movid>=0)
      {
        
        
        axios.put('http://localhost:3000/movies/'+this.movid,this.moviesobj).then(function(){
               
               self.$router.push({ name : "home", params: {newmov:self.moviesobj.id}})})
               .catch(error => console.log(error)|
      alert("Axios put Failed"))
              
      }
      else {
      
      this.moviesobj.id++
      
      axios.post('http://localhost:3000/movies',this.moviesobj).then(function(){
               
               self.$router.push({ name : "home", params: {newmov:self.moviesobj.id}})})
               .catch(error => console.log(error)|
      alert("Axios put Failed"))
      }
      }
      else
      {
        alert("Enter proper details")
      } 
    })},
    toggleProducer(producer,cancel) {
      
        this.newproducer=producer
        if(cancel==false)
        {
          
          axios.get('http://localhost:3000/producers')
        .then(res => {
        console.log(res);
        this.producersdata = res.data;
        this.moviesobj.producer=this.producersdata[this.producersdata.length-1].id;
        
      }
      )
      .catch(error => console.log(error)
      |
      alert("Axios get Failed"))
        }
      },
      toggleActor(actor,cancel) {
      
        this.newactor=actor
        if(cancel==false)
        {
          axios.get('http://localhost:3000/actors')
      .then(res => {
        console.log(res)
        this.actorsdata = res.data
        this.moviesobj.actors.push(this.actorsdata[this.actorsdata.length-1].id)
        
      }
      )
      .catch(error => console.log(error)
      |
      alert("Axios get Failed"))
        }
      },
      getMovies() {
    return axios.get('http://localhost:3000/movies')
      .then(res => {
        console.log(res)
        this.moviesdata = res.data
        this.moviesobj.id = this.moviesdata.length
      })
      .catch(error => console.log(error)
      |
      alert("Axios get Failed"))
  },
  getActors() {
    axios.get('http://localhost:3000/actors')
      .then(res => {
        console.log(res)
        this.actorsdata = res.data
      })
      .catch(error => console.log(error)
      )
  },
  getProducers() {
     axios.get('http://localhost:3000/producers')
      .then(res => {
        console.log(res)
        this.producersdata = res.data
      })
      .catch(error => console.log(error))
  },
   checkmovie :function() {
      // alert("checkmovie")
      if(this.movid>=0) {
        // alert("if")
        axios.get("http://localhost:3000/movies/"+this.movid)
        .then(res => {
        console.log(res)
        this.moviesobj = res.data
        
      })
      .catch(error => console.log(error))
      }
      // alert("check end")
    }
    },

    created()
    {

      this.getMovies()
      this.getActors()
      this.getProducers()
      
      this.checkmovie()
         
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
