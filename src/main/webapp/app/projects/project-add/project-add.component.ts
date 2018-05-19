import { Component, OnInit } from '@angular/core';
import { ProjectDto, ProjectService } from '../../api';
import { Router } from '@angular/router';

@Component({
  templateUrl: './project-add.component.html',
  styles: []
})
export class ProjectAddComponent implements OnInit {
  data: ProjectDto = { title: '', description: '', ownerId: 0 };

  constructor(private projectService: ProjectService, private router: Router) {}

  ngOnInit() {}

  submit() {
    this.projectService.addProject(this.data).subscribe(() => this.router.navigate(['/projects']));
  }
}