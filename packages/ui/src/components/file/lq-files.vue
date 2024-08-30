<script setup lang="ts">
import { useExpose, type TableRow, LqFileInput, LqTable } from '@boost/ui';
import { type File as lqFile, useProfileStore } from '@boost/repository';
import { ref, toRef, reactive, watch, computed, onMounted, onUnmounted, getCurrentInstance, useSlots, useAttrs, unref, shallowRef, shallowReactive, markRaw, isReactive, isRef, h, mergeProps, nextTick } from 'vue';
import { BoostApi } from '@boost/shared';
const api = new BoostApi('https://api-s01.dev.qeeping.net/PortalAPI/rest/v2');

const props = defineProps<{
    files: Partial<lqFile & {
        file?: File,
        error?: string,
    }>[],
    entityId?: string,
    entityType: string,
}>();

const config = {
    header: ['File', 'Size'],
    data: computed(() => {
        return props.files.map(file => Object.assign({
            title: file.clientFilename + (file.error ? '&nbsp;&nbsp;&nbsp;<span style="color:red"> ' + file.error + '</span>' : ''),
            size: file.fileSize
        }, { file }) as unknown as TableRow)
    }),
    raw: props.files,
    minRows: 0,
};

useExpose({ saveAfter })

function addFile(file: any) {
    props.files.push({
        clientFilename: file.name,
        fileSize: file.size,
        file
    });
}

async function saveAfter() {
    if (!props.entityId) {
        throw new Error('File upload: entity ID isn\'t set');
    }
    const errors = [];
    const files = props.files.filter(file => file.file);
    await Promise.all(files.map(async file => {
        try {
            const data = await api.post<lqFile & { fileUploadUrl: string }>('/files', { entityId: props.entityId, entityType: props.entityType });
            const store = useProfileStore();
            const form = new FormData();
            form.append('fileUUID', data.UUID!);
            form.append('tenantUUID', store.organization!.organizationId);
            form.append('file', file.file!);
            const result = await api.post<lqFile>(data.fileUploadUrl, form);
        } catch (e) {
            file.error = (e as Error).message;
            errors.push(file.error);
            //throw e;
        }
    }));
    if (errors.length) {
        throw new Error(`${errors.length} of ${files.length} files haven't been uploaded`);
    }
    //alert('sending data');
}

const deleteFile = (fileUUID: string, index: number) => {
    const userConfirmed = window.confirm("Are you sure you want to delete this file?");
    if (userConfirmed) {
        props.files.splice(index, 1);
    }
}


const showThumbnail = (fileName: string) => {
    if (!fileName) return false;
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];
    const extension = fileName.split('.').pop().toLowerCase();
    return imageExtensions.includes(extension);
}

</script>
<template>
    <div class="lq-files">
        <lq-file-input @add="addFile" />
        <table>
            <tr><th>Filename</th><th>Size</th><th></th><th></th></tr>
            <template v-for="(file, index) in files">
            <tr v-if="file.clientFilename"><td>{{ file.clientFilename }}</td><td>{{ file.fileSize }}</td><td><img v-if="showThumbnail(file.clientFilename)" :src="file.location" /></td><td><div @click="deleteFile(file.UUID, index)"><span class="delete material-symbols-outlined">delete</span></div></td></tr>
            </template>
        </table>
    </div>
</template>
<style scoped lang="scss">
.lq-files {
    display: flex;
    flex-flow: column;
    gap: 16px;
}
</style>