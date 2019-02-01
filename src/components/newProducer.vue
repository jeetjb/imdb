<template>
    <div>
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
          
          </ul>
          <br><br>
          <button v-on:click.prevent="submitProducer">Submit</button>    <button type="button" v-on:click.prevent="cancel">Cancel</button>
            </form>
        </div>
</template>

<script>
import axios from 'axios'
export default {
    
    data () {
        return {
            producersobj: {
                id:0,
                name:'',
                sex:'',
                dateOfBirth:'',
                bio:'',
                movies:[],
            }, 
            moviesdata: '',   
            producersdata: '' ,
            
                newprod:true,
                noup:false
            
        }
    },
    
    methods: {
        submitProducer() {
            this.producersobj.id++;
            // axios.post('http://localhost:3000/producers',this.producersobj);
            // this.$emit('newValue',!this.newprod)
            var self = this; 
            
            axios.post('http://localhost:3000/producers',this.producersobj).then(function(){
               self.$emit('newValue',!self.newprod, self.noup)
            });
    },
    cancel() {
        this.$emit('newValue',!this.newprod, !this.noup)
    }
    },
    created() {
        
        axios.get('http://localhost:3000/movies')
        .then(res => {
        console.log(res)
        this.moviesdata = res.data
        this.moviesobj.id=this.moviesdata.length
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
}
</script>


