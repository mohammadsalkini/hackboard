import { ApplicationDto } from './../../api/model/applicationDto';
import { ProjectRoleService } from './../../api/api/projectRole.service';
import { ApplicationService } from './../../api/api/application.service';
import { ProjectRoleDto } from './../../api/model/projectRoleDto';
import { Component, OnInit } from '@angular/core';
import { ProjectDto, ProjectService } from '../../api';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Principal } from './../../shared';
@Component({
  templateUrl: './project-view.component.html'
})
export class ProjectViewComponent implements OnInit {
  project: ProjectDto = {
    id: 0,
    title: '',
    description: '',
    github: '',
    ownerLoginName: '',
    projectRole: [],
    applicationDto: [],
    projectStories: [],
    tags: []
  };
  applicant: ApplicationDto = {
    id: 0,
    applicant: 0,
    projectId: 0,
    roleId: 0,
    applicantFullName: '',
    roleName: '',
    status: 1
  };
  roleData: ProjectRoleDto = { id: 0, roleName: '', color: '', count: 0 };
  roles: Array<ProjectRoleDto>;
  settingsAccount: any;
  modalRef: NgbModalRef;
  isApplied: Boolean = false;
  rolesApply: number[];
  id: number;
  isGithub: Boolean;
  isOwner: Boolean = false;
  selectedTags: Array<string> = [];
  tagstring: String;
  applicationDtoArray: Array<ApplicationDto> = [];

  constructor(
    private projectService: ProjectService,
    private principal: Principal,
    private applicationService: ApplicationService,
    private projectRoleService: ProjectRoleService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.projectService.viewProject(this.id).subscribe(project => {
      this.project = project;
      this.project.github ? (this.isGithub = true) : (this.isGithub = false);
      this.selectedTags = this.project.tags;
      this.applicationDtoArray = this.project.applicationDto;

      this.applicationService.getRoleApplication(this.id).subscribe(rolesApply => {
        this.rolesApply = rolesApply;
      });

      this.projectRoleService.listProjectRoles().subscribe(roles => (this.roles = roles));

      this.principal.identity().then(account => {
        this.settingsAccount = this.copyAccount(account);
        this.isOwner = false;
        if (this.settingsAccount.login === this.project.ownerLoginName) {
          this.isOwner = true;
        }
      });
    });
  }

  getFilledArray(count) {
    return Array(count).fill(true);
  }

  toggleApply(roleId, roleName) {
    this.applicant.projectId = this.project.id;
    this.applicant.roleId = roleId;
    this.applicant.applicant = this.settingsAccount.id;
    this.applicant.applicantFullName =
      this.settingsAccount.firstName + ' ' + this.settingsAccount.lastName;
    this.applicant.roleName = roleName;
    let roleFound = false;

    for (let i = 0; i < this.rolesApply.length; i++) {
      if (roleId === this.rolesApply[i]) {
        roleFound = true;
      }
    }

    if (roleFound === false) {
      this.applicationService
        .addapplication(this.applicant)
        .subscribe(() => this.router.navigate(['/#']));
      this.rolesApply.push(roleId);
      this.applicationDtoArray.push(this.applicant);
    } else {
      this.applicationService
        .delapplication(this.project.id, roleId)
        .subscribe(() => this.router.navigate(['/#']));
      for (let index = 0; index < this.rolesApply.length; index++) {
        if (this.rolesApply[index] === roleId) {
          this.rolesApply.splice(index, 1);
        }
      }
      for (let index = 0; index < this.applicationDtoArray.length; index++) {
        const tmpapplicant = this.applicationDtoArray[index];
        if (tmpapplicant.roleId === roleId && tmpapplicant.applicant === this.settingsAccount.id) {
          this.applicationDtoArray.splice(index, 1);
        }
      }
    }
  }

  deleteProject() {
    this.projectService
      .deleteProject(this.project.id)
      .subscribe(() => this.router.navigate(['/projects']));
  }

  copyAccount(account) {
    return {
      id: account.id,
      activated: account.activated,
      email: account.email,
      github: account.github,
      firstName: account.firstName,
      langKey: account.langKey,
      lastName: account.lastName,
      description: account.description,
      login: account.login,
      imageUrl: account.imageUrl
    };
  }

  changeStatus(roleid, statusid) {
    this.applicationService
      .editstatusapplication(this.id, roleid, statusid)
      .subscribe(() => this.router.navigate(['/#']));
  }

  getCaption(roleId) {
    for (let index = 0; index < this.rolesApply.length; index++) {
      if (this.rolesApply[index] === roleId) {
        return 'Applied';
      }
    }
    return 'Apply';
  }
}
