
var baseUrl = 'https://rest.ehrscape.com/rest/v1';
var queryUrl = baseUrl + '/query';

var username = "ois.seminar";
var password = "ois4fri";

/**
 * Prijava v sistem z privzetim uporabnikom za predmet OIS in pridobitev
 * enolične ID številke za dostop do funkcionalnosti
 * @return enolični identifikator seje za dostop do funkcionalnosti
 */
function getSessionId() {
    var response = $.ajax({
        type: "POST",
        url: baseUrl + "/session?username=" + encodeURIComponent(username) +
                "&password=" + encodeURIComponent(password),
        async: false
    });
    return response.responseJSON.sessionId;
}


/**
 * Generator podatkov za novega pacienta, ki bo uporabljal aplikacijo. Pri
 * generiranju podatkov je potrebno najprej kreirati novega pacienta z
 * določenimi osebnimi podatki (ime, priimek in datum rojstva) ter za njega
 * shraniti nekaj podatkov o vitalnih znakih.
 * @param stPacienta zaporedna številka pacienta (1, 2 ali 3)
 * @return ehrId generiranega pacienta
 */
 
 function generiranjePodatkov(){

 	$("#tukajgenerira").empty();
 	var x = document.getElementById("izberiSportnika");
    //x.remove(1);
    //x.remove(1);
    //x.remove(1);

 	var ehrId1 = generirajPodatke(1);
 	var ehrId2 = generirajPodatke(2);
 	var ehrId3 = generirajPodatke(3);

 }
 
 $(document).ready(function() {
 		$('#izberiSportnika').change(function() {
		$("#EHRSportnika").val($(this).val());
	});
 });
 
function generirajPodatke(sportnik) {
	sessionId = getSessionId();

	//začetek
    var ehrId = "";

    var ime, priimek, datumRojstva, spol;

    if (sportnik == 1) {
        ime = "Roger";
    	priimek = "Federer";
    	spol = "MALE";
    	datumRojstva = "1972-03-02T12:22";
    } else if (sportnik == 2) {
        ime = "Anže";
    	priimek = "Kopitar";
    	spol = "MALE";
    	datumRojstva = "1983-07-12T15:01";
    } else if (sportnik == 3) {
        ime = "Jaka";
    	priimek = "Hvala";
    	spol = "MALE";
    	datumRojstva = "1991-01-01T22:03";
    }
	
	//Roger Federer -- Fedex
	 if (sportnik == 1) {
		$.ajaxSetup({
		    headers: {"Ehr-Session": sessionId}
		});
		$.ajax({
		    url: baseUrl + "/ehr",
		    type: 'POST',
		    success: function (data) {
		        var ehrId = data.ehrId;
		        var partyData = {
		            firstNames: ime,
		            lastNames: priimek,
		            gender: spol,
		            dateOfBirth: datumRojstva,
		            partyAdditionalInfo: [{key: "ehrId", value: ehrId}]
		        };
		        $.ajax({
		            url: baseUrl + "/demographics/party",
		            type: 'POST',
		            contentType: 'application/json',
		            data: JSON.stringify(partyData),
		            success: function (party) {
		                if (party.action == 'CREATE') {
		                    var sel = document.getElementById("izberiSportnika");
							var opt = document.createElement("option");
							opt.value = ehrId;
							opt.text = "Roger Federer";
							sel.add(opt, null);
							dodajMeritve(ehrId, "2015-02-07T12:16", "185", "87", "36.7", "130", "85", "97", "96");
							dodajMeritve(ehrId, "2015-03-08T13:18", "185", "83", "36.2", "135", "92", "96", "102");
							dodajMeritve(ehrId, "2015-03-09T09:28", "185", "82", "36.0", "128", "98", "96", "80");
							dodajMeritve(ehrId, "2015-03-10T11:55", "185", "87", "36.9", "123", "94", "92", "70");
							dodajMeritve(ehrId, "2015-03-11T20:40", "185", "86", "35.7", "122", "90", "90", "77");
							dodajMeritve(ehrId, "2016-04-12T17:37", "185", "87", "36.0", "112", "82", "88", "62");
							dodajMeritve(ehrId, "2016-04-15T12:58", "185", "86", "36.4", "142", "97", "89", "110");
							
		                    //$("#tukajgenerira").val(ehrId);
		                }
		            },
		            error: function(err) {
		            	$("#tukajgenerira").html("<span class='alert alert-info-sm'>Napaka '" +
                    JSON.parse(err.responseText).userMessage + "'!");
		            }
		        });
	  }
	});
		
	
	 }
	 //Anže Kopitar -- Kopi Star
	 if (sportnik == 2) {
		$.ajaxSetup({
		    headers: {"Ehr-Session": sessionId}
		});
		$.ajax({
		    url: baseUrl + "/ehr",
		    type: 'POST',
		    success: function (data) {
		        var ehrId = data.ehrId;
		        var partyData = {
		            firstNames: ime,
		            lastNames: priimek,
		            gender: spol,
		            dateOfBirth: datumRojstva,
		            partyAdditionalInfo: [{key: "ehrId", value: ehrId}]
		        };
		        $.ajax({
		            url: baseUrl + "/demographics/party",
		            type: 'POST',
		            contentType: 'application/json',
		            data: JSON.stringify(partyData),
		            success: function (party) {
		                if (party.action == 'CREATE') {
		                    var sel = document.getElementById("izberiSportnika");
							var opt = document.createElement("option");
							opt.value = ehrId;
							opt.text = "Anže Kopitar";
							sel.add(opt, null);
							dodajMeritve(ehrId, "2014-11-12T12:44", "192", "100", "35.0", "122", "70", "99", "100");
							dodajMeritve(ehrId, "2015-12-15T17:33", "192", "97", "37.0", "170", "67", "99", "104");
							dodajMeritve(ehrId, "2016-01-15T11:28", "192", "96", "37.2", "169", "77", "99", "99");
							dodajMeritve(ehrId, "2016-01-19T23:53", "192", "94", "36.0", "152", "77", "95", "97");
							dodajMeritve(ehrId, "2016-01-21T22:43", "192", "95", "35.5", "140", "73", "95", "105");
							dodajMeritve(ehrId, "2016-02-27T11:33", "192", "93", "36.3", "143", "82", "93", "96");
							dodajMeritve(ehrId, "2016-03-04T17:54", "192", "103", "35.4", "153", "78", "94", "94");
		                }
		            },
		            error: function(err) {
		            	$("#tukajgenerira").html("<span class='alert alert-info-sm'>Napaka '" +
                    JSON.parse(err.responseText).userMessage + "'!");
		            }
		        });
		    }
		});
		
	 }

	 //Jaka Hvala -- Jurke
	 if (sportnik == 3) {
		$.ajaxSetup({
		    headers: {"Ehr-Session": sessionId}
		});
		$.ajax({
		    url: baseUrl + "/ehr",
		    type: 'POST',
		    success: function (data) {
		        var ehrId = data.ehrId;
		        var partyData = {
		            firstNames: ime,
		            lastNames: priimek,
		            gender: spol,
		            dateOfBirth: datumRojstva,
		            partyAdditionalInfo: [{key: "ehrId", value: ehrId}]
		        };
		        $.ajax({
		            url: baseUrl + "/demographics/party",
		            type: 'POST',
		            contentType: 'application/json',
		            data: JSON.stringify(partyData),
		            success: function (party) {
		                if (party.action == 'CREATE') {
		                    var sel = document.getElementById("izberiSportnika");
							var opt = document.createElement("option");
							opt.value = ehrId;
							opt.text = "Jaka Hvala";
							sel.add(opt, null);
							dodajMeritve(ehrId, "2015-07-26T16:46", "178", "68", "35.3", "120", "72", "80", "70");
							dodajMeritve(ehrId, "2015-08-22T13:34", "178", "63", "36.3", "130", "69", "85", "74");
							dodajMeritve(ehrId, "2015-09-13T12:18", "178", "61", "36.2", "135", "78", "86", "73");
							dodajMeritve(ehrId, "2015-10-12T22:23", "178", "61", "35.0", "139", "77", "88", "67");
							dodajMeritve(ehrId, "2015-11-11T10:53", "178", "61", "34.9", "137", "77", "87", "82");
							dodajMeritve(ehrId, "2016-03-05T15:43", "178", "63", "35.9", "144", "78", "90", "88");
							dodajMeritve(ehrId, "2016-04-05T12:34", "178", "70", "36.4", "153", "90", "88", "88");
		                }
		            },
		            error: function(err) {
		            	$("#tukajgenerira").html("<span class='alert alert-info-sm'>Napaka '" +
                    JSON.parse(err.responseText).userMessage + "'!");
		            }
		        });
		    }
		});
	 }
	return ehrId;
}

function dodajMeritve(ehrId, datum, visina, teza, temp, sistol, diastol, nasic, utrip) {
	sessionId = getSessionId();
	$.ajaxSetup({
		    headers: {"Ehr-Session": sessionId}
		});
		var podatki = {
		    "ctx/language": "en",
		    "ctx/territory": "SI",
		    "ctx/time": datum,
		    "vital_signs/height_length/any_event/body_height_length": visina,
		    "vital_signs/body_weight/any_event/body_weight": teza,
		   	"vital_signs/body_temperature/any_event/temperature|magnitude": temp,
		    "vital_signs/body_temperature/any_event/temperature|unit": "°C",
		    "vital_signs/blood_pressure/any_event/systolic": sistol,
		    "vital_signs/blood_pressure/any_event/diastolic": diastol,
		    "vital_signs/indirect_oximetry:0/spo2|numerator": nasic,
		    "vital_signs/pulse/any_event/rate": utrip,
		};
		var parametriZahteve = {
		    ehrId: ehrId,
		    templateId: 'Vital Signs',
		    format: 'FLAT',
		};
		$.ajax({
		    url: baseUrl + "/composition?" + $.param(parametriZahteve),
		    type: 'POST',
		    contentType: 'application/json',
		    data: JSON.stringify(podatki),
		    success: function (res) {
		    	$("#tukajgenerira").empty();	
              $("#tukajgenerira").append("Generiranje uspešno.</br>");
		    },
		    error: function(err) {
		    	$("#tukajgenerira").html(
            "<span class='alert alert-info-sm'>Napaka '" +
            JSON.parse(err.responseText).userMessage + "'!");
		    }
		});
}

function najdiVadbisca(polozaj) {
	sessionId = getSessionId();

	$("#mapSporocilo").empty();
	
	var tezek = 0;
	var visok = 0;
	var stev6 = 0;
	var st7 = 0;
	
	var ehrId = $("#EHRSportnika").val();
	if(ehrId == 0){
		$("#mapSporocilo").append("Za nasvet na podlagi BMI prosim vnesite EHR ID. ");
	}

	$.ajax({
		url: baseUrl + "/demographics/ehr/" + ehrId + "/party",
    	type: 'GET',
    	headers: {"Ehr-Session": sessionId},
    	success: function (data) {
			var party = data.party;
			$.ajax({
			    url: baseUrl + "/view/" + ehrId + "/" + "weight",
			    type: 'GET',
			    headers: {"Ehr-Session": sessionId},
			    success: function (res) {
		    	if (res.length > 0) {
			    	for (var i in res) {
			           tezek += res[i].weight;
				           stev6++;
				        }
				        tezek /= stev6;
				        tezek = Math.round(tezek * 100) / 100;
						if(st7 == 1){
							if(parseInt(visok) >= parseInt(tezek) + 100){
								$("#mapSporocilo").append("Športnik ne potrebuje dodatne hoje, obišče lahko vadbišče znotraj kateregakoli kroga.");
							}else if(parseInt(visok) >= parseInt(tezek) + 90){
								$("#mapSporocilo").append("Glede na BMI vašega atleta, športnik potrebuje sprehod vsaj do vadbišča izven rdeče cone.");
								
							}else{
								$("#mapSporocilo").append("Glede na BMI vašega atleta, športnik potrebuje sprehod do vadbišča izven rdeče in rumene cone.");
							}	
						}
						st7++;
				        stev6 = 0;
			    	} else {
			    		$("#mapSporocilo").html(
                  "<span class='alert alert-info-sm'>" +
                  "Ni podatkov!</span>");
			    	}

			    },
			    error: function() {
			    	$("#mapSporocilo").html(
                "<span class='alert alert-info-sm'>Napaka '" +
                JSON.parse(err.responseText).userMessage + "'!");
			    }
			})
    	}	
    });
		$.ajax({
		url: baseUrl + "/demographics/ehr/" + ehrId + "/party",
    	type: 'GET',
    	headers: {"Ehr-Session": sessionId},
    	success: function (data) {
			var party = data.party;			
			$.ajax({
			    url: baseUrl + "/view/" + ehrId + "/" + "height",
			    type: 'GET',
			    headers: {"Ehr-Session": sessionId},
			    success: function (res) {
		    	if (res.length > 0) {
			    	for (var i in res) {
			           visok += res[i].height;
				           stev6++;
				        }
				        visok /= stev6;
				        visok = Math.round(visok * 100) / 100;
						if(st7 == 1){
							if(parseInt(visok) >= parseInt(tezek) + 100){
								$("#mapSporocilo").append("Športnik ne potrebuje dodatne hoje, obišče lahko vadbišče znotraj kateregakoli kroga.");
							}else if(parseInt(visok) >= parseInt(tezek) + 90){
								$("#mapSporocilo").append("Glede na BMI vašega atleta, športnik potrebuje sprehod vsaj do vadbišča izven rdeče cone.");
							}else{
								$("#mapSporocilo").append("Glede na BMI vašega atleta, športnik potrebuje sprehod do vadbišča izven rdeče in rumene cone.");
							}	
						}	
						st7++;
				        stev6 = 0;
			    	} else {
			    		$("#mapSporocilo").html(
                  "<span class='alert alert-info-sm'>" +
                  "Ni podatkov!</span>");
			    	}

			    },
			    error: function() {
			    	$("#mapSporocilo").html(
                "<span class='alert alert-info-sm'>Napaka '" +
                JSON.parse(err.responseText).userMessage + "'!");
			    }
			})
    	}	
    });

    var zemljevid;
    var podatki;
	podatki = new google.maps.InfoWindow();

	var width = 500;
	var height = 300;
	$("#map").css("width", width);
	$("#map").css("height", height);


    zemljevid = new google.maps.Map(document.getElementById('map'), {
       	center: polozaj,
       	zoom: 13
    });

    var service = new google.maps.places.PlacesService(zemljevid);
    service.nearbySearch({
    	location: polozaj,
       	radius: 5000,
        types: ['gym']
    }, konec);
    
    new google.maps.Circle({
      strokeColor: '#008000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#008000',
      fillOpacity: 0.35,
      map: zemljevid,
      center: polozaj,
      radius: 5000
    }) 
    new google.maps.Circle({
      strokeColor: '#FFFF00',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FFFF00',
      fillOpacity: 0.35,
      map: zemljevid,
      center: polozaj,
      radius: 4000
    })  
    new google.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map: zemljevid,
      center: polozaj,
      radius: 2000
    })  

  	function konec(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
      		for (var i = 0; i < results.length; i++) {
    			createMarker(results[i]);
      		}
        }
  	}

  	function createMarker(place) {
        var marker = new google.maps.Marker({
      		map: zemljevid,
          	position: place.geometry.location,
          	animation:google.maps.Animation.BOUNCE
        });

		google.maps.event.addListener(marker,'click',function() {
		zemljevid.setZoom(17);
		zemljevid.setCenter(marker.getPosition());
		});
		
        google.maps.event.addListener(marker, 'click', function() {
        	podatki.setContent(place.name);
          	podatki.open(zemljevid, this);
        });
  	}

  	
}

function prikaziBliznjaVadbiscaInPriporociOddaljenost() {
	var options = {
		enableHighAccuracy: true
	};
	
	function error(err) {
		window.alert('ERROR(' + err.code + '): ' + err.message);
	};

	function success(pos) {
		var crd = pos.coords;
		var polozaj =  {lat: crd.latitude, lng: crd.longitude}; 
    	najdiVadbisca(polozaj);
	};

navigator.geolocation;
navigator.geolocation.getCurrentPosition(success, error, options);

}

//konc

function graf(sistol, diastol, kisik, utrip){
 		var sis = ((sistol - 50)*2) + 27;
 		var dis = ((diastol - 50)*2) + 27;
 		var kis = ((kisik - 50)*2) + 27;
 		var utp = ((utrip - 50)*2) + 27;
        var w = 500;
        var h = 300;
        var padding = 30;
        
        var yScale = d3.scale.linear().domain([50, 170]).range([h - padding, padding]);
       

        var svg = d3.select("#graf")
        				.append("svg")
        				.style("border", "1px solid #182948")
        				.style("background-color", "white")
        				.attr("width", w)
        				.attr("height", h)

        var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("left")
            .ticks(10);
           
        //sistol    
        svg.append("rect")
        .attr("x", 70)
        .attr("y", h - sis)
        .attr("width", 50)
        .attr("height", sis)
        .attr("fill", "#182948");
        
        svg.append("line")
        .attr("x1", 60)
        .attr("y1", h-207)
        .attr("x2", 130)
        .attr("y2",  h-207)
        .attr("stroke-width", 2)
        .attr("stroke", "black");    
        
        svg.append("line")
        .attr("x1", 60)
        .attr("y1", h-247)
        .attr("x2", 130)
        .attr("y2",  h-247)
        .attr("stroke-width", 2)
        .attr("stroke", "#D7D700");   
        
        svg.append("line")
        .attr("x1", 60)
        .attr("y1", h-287)
        .attr("x2", 130)
        .attr("y2",  h-287)
        .attr("stroke-width", 2)
        .attr("stroke", "red");   

        //diastol
        svg.append("rect")
        .attr("x", 170)
        .attr("y", h - dis)
        .attr("width", 50)
        .attr("height", dis)
        .attr("fill", "#182948");
        
        svg.append("line")
        .attr("x1", 160)
        .attr("y1", h-107)
        .attr("x2", 230)
        .attr("y2",  h-107)
        .attr("stroke-width", 2)
        .attr("stroke", "black");    
        
        svg.append("line")
        .attr("x1", 160)
        .attr("y1", h-127)
        .attr("x2", 230)
        .attr("y2",  h-127)
        .attr("stroke-width", 2)
        .attr("stroke", "#D7D700");   
        
        svg.append("line")
        .attr("x1", 160)
        .attr("y1", h-147)
        .attr("x2", 230)
        .attr("y2",  h-147)
        .attr("stroke-width", 2)
        .attr("stroke", "red");   

        //kisik
        svg.append("rect")
        .attr("x", 270)
        .attr("y", h - kis)
        .attr("width", 50)
        .attr("height",  kis)
        .attr("fill", "#182948");
        
        svg.append("line")
        .attr("x1", 260)
        .attr("y1", h-97)
        .attr("x2", 330)
        .attr("y2",  h-97)
        .attr("stroke-width", 2)
        .attr("stroke", "#D600D6");    
        
        svg.append("line")
        .attr("x1", 260)
        .attr("y1", h-107)
        .attr("x2", 330)
        .attr("y2",  h-107)
        .attr("stroke-width", 2)
        .attr("stroke", "#00D6D6");   

        //utrip
        svg.append("rect")
        .attr("x", 370)
        .attr("y", h -  utp)
        .attr("width", 50)
        .attr("height",  utp)
        .attr("fill", "#182948");
        
        svg.append("line")
        .attr("x1", 360)
        .attr("y1", h-37)
        .attr("x2", 430)
        .attr("y2",  h-37)
        .attr("stroke-width", 2)
        .attr("stroke", "#D600D6");    
        
        svg.append("line")
        .attr("x1", 360)
        .attr("y1", h-147)
        .attr("x2", 430)
        .attr("y2",  h-147)
        .attr("stroke-width", 2)
        .attr("stroke", "#D7D700");   

		svg.append("line")
        .attr("x1", 360)
        .attr("y1", h-187)
        .attr("x2", 430)
        .attr("y2",  h-187)
        .attr("stroke-width", 2)
        .attr("stroke", "red"); 

        svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + padding + ",0)")
        .style("fill","#182948")
        .call(yAxis);
       
        svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 40)
        .attr("x", 60 - (h / 2))
        .attr("dy", "1em")
        .style("text-anchor", "start")
        .style("fill","#182948")
        .attr("font-family", "sans-serif")
        .text("Vrednost");
        
        svg.append("text")
        .attr("x", w - 120)
        .attr("y", 20)
        .style("text-anchor", "start")
        .style("fill","#182948")
        .attr("font-family", "sans-serif")
        .text("Legenda:");
        svg.append("text")
        .attr("x", w - 120)
        .attr("y", 35)
        .style("text-anchor", "start")
        .style("fill","black")
        .attr("font-family", "sans-serif")
        .text("Nekoliko preveč");
         svg.append("text")
        .attr("x", w - 120)
        .attr("y", 50)
        .style("text-anchor", "start")
        .style("fill","#D7D700")
        .attr("font-family", "sans-serif")
        .text("Precej preveč");
         svg.append("text")
        .attr("x", w - 120)
        .attr("y", 65)
        .style("text-anchor", "start")
        .style("fill","red")
        .attr("font-family", "sans-serif")
        .text("Zelo nevarno!");
        svg.append("text")
        .attr("x", w - 120)
        .attr("y", 95)
        .style("text-anchor", "start")
        .style("fill","#D600D6")
        .attr("font-family", "sans-serif")
        .text("Precej Premalo");
        svg.append("text")
        .attr("x", w - 120)
        .attr("y", 80)
        .style("text-anchor", "start")
        .style("fill","00D6D6")
        .attr("font-family", "sans-serif")
        .text("Premalo");
               
        svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 95)
        .attr("x", 10 - h)
        .style("text-anchor", "start")
        .style("fill","#8B0000")
        .attr("font-family", "sans-serif")
        .attr("font-size", "17px")
        .text("Sistolični krvni tlak");
       
        svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 195)
        .attr("x", 10 - h)
        .style("text-anchor", "start")
        .style("fill","#8B0000")
        .attr("font-family", "sans-serif")
        .attr("font-size", "17px")
        .text("Diastolični krvni tlak");
       
        svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 295)
        .attr("x", 10 - h)
        .style("text-anchor", "start")
        .style("fill","#8B0000")
        .attr("font-family", "sans-serif")
        .attr("font-size", "17px")
        .text("Nasičenost krvi s kisikom");
        
        svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 395)
        .attr("x", 10 - h)
        .style("text-anchor", "start")
        .style("fill","#8B0000")
        .attr("font-family", "sans-serif")
        .attr("font-size", "17px")
        .text("Srčni utrip");

}

var stanje = "";
var stanje2 = "";
var stanje3 = "";
var stevec3 = 0;
var stevec4 = 0;
var st5 = 0;
var stevec2 = 0;


function prikaziVitalnaOdstopanjaInPodajNasvet() {
	sessionId = getSessionId();
	var ehrId = $("#preglejVitalnoEHR").val();
	
	var sistolicniKrvniTlak = 0;
	var diastolicniKrvniTlak = 0;
	var nasicenostKrviSKisikom = 0;
	var srcniUtrip = 0; 
	var datumInUra = 0;
	var telesnaVisina = 0;
	var telesnaTeza = 0;
	var telesnaTemperatura = 0;
	var st5 = 0;
	$("#opisanoStanje").empty();
	$("#opisanoStanje2").empty();
	$("#opisanoStanje3").empty();
	//tu delamo

		$.ajax({
			url: baseUrl + "/demographics/ehr/" + ehrId + "/party",
	    	type: 'GET',
	    	headers: {"Ehr-Session": sessionId},
	    	success: function (data) {
				var party = data.party;
					
					$.ajax({
	 			    url: baseUrl + "/view/" + ehrId + "/" + "blood_pressure",
				    type: 'GET',
				    headers: {"Ehr-Session": sessionId},
				    success: function (res) {
				    	if (res.length >= 0) {
					    	for (var i in res) {
								sistolicniKrvniTlak += res[i].systolic;
								diastolicniKrvniTlak += res[i].diastolic;
								stevec3++;
								stevec4++;
					        }
					        sistolicniKrvniTlak /= stevec3;
					        diastolicniKrvniTlak /= stevec4;
					        if(sistolicniKrvniTlak >= 180){
					        	stanje += "Športnikov sistolični krvni tlak je šel čez vse meje. Nujno k zdravniku. ";
							}else if(sistolicniKrvniTlak >= 160){
								stanje += "Športnikov sistolični krvni tlak je precej previsok. Posvetujte se z zdravnikom. ";
							}else if(sistolicniKrvniTlak > 140){
								stanje += "Športnikov sistolični krvni tlak je malenkost previsok. Opazujte naslednjo meritev. ";
							}if(diastolicniKrvniTlak >= 110){
								stanje += "Športnikov diastolični krvni tlak je šel čez vse meje. Nujno k zdravniku. ";
							}else if(diastolicniKrvniTlak >= 100){
								stanje += "Športnikov diastolični krvni tlak je precej previsok. Posvetujte se z zdravnikom. ";
							}else if(diastolicniKrvniTlak > 90){
								stanje += "Športnikov diastolični krvni tlak je malenkost previsok. Opazujte naslednjo meritev. ";
							}
							$("#opisanoStanje").html("<br/><span><b>Nasvet: </b>" + stanje +"</span>");
								if(st5 == 2){
									graf(sistolicniKrvniTlak, diastolicniKrvniTlak, nasicenostKrviSKisikom, srcniUtrip);
								}	
					        stevec3 = 0;
					        stevec4 = 0;
					        st5++;
					        stanje = "";
				    	}
				    },	
				    error: function() {
				    	$("#opisanoStanje").html(
	                "<span class='alert alert-info-sm'>Napaka '" +
	                JSON.parse(err.responseText).userMessage + "'!");
				    }
				});
	    	}	
		});


		$.ajax({
			url: baseUrl + "/demographics/ehr/" + ehrId + "/party",
	    	type: 'GET',
	    	headers: {"Ehr-Session": sessionId},
	    	success: function (data) {
				var party = data.party;
				$.ajax({
				    url: baseUrl + "/view/" + ehrId + "/" + "spO2",
				    type: 'GET',
				    headers: {"Ehr-Session": sessionId},
				    success: function (res) {
				    	if (res.length >= 0) {
					    	for (var i in res) {
					           nasicenostKrviSKisikom += res[i].spO2;
					           stevec3++;
					        }
					        nasicenostKrviSKisikom /= stevec3;
					        if(nasicenostKrviSKisikom <= 85){
								stanje2 += "Športnik ima v krvi premalo kisika. Nujno pojdite k zdravniku. "; stevec2++;
							}else if(nasicenostKrviSKisikom <= 90){
								stanje2 += "Športnik ima v krvi premalo kisika. Če znate mu dovedite kisik, če tega ne obvladate pojdite k zdravniku. "; stevec2++;
							}else if(nasicenostKrviSKisikom > 100){
								stanje2 += "Napaka pri vnosu podatkov, saj v krvi ne more biti več kot 100% kisika. "; stevec2++;
							}
							$("#opisanoStanje2").append(stanje2);
					        if(st5 == 2){
								graf(sistolicniKrvniTlak, diastolicniKrvniTlak, nasicenostKrviSKisikom, srcniUtrip);
							}	
 							st5++;
					        stevec3 = 0;
					        stanje2 = "";
				    	}
				    },
				    error: function() {
				    	$("#opisanoStanje2").html(
	                "<span class='alert alert-info-sm'>Napaka '" +
	                JSON.parse(err.responseText).userMessage + "'!");
				    }
				});
	    	}	
		});


		$.ajax({
				url: baseUrl + "/demographics/ehr/" + ehrId + "/party",
		    	type: 'GET',
		    	headers: {"Ehr-Session": sessionId},
		    	success: function (data) {
					var party = data.party;
					$.ajax({
						url: baseUrl + "/view/" + ehrId + "/" + "pulse",
					    type: 'GET',
					    headers: {"Ehr-Session": sessionId},
					    success: function (res) {
					    	if (res.length >= 0) {
						    	for (var i in res) {
						           srcniUtrip += res[i].pulse;
						           stevec3++;
						        }
						        srcniUtrip /= stevec3;
								if(srcniUtrip >= 120){
									stanje3 += "Zelo previsok srčni utrip nakazuje, da morate športniku nakloniti nekaj lažjih treningov. "; stevec2++;
								}else if(srcniUtrip >= 110){
									stanje3 += "Treningi so na robu atletovih zmožnosti, saj je njegov srčni utrip res visok. "; stevec2++;
								}else if(srcniUtrip >= 95){
									stanje3 += "Na podlagi srčnega utripa se treningi se izkazujejo za zelo primerne. "; stevec2++;
								}else if(srcniUtrip >= 80){
									stanje3 += "Športnik je pripravljen na resnejše treninge. "; stevec2++;
								}else if(srcniUtrip >= 70){
									stanje3 += "Treningi te vrste za vašega atleta ne predstavljajo nobenih težav, saj ima nizek srčni utrip. "; stevec2++;
								}else if(srcniUtrip >= 55){
									stanje3 += "Športnik se ob vaših treningih sploh ne utrudi. "; stevec2++;
								}else if(srcniUtrip < 55){
									stanje3 += "Športnik ima zaskrbljujoče nizek srčni utrip. "; stevec2++;
								}
								$("#opisanoStanje3").append(stanje3);
								if(st5 == 2){
									graf(sistolicniKrvniTlak, diastolicniKrvniTlak, nasicenostKrviSKisikom, srcniUtrip);
								}	
								st5++;
						        stevec3 = 0;
						        stanje3 = "";
					    	}
					    },
					    error: function() {
					    	$("#opisanoStanje3").html(
		                "<span class='alert alert-info-sm'>Napaka '" +
		                JSON.parse(err.responseText).userMessage + "'!");
					    }
					});
		
		    	}	
			});

	$("#vitalnaOdstopanjaSporocilo").empty();
	$("#graf").empty();

	if (ehrId == 0) {
		$("#vitalnaOdstopanjaSporocilo").html("<span class='alert alert-info-sm'>Prosim vnesite zahtevane podatke!</span>");
	}
}

var povp = 0;
var stevec = 0;
var povp2 = 0;

function tezaPodrobno(){
	sessionId = getSessionId();

	var ehrId = $("#EHRSportnika").val();
	$("#tezaIme").empty();

		$.ajax({
			url: baseUrl + "/demographics/ehr/" + ehrId + "/party",
	    	type: 'GET',
	    	headers: {"Ehr-Session": sessionId},
	    	success: function (data) {
				var party = data.party;
					$.ajax({
  					    url: baseUrl + "/view/" + ehrId + "/" + "weight",
					    type: 'GET',
					    headers: {"Ehr-Session": sessionId},
					    success: function (res) {
					    	if (res.length > 0) {
						    	var results = "<table class='table table-striped " +
                    "table-hover'><tr><th>Datum in ura</th>" +
                    "<th class='text-right'>Telesna teža</th></tr>";
						        for (var i in res) {
						            results += "<tr><td>" + res[i].time +
                          "</td><td class='text-right'>" + res[i].weight +
                          " " + res[i].unit + "</td>";
						        }
						        results += "</table>";
						        $("#tezaIme").append(results);
					    	}
					    }
					});

	    		}
		});
	
}

function temperaturaPodrobno(){	 
	sessionId = getSessionId();

	var ehrId = $("#EHRSportnika").val();
	$("#temperaturaIme").empty();

		$.ajax({
			url: baseUrl + "/demographics/ehr/" + ehrId + "/party",
	    	type: 'GET',
	    	headers: {"Ehr-Session": sessionId},
	    	success: function (data) {
				var party = data.party;
					$.ajax({
  					    url: baseUrl + "/view/" + ehrId + "/" + "body_temperature",
					    type: 'GET',
					    headers: {"Ehr-Session": sessionId},
					    success: function (res) {
					    	if (res.length > 0) {
						    	var results = "<table class='table table-striped " +
                    "table-hover'><tr><th>Datum in ura</th>" +
                    "<th class='text-right'>Telesna temperatura</th></tr>";
						        for (var i in res) {
						            results += "<tr><td>" + res[i].time +
                          "</td><td class='text-right'>" + res[i].temperature +
                          " " + res[i].unit + "</td>";
						        }
						        results += "</table>";
						        $("#temperaturaIme").append(results);
					    	}
					    }
					});

	    		}
		});
}

function sistolPodrobno(){
		sessionId = getSessionId();

	var ehrId = $("#EHRSportnika").val();
	$("#sistolicniIme").empty();

		$.ajax({
			url: baseUrl + "/demographics/ehr/" + ehrId + "/party",
	    	type: 'GET',
	    	headers: {"Ehr-Session": sessionId},
	    	success: function (data) {
				var party = data.party;
					$.ajax({
  					    url: baseUrl + "/view/" + ehrId + "/" + "blood_pressure",
					    type: 'GET',
					    headers: {"Ehr-Session": sessionId},
					    success: function (res) {
					    	if (res.length > 0) {
						    	var results = "<table class='table table-striped " +
                    "table-hover'><tr><th>Datum in ura</th>" +
                    "<th class='text-right'>Sistolični Tlak</th></tr>";
						        for (var i in res) {
						            results += "<tr><td>" + res[i].time +
                          "</td><td class='text-right'>" + res[i].systolic +
                          " " + res[i].unit + "</td>";
						        }
						        results += "</table>";
						        $("#sistolicniIme").append(results);
					    	}
					    }
					});

	    		}
		});
}

function diastolPodrobno(){
		sessionId = getSessionId();

	var ehrId = $("#EHRSportnika").val();
	$("#diastolicniIme").empty();

		$.ajax({
			url: baseUrl + "/demographics/ehr/" + ehrId + "/party",
	    	type: 'GET',
	    	headers: {"Ehr-Session": sessionId},
	    	success: function (data) {
				var party = data.party;
					$.ajax({
  					    url: baseUrl + "/view/" + ehrId + "/" + "blood_pressure",
					    type: 'GET',
					    headers: {"Ehr-Session": sessionId},
					    success: function (res) {
					    	if (res.length > 0) {
						    	var results = "<table class='table table-striped " +
                    "table-hover'><tr><th>Datum in ura</th>" +
                    "<th class='text-right'>Diastolični Tlak</th></tr>";
						        for (var i in res) {
						            results += "<tr><td>" + res[i].time +
                          "</td><td class='text-right'>" + res[i].diastolic +
                          " " + res[i].unit + "</td>";
						        }
						        results += "</table>";
						        $("#diastolicniIme").append(results);
					    	}
					    }
					});

	    		}
		});
}

function kisikPodrobno(){
		sessionId = getSessionId();

	var ehrId = $("#EHRSportnika").val();
	$("#kisikIme").empty();

		$.ajax({
			url: baseUrl + "/demographics/ehr/" + ehrId + "/party",
	    	type: 'GET',
	    	headers: {"Ehr-Session": sessionId},
	    	success: function (data) {
				var party = data.party;
					$.ajax({
  					    url: baseUrl + "/view/" + ehrId + "/" + "spO2",
					    type: 'GET',
					    headers: {"Ehr-Session": sessionId},
					    success: function (res) {
					    	if (res.length > 0) {
						    	var results = "<table class='table table-striped " +
                    "table-hover'><tr><th>Datum in ura</th>" +
                    "<th class='text-right'>Kisik v krvi</th></tr>";
						        for (var i in res) {
						            results += "<tr><td>" + res[i].time +
                          "</td><td class='text-right'>" + res[i].spO2 +
                          " %</td>";
						        }
						        results += "</table>";
						        $("#kisikIme").append(results);
					    	} 
					    }
					});

	    		}
		});
}

function utripPodrobno(){
		sessionId = getSessionId();

	var ehrId = $("#EHRSportnika").val();
	$("#utripIme").empty();

		$.ajax({
			url: baseUrl + "/demographics/ehr/" + ehrId + "/party",
	    	type: 'GET',
	    	headers: {"Ehr-Session": sessionId},
	    	success: function (data) {
				var party = data.party;
					$.ajax({
  					    url: baseUrl + "/view/" + ehrId + "/" + "pulse",
					    type: 'GET',
					    headers: {"Ehr-Session": sessionId},
					    success: function (res) {
					    	if (res.length > 0) {
						    	var results = "<table class='table table-striped " +
                    "table-hover'><tr><th>Datum in ura</th>" +
                    "<th class='text-right'>Srčni utrip</th></tr>";
						        for (var i in res) {
						            results += "<tr><td>" + res[i].time +
                          "</td><td class='text-right'>" + res[i].pulse +
                          " " + res[i].unit + "</td>";
						        }
						        results += "</table>";
						        $("#utripIme").append(results);
					    	} 
								}
		 });

		}
		});
}

function preveriPovprecje() {
	sessionId = getSessionId();

	var ehrId = $("#EHRSportnika").val();
	$("#tezaIme").empty();
	$("#tezaTabela").empty();
	$("#kategorijaIme").empty();
	$("#kategorijaTabela").empty();
    $("#temperaturaIme").empty();
	$("#temperaturaTabela").empty();
    $("#sistolicniIme").empty();
	$("#sistolicniTabela").empty();
	$("#diastolicniIme").empty();
	$("#diastolicniTabela").empty();
	$("#kisikIme").empty();
	$("#kisikTabela").empty();
	$("#utripIme").empty();
	$("#utripTabela").empty();
	$("#izracunajPovprecjeSporocilo").empty();
	
	if (ehrId == 0) {
		$("#izracunajPovprecjeSporocilo").html("<span class='alert alert-info-sm'>Prosim vnesite zahtevane podatke!</span>");
	}


	$.ajax({
		url: baseUrl + "/demographics/ehr/" + ehrId + "/party",
    	type: 'GET',
    	headers: {"Ehr-Session": sessionId},
    	success: function (data) {
			var party = data.party;
			$("#rezultatPovprecjaSportnika").html("<br/><span>Povprečje športnika <b>'" + party.firstNames + " " + party.lastNames + "'</b>.</span><br/><br/>");
			$("#kategorijaIme").append("Kategorija");
			$("#kategorijaTabela").append("Povprečje");
			$.ajax({
			    url: baseUrl + "/view/" + ehrId + "/" + "weight",
			    type: 'GET',
			    headers: {"Ehr-Session": sessionId},
			    success: function (res) {
		    	if (res.length > 0) {
			    	for (var i in res) {
			           povp += res[i].weight;
				           stevec++;
				        }
				        povp /= stevec;
				        povp = Math.round(povp * 100) / 100;
				        $("#tezaIme").append("<button onclick=tezaPodrobno()>Teža</button>");
				        $("#tezaTabela").append(povp + " " + res[i].unit);
				        stevec = 0;
				        povp = 0;
			    	} else {
			    		$("#izracunajPovprecjeSporocilo").html(
                  "<span class='alert alert-info-sm'>" +
                  "Ni podatkov!</span>");
			    	}
			    },
			    error: function() {
			    	$("#izracunajPovprecjeSporocilo").html(
                "<span class='alert alert-info-sm'>Napaka '" +
                JSON.parse(err.responseText).userMessage + "'!");
			    }
			});
			
			$.ajax({
				    url: baseUrl + "/view/" + ehrId + "/" + "body_temperature",
				    type: 'GET',
				    headers: {"Ehr-Session": sessionId},
				    success: function (res) {
				    	if (res.length > 0) {
					    	for (var i in res) {
					           povp += res[i].temperature;
					           stevec++;
					        }
					        povp /= stevec;
					        povp = Math.round(povp * 100) / 100;
					        $("#temperaturaIme").append("<button onclick=temperaturaPodrobno()>Temperatura</button>");
				    		$("#temperaturaTabela").append(povp + " " + res[i].unit);
					        stevec = 0;
					        povp = 0;
				    	} else {
				    		$("#izracunajPovprecjeSporocilo").html(
	                  "<span class='alert alert-info-sm'>" +
	                  "Ni podatkov!</span>");
				    	}
				    },
				    error: function() {
				    	$("#izracunajPovprecjeSporocilo").html(
	                "<span class='alert alert-info-sm'>Napaka '" +
	                JSON.parse(err.responseText).userMessage + "'!");
				    }
				});

			$.ajax({
 			    url: baseUrl + "/view/" + ehrId + "/" + "blood_pressure",
			    type: 'GET',
			    headers: {"Ehr-Session": sessionId},
			    success: function (res) {
			    	if (res.length > 0) {
				    	for (var i in res) {
				           povp += res[i].systolic;
				           povp2 += res[i].diastolic;
				           stevec++;
				        }
				        povp /= stevec;
				        povp2 /= stevec;
				        povp = Math.round(povp * 100) / 100;
				        povp2 = Math.round(povp2 * 100) / 100;
					        $("#sistolicniIme").append("<button onclick=sistolPodrobno()"+ ">Sistolični tlak</button>");
				    		$("#sistolicniTabela").append(povp + " " + res[i].unit);
					        $("#diastolicniIme").append("<button onclick=diastolPodrobno()"+ ">Diastolični tlak</button>");
				    		$("#diastolicniTabela").append(povp2 + " " + res[i].unit);
				        stevec = 0;
				        povp = 0;
				        povp2 = 0;
				    	} else {
			    		$("#izracunajPovprecjeSporocilo").html(
                  "<span class='alert alert-info-sm'>" +
                  "Ni podatkov!</span>");
			    	}
			    },
			    error: function() {
			    	$("#izracunajPovprecjeSporocilo").html(
                "<span class='alert alert-info-sm'>Napaka '" +
                JSON.parse(err.responseText).userMessage + "'!");
			    }
			});

			$.ajax({
			    url: baseUrl + "/view/" + ehrId + "/" + "spO2",
			    type: 'GET',
			    headers: {"Ehr-Session": sessionId},
			    success: function (res) {
			    	if (res.length > 0) {
				    	for (var i in res) {
				           povp += res[i].spO2;
				           stevec++;
				        }
				        povp /= stevec;
				        povp = Math.round(povp * 100) / 100;
					    $("#kisikIme").append("<button onclick=kisikPodrobno()"+ ">Kisik v krvi</button>");
				    	$("#kisikTabela").append(povp + " %");
				        stevec = 0;
				        povp = 0;
			    	} else {
			    		$("#izracunajPovprecjeSporocilo").html(
                  "<span class='alert alert-info-sm'>" +
                  "Ni podatkov!</span>");
			    	}
			    },
			    error: function() {
			    	$("#izracunajPovprecjeSporocilo").html(
                "<span class='alert alert-info-sm'>Napaka '" +
                JSON.parse(err.responseText).userMessage + "'!");
			    }
			});


			$.ajax({
				url: baseUrl + "/view/" + ehrId + "/" + "pulse",
			    type: 'GET',
			    headers: {"Ehr-Session": sessionId},
			    success: function (res) {
			    	if (res.length > 0) {
				    	for (var i in res) {
				           povp += res[i].pulse;
				           stevec++;
				        }
				        povp /= stevec;
				        povp = Math.round(povp * 100) / 100;
						$("#utripIme").append("<button onclick=utripPodrobno()"+ ">Srčni utrip</button>");
						$("#utripTabela").append(povp + " " + res[i].unit);
				        
				        stevec = 0;
				        povp = 0;

			    	} else {
			    		$("#izracunajPovprecjeSporocilo").html(
                  "<span class='alert alert-info-sm'>" +
                  "Ni podatkov!</span>");
			    	}
			    },
			    error: function() {
			    	$("#izracunajPovprecjeSporocilo").html(
                "<span class='alert alert-info-sm'>Napaka '" +
                JSON.parse(err.responseText).userMessage + "'!");
			    }
			});

    	}	
	});
}


