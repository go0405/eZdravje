
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
 
 function prikaziTriSportnike(){

 	$("#tukajgenerira").empty();
 	var x = document.getElementById("izberiSportnika");
    x.remove(1);
    x.remove(1);
    x.remove(1);

 	var ehrId1 = generirajPodatke(1);
 	var ehrId2 = generirajPodatke(2);
 	var ehrId3 = generirajPodatke(3);
 	
 	//$("#tukajgenerira").append("Zgenerirani <strong>EHRid-ji</strong> so: <strong>"+ ehrId1 +"</strong>, <strong>"+ ehrId2 +"</strong> in <strong>"+ ehrId3 +"</strong>");

 }
 
 $(document).ready(function() {
 		$('#izberiSportnika').change(function() {
		$("#EHRSportnika").val($(this).val());
	});
 });
 
function generirajPodatke(sportnik) {

	
	if(sportnik == 1){
		$("#tukajgenerira").append("Zgenerirani <strong>EHRid-ji</strong> so: ");
		var sel = document.getElementById("izberiSportnika");
		var opt = document.createElement("option");
		opt.value = "91bcd74e-9be2-4531-a3d5-c8c8347369ea";
		opt.text = "Tina Maze";
		sel.add(opt, null);
	}
	if(sportnik == 2){
        var sel = document.getElementById("izberiSportnika");
		var opt = document.createElement("option");
		opt.value = "a53d5962-b614-4cc0-8684-64518d7e3f7f";
		opt.text = "Kevin Kampl";
		sel.add(opt, null);
	}
	if(sportnik == 3){
        var sel = document.getElementById("izberiSportnika");
		var opt = document.createElement("option");
		opt.value = "19bf76fa-1495-44d0-b008-380a85d3874e";
		opt.text = "Goran Dragič";
		sel.add(opt, null);
	}

    var ehrId = "";
    var sessionId = getSessionId();

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
					$("#tukajgenerira").append("<strong>"+ ehrId +" </strong>     " + "  ");
	            },
	            error: function(err) {
	                $("#kreirajSporocilo").html("<span class='alert alert-info-sm'>Napaka '" +
                    JSON.parse(err.responseText).userMessage + "'!");
	            }
	        });
	    }
	});
	return ehrId;
}


function kreirajEHR() {
	sessionId = getSessionId();

	var ime = $("#kreirajIme").val();
	var priimek = $("#kreirajPriimek").val();
	var spol = $("#kreirajSpol").val();
	var datumRojstva = $("#kreirajDatumRojstva").val();

	if (!ime || !priimek || !spol || !datumRojstva || ime.trim().length == 0 ||
      priimek.trim().length == 0 || spol.trim().length == 0 || datumRojstva.trim().length == 0) {
		$("#kreirajSporocilo").html("<span class='alert alert-info-sm'>Prosim vnesite zahtevane podatke!</span>");
	} else {
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
		                    $("#kreirajSporocilo").html("<span class='alert alert-info-sm'>Uspešno kreiran EHR '" +
                          	ehrId + "'.</span>");
		                    $("#preberiEHRid").val(ehrId);
		                }
		            },
		            error: function(err) {
		            	$("#kreirajSporocilo").html("<span class='alert alert-info-sm'>Napaka '" +
                    JSON.parse(err.responseText).userMessage + "'!");
		            }
		        });
		    }
		});
	}
}


var stanje = "";
var stevec2 = 0;

function dodajMeritve() {
	sessionId = getSessionId();
	var ehrId = $("#dodajVitalnoEHR").val();
	var datumInUra = $("#dodajVitalnoDatumInUra").val();
	var telesnaVisina = $("#dodajVitalnoTelesnaVisina").val();
	var telesnaTeza = $("#dodajVitalnoTelesnaTeza").val();
	var telesnaTemperatura = $("#dodajVitalnoTelesnaTemperatura").val();
	var sistolicniKrvniTlak = $("#dodajVitalnoKrvniTlakSistolicni").val();
	var diastolicniKrvniTlak = $("#dodajVitalnoKrvniTlakDiastolicni").val();
	var nasicenostKrviSKisikom = $("#dodajVitalnoNasicenostKrviSKisikom").val();
	var srcniUtrip = $("#dodajVitalnoSrcniUtrip").val();

	if(telesnaTemperatura >= 39){
		stanje += "Športnik je v nevarnosti, obiščite zdravnika! "; stevec2++;
	}if(telesnaTemperatura >= 38 && telesnaTemperatura < 39){
		stanje += "Nekaj časa bo potrebno počivati. "; stevec2++;
	}if(telesnaTemperatura <= 35){
		stanje += "Športnik je podhlajen. "; stevec2++;
	}if(telesnaVisina < parseInt(telesnaTeza) + 80){
		stanje += "BMI športnika je krepko nad povprečjem, za naslednji trening svetujem kardio. "; stevec2++;
	}else if(telesnaVisina < parseInt(telesnaTeza) + 90){
		stanje += "BMI športnika je prevelik, za naslednji trening svetujem kardio. "; stevec2++;
	}if(telesnaVisina > parseInt(telesnaTeza) + 110){
		stanje += "BMI športnika je premajhen, potrebno je uživanje ogljikovih hidratov. "; stevec2++;
	}if(sistolicniKrvniTlak >= 160){
		stanje += "Športnikov sistolični krvni tlak je precej previsok. Posvetujte se z zdravnikom. "; stevec2++;
	}else if(sistolicniKrvniTlak >= 150){
		stanje += "Športnikov sistolični krvni tlak je malenkost previsok. Opazujte naslednjo meritev. "; stevec2++;
	}if(sistolicniKrvniTlak <= 90){
		stanje += "Športnikov sistolični krvni tlak je precej prenizek. Posvetujte se z zdravnikom. "; stevec2++;
	}else if(sistolicniKrvniTlak <= 100){
		stanje += "Športnikov sistolični krvni tlak je malenkost prenizek. Opazujte naslednjo meritev. "; stevec2++;
	}if(diastolicniKrvniTlak >= 100){
		stanje += "Športnikov diastolični krvni tlak je precej previsok. Posvetujte se z zdravnikom. "; stevec2++;
	}else if(diastolicniKrvniTlak >= 95){
		stanje += "Športnikov diastolični krvni tlak je malenkost previsok. Opazujte naslednjo meritev. "; stevec2++;
	}if(diastolicniKrvniTlak <= 50){
		stanje += "Športnikov diastolični krvni tlak je precej prenizek. Posvetujte se z zdravnikom. "; stevec2++;
	}else if(diastolicniKrvniTlak <= 55){
		stanje += "Športnikov diastolični krvni tlak je malenkost prenizek. Opazujte naslednjo meritev. "; stevec2++;
	}if(nasicenostKrviSKisikom <= 85){
		stanje += "Športnik ima v krvi premalo kisika. Nujno pojdite k zdravniku. "; stevec2++;
	}else if(nasicenostKrviSKisikom <= 90){
		stanje += "Športnik ima v krvi premalo kisika. Če znate mu dovedite kisik, če tega ne obvladate pojdite k zdravniku. "; stevec2++;
	}else if(nasicenostKrviSKisikom > 100){
		stanje += "Napaka pri vnosu podatkov, saj v krvi ne more biti več kot 100% kisika. "; stevec2++;
	}else if(srcniUtrip < 55){
		stanje += "S športnikm je nekaj narobe, svetujem pregled pri zdravniku. "; stevec2++;
	}if(srcniUtrip >= 120){
		stanje += "Srce mu razbija kot noro, upajmo da bo preživel. "; stevec2++;
	}else if(srcniUtrip >= 110){
		stanje += "Vašega atleta ste danes pognali do roba njegovih zmožnosti. "; stevec2++;
	}else if(srcniUtrip >= 95){
		stanje += "Današnji trening se je izkazal za zelo primernega. "; stevec2++;
	}else if(srcniUtrip >= 80){
		stanje += "Športnik je bolj sposoben kot si predstavljate. "; stevec2++;
	}else if(srcniUtrip >= 70){
		stanje += "Današnji trening za vašega atleta ni predstavljal nobenih težav. "; stevec2++;
	}else if(srcniUtrip >= 55){
		stanje += "To pa ni bil pravi trening, saj se športnik sploh ni zadihal. "; stevec2++;
	}
	
	if(stevec2 == 0){
		stanje = "Športnik je v odličnem stanju za trening! "
	}
	
	$("#dodajMeritveSporocilo").empty();
	$("#graf").empty();
	
	stevec2 = 0;

	graf(sistolicniKrvniTlak, diastolicniKrvniTlak, nasicenostKrviSKisikom, srcniUtrip);
	
	function graf(sistol, diastol, kisik, utrip){
 
        var w = 600;
        var h = 300;
        var padding = 30;
        

        var xScale = d3.scale.linear().domain([0, 12]).range([padding, w - padding]);
        var yScale = d3.scale.linear().domain([50, 150]).range([h - padding, padding]);
       

        var svg = d3.select("#graf").append("svg").style("border", "1px solid #182948").style("background-color", "white").attr("width", w).attr("height", h);
       

        var xAxis = d3.svg.axis()
            .scale(xScale)
            .orient("bottom")
            .ticks(10);
       
        var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("left")
            .ticks(10);
            
		svg.append("rect")
        .attr("x", 70)
        .attr("y", 190)
        .attr("width", 30)
        .attr("height", 100)
        .attr("fill", "#182948");
        
        svg.append("rect")
        .attr("x", 170)
        .attr("y", 190)
        .attr("width", 30)
        .attr("height", 100)
        .attr("fill", "#182948");
        
        svg.append("rect")
        .attr("x", 270)
        .attr("y", 190)
        .attr("width", 30)
        .attr("height", 100)
        .attr("fill", "#182948");
        
        svg.append("rect")
        .attr("x", 370)
        .attr("y", 190)
        .attr("width", 30)
        .attr("height", 100)
        .attr("fill", "#182948");


/*       var rectangle = svg.append("rect")
                             .attr("x", 10)
                            .attr("y", 10)
                            .attr("width", 50)
                            .attr("height", 100);*/
        svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + padding + ",0)")
        .style("fill","#182948")
        .call(yAxis);
       
        svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 40)
        .attr("x",60 - (h / 2))
        .attr("dy", "1em")
        .style("text-anchor", "start")
        .style("fill","#182948")
        .text("Vrednost");
               
        svg.append("text")
        .attr("x", 70)
        .attr("y", 190)
        .style("fill","black")
        .style("text-anchor", "start")
        .text("Sistolični krvni tlak");
       
        svg.append("text")
        .attr("x", 170)
        .attr("y", 190)
        .style("fill","black")
        .style("text-anchor", "start")
        .text("Diastolični krvni tlak");
       
        svg.append("text")
        .attr("x", 270)
        .attr("y", 190)
        .style("fill","black")
        .style("text-anchor", "start")
        .text("Nasičenost krvi s kisikom");
        
        svg.append("text")
        .attr("x", 370)
        .attr("y", 190)
        .style("fill","black")
        .style("text-anchor", "start")
        .text("Srčni utrip");

}


	if (!ehrId || ehrId.trim().length == 0) {
		$("#dodajMeritveSporocilo").html("<span class='alert alert-info-sm'>Prosim vnesite zahtevane podatke!</span>");
	} else {
		$.ajaxSetup({
		    headers: {"Ehr-Session": sessionId}
		});
		var podatki = {
		    "ctx/language": "en",
		    "ctx/territory": "SI",
		    "ctx/time": datumInUra,
		    "vital_signs/height_length/any_event/body_height_length": telesnaVisina,
		    "vital_signs/body_weight/any_event/body_weight": telesnaTeza,
		   	"vital_signs/body_temperature/any_event/temperature|magnitude": telesnaTemperatura,
		    "vital_signs/body_temperature/any_event/temperature|unit": "°C",
		    "vital_signs/blood_pressure/any_event/systolic": sistolicniKrvniTlak,
		    "vital_signs/blood_pressure/any_event/diastolic": diastolicniKrvniTlak,
		    "vital_signs/indirect_oximetry:0/spo2|numerator": nasicenostKrviSKisikom,
		    "vital_signs/pulse/any_event/rate": srcniUtrip,
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
              $("#opisanoStanje").html("<br/><span><b>Nasvet: </b>" + stanje +"</span>");
              stanje = "";
              $("#opisanoStanje2").html("<br/><span><b>Podatki so bili sprejeti!</b></span>");
		    },
		    error: function(err) {
		    	$("#dodajMeritveSporocilo").html(
            "<span class='alert alert-info-sm'>Napaka '" +
            JSON.parse(err.responseText).userMessage + "'!");
		    }
		});
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

function izracunajPovprecje() {
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
			    	$("#pizracunajPovprecjeSporocilo").html(
                "<span class='alert alert-info-sm'>Napaka '" +
                JSON.parse(err.responseText).userMessage + "'!");
			    }
			});

    	}	
	});
}


