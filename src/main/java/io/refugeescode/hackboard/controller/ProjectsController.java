package io.refugeescode.hackboard.controller;


import io.refugeescode.hackboard.domain.Project;
import io.refugeescode.hackboard.repository.ProjectRepository;
import io.refugeescode.hackboard.repository.UserRepository;
import io.refugeescode.hackboard.security.AuthoritiesConstants;
import io.refugeescode.hackboard.service.dto.ProjectDto;
import io.refugeescode.hackboard.service.mapper.ProjectMapper;
import io.refugeescode.hackboard.web.api.controller.ProjectsApi;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProjectsController implements ProjectsApi {

    private ProjectRepository projectsRepository;
    private UserRepository userRepository;

    public ProjectsController(ProjectRepository projectsRepository, UserRepository userRepository) {

        this.projectsRepository = projectsRepository;
        this.userRepository = userRepository;
    }

    @Override
//    @Secured({AuthoritiesConstants.USER, AuthoritiesConstants.ADMIN})
    public ResponseEntity<Boolean> addProject(@RequestBody ProjectDto project) {
        Project entity = new Project();
        entity.setTitle(project.getTitle());
        entity.setDescription(project.getDescription());
        entity.setUser(4L);
        entity.setUser_fk(userRepository.findOne(2L));

        projectsRepository.save(entity);

        return new ResponseEntity<>(true, HttpStatus.OK);
    }

    @Override
//    @Secured({AuthoritiesConstants.USER, AuthoritiesConstants.ADMIN})
    public ResponseEntity<Boolean> editProject(ProjectDto project) {
        Project entity = projectsRepository.findOne(project.getId());
        entity.setTitle(project.getTitle());
        entity.setDescription(project.getDescription());

        projectsRepository.save(entity);

        return new ResponseEntity<>(true, HttpStatus.OK);
    }

    @Override
//    @Secured(AuthoritiesConstants.ANONYMOUS)
    public ResponseEntity<List<ProjectDto>> listProjects() {
        return new ResponseEntity<>(
            projectsRepository.findAll().stream()
                .map(ProjectMapper.INSTANCE::projectToProjectDto)
                .collect(Collectors.toList()),
            HttpStatus.OK
        );
    }

    @Override
//    @Secured(AuthoritiesConstants.ANONYMOUS)
    public ResponseEntity<ProjectDto> viewProject(@PathVariable("projectId") Long projectId) {
        return new ResponseEntity<>(
            ProjectMapper.INSTANCE.projectToProjectDto(
                projectsRepository.findOne(projectId)),
            HttpStatus.OK
        );
    }

    @Override
//    @Secured({AuthoritiesConstants.USER, AuthoritiesConstants.ADMIN})
    public ResponseEntity<Boolean> deleteProject(@PathVariable("projectId") Long projectId) {
        projectsRepository.delete(projectId);
        return new ResponseEntity<>(true, HttpStatus.OK);
    }
}
