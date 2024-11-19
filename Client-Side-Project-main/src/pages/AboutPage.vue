
<template>
  
  <div class="modal-body">
    <h2 align = "center">About</h2>
    <p align = "center">
      Welcome to Our Danish Superliga website!<br>
      Here you can find informative data about players, teams, past and future matches.<br>
      You can also save your favorite matches that interest you.<br>
      In this website we used Sportmonks API.<br>
      This website was developed and designed by Alona Lasry & Niv Meir. Enjoy!<br>
    </p>
    <p align = "center">
      <img src="../assets/superliga.png">
    </p>
    <br>
    <br>

    
  </div>
   
</template>

<script>
export default {
  name: "about",
};
</script>

<style>

.p {
  align-content: center;
}

/* The Modal (background) */
.modalAbout, .modalPlayAgain {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    padding-top: 100px; /* Location of the box */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
  }

  /**************************** Modal Content ******************************/
  .modal-content {
    position: relative;
    background-color: #fefefe;
    margin: auto;
    padding: 0;
    border: 1px solid #888;
    width: 80%;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
    -webkit-animation-name: animatetop;
    -webkit-animation-duration: 0.4s;
    animation-name: animatetop;
    animation-duration: 0.4s
  }
</style>
