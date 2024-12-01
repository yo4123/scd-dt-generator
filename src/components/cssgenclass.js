// htmlgenclass.js
export class CssGenerator {
    constructor(data_colorheaderhex ) {
        this.data_colorheaderhex = data_colorheaderhex;
   
    }

    generateCss() {
        return `
        /* HEADER SECTION CSS */

.btn-primary,
.btn-primary:active,
.btn-primary:hover,
.btn-primary:visited {
  /* background-color:  !important*/
}

label,
td,
th {
  font-family: Arial, sans-serif;
  font-size: 12px;
}

.txtarea {
  font-size: 10px !important;
  text-transform: uppercase;
  width: 100%;
}

.form-check-input,
.form-check-label {
  margin-left: 0;
}

#dt1 td,
#dt2 td,
#dt3 td,
#dt4 td {
  font-size: 11px;
}

.ui-state-active,
.ui-state-default,
.ui-widget-content .ui-state-active,
.ui-widget-content .ui-state-default {
  width: 100%;
}

.ui-state-active,
.ui-widget-content .ui-state-active {
  border: 1px solid #00377b;
  background: #00377b;
}

.ui-accordion-content-active {
  height: 300px !important;
  overflow: auto !important;
}

select option {
  font-size: 11px;
}

#accordion {
  overflow-y: scroll;
}

#res_ramos_asignados {
  width: 100% !important;
}

#res_ramos_asignados td {
  font-size: 0.75rem;
}

#proc_tran input {
  height: 25px;
  font-size: 12px;
}

#proc_tran select {
  height: 29px;
  font-size: 12px;
}

#proc_tran label {
  margin-bottom: 0;
  font-weight: 700;
}

.chkgroup {
  margin-bottom: 0.8rem;
  float: left;
  padding-right: 5%;
  margin-bottom: 0;
}

#dialog_parametros label {
  font-weight: 700;
  text-transform: uppercase;
  font-size: 9.5px;
  margin-bottom: 0;
}

#dialog_parametros .form-control {
  margin-bottom: 10px;
}

#dialog_parametros .ui-accordion-content-active {
  height: 175px !important;
  overflow: auto !important;
}

.minbutton {
  padding: 1px 5px;
  font-size: 12px !important;
  line-height: 1.5;
}

.mingroup input {
  height: 19px;
  font-size: 11px;
  text-transform: uppercase;
}

.mingroup select {
  height: 25px !important;
  font-size: 9px;
}

.mingroup label {
  font-weight: 700;
  text-transform: uppercase;
  font-size: 9.5px;
  margin-bottom: 0;
}

.mingroup .dataTables_info,
.mingroup table tr td,
.mingroup table tr th {
  font-size: 11px;
}

.bc {
  border: solid;
  border-color: #ccc;
  border-width: 1px;
  border-radius: 2px;
  padding: 10px;
}

.logoutLblPos {
  position: fixed;
  right: 10px;
  top: 5px;
  z-index: 1001;
  position: absolute;
  float: right;
}

.spandesc {
  font-family: verdana;
  font-size: 11px;
  font-weight: bold;
}

.xstooltip {
  visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;

  font: normal 8pt sans-serif;
  padding: 3px;
  border: solid 1px;
}

#table_usuarios2 .sorting_1,
#table_usuarios2 tbody tr {
  background-color: #ffffff;
  border-top: 1px solid #ddd;
}

#prod_descriptivo_table td {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 50ch;
}

.doublemodal{width:700px !important}
.doublemodal .form-control {
    width: 80%  !important;
    float: right  !important;
  }

@media (min-width: 1280px) {
  #dialog_parametros label,
  .mingroup input,
  .mingroup select,
  .mingroup label,
  .mingroup .dataTables_info,
  .mingroup table tr td,
  .mingroup table tr th,
  #dt1 td,
  #dt2 td,
  #dt3 td,
  #dt4 td {
    font-size: 12px !important;
  }

  .mingroup select {
    height: 30px !important;
    font-size: 12px !important;
  }
  /*.ui-dialog {
    transform: scale(1.09);
}*/

  .ui-dialog {
    width: 900px !important;
  }
}

/***  **/

.mai-sub-header {
  border: 0;
  border-radius: 0;
  margin-bottom: 0;
  background-color: ${this.data_colorheaderhex};
  padding: 0 0 70px;
}

@media (min-width: 992px) .navbar-expand-lg {
  flex-flow: row nowrap;
  justify-content: flex-start;
}

.mai-top-header {
  border: 0;
  margin-bottom: 0;
  background-color: #323232;
  padding: 0;
}
.navbar-expand {
  flex-flow: row nowrap;
  justify-content: flex-start;
}

        
`;
    }

  
}
