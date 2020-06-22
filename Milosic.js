let seznam = [];
let favorite = [];





function Nanizanka(naziv, opis, igralci, ocena, slika) {
    this.naziv = naziv;
    this.opis = opis;
    this.igralci = igralci;
    this.ocena = ocena;
    this.slika = slika;
}
Nanizanka.prototype.izpisiNaslov = function() {
    return this.naziv + "\t" + this.ocena;
}
Nanizanka.prototype.izpisiPodrobnosti = function() {
    return this.naziv + "(" + this.ocena + "):" + this.opis;
}

function SeznamNanizank(nanizanke) {
    this.nanizanke = nanizanke;
}
SeznamNanizank.prototype.Dodaj = function(nanizanka) {
    if (nanizanka instanceof Nanizanka) {
        this.nanizanke.push(nanizanka);
        var id = 1 + Math.floor(Math.random() * 100) + "nanizanka";
        $('#seznam:last').append("<a class='dropdown-item' href='#" + id + "'>" + id + "</a>");
        $("#dodaj").append("<div></div>");
        $("#dodaj > div:last").addClass("card");
        $("#dodaj > div:last").attr("id", id);
        $("#dodaj > div.card:last").append("<h5></h5>");
        $("#dodaj > div.card:last > h5").text(nanizanka.izpisiNaslov())

        $("#dodaj > div.card > h5").addClass("class-header");
        $("#dodaj > div.card:last").append("<img />");
        $("#dodaj > div.card:last img").attr("src", nanizanka.slika).attr("alt", "Card image cap").attr("class", "card-img-top")
        $("#dodaj > div.card:last").append("<div></div>");
        $("#dodaj > div.card:last > div").addClass("card-body");
        $("#dodaj > div.card:last > div:last").append("<p></p>");
        $("#dodaj > div.card:last > div:last").text(nanizanka.izpisiPodrobnosti());
        $("#dodaj > div.card> div.card-body>p:last").attr("class", "card-text");
        $("#dodaj > div.card:last").append("<div></div>");
        $("#dodaj > div.card:last> div:last").attr("class", "card-body");
        $("#dodaj > div.card:last > div:last").append("<strong>Igralci:</strong>");
        $("#dodaj >div.card:last ").append("<ul></ul>");
        $("#dodaj >div.card:last > ul").attr("class", "list-group list-group-flush");


        for (var i = 0; i < nanizanka.igralci.length; i++) {
            $("#dodaj div.card:last ul").append('<li class="list-group-item">' + nanizanka.igralci[i] + '</li>');
        }


        $("#dodaj div.card:last").append("<div></div>");
        $("#dodaj > div.card:last> div:last").attr("class", "card-body");
        $("#dodaj div.card:last div:last").append("<a>Izbrisi Nanizanko</a>")
        $("#dodaj div.card:last a:last").attr("class", "btn btn-danger")
        $("#dodaj div.card:last a:last").attr("onclick", "Brisi1(this, '" + id + "')")
        $("#dodaj di.cardv:last div:last").attr("onclick", "Brisi1(this)").attr("class", "btn btn-danger");
    } else {
        throw new Error('Whoops!');
    }
}
SeznamNanizank.prototype.Izpisi = function() {
    for (var i = 0; i < this.nanizanke.length; i++) {
        console.log(nanizanke[i]);
    }
}
SeznamNanizank.prototype.Brisi = function(element) {
    if (isNaN(indeks) && nanizanke[indeks] != 'undefined' && indeks in nanizanke) {
        nanizanke.splice(indeks, 1)
    } else {
        console.log("nekaj ni vreu");
    }
}
SeznamNanizank.prototype.IsciPoIgralcu = function(beseda) {


    $('.card ').each(function() {
        if ($(this).text().search(new RegExp(beseda, "i")) < 0) {
            $(this).hide();
        } else {
            $(this).show();

        }
    });
}
$(document).ready(function(event) {

    const isci = $("#isci").append('<form></form>');
    const form1 = $('#isci form').addClass("form-inline my-2 my-lg-0").append("</input>");
    $("#isci form").append("<input></input>");
    $("#isci form>input").attr("type", "search").attr("placeholder", "Isci po igralcu").attr("area-label", "search").attr("id", "beseda").addClass("form-control mr-sm-2")
    $("#isci form ").append("<button></button>");
    $("#isci form>button").attr("type", "submit").attr("id", "gumbIsci").addClass("btn btn-outline-success my-2 my-sm-0").text("Isci")


    const seznam = new SeznamNanizank([]);
    var seznamMeni = $("#seznam").empty();
    $('#testid').text($('#sliderValue').val());
    $('#sliderValue').change(function() {
        $('#testid').text($('#sliderValue').val());
    });
    $("#addnew").submit(function(event) {
        event.preventDefault();
        const naslov = $('#naslov').val();
        var igralci = $('#imenaIgralcev').val().split('\n');
        const opis = $("#opis").val();
        const ocena = $('#sliderValue').val();
        const slika = $("#slika").val();
        let Nanizanka1 = new Nanizanka(naslov, opis, igralci, ocena, slika);
        seznam.Dodaj(Nanizanka1);
        $("#addnew").trigger("reset");
    });




    $("#gumbIsci").click(function(event) { //SUBMIT NAV BAR
        event.preventDefault();
        const isciIgralca = $("#beseda").val();

        seznam.IsciPoIgralcu(isciIgralca);




    });

    $("p[title='VnosniObrazec']").hide();


    $(".addnew").dialog({
        autoOpen: false,
        height: 900,
        width: 650,
        modal: true,
        buttons: {
            "Dodaj": function() {


                const naslov = $('#naslov').val();
                var regexNaslov = RegExp('[A-Za-z]');
                var igralci = $('#imenaIgralcev').val().split('\n');

                const opis = $("#opis").val();
                const ocena = $('#sliderValue').val();
                const slika = $("#slika").val();


                if (regexNaslov.test(naslov) && igralci.length > 1 && opis.length > 10 && slika.length >= 10) {



                    let Nanizanka1 = new Nanizanka(naslov, opis, igralci, ocena, slika);
                    seznam.Dodaj(Nanizanka1);
                    $("p[title='VnosniObrazec']").show("fade", 3000, () => {
                        $("p[title='VnosniObrazec']").hide("fade", 3000);
                    });
                    $(".addnew").dialog("close");
                } else {
                    let napake = "";
                    if (!regexNaslov.test(naslov)) {
                        napake = napake + "Naslov so lahko samo male in velike črke! \n";
                        $("#napaka").text(napake + "\n");
                    }
                    if (igralci.length < 2) {

                        napake = napake + "Vsebovati mora vsaj enega igralca! \n";
                        $("#napaka").text(napake + "\n");
                    }

                    if (opis.length < 10) {
                        napake = napake + "Opis mora biti daljši od 10 zankov! \n";
                        $("#napaka").text(napake + "\n");
                    }

                    if (slika.length < 10) {
                        napake = napake + "Slika url mora biti vsaj 10 znakov! \n";
                        $("#napaka").text(napake + "\n");
                    }

                    $("#napaka").animate({
                        color: 'red'
                    }, () => {
                        $("#napaka").animate({
                            color: 'black'
                        }, 2000);
                    });


                }


            },
            "Priklici": function() {
                $(".addnew").dialog("close");
            }
        },
        close: function() {
            $('#addnew').trigger("reset");

        }
    });


    $("#prikazi").click(function() {
        $(".addnew").dialog('open');
    });
});

function Brisi1(e, id) {
    $.each($("#seznam a"), function(i, val) {
        const href = val.getAttribute("href");
        if ("#" + id == href) {
            $(val).remove();
        }
    });


    $("#" + id).remove();



}


$(document).ready(function() {
    $("#tabela").empty();



    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    today = yyyy + "-" + mm + "-" + dd;
    var new_url = "https://api.tvmaze.com/schedule?country=US&date=" + today;
    //alert(new_url);




    const header = $("#tabela").html("<thead></thead>");
    const tr = $("thead:first").html("<tr></tr>");
    const th1 = $("tr:first").html("<th></th>");
    const Vsebina = $("th:first").text("Naslov");

    const nekaj = $("th:first").after("<th></th>");
    const nekaj1 = $("th:nth-child(2)").text("Naslov Nanizanke");

    const nekaj2 = $("th:nth-child(2)").after("<th></th>");
    const nekaj3 = $("th:nth-child(3)").text("Ocena");
    const nekaj4 = $("th:nth-child(3)").after("<th>Moznosti</th>");
    //const nekaj4=$("th:nth-child(4)").text("Dodaj");




    $("#tabela").before("<div class='card' style='width:auto' ></div>")
    $("aside div").append("<ul></ul>");
    $("aside ul").before("<div>Priljubljene nanizanke</div>")
    $("aside div div").attr("class", "card-header");
    $("aside ul").attr("class", "list-group list-group-flush");




    const tbody = $("thead:last").after("<tbody></tbody>");



    $.ajax({

        url: new_url,

        method: 'GET',

        success: function(data) {




            for (var i = 0; i < data.length; i++) {

                seznam.push(data[i]);
            }




            




            for (i = 0; i < data.length; i++) {


                let zvrst;

                if (data[i].show.genres.length > 0) {
                    zvrst = data[i].show.genres.join(" in ");
                } else {
                    zvrst = "Zvrst ni opredeljena"; 
                }


                $("tbody:last").append("<tr></tr>");

                if (data[i].show.rating.average == null) {
                    $("tr:last").append("<td></td>").attr("class", "bg-warning").attr("title", zvrst);
                } else {
                    $("tr:last").append("<td></td>").attr("class", "bg-success").attr("title", zvrst);
                }
                $("td:last").text(data[i].show.name);
                $("tr:last").append("<td></td>");
                $("td:last").text(data[i].name);
                $("tr:last").append("<td></td>");
                if (data[i].show.rating.average == null) {
                    $("td:last").text("N/A");
                } else {
                    $("td:last").text(data[i].show.rating.average);
                }

                $("td:last").after("<input type='button' class='btn btn-primary' value='+' onclick='Dodaj(this)'  data-id=" + data[i].id + "></input>");

            }




        }


    });
});




function Dodaj(e) {

    let id = e.getAttribute("data-id");


      for(var x=0;x<favorite.length;x++)
  {
    if(favorite[x].id==id){
      alert("Nanizanka je bila ze dodana!")
      return false;
    }
  }
  

  
    for (var i = 0; i < seznam.length; i++) {
        if (seznam[i].id == id) {
            favorite.push(seznam[i]);
   $("aside ul").append("<li onclick='Odstrani(this)'data-id=" + seznam[i].id + ">" + seznam[i].show.name + "-" + seznam[i].name + "</li>")
        $("aside ul li").attr("class", "list-group-item")
        }
      
      
 
      
    }
  


    for (var z = 0; z < favorite.length; z++) {
        localStorage.setItem("nanizanke", JSON.stringify(favorite));
    }


    


}
$(document).ready(function() {
  
  let nanizankePolje = JSON.parse(localStorage.getItem("nanizanke"))
  

    for (var i = 0; i < nanizankePolje.length; i++) {

        var nsnizanka =(nanizankePolje[i]);
     

        $("aside ul").append("<li onclick='Odstrani(this)'data-id=" + nsnizanka.id + ">" + nsnizanka.show.name + "-" + nsnizanka.name + "</li>")
        $("aside ul li").attr("class", "list-group-item")


    }




});



function Odstrani(e) {//2 VCASIH JEZI PA NEGRE ODSTRANIT KAKSNEGA ALI VEC
  if (window.confirm("Želite izbrisati priljubljeno nanizanko?")) { 
    let id = e.getAttribute("data-id");
 
   var obj = JSON.parse(localStorage["nanizanke"]);
    for (var v = 0; v < obj.length; v++) {
        if (obj[v].id == id) {
            obj.splice(v, 1);
          localStorage.setItem("nanizanke", JSON.stringify(obj));
            e.remove();
        }
        }

    }

}




































