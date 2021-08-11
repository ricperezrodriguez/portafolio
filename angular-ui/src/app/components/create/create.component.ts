import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { Global } from 'src/app/services/global';
import { ProjectService } from 'src/app/services/project.service';
import { UploadService } from 'src/app/services/upload.services';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProjectService, UploadService]
})


export class CreateComponent implements OnInit {
  public title: string;
  public url: string = Global.url;
  public project: Project;
  public estado: boolean | undefined;
  public filesToUpload: Array<File> = [];
  
  constructor(
    private _projectService: ProjectService,
    private _projectUpload: UploadService
  ) {
    this.title = "Crear proyecto";
    this.project = new Project('', '','', '', '2021', '', '');
  }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.project);
    this._projectService.save_project(this.project).subscribe(
      response => {
        if (response.project){
          this.project = response.project;
          this.estado = true;
          
          //subir la imagen
          this._projectUpload.makeFileRequest(Global.url+"upload-image/"+response.project._id, [], this.filesToUpload, 'imagen')
          .then((result:any) => {
            console.log(result);
          });
          
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
  }

}
