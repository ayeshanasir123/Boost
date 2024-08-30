import { type Ref, ref, inject, computed } from 'vue'
import { defineStore } from 'pinia'
//import {$mqtt} from 'vue-paho-mqtt';
import { type Project } from '../models/Project'
import { boostApi } from '@boost/shared'

interface ProjectFilter {
    customerUUID?: string | null;
}

export const useProjectStore = defineStore('project', () => {
    const projects = ref<Project[]>([]);
    const emptyProject = ref<Project | null>(null);

    interface ProjectResponse {
        projects: Project[]
    }

    async function save(project: Project) {
        if (project.UUID == undefined) {
            return await createProject(project);
        } else {
            return await updateProject(project);
        }
    }

    async function createProject(project: Project) {
        const projectResponse = await boostApi.post('/projects', project) as Project;
        projects.value.push(projectResponse);
        return projectResponse; // Return data to the caller
    }

    async function updateProject(updatedProject: Project) {
        const projectResponse = await boostApi.put(`/projects/${updatedProject.UUID}`, updatedProject) as Project;

        const existingProject = projects.value.find(
            (Project: Project) => Project.UUID === updatedProject.UUID
        ) as Project;

        let exists = true;

        if (existingProject != undefined) {
            Object.assign(existingProject, projectResponse as Project);
        } else {
            exists = false;
        }

        if (!exists) {
            projects.value.push(projectResponse)
        }

        return projectResponse; // Return data to the caller

    }

    async function getProjectByUUID(projectUUID: string) {
        let localProject = projects.value.find(
            (Project: Project) => Project.UUID === projectUUID
        );

        const project = await boostApi.get(`/projects/${projectUUID}`) as Project;

        if (localProject == undefined) {
        }

        return project;
    }

    async function getEmptyObject() {
        if (emptyProject.value == null || emptyProject.value == undefined) {
            const projectResponse = await boostApi.get(`/projects/emptyObject`) as Project;

            emptyProject.value = projectResponse as Project;
        }
        return emptyProject.value;
    }

    async function fetchData() {
        try {
            const data = await boostApi.get('/projects') as ProjectResponse;
            projects.value = data.projects;
        } catch (error) {
            // Handle any errors that occur during the request
            console.error('Error while fetching orders:', error);
        }
    }

    async function getProjectsByCustomerUUID(customerUUID: string): Promise<Project[]> {
        return projects.value.filter(
            (Project: Project) => Project.customerUUID === customerUUID
        );
    }

    function getProjectsByFilter(filterObject: Ref<ProjectFilter>) {
        return computed(() => {
            return projects.value.filter(project => {
                return Object.entries(filterObject.value).every(([key, value]) => {
                    // Match if value is undefined (filter is not set) or if value is null (wildcard match) or if the values match
                    return value === undefined || value === null || project[key as keyof Project] === value;
                });
            });
        });
    }

    function getProjects(): Project[] {
        return projects.value;
    }

    //Initialize the store with draft orders
    fetchData();

    return {
        projects,
        fetchData,
        save,
        getProjectByUUID,
        getProjects,
        getEmptyObject,
        getProjectsByCustomerUUID,
        getProjectsByFilter
    }
})
