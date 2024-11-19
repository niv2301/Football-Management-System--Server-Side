<template>
  <div>
    <b-card-text>
      
      <div align = "center">     
        <PlayerPreview
          :id="id" 
          :team_name="team_name" 
          :name="name" 
          :position="position" 
          :imageURL="imageURL" 
          >
        </PlayerPreview>
        
      Common Name: {{ common_name }}
      <br/>
      Nationality: {{ nationality }}
      <br/>
      Birth Date: {{ birth }}
      <br/>
      Birth Country: {{ birthcountry }}
      <br/>
      Height: {{ height }}
      <br/>
      Weight: {{ weight }}
      <br/>
      </div>
    </b-card-text>
  </div>
</template>

<script>
import PlayerPreview from '../components/PlayerPreview';
export default {
  components: {
    PlayerPreview
  },
  name: "player_page_by_id",
  data() {
    return {
      id: 0,
      name: "",
      imageURL: "",
      position: 0,
      team_name: "",
      common_name: "",
      nationality: "",
      birth: "",
      birthcountry: "",
      height: "",
      weight: "",
    };
  },
  methods: {
    async getFull() {
        try {
            console.log("start func");
            const response = await this.axios.get(
            `http://localhost:3000/players/fullPlayerInfo/id/[${this.$route.params.id}]`
            );
            this.id = response.data[0].id;
            this.name = response.data[0].name;
            this.imageURL = response.data[0].image;
            this.position = response.data[0].position;
            this.team_name = response.data[0].team_name;

            this.common_name = response.data[0].common_name;
            this.nationality = response.data[0].nationality;
            this.birth = response.data[0].birth;
            this.birthcountry = response.data[0].birthcountry;
            this.height = response.data[0].height;
            this.weight = response.data[0].weight;

        } catch (err) {
        console.log(err.response);
        }
    },
  },
  mounted(){
    this.getFull(); 
  }
};
</script>

<style>

</style>