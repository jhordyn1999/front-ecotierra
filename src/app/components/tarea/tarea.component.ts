import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Table } from 'primeng/table';
import { TareaService } from 'src/app/services/tarea/tarea.service'
// import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import {DropdownModule} from 'primeng/dropdown';
import { FormBuilder, FormGroup } from '@angular/forms';




@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  styleUrls: ['./tarea.component.scss'],
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None
})
export class TareaComponent implements OnInit {
    //Filtro fecha 
    rangeDates: Date[];
    datefin: Date;
    dateinicio: Date;
    fechaInico: string | undefined;
    fechaFin: string | undefined;

  //DropDowns
  SubTareaData:any = [];
  TareaData: any = [];
ResponsableData : any =[];
PrioridadData : any = [{PrioridadID: 1 , NombrePrioridad:"Alta", color:'danger'},
                      {PrioridadID: 2 , NombrePrioridad:"Media", color: 'warning'},
                      {PrioridadID: 3 , NombrePrioridad:"Baja", color: 'success'}];
EstadoData : any =[{EstadoID: 1, NombreEstado:"Pendiente"},
                    {EstadoID: 2, NombreEstado:"En Ejecución"},
                    {EstadoID: 3, NombreEstado:"Finalizada"}
];

  editar: boolean = false;
  subTarea : boolean = false;
  modoDetalle: boolean = false;
  id! : number ;
  //Formulario
  FormTarea!:FormGroup;
  //Modal
  ModalTarea=false;
  //Tabla
  loading: boolean = false;
  @ViewChild('dt1') dt1: Table | undefined;
  constructor(private TareaService:TareaService, private spinner: NgxSpinnerService, private messageService: MessageService,  public formulario:FormBuilder) { 
    //Formulario
    this.FormTarea=this.formulario.group({
      name:"",
      state:null,
      priority:null,
      user_id:null,
      task_id:null,
      Fecha_Creacion:"",
      Fecha_Limite:new Date(),
      limit_date: "",
    });
    this.rangeDates = [];
    this.datefin = new Date();
    this.dateinicio = new Date();
  }

  ngOnInit(): void {
    this.getFechaActual();  
    this.ObtenerTarea();  
    this.ObtenerResponsable(); 
  }
  getFechaActual() {
    var today = Date.now();
    this.fechaFin = moment(today).format('MM/DD/YYYY');
    this.datefin = new Date(this.fechaFin);
    this.fechaInico = moment().subtract(7, 'days').format("MM/DD/YYYY");
    this.dateinicio = new Date(this.fechaInico);
    this.rangeDates.push(this.dateinicio);
    this.rangeDates.push(this.datefin);
  }
  getState(id:number){
   const obj= this.EstadoData.find((ele:any) => ele.EstadoID == id);
   return obj?.NombreEstado;
  }
  getPrioridad(id:number){
    const obj= this.PrioridadData.find((ele:any) => ele.PrioridadID == id);
    return obj?.NombrePrioridad;
   }
   getColorPrioridad(id: number){
    const obj= this.PrioridadData.find((ele:any) => ele.PrioridadID == id);
    return obj?.color;
   }
  getResponsable(id:number){
    const obj= this.ResponsableData.find((ele:any) => ele.id == id);
    return obj?.name +' '+ obj?.last_name   
   }
  ObtenerTarea(){
     this.spinner.show();
    this.loading = true;
    this.TareaService.ObtenerTarea().subscribe(res=>{
      this.TareaData=res.response;      
      this.loading = false;
      this.spinner.hide();
    },(error: any) => {
      this.loading = false;
      this.spinner.hide();
      Swal.fire('Error','Error en al petición cod:01','error');
    });
  }
  // obtenerSubtarea(id: number){
  //   this.spinner.show();
  //   this.loading = true;
  //   this.TareaService.ObtenerSubTarea(id).subscribe(res=>{
  //     if (res) {
  //       this.SubTareaData=res.response;
  //     }
  //     this.loading = false;
  //     this.spinner.hide();
  //   },(error: any) => {
  //     this.loading = false;
  //     this.spinner.hide();
  //     Swal.fire('Error','Error en al petición cod:01','error');
  //   });
  // }
  Insertar(){
    this.spinner.show();
   this.loading = true;
   var fecha = moment(this.FormTarea.value.Fecha_Limite).format("YYYY-MM-DD")
   this.FormTarea.patchValue({
    limit_date: fecha
   })
   let modalidad="";
   if (this.subTarea) {
    modalidad= "subTarea";
   }else{
    modalidad = "tarea"
   }
   if (this.FormTarea.value.name && this.FormTarea.value.state && this.FormTarea.value.priority && this.FormTarea.value.user_id && this.FormTarea.value.limit_date) {
    this.TareaService.Insertar(this.FormTarea.value,modalidad).subscribe(res=>{
      Swal.fire('Success','Operación Exitosa','success');
      this.ModalTarea=false;
      this.ObtenerTarea();
      this.BlanqueoVariables()
      //  this.TareaData=res.respuesta;
       this.loading = false;
       this.spinner.hide();
     },(error: any) => {
       this.loading = false;
       this.spinner.hide();
       Swal.fire('Error','Error en al petición cod:01','error');
     });
   }else{
    this.loading = false;
    Swal.fire('Error','Llene todos los campos','error');
    
   }
  
 }
 Modificar(){
  this.spinner.show();
   this.loading = true;
   var fecha = moment(this.FormTarea.value.Fecha_Limite).format("YYYY-MM-DD")
   this.FormTarea.patchValue({
    limit_date: fecha
   })
   let modalidad="";
   if (this.subTarea) {
    modalidad= "subTarea";
   }else{
    modalidad = "tarea"
   }
   if (this.FormTarea.value.name && this.FormTarea.value.state && this.FormTarea.value.priority && this.FormTarea.value.user_id && this.FormTarea.value.limit_date) {

   this.TareaService.Modificar(this.FormTarea.value,this.id,modalidad).subscribe(res=>{
    Swal.fire('Success','Operación Exitosa','success');
    this.ModalTarea=false;
    this.ObtenerTarea();
    this.BlanqueoVariables();
    //  this.TareaData=res.respuesta;
     this.loading = false;
     this.spinner.hide();
   },(error: any) => {
     this.loading = false;
     this.spinner.hide();
     Swal.fire('Error','Error en al petición cod:01','error');
   });
  }else{
    this.loading = false;
    Swal.fire('Error','Llene todos los campos','error');
    
  }
 }
  ObtenerResponsable(){
    this.spinner.show();
   this.loading = true;
   this.TareaService.ObtenerResponsable().subscribe(res=>{
    //  this.ResponsableData=res.response.map((ele:any)=>{
    //       ele.id= ele.id
    //       ele.name= ele.name + ele.lastname
    //  });
    this.ResponsableData=res.response
     this.loading = false;
     this.spinner.hide();
   },(error: any) => {
     this.loading = false;
     this.spinner.hide();
     Swal.fire('Error','Error en al petición cod:01','error');
   });
 }
  clickAgregarTarea(){
    this.modoDetalle = false;
    this.editar=false;
    this.subTarea = false;
    this.ModalTarea= true;
    this.BlanqueoVariables();
  }
  clickSubTarea(tarea : any){
    this.modoDetalle = false;
    this.editar=false;
    this.subTarea = true;
    this.ModalTarea= true;
    this.FormTarea.patchValue({
      task_id: tarea.id
    })
    

  }
  clickDetalle(tarea : any){
   this.SubTareaData =[];
  this.modoDetalle = true;
  this.editar=false;
  this.ModalTarea= true;
  this.SubTareaData = tarea.subtask;
  this.FormTarea.patchValue({
    
    name: tarea.name,
    priority: tarea.priority,
    state:tarea.state,
    user_id:tarea.user_id,
    Fecha_Creacion: moment(tarea.created_at).format("DD/MM/YYYY"),
    Fecha_limite:tarea.limit_date,
    limit_date:tarea.limit_date,
  })
  }
  clickEditarTarea(tarea : any){
    this.modoDetalle = false;
    this.editar=true;
    this.subTarea = false;
    this.ModalTarea = true;
    this.id = tarea.id;
    this.FormTarea.patchValue({
      name: tarea.name,
      priority: tarea.priority,
      state:tarea.state,
      user_id:tarea.user_id,
      Fecha_Creacion: tarea.created_at,
      Fecha_limite:tarea.limit_date,
      limit_date:tarea.limit_date,
    })
  }
  clickEditarSubTarea(tarea : any){
    this.modoDetalle = false;
    this.editar=true;
    this.subTarea = true;
    this.ModalTarea = true;
    this.FormTarea.patchValue({
      name: tarea.name,
      priority: tarea.priority,
      state:tarea.state,
      user_id:tarea.user_id,
      Fecha_Creacion: tarea.created_at,
      Fecha_limite:tarea.limit_date,
      limit_date:tarea.limit_date,
    })
  }
  clickEliminar(tarea? : any, modalidad?:any){
    this.spinner.show();
    this.loading = true;
    this.TareaService.Eliminar(tarea.id,modalidad).subscribe(res=>{
      Swal.fire('Success','Operación Exitosa','success');
     this.ModalTarea=false;
     this.ObtenerTarea();
     this.BlanqueoVariables();
     //  this.TareaData=res.respuesta;
      this.loading = false;
      this.spinner.hide();
    },(error: any) => {
      this.loading = false;
      this.spinner.hide();
      Swal.fire('Error','Error en al petición cod:01','error');
    });
  }



  BlanqueoVariables(){
   
    this.FormTarea.patchValue({
      name:"",
      priority: null,
      state:null,
      user_id:null,
      Fecha_limite:new Date(),
      limit_date:"",
    })
  }

  public alertQuestion(modo:string, tarea?:any, modalidad? : string | undefined ){
    Swal.fire({
      text: "¿Está seguro de realizar la operación?",
      icon: "warning",
      showCancelButton: true,
      buttonsStyling: false,
      confirmButtonText: "Si, confirmar",
      cancelButtonText: "No, Cancelar",
      customClass: {
          confirmButton: "btn btn-primary",
          cancelButton: "btn btn-active-light"
      }
  }).then( (result)=> {
      if (result.value) {
        if (modo === "insertar") {
          this.Insertar();
        }	else if(modo === "modificar"){
          this.Modificar();
        } else if(modo === "eliminar"){
            this.clickEliminar(tarea, modalidad)
        }
      } 
      
  });
  }
  /****************************/
  /*_________DROPDOWN_________*/
  applyFilter($event: any, field: any, matchMode: any) {
    this.dt1?.filter(($event.target as HTMLInputElement).value, field,matchMode);
  }
  applyFilterCustom($event: any, field: any, matchMode: any) {
    this.dt1?.filter($event.value, field,matchMode);
  }
  onDateSelect(value: any) {
    this.dt1?.filter(this.formatDate(value), 'FechaLimite', 'contains');
  }
  formatDate(date: any) {
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) {
        month = '0' + month;
    }

    if (day < 10) {
        day = '0' + day;
    }
    return date.getFullYear() + '-' + month + '-' + day;
  }
  getDateTime(fecha: any) {
    return moment(fecha).format("DD/MM/YYYY hh:mm a");
  }
  getDate(fecha: any){
    return fecha==null?'':moment(fecha).format("DD/MM/YYYY");
  }
  /****************************/
}



