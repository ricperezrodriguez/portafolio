import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/models/project';
import { Global } from 'src/app/services/global';
import { ProjectService } from 'src/app/services/project.service';
import { UploadService } from 'src/app/services/upload.services';

@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ProjectService, UploadService]
})
export class EditComponent implements OnInit {
  public title: string;
  public url: string = Global.url;
  public project: Project;
  //public save_project;
  public estado: boolean = false;
  public filesToUpload: Array<File> = [];

  constructor(
    private _projectService: ProjectService,
    private _route: ActivatedRoute,
    
    private _uploadService: UploadService
  ) { 
    this.title = "Editar projecto";
    this.project = new Project('', '', '', '' ,'' ,'' ,'')
  }

  ngOnInit(): void {
    this.getProject();
  }



  getProject(){
    let id: string = '';
    this._route.params.subscribe(params => {
      id = params.id;
    })

    this._projectService.getProject(id).subscribe(
      response => {
        this.project = response.project;
        this.estado = true;
        console.log(this.project)
      },
      error => {
        console.log(error);
      }
    )
  }


  onSubmit(){
    console.log(this.project);
    this._projectService.updateProject(this.project).subscribe(
      response => {
        if(response.proyecto){
          this.project = response.proyecto;
          this.estado = true;
          //subir la imagen
          console.log(this.project.image);
          console.log(this.filesToUpload.length)
          if(this.filesToUpload.length > 0){

            this._uploadService.makeFileRequest(Global.url+"upload-image/"+this.project._id, [], this.filesToUpload, 'imagen')
            .then((result:any) => {
              this.getProject();
          });
          }   
        }else{
          this.estado = false;
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  

  archivoChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
    this.project.image = "";
  }


}
