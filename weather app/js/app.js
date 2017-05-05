class Weather
{
    constructor(options){
        console.info("constructor");
        
        // set default values
        this.weather = {};
        this.latitude = "";
        this.longitude = "";
        this.apiKey = options.apiKey;
        this.init();
    }
    
    init(){
        console.info("init function");
        this.getMyLocation();
    }
    
    getMyLocation(){
        var that = this;
        console.info("getting my location");
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log(position);
            that.latitude = position.coords.latitude;
            that.longitude = position.coords.longitude;
            that.getWeather();
        });
    }
    
    getWeather(){
        var that = this;
        console.info("getting weather");
        
        var date = new Date();
        var timestamp = date.getTime();
        
        var timeLastCall = localStorage.getItem("timeLastCall");
        var timeDifference = timestamp - timeLastCall;
        console.log(timeDifference/1000/60/60);
        
        if( (timeDifference/1000/60/60 > 1) || isNaN(timeDifference) ){
            
            console.log("more than an hour ago: new API call");
            
            const call = `https://api.darksky.net/forecast/${this.apiKey}/${this.latitude},${this.longitude}?units=ca`;
            console.log(call);

            $.ajax({
              method: "GET",
              url: call,
              dataType: "jsonp"
            }).done(function(response){
                console.log(response);
                that.weather = response.currently;
                that.updateUI();
                that.storeInCache(timestamp);
            });

        } else {
            console.log("less than an hour ago: get from storage");
            var weatherCache = localStorage.getItem("weather");
            console.log("uit de cache: "+weatherCache);
            that.weather = JSON.parse(weatherCache);
            that.updateUI();
            that.storeInCache(timeLastCall);
        }
    }
    
    updateUI(){
        console.info("Updating UI");
        console.log(this.weather.temperature);
        var color;
        if( this.weather.temperature < 15 ){
            color = "#2980b9";
        } else {
            color = "#e67e22";
        }
        $("#app").css("background-color", color);
        $("#app").append(`<h1>${Math.round(this.weather.temperature)}&deg</h1>`);
    }
    
    storeInCache(timestamp){
        var that = this;
        console.log("storing object:"+JSON.stringify(that.weather)+" in cache");
        console.log("storing timestamp:"+timestamp+" in cache");
        localStorage.setItem("timeLastCall", timestamp);
        localStorage.setItem("weather", JSON.stringify(that.weather));
    }

}

const options = {
    apiKey: "26aa70c6c51c04410bc94d6c6a3d70f6"
};

const App = new Weather(options);