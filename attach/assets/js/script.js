
$(document).ready(function() {
    var table = $('#miTabla').DataTable({
        dom: 'Bfrtip',
        buttons: [
            'copyHtml5',
            'excelHtml5',
            'csvHtml5',
            'pdfHtml5'
        ],
        columns: [
        { title: 'name', data: 'name' },
        { title: 'crypto', data: 'crypto' },
        { title: 'precio', data: 'precio' },
        { title: 'actions', render: function (data, type, row) {
            return '<button class="btn btn-info btn-sm editBtn">Editar</button>' +
                '<button class="btn btn-danger btn-sm deleteBtn">Eliminar</button>';
        }},
        
    ]
});

$.ajax({
    url: 'crudclass.php',
    method: 'GET',
    dataType: 'json',
    success: function(data) {
        table.clear();
        table.rows.add(data).draw();
    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.error('Error en la solicitud AJAX:', textStatus, errorThrown);
    }
});

// Delegación de eventos para botones agregar
$( '.data_addbtn' ).button().on( 'click', function() {
    abrirModalAgregar();
  });

  // Función para abrir el modal de agregar (disponible globalmente)
  /*function abrirModalAgregar() {
  $('#formAgregarUsuario').empty();
  var rowData =  ["name","crypto","precio"]
  for (var key in rowData) {
      if (rowData.hasOwnProperty(key)) {
          $('#formAgregarUsuario').append(`
              <div class="mb-3">
                  <label for="${key}" class="form-label">${rowData[key]}</label>
                  <input type="text" class="form-control" id="${key}" name="${rowData[key]}" value="">
              </div>
          `);
      }
  }
  $('#agregarUsuarioModal').modal('show');
  }

 */


  function abrirModalAgregar() {
    $('#formAgregarUsuario').empty();
    var rowData =  ["name","crypto","precio"]
     if (rowData.length <= 10) {
      formHtml = '';
      for (var key in rowData) {
        if (rowData.hasOwnProperty(key)) {
          formHtml += `
            <div class="mb-3">
              <label for="${key}" class="form-label">${rowData[key]}</label>
              <input type="text" class="form-control form-control-sm" id="${key}" name="${rowData[key]}" value="">
            </div>
          `;
        }
      }
    } else {
      formHtml = '<div class="row">';
      
      for (var i = 0; i < rowData.length; i++) {
        var colHtml = `
          <div class="col-md-6">
            <div class="row mb-3">
              <label for="${i}" class="col-sm-2 col-form-label">${rowData[i]}</label>
              <div class="col-sm-10">
                <input type="text" class="form-control form-control-sm" id="${i}" name="${rowData[i]}" value="">
              </div>
            </div>
          </div>
        `;
        formHtml += colHtml;
      }
      
      formHtml += '</div>';
    }
 
    $('#formAgregarUsuario').append(formHtml);
    $('#agregarUsuarioModal').modal('show');
  }

 


// Delegación de eventos para botones de edición
$('#miTabla').on('click', '.editBtn', function() {
    var rowData = table.row($(this).parents('tr')).data();
    abrirModalEdicion(rowData);
});

// Delegación de eventos para botones de eliminar
$('#miTabla').on('click', '.deleteBtn', function() {
    var rowData = table.row($(this).parents('tr')).data();
    var deleteId = rowData[''];  // El ID del registro que deseas eliminar

    // Envía la solicitud DELETE al servidor
    $.ajax({
        url: 'crudclass.php?=' + deleteId,
        method: 'DELETE',
        dataType: 'json',
        success: function(data) {
            console.log('DELETE Success', data);
            mostrarSuccessCard('bg-danger', 'Operación Exitosa', 'El registro ha sido eliminado con éxito.');
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Error en la solicitud DELETE:', textStatus, errorThrown);
        }
    });
});

});
 
// Función para abrir el modal de edición (disponible globalmente)
function abrirModalEdicion(rowData) {
$('#formEditarUsuario').empty();
if (rowData.length <= 10) {
    formHtml = '';
for (var key in rowData) {
    if (rowData.hasOwnProperty(key)) {
        formHtml += `
            <div class="mb-3">
                <label for="${key}" class="form-label">${key}</label>
                <input type="text" class="form-control" id="${key}" name="${key}" value="${rowData[key]}">
            </div>
            `; 
    }
}
}else{
    formHtml = '<div class="row">';
    for (var key in rowData) {
        if (rowData.hasOwnProperty(key)) {
        
            var colHtml = `
            <div class="col-md-6">
                <div class="row mb-3">
                    <label for="${key}" class="col-sm-2 col-form-label">${key}</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="${key}" name="${key}" value="${rowData[key]}">
                        </div>
               </div>
           </div>
            `;
            formHtml += colHtml;

        }
     }		
    formHtml += '</div>';
	
    }

$('#formEditarUsuario').append(formHtml); 
$('#editarUsuarioModal').modal('show');
}
 




  







// Función para guardar los cambios después de la edición
function guardarEdicionUsuario() {
var editedData = {};
// Obtener los valores editados de los campos
$('#formEditarUsuario input').each(function() {
    var fieldName = $(this).attr('name');
    var fieldValue = $(this).val();
    editedData[fieldName] = fieldValue;
});

// Envía la solicitud PUT al servidor
$.ajax({
    url: 'crudclass.php?=' + editedData[''], // Ajusta la URL según tu API
    method: 'PUT',
    contentType: 'application/json',
    data: JSON.stringify(editedData),
    dataType: 'json',
    success: function(data) {
        console.log('PUT Success', data);
        mostrarSuccessCard('bg-success', 'Operación Exitosa', 'El registro ha sido actualizado con éxito.');
    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.error('Error en la solicitud PUT:', textStatus, errorThrown);
    }
});


 
// Cerrar el modal después de guardar los cambios
$('#editarUsuarioModal').modal('hide');
// Recargar la tabla después de guardar cambios (opcional)
//table.ajax.reload();
}


// Función para guardar los cambios después de la edición
function guardarNuevoUsuario() {
var addData = {};
// Obtener los valores editados de los campos
$('#formAgregarUsuario input').each(function() {
    var fieldName = $(this).attr('name');
    var fieldValue = $(this).val();
    addData[fieldName] = fieldValue;
});

// Envía la solicitud POST al servidor
$.ajax({
    url: 'crudclass.php?=' + addData[''], // Ajusta la URL según tu API
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(addData),
    dataType: 'json',
    success: function(data) {
        console.log('POST Success', data);
        mostrarSuccessCard('bg-success', 'Operación Exitosa', 'El registro ha sido actualizado con éxito.');
    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.error('Error en la solicitud POST:', textStatus, errorThrown);
    }
});

$('#AgregarUsuarioModal').modal('hide');

}


 


// Función para mostrar la tarjeta de éxito
function mostrarSuccessCard(color, title, message) {
// Crea un elemento div para la tarjeta de éxito
var successCard = $('<div>').addClass('card text-white ' + color + ' mb-3').css('max-width', '18rem');

// Crea el encabezado de la tarjeta
var cardHeader = $('<div>').addClass('card-header').text(title);

// Crea el cuerpo de la tarjeta
var cardBody = $('<div>').addClass('card-body');
var cardTitle = $('<h5>').addClass('card-title').text(title);
var cardText = $('<p>').addClass('card-text').text(message);

// Agrega los elementos al cuerpo de la tarjeta
cardBody.append(cardTitle, cardText);

// Agrega el encabezado y el cuerpo a la tarjeta
successCard.append(cardHeader, cardBody);

// Agrega la tarjeta al cuerpo del documento
$('body').append(successCard);

// Después de un tiempo, oculta la tarjeta
setTimeout(function() {
    successCard.fadeOut('slow', function() {
        // Elimina la tarjeta del DOM después de ocultarla
        successCard.remove();
        location.reload();
    });
}, 250); // La tarjeta se ocultará después de 250 milisegundos (3 segundos)
}
