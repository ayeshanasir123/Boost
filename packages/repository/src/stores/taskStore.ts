import { type Ref, ref, computed } from "vue";
import { defineStore } from "pinia";
import { type Task } from '../models/Tod';
import { boostApi } from "@boost/shared";

import { PersonClass } from './personStore';

interface TaskClass extends Task { };

interface TaskFilter {
    status?: string;
    assignedUUID?: string | null;
    projectUUID?: string | null;
}

class TaskClass implements TaskClass {
    get identifier() {
        return this.prefix + '-' + this.number;
    }
    get statusTitle() {
        return statuses[this.status] ?? this.status;
    }
}

const statuses = {
    NEW: 'New',
    UNASSIGNED: 'Unassigned',
    PENDING: 'Pending',
    IN_PROGRESS: 'In progress',
    WAITING: 'Waiting'
};

const categories = {
    'f809e4f2-f395-45d8-ab15-817854fbedb8': 'Support',
    "c3948f6f-a191-491e-8a1a-16b6344a7443": 'Development',
};

export const useTaskStore = defineStore('tasks', () => {

    const tasks = ref<Task[]>([]);

    async function load() {
        tasks.value = (await boostApi.get<{ tasks: Task[] }>("/tasks")).tasks.map(task => {
            Object.setPrototypeOf(task, TaskClass.prototype);
            return task;
        });
    }

    function save(task: Task) {
        return task.UUID ? update(task) : create(task);
    }

    async function create(payload: Task) {
        payload.prefix = 'X';
        payload.number = 0;
        const task = await boostApi.post<Task>("/tasks/", payload);
        console.log(task);
        tasks.value.push(task);
        return task;
    }

    async function update(payload: Task) {
        const task = await boostApi.put<Task>("/tasks/" + payload.UUID, payload);
        const found = tasks.value.find(task => task.UUID === payload.UUID);
        found ? Object.assign(found, task) : tasks.value.push(task);
        console.log(payload);
        console.log(task);
        console.log(found);
        return task;
    }

    async function get(id: string) {
        const task = await boostApi.get<Task>(`/tasks/${id}`);
        Object.setPrototypeOf(task, TaskClass.prototype);
        const found = tasks.value.find(task => task.UUID == id) as Task;
        found ? Object.assign(found, task) : tasks.value.push(task);
        return task;
    }

    function doDelete(id: string) {
        alert('task deletion: not implemented');
        /*
        for (let i=0; i <= taskList.value.length; i++) {
          if (taskList.value[i].taskId == taskUUID) {
            taskList.splice(i,1);
            break;
          }
        }*/

    }

    function getTasksByFilter(filterObject: Ref<TaskFilter>) {
        return computed(() => {
            return tasks.value.filter(task => {
                return Object.entries(filterObject.value).every(([key, value]) => {
                    // Match if value is undefined (filter is not set) or if value is null (wildcard match) or if the values match
                    return value === undefined || value === null || task[key as keyof Task] === value;
                });
            });
        });
    }

    function getEmpty() {
        return {
            UUID: '',
            responsibleUUID: null,
            assignedUUID: null,
            categoryUUID: '',
            title: '',
            customerPartyName: '',
            projectName: '',
            description: '',
            plannedEndDate: null,
            weight: 0
        };
    }

    load();
    return {
        statuses,
        categories,
        tasks,
        delete: doDelete,
        save,
        get,
        getEmpty,
        update,
        getTasksByFilter,
    };
});