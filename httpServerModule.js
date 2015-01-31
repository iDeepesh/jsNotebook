module.exports = {

	responseBuilder: function(){
		var response = "";
		return function(data){
			if(data === undefined){
				return response;
			}
			
			console.log(data);
			response += data;
			return response += "\n";
		};
	}

}