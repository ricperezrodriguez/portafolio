import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [ProjectService]
})
export class ProjectsComponent implements OnInit {
  public list_projects: Project[] = [];
  public url: string; 

  constructor(
    private _projectService: ProjectService
  ){ 
    this.url = Global.url;
  }

  ngOnInit(): void {
    this.getProject();
  }


  getProject(){
    this._projectService.getProjects().subscribe(
      response => {
        if(response.project){
          this.list_projects = response.project;
        }
      },
      error => {
        console.log(<any>error);
      } 
    );
  }

}
