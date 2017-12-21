//import firebase from 'firebase';
import axios from 'axios';

const getToken= 'http://201.145.239.66/CEPCM_MOVIL/oauth/token?grant_type=password&client_id=restapp&client_secret=restapp&username=2&password=yhTo7LRvI2dvFxReUqzAxspzZi02';
const newToken= 'http://201.145.239.66/CEPCM_MOVIL/oauth/token?grant_type=refresh_token&client_id=restapp&client_secret=restapp&refresh_token='
export default {
   /*  data(){
            return{
                token:null,
                refreshToken:null,
            }
    }, */
    //methods:{
        generarToken(){
            debugger;
            axios.get(getToken)
			.then((resp)=>{
                return resp;
                //console.log(resp);
                /* this.token = resp.value;
                this.refreshToken=resp.refreshToken; */
                /*if (resp.value!=null || resp!=undefined)
                    return resp;
                else
                return null;*/
            })
            .catch(function(err){
                return err;
            })
        },
        refreshToken(refreshToken){
            let urlRefreshToken = newToken + refreshToken;
            axios.get(urlRefreshToken)
			.then((resp)=>{
                /* this.token = resp.value;
                this.refreshToken=resp.refreshToken; */
                if (resp.value!=null || resp!=undefined)
                    return resp;
                else
                    return null;
			})
        }  

}