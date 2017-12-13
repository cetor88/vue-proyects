<template>
  <div class="footer">
    This footer will always be positioned at the bottom of the page, but 
      <strong>not fixed</strong>
       <h6>Example heading <b-badge>New</b-badge></h6>
  .</div>
    <!--footer class="page-footer">
      <div class="container footer">
        <div class="row">
          <div class="col l6 s12">
            <h5 class="white-text">Footer Content</h5>
            <p class="grey-text text-lighten-4">You can use rows and columns here to organize your footer content.</p>
            <h1> © 2014 Copyright Text </>
          </div>
        </div>
      </div>
    </footer-->
</template>

<script>
import Vue from 'vue'

export default{

 }   
</script>

<style modules>

html {
  height: 100%;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

body {
  position: relative;
  margin: 0;
  padding-bottom: 6rem;
  min-height: 100%;
  font-family: "Helvetica Neue", Arial, sans-serif;
}



.bv-example-row container {
  margin: 0 auto;
  padding-top: 64px;
  max-width: 640px;
  width: 94%;
}

.bv-example-row container h1 {
  margin-top: 0;
}



/**
 * Footer Styles
 */

.footer {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 1rem;
  background-color: #efefef;
  text-align: center;
}
</style>