<template>
<div class="menu">
    <b-nav tabs>
        <b-nav-item v-for = "item in menuData" >
            <router-link :to="{ path: item.path }" exac>{{item.label}}</router-link>
        </b-nav-item>
    </b-nav>
    <!--ul class="navbar-nav mr-auto">
            <li class="nav-item" v-for="item in menuData">
                <router-link :to="{ path: item.path }" >{{item.label}}</router-link>
            </li>
        </ul-->

</div>
</template>

<script type="text/javascript">
  import Vue from 'vue';
    export default{
    name:'menu',
	data(){
		return {
	        mensaje:'Menu palabra reservada',
            menuData:[],
		}
	},
    created(){
           
        this.$store.state.db.ref("menu").on('value', snapshot => this.obtenerMenu(snapshot.val()))
    },
    methods: {
            obtenerMenu(dataMenu) {  
                this.menuData=[];
                for(let item in dataMenu){
                    this.menuData.push({
                        label : dataMenu[item].label,
                        path  : dataMenu[item].path
                    }) ;
                }
                
        }
    }
	}
</script>

<style type="text/css" modules>
    a.router-link-active{
        color:#f66;
    }
    li.router-link-active{
        color:#f66;
    }
</style>