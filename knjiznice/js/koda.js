
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
function generirajPodatke() {
  
  
  ehrId = "";

$(document).ready(function() {

	$('#izberiSportnika').change(function() {
		$("#dodajMeritveSporocilo").html("");
		var podatki = $(this).val().split("|");
		$("#dodajVitalnoEHR").val(podatki[0]);
		$("#dodajVitalnoDatumInUra").val(podatki[1]);
		$("#dodajVitalnoTelesnaVisina").val(podatki[2]);
		$("#dodajVitalnoTelesnaTeza").val(podatki[3]);
		$("#dodajVitalnoTelesnaTemperatura").val(podatki[4]);
		$("#dodajVitalnoKrvniTlakSistolicni").val(podatki[5]);
		$("#dodajVitalnoKrvniTlakDiastolicni").val(podatki[6]);
		$("#dodajVitalnoNasicenostKrviSKisikom").val(podatki[7]);
		$("#dodajVitalnoSrcniUtrip").val(podatki[8]);
	});

}); 

 // return ehrId;
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
	
	stevec2 = 0;
	
	
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

function izracunajPovprecje() {
	sessionId = getSessionId();

	var ehrId = $("#EHRSportnika").val();

	$.ajax({
		url: baseUrl + "/demographics/ehr/" + ehrId + "/party",
    	type: 'GET',
    	headers: {"Ehr-Session": sessionId},
    	success: function (data) {
			var results = "<table class='table table-striped " +
                   "table-hover'><tr><th>Kategorija</th>" +
                   "<th class='text-right'>Povprečje</th></tr>";
			var party = data.party;
			$("#rezultatPovprecjaSportnika").html("<br/><span>Povprečje športnika <b>'" + party.firstNames + " " + party.lastNames + "'</b>.</span><br/><br/>");
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
				        results += "<tr><td>" + "Teža" + "</td><td class='text-right'>" + povp + " " + res[i].unit + "</td>";
				        stevec = 0;
				        povp = 0;
			    	} else {
			    		$("#izracunajPovprecjeSporocilo").html(
                  "<span class='obvestilo label label-warning fade-in'>" +
                  "Ni podatkov!</span>");
			    	}
			    },
			    error: function() {
			    	$("#izracunajPovprecjeSporocilo").html(
                "<span class='obvestilo label label-danger fade-in'>Napaka '" +
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
					        results += "<tr><td>" + "<button onclick="+ "Hej you"+ ">Temperatura</button>" + "</td><td class='text-right'>" + povp + " " + res[i].unit + "</td>";
					        stevec = 0;
					        povp = 0;
				    	} else {
				    		$("#izracunajPovprecjeSporocilo").html(
	                  "<span class='obvestilo label label-warning fade-in'>" +
	                  "Ni podatkov!</span>");
				    	}
				    },
				    error: function() {
				    	$("#izracunajPovprecjeSporocilo").html(
	                "<span class='obvestilo label label-danger fade-in'>Napaka '" +
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
				        results += "<tr><td>" + "Sistolični tlak" + "</td><td class='text-right'>" + povp + " " + res[i].unit + "</td>";
				        results += "<tr><td>" + "Diastolični tlak" + "</td><td class='text-right'>" + povp2 + " " + res[i].unit + "</td>";
				        stevec = 0;
				        povp = 0;
				        povp2 = 0;
				    	} else {
			    		$("#izracunajPovprecjeSporocilo").html(
                  "<span class='obvestilo label label-warning fade-in'>" +
                  "Ni podatkov!</span>");
			    	}stevec3++;
			    },
			    error: function() {
			    	$("#izracunajPovprecjeSporocilo").html(
                "<span class='obvestilo label label-danger fade-in'>Napaka '" +
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
				        results += "<tr><td>" + "Nasičenost krvi s kisikom" + "</td><td class='text-right'>" + povp +  " % </td>";
				        stevec = 0;
				        povp = 0;
			    	} else {
			    		$("#izracunajPovprecjeSporocilo").html(
                  "<span class='obvestilo label label-warning fade-in'>" +
                  "Ni podatkov!</span>");
			    	}
			    },
			    error: function() {
			    	$("#izracunajPovprecjeSporocilo").html(
                "<span class='obvestilo label label-danger fade-in'>Napaka '" +
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
				        results += "<tr><td>" + "Utrip" + "</td><td class='text-right'>" + povp + " " + res[i].unit + "</td>";
				        stevec = 0;
				        povp = 0;
				       results += "</table>";
				        $("#rezultatPovprecjaSportnika").append(results);
			    	} else {
			    		$("#izracunajPovprecjeSporocilo").html(
                  "<span class='obvestilo label label-warning fade-in'>" +
                  "Ni podatkov!</span>");
			    	}
			    },
			    error: function() {
			    	$("#pizracunajPovprecjeSporocilo").html(
                "<span class='obvestilo label label-danger fade-in'>Napaka '" +
                JSON.parse(err.responseText).userMessage + "'!");
			    }
			});
    	}	
	});
}


