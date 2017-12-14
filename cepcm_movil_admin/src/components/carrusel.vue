<template>
    <section>
    <b-row class="spacio">
        <b-col>
            <b-carousel id="carousel1" style="text-shadow: 1px 1px 2px #333;" controls indicators background="#ababab" :interval="4000" img-width="1024" img-height="480" v-model="slide" @sliding-start="onSlideStart" @sliding-end="onSlideEnd">
                <b-carousel-slide caption="First slide" text="Nulla vitae elit libero, a pharetra augue mollis interdum." img-src="https://lorempixel.com/1024/480/technics/2/"></b-carousel-slide>
                <b-carousel-slide img-src="src/assets/images/ban1.png">
                    <!--h1>Hello world!</h1-->
                </b-carousel-slide>
                <!-- Slides with image only -->
                    <b-carousel-slide img-src="src/assets/images/ban3.png">
                </b-carousel-slide>
            </b-carousel>
        </b-col>    
    </b-row>
    </section>
</template>

<script>
    export default {
    
        name: "carrusel",
    
        data() {
    
            return {
    
                slide: 0,
    
                sliding: null
    
            };
    
        },
    
        methods: {
    
            onSlideStart(slide) {
    
                this.sliding = true;
    
            },
    
            onSlideEnd(slide) {
    
                this.sliding = false;
    
            }
    
        }
    
    };
</script>

<style scoped>
    .carousel-item{
        height: 200px ;
    }
</style>
