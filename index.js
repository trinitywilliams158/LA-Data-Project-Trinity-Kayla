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
           finalHTML +=
           `
            <h2>This is at ${item.location_common_name}</h2>
           `
       })
       resultDiv.innerHTML = finalHTML
   })
   .catch(function(error){
       console.log(error)
   })
}
// https://data.lacity.org/resource/5yt3-wwnt.json