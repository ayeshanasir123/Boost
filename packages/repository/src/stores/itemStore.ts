import { ref, inject } from "vue";
import { boostApi } from '@boost/shared';
import { defineStore } from "pinia";
import { type Item } from '../models/Item';

export const useItemStore = defineStore('item', () => {
    const itemList = ref<Item[]>([]);

    interface ItemResponse {
        items: Item[]
    }

    async function save(item: Item) {
        if (item.UUID === 'new') {
            return await create(item);
        } else {
            return await update(item);
        }
    }

    function create(item: Partial<Item>) {
        return boostApi.post<Item>('/items/', item);
    }

    async function update(item: Item) {
            return await boostApi.put('/items/' + item.UUID, item) as Item;
    }

    async function search(searchTerm: string): Promise<Item[]> {
        const { items: items } = await boostApi.get<{ items: Item[] }>('/items?name=' + searchTerm);
        return items;
    }

    async function fetchData() {
        try {
            const data = await boostApi.get('/items') as ItemResponse;
            itemList.value = data.items;
        } catch (error) {
            // Handle any errors that occur during the request
            console.error('Error while fetching orders:', error);
        }
    }

    async function get(itemUUID: string) {
        let item = itemList.value.find((item: Item) => item.UUID === itemUUID) as Item;

        let exists = true;
        if (item == undefined) {
            exists = false;
        }

        console.log(item);

        if (!exists || item.isPartial === undefined || item.isPartial || 1 == 1) {
            const data = await boostApi.get(`/items/${itemUUID}`) as Item;
            data.isPartial = false;

            if (!exists) {
                itemList.value.push(item);
            } else {
                Object.assign(item, data);
            }
        }
        return (item);
    }

    fetchData();

    return {
        search,
        get,
        save,
        create,
        update,
        itemList
    };
});