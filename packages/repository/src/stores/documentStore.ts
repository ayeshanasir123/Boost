import { ref } from "vue";
import { defineStore } from "pinia";
import { type Document, type DocumentType } from "../models/Document";
import { boostApi } from "@boost/shared";

const apiBase = import.meta.env.VITE_API_ENDPOINT

interface DocumentResponse {
    documents: Document[],
    documentTypes: DocumentType[]
}

interface DocumentFilter {
  status: string;
}

export const useDocumentStore  = defineStore('document', () => {
  const documentList = ref<Document[]>([]);
  const documentTypes = ref<DocumentType[]>([]);
  const currentIndex = ref(0);

  async function fetchData() {
    try {
        const data = await boostApi.get(apiBase + '/documents') as DocumentResponse;
        documentList.value = data.documents;
    } catch (error) {
      // Handle any errors that occur during the request
      console.error('Error while fetching orders:', error);
      //return null // or throw the error
    }
  }

  async function fetchDocumentTypes() {

    const docType:DocumentType = {"UUID":"1","name":"Order","metaData": {"schema" : {
              "properties": {
                "firstname": {
                  "type": "string"
                },
                "lastname": {
                  "type": "string"
                }
              }
            },
              "uischema": {
                "type": "HorizontalLayout",
                "elements": [
                  {
                    "type": "Control",
                    "label": "Firstname",
                    "scope": "#/properties/firstname"
                  },
                  {
                    "type": "Control",
                    "label": "Lastname",
                    "scope": "#/properties/lastname"
                  }
                ]
              }
            } 
          };

    documentTypes.value.push(docType);
  }

  async function getDocumentTypes() {
    return documentTypes.value;
  }

  fetchData();
  fetchDocumentTypes();

  return { documentList, currentIndex};
});