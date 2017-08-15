//PLUGIN => 

function buildMarkupforRow(inputs, nullvalue){//build markup for table row with all inputs and header
	var markup = "";
	markup += "<tr><td><input type='checkbox' name='item'></td>"//row start
	$.each(inputs, function(index, value ){
		markup += "<td>"
		if (value.type){
			if (value.type == "select"){
				markup += "<select name='" + value.name + "' saveto='" + value.saveto + "'>"
					$.each(value.options, function (index, val){
						if (index == 0){//first time is the initial value of null
							markup += "<option value='"+ nullvalue +"'>" + val + "</option>"
						}
						else{
							markup += "<option value='" + val + "'>" + val + "</option>"
						}
					})
				markup += "</select>"
			}
			else if (value.type == "datalist"){
			    markup += "<input list='" + value.name + "' name='" + value.name + "' saveto='" + value.saveto + "'>"
				markup += "<datalist id='" + value.name + "'>"
					$.each(value.options, function (index, val){
						markup += "<option value='" + val + "'>" + val + "</option>"
					})
				markup += "</datalist>"
			}
			else if (value.type == "radio"){
				$.each(value.options, function (index, val){
					if (index == 0){//first item is set to checked $("." + value.name).length/value.options.length will give you a unique value so the radio buttons in diff groups have a diff name
						markup += "<input type ='radio' saveto='" + value.saveto + "' name='" + value.name + $("." + value.name).length/value.options.length + "' value='" + val + "' class='" + value.name + "' checked>'" + val + "'";
					}
					else{
						markup += "<input type ='radio' saveto='" + value.saveto + "' name='" + value.name + $("." + value.name).length/value.options.length + "' value='" + val + "'>'" + val + "'";
					}
				})
			}
			else if (value.type == "textarea"){
				markup += "<textarea name='" + value.name + "' saveto='" + value.saveto + "'></textarea>"
			}
			else if (value.type == "checkbox"){
				if (value.name != "Confirm"){
					markup += "<input type='checkbox' name='" + value.name + "' saveto='" + value.saveto + "' style='width:20px'>"
				}else {
					markup += "<input type='checkbox' name='" + value.name + "' saveto='" + value.saveto + "' style='width:20px' onclick='ConfirmClick($(this))'>"//
				}
			}
			else {//text, password and anything else
				markup += "<input name='" + value.name + "' type='" + value.type + "' saveto='" + value.saveto + "'/>";	
			}
		}
		else {
			markup += "Please you specify a valid input type e.g text, password, textarea, radio, select, checkbox, datalist or autocomplete";	
		}
		markup += "</td>"
	});
	markup += "</tr>"//row end
	return markup;
}

function buildMarkupforHeader(inputs){
//build markup for table row and header
	var markup = "<tr><th></th>" //add th for checkboxbackground-color: #4CAF50;
	$.each(inputs, function(index, value ){
		markup += "<th>" + value.heading + "</th>";	
	})
	markup += "</tr>"
	return markup;
}

function formBuilder (appendTo, appendedId, addButtonLabel, removeButtonLabel, inputs, nullvalue){
	var rowMarkup = buildMarkupforRow(inputs, nullvalue)
	var headerMarkup = buildMarkupforHeader(inputs)
	$(appendTo + " table.DocOutline").hide() // hide all the saveto rows
	
	$(appendTo).append('<table id="' + appendedId + '" class="data-records">' + headerMarkup).append("<p></p><button class='addItem button' type='button'>" + addButtonLabel +"</button><button class='removeItem button' type='button'>" + removeButtonLabel +"</button>");
	
	//add button function
	$(".addItem").click(function(){
		$(this).parent().find('table#' + appendedId).append(rowMarkup);
		//$('.data-records tr:nth-child(even)').css({"background-color": "#f2f2f2"});
	});
	
	//remove button function
	$(".removeItem").click(function(){
		$("table#" + appendedId).find('input[name="item"]').each(function(){
			if($(this).is(":checked")){
				$(this).closest("tr").remove()
			}
		});
		//$('.data-records tr:nth-child(even)').css({"background-color": "#f2f2f2"})
	});
	
	$(appendTo).append('</table>')//close table
}