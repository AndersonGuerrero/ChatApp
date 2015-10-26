document.addEventListener("deviceready",crearDatabase,false);

var db;

$('#formulario-registro').submit(function(){ 

 $.mobile.loading( 'show', {
  text: "Registrando",
  textVisible: true,
  theme: "a",
  textonly: false,
  html: ""
  });
	// recolecta los valores que inserto el usuario
	var datosNombre = $("#Nombre").val();
	var datosNumero = $("#Numero").val();
        var codigo = $("#codigo").val();
	
        
if(datosNumero.length>=8 || datosNumero.length<=6 || datosNombre.length<=0 || codigo===null)
{
    
    
    if(datosNombre.length<=0){alert("Ingrese su nombre");$("#Nombre").focus();}
    
    else if(codigo===null){alert("Seleccione el Codigo");$("#codigo").focus();}
    
    else if(datosNumero.length>=8 || datosNumero.length<=6){alert("Ingrese un numero Valido");$("#Numero").focus();}
    
    $.mobile.loading( "hide" );
}else{
    
    var numer=codigo+'-';
    for(var i=0;i<datosNumero.length;i++)
    {
        numer+=datosNumero[i];
        if(i==3)
        {numer+='-';}
    }
 http://server-ve.esy.es/server_php/
    archivoValidacion = "http://server-ve.esy.es/server_php/register.php";
	
    $.ajax({
    data: { nombre:datosNombre ,numero:numer},
    type: "GET",
    timeout: 20000,
    dataType: "json",
    url: archivoValidacion,
    })
    .done(function( data, textStatus, jqXHR ) {
        if(data.Validacion === "OK"){
            insertarYO(datosNombre,numer);
            $.mobile.loading( "hide" );
            top.location.replace("index.html");
        }else{
            $.mobile.loading("hide");
            alert("Error Al Registarte..!! Intenta de Nuevo mas tarde");  
        } 
    }).fail(function(error){
        $.mobile.loading( "hide" )
        alert("Asegurese de estar conectado")
    }); 
}
    return false;

});

  
function crearDatabase() 
{
       db = window.sqlitePlugin.openDatabase({name: "data.db"});  
}


function insertarYO(nombre,numero){
    db.executeSql("insert into yo (Numero,Nombre,Estado) VALUES ('"+numero+"','"+nombre+"','Bienvenido a UnergChat')"); 
}

 
function consulta(){
            db.executeSql("select  *from test_table;", [], function(res) {
 
        $('#SoccerPlayerList').empty();
        
        alert(res.rows.length);
	
        for(var i=0;i<res.rows.length;i++)
        {
                       var row = res.rows.item(i);
			$('#SoccerPlayerList').append('<li><a href="#"><h3 class="ui-li-heading">'+row['data']+'</h3><p class="ui-li-desc">Club '+row['data_num']+'</p></a></li>');
		
        }

		$('#SoccerPlayerList').listview();
     
            });
            alert("Se consultaron los valores");
   }
