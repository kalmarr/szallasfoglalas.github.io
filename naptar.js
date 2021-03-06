const honapokNeve = ["Január", "Február", "Március", "Április", "Május", "Június", "Július", "Augusztus", "Szeptember", "Október", "November", "December" ];

let aktualisDatum = new Date(), aktualisDatumFormazva = aktualisDatum.getFullYear() + "-";
aktualisDatumFormazva += tizAlatti(aktualisDatum.getMonth()+1);
aktualisDatumFormazva += "-";
aktualisDatumFormazva += tizAlatti(aktualisDatum.getDate());

let defaultSzobaAr = 100;

const szobaSzam=5;

$(document).ready(function(){

    referenciaDatumBeallitasa ();

    $("#referenciaHonap").on("change", function(){
        datumBeallitasLekerdezese ();
    });

    $("#referenciaEv").on("change", function(){
        datumBeallitasLekerdezese ();
    });
    
});

function datumBeallitasLekerdezese (){
    let honap = parseInt($("#referenciaHonap").val())+1;
    let ev = parseInt($("#referenciaEv").val());        
    NaptarGeneralasa (1, daysInMonth(honap,ev), ev, honap);
}


function NaptarGeneralasa (kezdoDatum, zaroDatum, evErtek, honapErtek){
    //Naptár generálás
    let naptarTartalom="", szobaSzamSeged=1, index = kezdoDatum, idTablazat ="", classTrSzoba ="", napDatuma="", szobaSzamSegedEgyben="",
        szobaAr=defaultSzobaAr, szobaSatusz= "f", adatbazisClassIndex='CD_-1_CR_-1';
        naptarTartalom += '<table id="naptar" class="table table-hover">';
        naptarTartalom += "<thead>";
        naptarTartalom += "<tr>";
        naptarTartalom += '<th>'+evErtek+'/'+honapErtek+'</th>';
      
    
    for (index; index<zaroDatum+1; index++){
        naptarTartalom += '<th>'+index+'</th>';
    }
    
    naptarTartalom += "</tr>";
    naptarTartalom += "</thead>";
    naptarTartalom += "<tbody>";
    
        while ((szobaSzam+1)>szobaSzamSeged){
            naptarTartalom += "<tr class=";
            naptarTartalom += "room_";
            naptarTartalom += tizAlatti(szobaSzamSeged);
            szobaSzamSegedEgyben = "room_"+tizAlatti(szobaSzamSeged);
            naptarTartalom += ">";

            naptarTartalom += '<th class="arFelfed_'+tizAlatti(szobaSzamSeged)+'" scope="row"><span>'+szobaSzamSeged+'. szoba</span><br><br><span class="szobaArOszlop_'+tizAlatti(szobaSzamSeged)+'">Szoba ár:</span></th>'
            
            for (index=kezdoDatum; index<zaroDatum+1; index++){
                    idTablazat = "_"+evErtek+"-";
                    idTablazat += tizAlatti(honapErtek);
                    idTablazat += "-";
                    idTablazat += index < 10 ? ("0"+index) : (index);

                    napDatuma = evErtek + "-" + tizAlatti (honapErtek)+ "-" + (index < 10 ? ("0"+index) : (index));

                naptarTartalom += '<td id='+idTablazat;
                naptarTartalom += " class=";

                for (let index3=0; index3 < naptarAdatok.length; index3++) {
                    if (naptarAdatok[index3].datumIdAdatok == napDatuma ){
                     
                        for (let index4=0; index4 < naptarAdatok[index3].szobaAdat.length; index4++) {
                            if (naptarAdatok[index3].szobaAdat[index4].szobaSzam == szobaSzamSegedEgyben) { 
                                szobaSatusz = naptarAdatok[index3].szobaAdat[index4].szobaStatuszAdat;
                                szobaAr = naptarAdatok[index3].szobaAdat[index4].szobaAr;
                                adatbazisClassIndex = 'CD_'+index3+'_CR_'+index4;
                                break;}
                        }
                    }
                }
               
            // Dátum alapján meghatározotm a naptár paramétereit. "_o" mai dátum előtti, "_t" mai dátum, "_f" mai dátum utánni

            if (napDatuma < aktualisDatumFormazva ) {szobaSatusz += "_o"} else {szobaSatusz += "_f"}                
            
            if (napDatuma === aktualisDatumFormazva) {szobaSatusz = szobaSatusz.slice(-3, -2); szobaSatusz += "_t";}         
            
                    naptarTartalom += " "+szobaSatusz+">"
            //Naptár és adott szoba tartalma - ár - kiíratása
                    naptarTartalom += '<input type="text" id="pV_R_'+tizAlatti(szobaSzamSeged)+'_D_'+napDatuma+'" value="'+szobaAr+'" class="szobaAraMegjelenit_'+tizAlatti(szobaSzamSeged)+' ' + adatbazisClassIndex + '" placeholder="EUR" disabled >';
                    naptarTartalom += "<br><br>";
                    naptarTartalom += '<input type="number" id="pE_R_'+tizAlatti(szobaSzamSeged)+'_D_'+napDatuma+'" value="100" class="szobaAraSzerkeszt_'+tizAlatti(szobaSzamSeged)+' ' + adatbazisClassIndex + '" placeholder="EUR" min="1" max="500">';
            
                    naptarTartalom += "</td>";
            //Értékek nullázása
            szobaSatusz = "f";
            szobaAr=defaultSzobaAr;
            adatbazisClassIndex = 'CD_-1_CR_-1';
        
        }
    naptarTartalom += "</tr>";
    szobaSzamSeged++;
    
    }
        naptarTartalom += "</tbody>";
        naptarTartalom += "</table>";

    $("#naptar").html(naptarTartalom);
    arLenyitasa ();
    ujArmegadasa ();
     
    //Múlt színezése
    $("#naptar td.f_o").css({"background" : "rgb(0, 128, 0, .2)"});
    $("#naptar td.r_o").css({"background" : "rgb(255, 0, 0, .2)"});
    $("#naptar td.i_o").css({"background" : "rgb(255, 255, 0, .2)"});
    // jövő színezése
    $("#naptar td.f_f").css("background", "Green");
    $("#naptar td.r_f").css("background", "red");
    $("#naptar td.i_f").css("background", "yellow");
    // Mai nap színezése
    $("#naptar td.f_t").css({"background" : "rgb(0, 128, 0, .6)"});
    $("#naptar td.r_t").css({"background" : "rgb(255, 0, 0, .6)"});
    $("#naptar td.i_t").css({"background" : "rgb(255, 255, 0, .6)"});

$("#naptar td").on("click", function(){
let tesztHide, tesztColor;
        //console.log($(this).closest('td').attr('id'));
        idTablazat = ($(this).closest('td').attr('id').slice(1));
        //console.log (idTablazat);
        classTrSzoba = $(this).closest('tr').attr('class');
        tesztHide = $(this).closest('td').children().last().css('display');
        
        szobaSatusz = $("#szobaStatusz").val();
        
        szobaAr = $('#'+($(this)["0"].children["0"].id)).val();

        tesztColor = $(this).closest('td').css('background-color');
        
        if (tesztColor === 'rgb(255, 0, 0)' ) {if (szobaSatusz === "r" ) {szobaSatusz="f";}}
        if (tesztColor === 'rgb(0, 128, 0)' ) {if (szobaSatusz === "f") {szobaSatusz="r";}}

        modositas = false;
        
        let statuszTemp = 
                {
                    'datumIdAdatok' : idTablazat,
                    'szobaAdat' : [
                        {
                        'szobaSzam' : [classTrSzoba],
                        'szobaAr' : [szobaAr],
                        'szobaStatuszAdat' : [szobaSatusz]
                        }
                    ]
                };
        
            let szobaTemp = {
            'szobaSzam' : classTrSzoba,
            'szobaAr'   : szobaAr,  
            'szobaStatuszAdat' : szobaSatusz
            };

            if (tesztHide==="none") {
        switch (szobaSatusz){
            case "r" :
            $(this).css("background", "red");
                naptarStatuszJelzesModositas (szobaSatusz, szobaAr, idTablazat, classTrSzoba, statuszTemp, szobaTemp); 
            break;
            case "f" :
            $(this).css("background", "green");
                naptarStatuszJelzesModositas (szobaSatusz, szobaAr, idTablazat, classTrSzoba, statuszTemp, szobaTemp); 
            break;
            case "i" :
            $(this).css("background", "yellow");
                naptarStatuszJelzesModositas (szobaSatusz, szobaAr, idTablazat, classTrSzoba, statuszTemp, szobaTemp); 
            break;
            default:
        }

        naptarTartalom ="";

        datumBeallitasLekerdezese ();
        jsonAdatokMegjelenitese ();
}
    });  
}

function jsonAdatokMegjelenitese (){
    let naptarTartalom="";
    for (index=0; index < naptarAdatok.length; index++) {
    naptarTartalom += naptarAdatok[index].datumIdAdatok + " - ";
        for (index2=0; index2 < naptarAdatok[index].szobaAdat.length; index2++) {
            naptarTartalom += naptarAdatok[index].szobaAdat[index2].szobaSzam + " - ";
            naptarTartalom += naptarAdatok[index].szobaAdat[index2].szobaStatuszAdat + ", ";
            naptarTartalom += naptarAdatok[index].szobaAdat[index2].szobaAr + " EUR";
            naptarTartalom += " -- ";
        }
    naptarTartalom += "<br>";
    }
    $("#jsonAdatok").html(naptarTartalom);
}

function referenciaDatumBeallitasa (){
        for (let index = aktualisDatum.getFullYear()-1; index< aktualisDatum.getFullYear()+3; index++){
            $("#referenciaEv").append('<option value="'+index+'">'+index+'</option>');
        }
        $("#referenciaEv").val(aktualisDatum.getFullYear());
        for (index=0; index < 12; index++){
            $("#referenciaHonap").append('<option value="'+index+'">'+honapokNeve[index]+'</option>');
        }
        $("#referenciaHonap").val(aktualisDatum.getMonth());
      
        NaptarGeneralasa (1, new Date(aktualisDatum.getFullYear(), aktualisDatum.getMonth()+1, 0).getDate(), aktualisDatum.getFullYear(), aktualisDatum.getMonth()+1 );

    }



function daysInMonth(month,year) {
    return new Date(year, month, 0).getDate();
}

function naptarStatuszJelzesModositas (szobaSatusz, szobaAr, idTablazat, classTrSzoba, statuszTemp, szobaTemp) {
let index=0, index2=0, modositas = false;

    for (index=0; index < naptarAdatok.length; index++) {
    if (naptarAdatok[index].datumIdAdatok===idTablazat ) {
        
            for (index2=0; index2 < naptarAdatok[index].szobaAdat.length; index2++ ) {
                if (naptarAdatok[index].szobaAdat[index2].szobaSzam == classTrSzoba)
                { naptarAdatok[index].szobaAdat[index2].szobaStatuszAdat = szobaSatusz;
                  naptarAdatok[index].szobaAdat[index2].szobaAr = szobaAr;
                  modositas = true;}                  
            } 
            if (modositas===false) { modositas = true; naptarAdatok[index].szobaAdat.push(szobaTemp);
            }
    }    
}
if (modositas===false){naptarAdatok.push(statuszTemp);}

}

function tizAlatti(ertek) {
// A bemeti értéket megvizsgálja és kiegésziti nullara, ha kisebb, mint 10)
    if (ertek<10) {return "0"+ertek}
    else {return ertek}
}

function arLenyitasa () {
    // Ez a funkció kell ahoz, hogy az ár mező lenyíljon.
    $("[class^='arFelfed_']").on("click", function(){
                  let nyitszobaAra = ".szobaAraSzerkeszt_" + ($(this).attr('class').slice(-2)),
                    nyitzobaArNeve = ".szobaArOszlop_" + ($(this).attr('class').slice(-2));
                    $(nyitszobaAra).toggle();
                    $(nyitzobaArNeve).toggle();        
            });
}

function ujArmegadasa (){
    $("[class^='szobaAraSzerkeszt_']").on("change", function(){
        let arErtekValtozas = $(this).val();
        let PriceViewId = "#pV"+($(this).attr('id')).slice(2);

        let arClassIndex = $(this).attr('class').slice(21);
            arClassIndexNap = arClassIndex.slice(3),
            nX = (arClassIndexNap.search("_"));
        let nIndex, szIndex;            
       
        $(PriceViewId).val(arErtekValtozas);
//Adatbázis mentése
        if(arClassIndex==='CD_-1_CR_-1') {}
        else {
            nIndex = parseInt(arClassIndexNap.slice(0,nX));
            szIndex = parseInt(arClassIndexNap.slice(nX+4));
            naptarAdatok[nIndex].szobaAdat[szIndex].szobaAr = arErtekValtozas;
            jsonAdatokMegjelenitese ();
        }
    });

}



