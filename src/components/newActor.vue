<template>
    <div>
          <h2><b>New Actor</b></h2>
          <br>
            <form>
                <b-container fluid class="bv-example-row">
  
      <b-row>
        <b-col sm="6">
          <b-form-group
                    label="Actor Name: *">
        <b-form-input v-validate="'alpha|required'"
                        name = "aname"
                      type="text"
                      v-model="actorsobj.name"
                      placeholder="Enter Name">
        </b-form-input>
        <span>
                          {{ errors.first('aname')}}
                        </span>
      </b-form-group>

    <b-form-group
                    label="Sex:">
      <b-form-radio-group v-model="actorsobj.sex">
        <b-form-radio value="M">&nbsp;&nbsp;Male</b-form-radio>
        <b-form-radio value="F">&nbsp;&nbsp;Female</b-form-radio>
                    
      </b-form-radio-group>
      </b-form-group>

        <b-form-group
                    label="Date of Birth:">
        <b-form-input 
                      type="date"
                      v-model="actorsobj.dateOfBirth">
        </b-form-input>
      </b-form-group>

        <b-form-group
                    label="Actor Bio:">
        <b-form-textarea
                      type="text"
                      rows="3"
                      v-model="actorsobj.bio"
                      placeholder="Enter Bio">
        </b-form-textarea>
      </b-form-group>
       
        </b-col>
        <b-col sm="6">
          <span class="notbold">
              <b-form-group label="Select Movies:">
                
              <b-form-checkbox-group v-model="actorsobj.movies">
              <ol>
              <li v-for="mov in moviesdata" >
              <b-form-checkbox :value="mov.id">&nbsp;&nbsp;{{mov.name}}</b-form-checkbox>
              </li>
              </ol>
              </b-form-checkbox-group>
              </b-form-group> 
          </span>
          
          <br><br>
        </b-col>
      </b-row>
  
  
</b-container>

<b-button size="mb" variant="primary" v-on:click.prevent="submitActor">Submit</b-button>
        &nbsp;&nbsp;&nbsp;
        <b-button size="mb" variant="primary" v-on:click.prevent="cancel">Cancel</b-button>
        




<!-- 

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
                
                </ul>
                <br><br>
                <button v-on:click.prevent="submitActor">Submit</button>    <button type="button" v-on:click.prevent="cancel">Cancel</button> -->
            </form>

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
            // newact:true,
            // noupdate:false
        }
    },
    
    methods: {
        submitActor() {
          var self = this
    this.$validator.validateAll().then(result => {
      if(result) {
            this.actorsobj.id++;
            // axios.post('http://localhost:3000/actors',this.actorsobj);
            // this.$emit('newValue',!this.newact)
            
            axios.post('http://localhost:3000/actors',this.actorsobj).then(function(){
               self.$emit('newValue',false,false)
            });
      }})
            
        },
        cancel() {
        this.$emit('newValue',false, true)
    }
    
    },
    created() {
        
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
        this.actorsobj.id=this.actorsdata.length
        })
        .catch(error => console.log(error))
    }
}
</script>


