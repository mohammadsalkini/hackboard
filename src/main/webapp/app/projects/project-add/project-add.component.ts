import { ProjectRoleService } from './../../api/api/projectRole.service';
import { ProjectRoleDto } from './../../api/model/projectRoleDto';
import { Component, OnInit } from '@angular/core';
import { ProjectDto, ProjectService } from '../../api';
import { Router } from '@angular/router';
import { TagService } from './../../api/api/tag.service';

@Component({
  templateUrl: './project-add.component.html'
})
export class ProjectAddComponent implements OnInit {
  data: ProjectDto = {
    title: '',
    description: '',
    ownerId: 0,
    github: '',
    projectRole: [],
    projectStories: [],
    tags: []
  };
  roleData: ProjectRoleDto = { roleName: '', color: '', count: 0 };
  roles: Array<ProjectRoleDto>;
  stories: Array<string>;
  projectRoles: Array<ProjectRoleDto>;
  tags: Array<string> = [];
  selectedTags: Array<string> = [];

  constructor(
    private projectService: ProjectService,
    private tagservice: TagService,
    private router: Router,
    private projectRoleService: ProjectRoleService
  ) {}

  ngOnInit() {
    this.projectRoleService.listProjectRoles().subscribe(roles => (this.roles = roles));
    this.tagservice.showAllTags().subscribe(tags => (this.tags = tags));
    this.projectRoles = [];
    this.stories = [];
  }

  submit() {
    this.data.projectRole = this.projectRoles;
    this.data.projectStories = this.stories;
    this.data.tags = this.selectedTags;
    this.projectService.addProject(this.data).subscribe(() => this.router.navigate(['/projects']));
  }

  addRole(roleValue) {
    const newRoleData = { roleName: '', color: '', count: 1 };
    newRoleData.roleName = roleValue;
    let tmpcolor = '';
    for (let i = 0; i < this.roles.length; i++) {
      if (this.roles[i].roleName === roleValue) {
        tmpcolor = this.roles[i].color;
      }
    }
    newRoleData.color = tmpcolor;
    let roleFound = false;
    for (let i = 0; i < this.projectRoles.length; i++) {
      if (roleValue === this.projectRoles[i].roleName) {
        this.projectRoles[i].count++;
        roleFound = true;
      }
    }
    if (roleFound === false) {
      this.projectRoles.push(newRoleData);
    }
  }

  addStory(story) {
    this.stories.push(story);
  }

  delstory(story) {
    for (let i = 0; i < this.stories.length; i++) {
      if (story === this.stories[i]) {
        this.stories.splice(i, 1);
      }
    }
  }

  deleteRole(role) {
    for (let i = 0; i < this.projectRoles.length; i++) {
      if (role === this.projectRoles[i].roleName) {
        if (this.projectRoles[i].count === 1) {
          this.projectRoles.splice(i, 1);
        } else {
          this.projectRoles[i].count--;
        }
      }
    }
  }

  getFilledArray(count) {
    return Array(count).fill(true);
  }

  public selected(value: any): void {
    console.log('Selected value is: ', value);
  }

  public removed(value: any): void {
    console.log('Removed value is: ', value);
  }

  public itemsToString(value: Array<any> = []): string {
    return value
      .map((item: any) => {
        return item.text;
      })
      .join(',');
  }
}
