//const baseUrl = "https://localhost:7013/api/InfoScreen"
const baseUrl = "https://infoscreenapi20230104102109.azurewebsites.net/api/infoscreen"

Vue.createApp({
    data() {
        return {
            infoScreen: [],
            newInfoScreen: { id: 0, time: "", room: "", title: "", comment: "" },
            addMessage: "",
            updateData: { id: null, time: null, room: null, title: null, comment: null},
            updateMessage: "",
            deleteData: { id: null, time: null, room: null, title: null, comment: null },
            post: 0,
            deleteMessage: "",
            index: 0,
        }
    },
    methods: {
        getInfoScreen() {
            this.getInfoScreenHelper(baseUrl)
        },
        async getInfoScreenHelper(url) {
            try {
                const response = await axios.get(url)
                this.infoScreen = await response.data
                console.log(this.infoScreen)
            }
            catch (ex) {
                alert(ex.message)
            }
        },
        async addInfoScreen() {
            try {
                response = await axios.post(baseUrl, this.newInfoScreen)
                this.addMessage = "Posten er tilføjet til infoskærmen"
                setTimeout(function() {this.addMessage = ""}.bind(this), 2000)
                this.newInfoScreen.time = ""
                this.newInfoScreen.room = ""
                this.newInfoScreen.title = ""
                this.newInfoScreen.comment = ""
                this.getInfoScreen()
            }
            catch (ex) {
                alert("Udfyld alle felter for at føje posten til skærmen.")
            }
        },
        async updateInfoScreen() {
            const url = baseUrl + "/" + this.updateData.id
            try {
                response = await axios.put(url, this.updateData)
                this.updateMessage = "Posten er rettet på infoskærmen"
                setTimeout(function() {this.updateMessage = ""}.bind(this), 2000)
                this.updateData.time = ""
                this.updateData.room = ""
                this.updateData.title = ""
                this.updateData.comment = ""
                this.getInfoScreen()
            }
            catch (ex) {
                alert(ex.message)
            }
        },
        async deletePost() {
            const url = baseUrl + "/" + this.deleteData.id
            try {
                response = await axios.delete(url)
                this.deleteMessage = "Posten er slettet"
                setTimeout(function() {this.deleteMessage = ""}.bind(this), 2000)
                this.updateData.time = ""
                this.updateData.room = ""
                this.updateData.title = ""
                this.updateData.comment = ""
                this.getInfoScreen()
            }
            catch (ex) {
                alert(ex.message)
            }
        },
        //skriv måned på dansk
        currentDate() {
            var months = new Array(12);
            months[0] = "januar";
            months[1] = "februar";
            months[2] = "marts";
            months[3] = "april";
            months[4] = "maj";
            months[5] = "juni";
            months[6] = "juli";
            months[7] = "august";
            months[8] = "september";
            months[9] = "oktober";
            months[10] = "november";
            months[11] = "december";
            const current_date = new Date();
            month_value = current_date.getMonth();
            const date = `${current_date.getDate()}. ${months[month_value]}, ${current_date.getFullYear()}`;
            return date;
          },
    },
    computed: {
        //Sortér opslag på tidspunkt, tidligt til sent
        sortedScreens() {
          function compare(a, b) {
            if (a.time < b.time)
              return -1;
            if (a.time > b.time)
              return 1;
            return 0;
          }
          return this.infoScreen.sort(compare);
        },
      },
    mounted() {
        this.getInfoScreen();
    },
    
}).mount("#app")

//PICTURE SLIDESHOW
var index = 0;
slideshow();

function slideshow() {
    var i;
    var pics = document.getElementsByClassName("slides");
    for (i = 0; i < pics.length; i++) {
        pics[i].style.display = "none";
    }
    index++;
    if (index > pics.length) { index = 1 }
    pics[index - 1].style.display = "block";
    setTimeout(slideshow, 30000);
}
