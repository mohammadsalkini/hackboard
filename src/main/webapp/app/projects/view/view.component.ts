import { Component, OnInit } from '@angular/core';
import { ProjectDto, ProjectService } from '../../api';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './view.component.html',
  styles: []
})
export class ProjectViewComponent implements OnInit {
  private data: ProjectDto = { id: 0, title: '', description: '' };

  constructor(private projectService: ProjectService, private route: ActivatedRoute) {}

  ngOnInit() {
    const id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.projectService.viewProject(id).subscribe(project => {
      console.log(project);
      this.data = project;
    });
  }
}
