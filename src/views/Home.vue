<template>
  <div class="home">
    <h3>Movies</h3>
    <ul>
      <li v-for="movies in moviesdata" :key="movies">
        <ul>
          
          <li><b>Movie Name : </b>{{movies.name}}</li>
          <li><b>Year of Release :</b> {{movies.yearOfRelease}}</li>
          <li><b>Actors : </b>
            <ol>
              <div v-for="actors in actorsdata" :key="actors">
                <li v-if="(actors.id==movies.actors[0] || actors.id==movies.actors[1] || actors.id==movies.actors[2])">
                  {{ actors.name }}
                </li>
                <!-- <li>
                  {{funt2(movies.actors,actors)}}
                </li> -->
              </div>
            </ol>
            
          


          <!-- <span> {{ funt2(actorsdata,movies) }} </span> -->
          </li>
          <li><b>Producers :</b> 
            
              <!-- <span v-for="producers in producersdata" :key="producers">
                <span v-if="(producers.id==movies.producer)">
                  {{ producers.name }}
                </span>
              </span> -->
            <span> {{ filterProd(producersdata,movies) }} </span>

          </li>
          <br><br>
        </ul> 
      </li>
    </ul> 
      
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return{
        moviesdata: '' ,
        actorsdata: '',
        producersdata: ''
    }
  },
 
methods: {
  filterProd(data1,data2) {
    var res = data1.filter(dat => dat.id==data2.producer);
    return res[0].name;
  },
  // funt2(data1,data2) {
  //   var res = data1.filter(dat => dat==data2.id);;
  //   return res;
  // }
},
  // methods: {
    created()
    {
      axios.get('http://localhost:3000/movies')
      .then(res => {
        console.log(res)
        this.moviesdata = res.data
      })
      .catch(error => console.log(error))

      axios.get('http://localhost:3000/actors')
      .then(res => {
        console.log(res)
        this.actorsdata = res.data
      })
      .catch(error => console.log(error))

      axios.get('http://localhost:3000/producers')
      .then(res => {
        console.log(res)
        this.producersdata = res.data
      })
      .catch(error => console.log(error))
    }
  // }

}
</script>
