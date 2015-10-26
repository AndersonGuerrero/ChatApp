document.addEventListener("deviceready",CargarMisDatos,false);

var db;
var Nombre=null;
var Numero=null;
var MiNumero="";
var MiNombre="";
var MiEstado="";

function CargarMisDatos(){
    db = window.sqlitePlugin.openDatabase({name: "data.db"});                 
    db.executeSql("select  *from yo", [], function(res){
             MiNumero=res.rows.item(0)['Numero'];
             MiNombre=res.rows.item(0)['Nombre'];
             MiEstado=res.rows.item(0)['Estado'];
             creatTablas();
    });
    
    
window.plugin.notification.local.onclick = function (id, state, json) {
  window.plugin.notification.local.cancel(2811, function () {    
      $.mobile.changePage("#Chat");
      cargarMsjs(Numero);    
    });}
   }
    
      $("#btnEnviar").on('click', function()
      {
          Loarding("Enviando");
          var Mensaje=$("#txtMensaje").val();
          if(Mensaje.length>=1)
          {
                  
    archivo = "http://server-ve.esy.es/server_php/enviar_msj.php";
     $.ajax({
    data: { De:MiNumero ,Para:Numero,MSJ:Mensaje},
    type: "POST",
    timeout: 10000,
    dataType: "json",
    url: archivo,
    })
    .done(function( data, textStatus, jqXHR ) {
        if(data.Validacion === "SEND"){
            guardarMsj(Numero,MiNumero,Mensaje,data.fecha,data.hora,data.estatus);
            var html='<div class="ui-corner-all custom-corners"><div class="ui-bar ui-bar-a"><h3>Yo</h3></div><div class="ui-body ui-body-a"><p>'+Mensaje+'</p><small>'+data.hora+'</small></div>';
            $('#ListaMSJ').append(html);
            $("#txtMensaje").val("");
            OcultarLoarding();
        }else{
            alert("No se pudo Enviar el mensaje intalo de nuevo");OcultarLoarding();
        } 
    }).fail(function(error){
        alert("No se pudo Enviar el mensaje. Sin Conexion");OcultarLoarding(); 
    }); 
}
});
    
     
     
     function guardarMsj(para,de,msj,fecha,hora,estatus){
        db.executeSql("insert into msjs (para,de,msj,fecha,hora,estatus) VALUES ('"+para+"','"+de+"','"+msj+"','"+fecha+"','"+hora+"','"+estatus+"')"); }
      
     $(document).on( "click", ".contacto", function() {
         
         var $this = $(this);
         
         Nombre=$this.jqmData("nombre");
         Numero=$this.jqmData("telefono");

          cargarMsjs(Numero);

         $('#tituloMSJS').empty();
         $("#tituloMSJS").append(Nombre);
         
     });
     
     

     $("#btnactualizar").on('click', function()
      {
     Loarding("Actualizando Contactos");
    leertodoContactos();  
    
      });
            

            function recorrer(contacts) {
                
                archivo = "http://server-ve.esy.es/server_php/buscar_contacto.php";
                db.executeSql("drop table contactos");
                creatTablas();
                var html='';
                var tel='';
               var temp="";
               $('#ListaContactos').empty();
                for (var i = 0; i<contacts.length; i++){
                  
                     if ($.trim(contacts[i].displayName).length !== 0 && contacts[i].phoneNumbers) 
                     {

                   for(var x=0;x<contacts[i].phoneNumbers.length;x++)
                   {   
                   
                       if(x>=1){break;}
                       tel=contacts[i].phoneNumbers[x].value;
                     if(tel[4]!=="-")
                     {
                        temp=tel[0]+tel[1]+tel[2]+tel[3]+"-"+tel[4]+tel[5]+tel[6]+tel[7]+"-"+tel[8]+tel[9]+tel[10];
                        tel=temp;
                     }
                   }
   
                   $.ajax({ data: { numero:tel},
                            type: "POST",
                            dataType: "json",
                            url: archivo,
                            }).done(function( data, textStatus, jqXHR ) {
                                if(data.Validacion === "OK"){
                                guardarContacto(data.Numero,data.Nombre,data.Estado);
                                html='<li ><a data-Nombre="'+data.Nombre+'" data-Telefono="'+data.Numero+'" data-transition="flip" href="#Chat" class="ui-btn ui-btn-icon-right ui-icon-carat-r contacto"><h3 class="ui-li-heading">'+data.Nombre+'</h3><p class="ui-li-desc">'+data.Estado+'</p></a></li>'; 
                                $('#ListaContactos').append(html);
                                } 
                            }); 
                    }
            }
            
                
             OcultarLoarding();    
  
        }
           
           
           
           
                function  leertodoContactos()
                {
                   
                     var options = new ContactFindOptions();
                 
                options.filter = "";
                options.multiple=true;
                
                var fields = ["displayName","name", "phoneNumbers","tel"];
              
                navigator.contacts.find(fields, recorrer, onError, options);
                }
                
                function onError(){alert("Error");}

       function creatTablas() {
        db.executeSql('CREATE TABLE IF NOT EXISTS msjs (id integer primary key, para text, de text, msj text,fecha text,hora text, estatus text)');
        db.executeSql('CREATE TABLE IF NOT EXISTS contactos (id integer primary key, numero text, nombre text, estado text)');
                       }
                       
                       
                       
                       function cargarMsjs(numero)
                       {
                           var html='';
                           var row=null;
                           var detemp="";
                           db.executeSql("select *from msjs where para='"+numero+"' or de='"+numero+"';",[], function(res) {
                                  $('#ListaMSJ').empty();
                                  
                                   for(var i=0;i<res.rows.length;i++){
                                    row= res.rows.item(i);
                                 if(row['de']===MiNumero)
                                 {
                                     detemp='Yo';
                                 }else{detemp=Nombre;}
                                 
html+='<div class="ui-corner-all custom-corners"><div class="ui-bar ui-bar-a"><h3>'+
        detemp+'</h3></div><div class="ui-body ui-body-a"><p>'+row['msj']+'</p><small>'+row['hora']+'</small></div>';
                                   
                                            }  
                                            $('#ListaMSJ').append(html);
                           });
              
                       }
                       
    $("#btnContactos").click(function (){
        
        $('#ListaContactos').empty();
       // $.mobile.changePage("#Contactos");
         db.executeSql("select *from contactos",[],function(res){
             var html="";
             for(var i=0;i<res.rows.length;i++)
             {
html='<li ><a data-Nombre="'+res.rows.item(i)['nombre']+'" data-Telefono="'+
        res.rows.item(i)['numero']+'" data-transition="flip" href="#Chat" class="ui-btn ui-btn-icon-right ui-icon-carat-r contacto"><h3 class="ui-li-heading">'+
        res.rows.item(i)['nombre']+'</h3><p class="ui-li-desc">'+
        res.rows.item(i)['estado']+'</p></a></li>';
            $('#ListaContactos').append(html);
             }

        });
        
    });
    
  
    
                       
function Loarding(texto)
{
$.mobile.loading( 'show', {
text: texto,
textVisible: true,
theme: "a",
textonly: false,
html: ""});
}

function OcultarLoarding()
{$.mobile.loading( "hide" );}


function guardarContacto(numero,nombre,estado)
{db.executeSql("insert into contactos (numero,nombre,estado) VALUES ('"+numero+"','"+nombre+"','"+estado+"')"); }







var recursiva = function () {
    archivo = "http://server-ve.esy.es/server_php/buscar_msj.php";
    $.ajax({ data: { numero:MiNumero},
            type: "GET",
            dataType: "json",
            timeout: 10000,
            url: archivo,
            }).done(function( data, textStatus, jqXHR ) {
                if(data.Validacion === "OK"){
                     var msj="";
                     for(var i=0;i<data.len;i++){
                        msj=data[""+i].mensaje;
                        Numero=data[""+i].de;
                        Nombre=data[""+i].nombre;
                        var html='<div class="ui-corner-all custom-corners"><div class="ui-bar ui-bar-a"><h3>'+
                        Nombre+'</h3></div><div class="ui-body ui-body-a"><p>'+msj+'</p><small>'+data[""+i].hora+'</small></div>';
                        $('#ListaMSJ').append(html);           
                        guardarMsj(MiNumero,data[""+i].de,msj,data[""+i].fecha,data[""+i].hora,"1");
                     } 
                    window.plugin.notification.local.add({id:2811,title:"UnergChat",message:msj });
                 }
                setTimeout(recursiva,5000);
             });    
}
recursiva();
 