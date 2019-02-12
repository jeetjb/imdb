<template>
<div class="home">
  <b-container fluid class="bv-example-row">
  <b-row >
    <b-col sm="6">
      <h3><b>Movies</b></h3>
      <ol><li v-for="movies in moviesdata">
        <b-button size='' variant="link"  @click="show=movies.id">
                {{movies.name}}
            </b-button>
      </li>
      </ol> 
    </b-col>
    <b-col sm="6">
      <moviedetails>
        <h3><b>Movie Details</b></h3>
        
          <span v-for="movies in moviesdata">
            <span v-if="movies.id==show">
          <img :src="movies.poster" width="100px" height="100px"/> 
          <br><br>
          <ul>
            
          <li><b>Movie Name : </b>{{movies.name}}</li>
          <li><b>Year of Release :</b> {{movies.yearOfRelease}}</li>
          <li><b>Actors : </b>
            <ol>
              
              <div style="margin-left:5%" v-for="actors in actorsdata">
                <li v-if="(actors.id==movies.actors[0] || actors.id==movies.actors[1] || actors.id==movies.actors[2])">
                  {{ actors.name }}
                </li>
               
              </div>
            </ol>
          
          </li>
          <li><b>Producers :</b> 
            
             
            <span> {{ filterProducer(producersdata,movies) }} </span>

          </li>
          <br><br>
        </ul> 
        <b-button type="button" @click="deletemovie(show)">Delete</b-button> &nbsp;&nbsp;
        <b-button type="button" @click="editmovie(show)">Edit</b-button>
            </span></span>
            <span v-if="!(show>=0) || show==''">Select a Movie</span>
          </moviedetails>
          
    </b-col>
  </b-row>
  
</b-container>








    
</div>
</template>

<script>
import axios from 'axios'
import moviedetails from '../components/moviedetails'
export default {
  props: ["newmov"],
  components : {
    moviedetails
  },
  data () {
    return{
        moviesdata: '' ,
        actorsdata: '',
        producersdata: '',
        show: this.newmov,
        del: false,
    }
  },
 
methods: {
  getMovies() {
    return axios.get('http://localhost:3000/movies')
      .then(res => {
        console.log(res)
        this.moviesdata = res.data
      })
      .catch(error => console.log(error)|
      alert("Axios get Failed"))
      
  },
  getActors() {
    axios.get('http://localhost:3000/actors')
      .then(res => {
        console.log(res)
        this.actorsdata = res.data
      })
      .catch(error => console.log(error)|
      alert("Axios get Failed"))
  },
  getProducers() {
     axios.get('http://localhost:3000/producers')
      .then(res => {
        console.log(res)
        this.producersdata = res.data
      })
      .catch(error => console.log(error)|
      alert("Axios get Failed"))
  },
  filterProducer(data1,data2) {
    var res = data1.filter(dat => dat.id==data2.producer);
    return res[0].name;
    
  },
 
  deletemovie(id) {
    let self = this;
    axios.delete("http://localhost:3000/movies/"+id)
    .then(self.getMovies)
    .catch(error => console.log(error)|
      alert("Axios delete Failed")); 
    this.show='';
    
  },
  editmovie(id) {
    this.$router.push({ name : "add", params: {movid:id}})
  }
},

    created()
    {
      this.getMovies()
      this.getActors()
      this.getProducers()
      

     
    }


}
</script>

<style>
.home  {
  margin-left: 10%;
  border: 3pt;
  
}
</style>
