import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/models/project';
import { Global } from 'src/app/services/global';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [ProjectService]
})
export class DetailComponent implements OnInit {
  public url: string;
  public project: Project = new Project('','','','','','','');

  constructor(
    private _project: ProjectService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.url = Global.url;
  }

  ngOnInit() {

    this._route.params.subscribe(params => {
      let id = params.id;
      this.getProject(id);
    });
  }

  getProject(id: string){
    this._project.getProject(id).subscribe(
      response => {
        this.project = response.project;
        console.log(this.project);
      },
      error => {
        console.log(error);          
      }
    );
  }


  deleteProject(id: string){this._project.deleteProject(id).subscribe(
      response =>{
        console
        if(response.proyecto){
          this._router.navigate(['proyectos']);
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }


}
