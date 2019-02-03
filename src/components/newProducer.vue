<template>
    <div>
        
        <h2><b>New Producer</b></h2>
        <br>
        <form>
        <b-container fluid class="bv-example-row">
            <b-row>
                <b-col sm="6">
                <b-form-group
                            label="Producer Name:">
                    <b-form-input 
                            type="text"
                            v-model="producersobj.name"
                            placeholder="Enter Name">
                    </b-form-input>
                </b-form-group>

                <b-form-group
                                label="Sex:">
                <b-form-radio-group v-model="producersobj.sex">
                    <b-form-radio value="M">&nbsp;&nbsp;Male</b-form-radio>
                    <b-form-radio value="F">&nbsp;&nbsp;Female</b-form-radio>
                                
                </b-form-radio-group>
                </b-form-group>

                <b-form-group
                            label="Date of Birth:">
                <b-form-input 
                            type="date"
                            v-model="producersobj.dateOfBirth">
                </b-form-input>
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
                <span class="notbold">
                    <b-form-group label="Select Movies:">
                        
                    <b-form-checkbox-group v-model="producersobj.movies">
                    <ol>
                    <li v-for="mov in moviesdata" :key="mov">
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
 <b-button size="mb" variant="primary" v-on:click.prevent="submitProducer">Submit</b-button>
                &nbsp;&nbsp;&nbsp;
                <b-button size="mb" variant="primary" v-on:click.prevent="cancel">Cancel</b-button>
                
            </form>


          <!-- <h3>New Producer</h3>
          
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
          <button v-on:click.prevent="submitProducer">Submit</button>    <button type="button" v-on:click.prevent="cancel">Cancel</button> -->

            <!-- </form> -->
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


