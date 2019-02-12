<template>
    <div>

        <div class="modal is-active">
    <div class = "modal-background">
    </div>
    <div class = "modal-content">
        <div class="box">
        

          <h2><b>New Actor</b></h2>
          <br>
            <form>
                <b-container fluid class="bv-example-row">
  
      <b-row>
        <b-col sm="6">
          <b-form-group
                    label="Actor Name: *">
        <b-form-input v-validate="'alpha_spaces|required'"
                        name = "actor name"
                      type="text"
                      v-model="actorsobj.name"
                      placeholder="Enter Name">
        </b-form-input>
        <span style="color=red">
                          {{ errors.first('actor name')}}
                        </span>
      </b-form-group>

    <b-form-group
                    label="Sex:">
      <b-form-radio-group v-model="actorsobj.sex"
      v-validate="'required'"
      name = "sex">
        <b-form-radio value="M">&nbsp;&nbsp;Male</b-form-radio>
        <b-form-radio value="F">&nbsp;&nbsp;Female</b-form-radio>
                    
      </b-form-radio-group>
      <span style="color=red">
                          {{ errors.first('sex')}}
                        </span>
      </b-form-group>

        <b-form-group
                    label="Date of Birth:">
        <b-form-input 
                      type="date"
                      v-model="actorsobj.dateOfBirth"
                      v-validate="'required'"
      name = "date of birth">
        </b-form-input>
         <span style="color=red">
                          {{ errors.first('date of birth')}}
                        </span>
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
        

            </form>

    
        </div>
    </div>
    
</div>

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
            
        }
    },
    
    methods: {
        submitActor() {
          var self = this
    this.$validator.validateAll().then(result => {
      if(result) {
            this.actorsobj.id++;
            
            axios.post('http://localhost:3000/actors',this.actorsobj).then(function(){
              
                self.actorsobj.name=''
                self.actorsobj.sex=''
                self.actorsobj.dateOfBirth=''
                self.actorsobj.bio=''
                self.actorsobj.movies=[]
               self.$emit('newValue',false,false)
            });
      }
      else {
        alert("Enter Proper Details")
      }
      })
            
        },
        cancel() {
          var self = this
          self.actorsobj.name=''
                self.actorsobj.sex=''
                self.actorsobj.dateOfBirth=''
                self.actorsobj.bio=''
                self.actorsobj.movies=[]
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


