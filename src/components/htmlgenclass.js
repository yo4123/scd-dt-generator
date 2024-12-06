// htmlgenclass.js
export class HtmlGenerator {
    constructor(data_dbcrud, data_addtitle, data_cols  ) {
        this.data_dbcrud = data_dbcrud;
        this.data_addtitle = data_addtitle;
        this.data_cols = data_cols;
        

        
    }

    generateHeader() {
        return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simple Datatable</title>
    <!-- Agrega las hojas de estilo de Bootstrap y DataTables desde CDN -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.11.5/css/dataTables.bootstrap5.min.css">
    <link rel="stylesheet" href="./assets/css/index.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" integrity="sha384-4LISF5TTJX/fLmGSxO53rV4miRxdg84mZsxmO8Rx5jGtp/LbrixFETvWa5a6sESd" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdn.datatables.net/1.11.5/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.11.5/js/dataTables.bootstrap5.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.12.4/dist/sweetalert2.all.min.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/sweetalert2@11.12.4/dist/sweetalert2.min.css" rel="stylesheet">
    <script src="./assets/js/script.js"></script> <!-- Tu script personalizado -->
        
    <script type="text/javascript" src="https://cdn.datatables.net/buttons/2.2.2/js/dataTables.buttons.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/pdfmake.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/vfs_fonts.js"></script>
    <script type="text/javascript" src="https://cdn.datatables.net/buttons/2.2.2/js/buttons.html5.min.js"></script>
    <script type="text/javascript" src="https://cdn.datatables.net/buttons/2.2.2/js/buttons.print.min.js"></script>
    

<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-S2YRDRYFWZ"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-S2YRDRYFWZ');
</script>



    </head>
`;
    }

    generateNavbar() {
        return `
<body>
    <div class="mai-wrapper">
        <nav class="navbar navbar-expand-lg mai-sub-header">
            <div class="col-12 text-left">
                <a href="#">
                <img src="assets/images/logo.png" alt="Logo" style="position: absolute; height: 76px;">
                <!-- <img src="http://fpoimg.com/167x76?text=your%20logo" style="position: absolute; height: 76px;">--></a>
                <label class="logoutLblPos"> 
                    <a href="desconectar.php"><span style="color: #fff; font-size: 11px;"><i class="bi bi-box-arrow-right"></i>Cerrar Sesión</span></a>
                    <br><br>
                    <span style="color: #fff; font-size: 11px;" id="usuario_sesion"><i class="bi bi-person-circle"></i></span>
                </label>
                <!-- Links de inicio -->
                <div class="container">
                    <nav class="navbar navbar-expand-md">
                        <button class="navbar-toggler hidden-md-up collapsed" type="button" data-toggle="collapse" data-target="#mai-navbar-collapse" aria-controls="mai-navbar-collapse" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="icon-bar"><span></span><span></span><span></span></span>
                        </button>
                        <div class="navbar-collapse collapse mai-nav-tabs" id="mai-navbar-collapse">
                            <ul class="nav navbar-nav">
                                <li class="nav-item parent open"><a class="nav-link" href="index.php" role="button" aria-expanded="false"><span class="icon s7-home"></span><span>Inicio</span></a></li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </nav>
`;
    }

    generateBody() {
        let additionalSection = '';
        const data_addtitle = 'TITLE';
        let sizemodal = '';

        if (this.data_dbcrud === 'YES') {
            additionalSection = `
                <div class="table-title">
                    <div class="row">
                        <div class="col-sm-3">
                            <h2 class="data_addtitle">${this.data_addtitle}</h2>
                        </div>
                        <div class="col-sm-3">
                         
                         <button type="button" class="btn btn-success data_addbtn "   data-bs-dismiss="modal"><i class="bi bi-plus-circle-fill"></i>  agregar </button>
                            </div>
                        <div class="col-sm-6"></div>
                    </div>
                </div>
            `;
        } else {
            additionalSection = `
                <div class="table-title">
                    <div class="row">
                        <div class="col-sm-6">
                            <h2 class="data_addtitle">${data_addtitle}</h2>
                        </div>
                        <div class="col-sm-6">
                            <!-- Contenido diferente cuando crud es NO -->
                        </div>
                    </div>
                </div>
            `;
        }

        if (this.data_cols.split(',').length > 10) {
            sizemodal = 'doublemodal';
        }

        return `
        <div class="main-content container">
            <div class="row">
                <div class="col-12">
                    <div class="project-list">
                        <!-- Contenido del Body -->
                    </div>
                </div>
            </div>
        </div>
        <div class="container mt-5">
         ${additionalSection}
            <table id="miTabla" class="table table-striped table-bordered">
                <!-- La tabla se generará aquí dinámicamente -->
            </table>
        </div>
   
        <div class="modal fade" id="editarUsuarioModal" tabindex="-1" aria-labelledby="editarUsuarioModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content ${sizemodal}">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editarUsuarioModalLabel">Editar Usuario</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <!-- Contenido del formulario de edición -->
                        <form id="formEditarUsuario">
                            <!-- Agrega aquí los campos de edición -->
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-primary" onclick="guardarEdicionUsuario()">Guardar Cambios</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="agregarUsuarioModal" tabindex="-1" aria-labelledby="agregarUsuarioModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content ${sizemodal}">
                    <div class="modal-header">
                        <h5 class="modal-title" id="agregarUsuarioModalLabel">Agregar Nuevo Usuario</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <!-- Contenido del formulario para agregar un nuevo usuario -->
                        <form id="formAgregarUsuario"> 
                            <!-- Agrega aquí los campos para el nuevo usuario -->
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-primary" onclick="guardarNuevoUsuario()">Guardar</button>
                    </div>
                </div>
            </div>
        </div>
`;
    }

    generateFooter() {
        return `
    </div>
    </body>
    </html>
`;
    }
}
