<template>
    <div>
          <h3>New Actor</h3>
          
            <form>
              <span>Name  </span>
              <input type="text" v-model="actorsobj.name"><br><br>

              <span>Sex  </span><br>
              <!-- <input type="radio" value="M" v-model="actorsobj.sex">
              <label>Male</label><br>
              <input type="radio" value="F" v-model="actorsobj.sex">
              <label>Female</label> -->
              <button-group type="primary" :value.sync="actorsobj.sex">
                <Radio value="M">Male</Radio>
                <Radio value="F">Female</Radio>
    
                </button-group>
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
                
                </ul>
                <br><br>
                <button v-on:click.prevent="submitActor">Submit</button>    <button type="button" v-on:click.prevent="cancel">Cancel</button>
            </form>

            {{newValue}}
        </div>    
</template>

<script>
import axios from 'axios'
import { Radio } from 'vue-strap'
export default {
    
    data () {
        return {
            actorsobj: {
                id:0,
                name:'',
                sex:'',
                dateOfBirth:'',
                bio:'',
                movies:[],
            }, 
            moviesdata: '',   
            actorsdata: '' ,
            newact:true,
            noup:false
        }
    },
    
    methods: {
        submitActor() {
            this.actorsobj.id++;
            // axios.post('http://localhost:3000/actors',this.actorsobj);
            // this.$emit('newValue',!this.newact)
            var self = this; 
            axios.post('http://localhost:3000/actors',this.actorsobj).then(function(){
               self.$emit('newValue',!self.newact,self.noup)
            });
            
        },
        cancel() {
        this.$emit('newValue',!this.newact, !this.noup)
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

        axios.get('http://localhost:3000/actors')
        .then(res => {
        console.log(res)
        this.actorsdata = res.data
        this.actorsobj.id=this.actorsdata.length
        })
        .catch(error => console.log(error))
    }
}
</script>


