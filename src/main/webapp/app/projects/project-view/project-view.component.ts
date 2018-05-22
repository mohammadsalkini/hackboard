import { Component, OnInit } from '@angular/core';
import { ProjectDto, ProjectService } from '../../api';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './project-view.component.html',
  styles: []
})
export class ProjectViewComponent implements OnInit {
  data: ProjectDto = { id: 0, title: '', description: '' };

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.projectService.viewProject(id).subscribe(project => {
      this.data = project;
    });
  }
  delete() {
    this.projectService
      .deleteProject(this.data.id)
      .subscribe(() => this.router.navigate(['/projects']));
  }
}
