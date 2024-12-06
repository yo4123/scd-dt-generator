 

  export const getDataTableCode = (dbData) => {
    if (!dbData.data_cols) {
      throw new Error('data_cols is not defined in dbData');
    }
  
    const crudcontrols = dbData.data_datacrud.map(col => col.trim()); 
    const controloptions = dbData.data_options.map(opt => opt.trim().split(',').map(item => item.trim())); 
    const columns = dbData.data_cols.map(col => col.trim());
  
    let arrcol = [];
    columns.forEach((value) => {
      arrcol.push(value);
    });
 
 
     function generateHTMLControls(crudcontrols, controloptions, columnNames) {
     const formFields = crudcontrols.map((control, index) => {
    const options = controloptions[index] || [];
    const key = columnNames[index];
    let html = '';
 

 
    
    switch (control.trim()) {
      case '<select>':
        html = `
          <div class="mb-3">
            <label for="${key}" class="form-label">${key}</label>
            <select class="form-select" id="${key}" name="${key}" >
              ${options.map(opt => `<option value="${opt.trim()}">${opt.trim()}</option>`).join('')}
            </select>
          </div>`;
          console.log(control.trim());
        break;

      case '<input type="checkbox">':
        html = `
          <div class="mb-3">
            <label class="form-label">${key}</label>
            ${options.map(opt => `
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="${opt.trim()}" name="${key}" value="${opt.trim()}">
                <label class="form-check-label" for="${opt.trim()}">${opt.trim()}</label>
              </div>`).join('')}
          </div>`;
          console.log(control.trim())
        break;
      case '<input type="radio">':
          html = `<p>Please select your option:</p>
          ${options.map(opt => 
            `<div>
              <input type="radio" id="${opt.trim()}" name="${key}" value="${opt.trim()}">
              <label for="${opt.trim()}">${opt.trim()}</label>
            </div>`
          ).join('')}`;
          console.log(control.trim())
        break;
  
      case '<textarea>':
        html = `
          <div class="mb-3">
            <label for="${key}" class="form-label">${key}</label>
            <textarea class="form-control" id="${key}" name="${key}"></textarea>
          </div>`;
          console.log(control.trim())
        break;

      case '<input>':
      default:
        html = `
          <div class="mb-3">
            <label for="${key}" class="form-label">${key}</label>
            <input type="text" class="form-control" id="${key}" name="${key}">
          </div>`;
          console.log(control.trim());
        break;
    }
   
    return html;
  });

  // Decide si usar una o dos columnas basado en la cantidad de campos
  if (formFields.length <= 10) {
    return formFields.join('\n');
  } else {
    const leftColumn = formFields.slice(0, Math.ceil(formFields.length / 2));
    const rightColumn = formFields.slice(Math.ceil(formFields.length / 2));
    return `
      <div class="row">
        <div class="col-md-6">
          ${leftColumn.join('\n')}
        </div>
        <div class="col-md-6">
          ${rightColumn.join('\n')}
        </div>
      </div>`;
  }
}

   
  
    let tableInitCode = `
    // Declarar table en un contexto accesible globalmente
    var table;
    $(document).ready(function() {
       table = $('#miTabla').DataTable({
      ajax: {
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
      },
      dom: 'Bfrtip',
      buttons: [
        'copyHtml5',
        'excelHtml5',
        'csvHtml5',
        'pdfHtml5',
        'print'
      ],
      columns: [`;
  
    columns.forEach((column) => {
      tableInitCode += `
        { title: '${column}', data: '${column}' },`;
    });
  
    if (dbData.data_dbcrud === 'YES') {
      tableInitCode += `
        { title: 'actions', render: function (data, type, row) {
          return \` <button class="btn btn-danger deleteBtn">Eliminar</button>
            <button class="btn btn-primary" onclick="abrirModalEdicion(table.row( $(this).parents('tr') ).data())">Editar</button>
          \`;
        }},`;
    }
    
    tableInitCode += `
      ]
    });
  
    $('.data_addbtn').button().on('click', function() {
      abrirModalAgregar();
    });
  
    function abrirModalAgregar() {
      $('#formAgregarUsuario').empty();
      var formHtml = \`${generateHTMLControls(crudcontrols, controloptions ,  arrcol  )}\`;
      $('#formAgregarUsuario').append(formHtml);
      $('#agregarUsuarioModal').modal('show');
    }
  
    $('#miTabla').on('click', '.editBtn', function() {
      var rowData = table.row($(this).parents('tr')).data();
      abrirModalEdicion(rowData);
    });

    $('#miTabla').on('click', '.deleteBtn', function() {
      var rowData = table.row($(this).parents('tr')).data();
      var deleteId = rowData['${dbData.data_primaryKey}'];
      $.ajax({
        url: 'crudclass.php?${dbData.data_primaryKey}=' + deleteId,
        method: 'DELETE',
        dataType: 'json',
        success: function(data) {
          console.log('DELETE Success', data);
          mostrarSuccessCard('bg-danger', 'Operación Exitosa', 'eliminado con éxito.');
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.error('Error en la solicitud DELETE:', textStatus, errorThrown);
        }
      });
    });
 

    });
  


function abrirModalEdicion(rowData) {
 
  $('#formEditarUsuario').empty();
  var formHtml = \`${generateHTMLControls(crudcontrols, controloptions, arrcol)}\`;
  
  
    if(rowData['id'] !== "") {
         formHtml += \`<input type="hidden" name="${dbData.data_primaryKey}" id="edit-id" value="\${rowData['${dbData.data_primaryKey}']}">\`;
    }
    
  $('#formEditarUsuario').append(formHtml);
  
  // Prellenar los valores en los controles
  for (const key in rowData) {
    const value = rowData[key];
    const input = $(\`#formEditarUsuario [name="\${key}"]\`);

    if (input.is('input[type="text"], textarea')) {
      input.val(value);
    } else if (input.is('select')) {
      input.val(value);
    } else if (input.is('input[type="checkbox"]')) {
      input.prop('checked', value === input.val());
    } else if (input.is('input[type="radio"]')) {
      input.filter(\`[value="\${value}"]\`).prop('checked', true);
    }
  }

  $('#editarUsuarioModal').modal('show');
}

 /*
  $('#guardarEdicionUsuarioBtn').on('click', function() {
      guardarEdicionUsuario();
    });
  */
     
function guardarEdicionUsuario() {
  var editedData = {};
  $('#formEditarUsuario input').each(function() {
    var fieldName = $(this).attr('name');
    var fieldValue = $(this).val();
    editedData[fieldName] = fieldValue;
  });

  console.log("Datos editados a enviar:", editedData); // Verificar los datos antes de enviarlos

  $.ajax({
    url: 'crudclass.php?id=' + editedData['id'], // Verifica que el 'id' esté presente y sea correcto
    method: 'PUT',
    contentType: 'application/json',
    data: JSON.stringify(editedData),
    dataType: 'json',
    success: function(data) {
      console.log("Respuesta del servidor:", data); // Verifica la respuesta del servidor
      mostrarSuccessCard('bg-success', 'Operación Exitosa', 'Operación Exitosa.');
      $('#editarUsuarioModal').modal('hide');
      table.ajax.reload(); // Recarga los datos de la tabla después de la edición
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.error('Error en la solicitud PUT:', textStatus, errorThrown);
    }
  });
}

function guardarNuevoUsuario() {
  var addData = {};
  
  // Recorre todos los inputs y selects
  $('#formAgregarUsuario').find('input, select, textarea').each(function() {
    var fieldName = $(this).attr('name');
    var fieldValue = $(this).val();
    addData[fieldName] = fieldValue;
  });

  $.ajax({
    url: 'crudclass.php?${dbData.data_primaryKey}=' + addData['${dbData.data_primaryKey}'],
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
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: message,
        showConfirmButton: false,
        timer: 1500
      }).then(function() {
        setTimeout(function() {
          location.reload();
        }, 350);
      });
    }
    `;
  
    return tableInitCode;
  };
  