function getLADataFromAPI(){
   var endpoint = 'https://data.lacity.org/resource/5yt3-wwnt.json'
   var inputEl = document.getElementById('search')
   var searchTerm = inputEl.value
   
   fetch(endpoint)
   .then(function(data){
       return data.json()
   })
   .then(function(json){
       var resultDiv = document.getElementById('result')
       var finalHTML = ''
       var filteredData
       if (searchTerm === "") {
        filteredData = json
       } else {
         filteredData = json.filter(function(item){
           if (item.location_address && item.location_address.human_address ) {
               var location = JSON.parse(item.location_address.human_address)
               if (location.zip === searchTerm) {
                   return true
               }
           } else {
               return false  
           }
         })
       }
       filteredData.forEach(function(item){
        var cardItem = 
        `
                 <div class="col s6 m6">
                   <div class="card">
                     <div class="card-image">
                       <img src=http://images.all-free-download.com/images/graphicthumb/tulip_flower_garden_197260.jpg>
                       <span class="card-title"> ${item.location_common_name}</span>
                     </div>
                     <div class="card-content">
                       <p>I am a very simple card. I am good at containing small bits of information.
                       I am convenient because I require little markup to use effectively.</p>
                     </div>
                     <div class="card-action">
                       <a href="#">This is a link</a>
                     </div>
                   </div>
                 </div>
        
        `
           finalHTML += cardItem
       })
       resultDiv.innerHTML = finalHTML
   })
   .catch(function(error){
       console.log(error)
   })
}
// https://data.lacity.org/resource/5yt3-wwnt.json