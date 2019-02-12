<template>
    <div>
        
<div class="modal is-active">
    <div class = "modal-background">
    </div>
    <div class = "modal-content">
        <div class="box">

        <h2><b>New Producer</b></h2>
        <br>
        <form>
        <b-container fluid class="bv-example-row">
            <b-row>
                <b-col sm="6">
                <b-form-group
                            label="Producer Name: *">
                    <b-form-input v-validate="'alpha_spaces|required'"
                        name = "producer name"
                            type="text"
                            v-model="producersobj.name"
                            placeholder="Enter Name">
                    </b-form-input>
                    <span style="color=red">
                          {{ errors.first('producer name')}}
                        </span>
                </b-form-group>

                <b-form-group
                                label="Sex:">
                <b-form-radio-group v-model="producersobj.sex"
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
                            v-model="producersobj.dateOfBirth"
                            v-validate="'required'"
      name = "date of birth">
                </b-form-input>
                <span style="color=red">
                          {{ errors.first('date of birth')}}
                        </span>
            </b-form-group>

                <b-form-group
                            label="Producer Bio:">
                <b-form-textarea
                            type="text"
                            rows="3"
                            v-model="producersobj.bio"
                            placeholder="Enter Bio">
                </b-form-textarea>
            </b-form-group>
            
               </b-col>
                <b-col sm="6">
                <span>
                    <b-form-group label="Select Movies:">
                        
                    <b-form-checkbox-group v-model="producersobj.movies">
                    <ol>
                    <li v-for="mov in moviesdata" >
                    <b-form-checkbox :value="mov.id" class="notbold">&nbsp;&nbsp;{{mov.name}}</b-form-checkbox>
                    </li>
                    </ol>
                    </b-form-checkbox-group>
                    </b-form-group> 
                </span>
                
                <br><br>
                </b-col>
            </b-row>
  
  
</b-container>
 <b-button size="mb" variant="primary" v-on:click.prevent="submitProducer">Submit</b-button>
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
            
              
            
        }
    },
    
    methods: {
        submitProducer() {
            var self = this
    this.$validator.validateAll().then(result => {
      if(result) {
            this.producersobj.id++;
           
            
            axios.post('http://localhost:3000/producers',this.producersobj).then(function(){
                self.producersobj.name=''
                self.producersobj.sex=''
                self.producersobj.dateOfBirth=''
                self.producersobj.bio=''
                self.producersobj.movies=[]
               self.$emit('newValue',false, false)
            });
      }
      else {

        alert("Enter proper details")
      } 
      })
    },
    cancel() {
        var self= this
        self.producersobj.name=''
                self.producersobj.sex=''
                self.producersobj.dateOfBirth=''
                self.producersobj.bio=''
                self.producersobj.movies=[]
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


<style>
.notbold {
    font-weight: normal !important ;
    
}
</style>
