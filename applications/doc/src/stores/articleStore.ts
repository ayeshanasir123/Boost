import {ref, inject} from "vue";
import {defineStore} from "pinia";
import Article from '@/model/Article';



export const useArticleStore = defineStore('article', () => {
    const articleList = ref([] as Article[]);
    const tenantId = ref(null);

    const axios: any = inject('axios');

    /**
     *
     * Getting data from the api
     *
     * */

    async function getData() {
        await axios
            .get("https://api-s01.dev.qeeping.net/PortalAPI/rest/v2/articles")
            .then((articleResponse) => {
                articleList.value = articleResponse.data.articles;
            });
    }

    /**
     *
     * Not using Currently
     *
     * */
    // function updateFromPlain(updatedArticle: Article) {
    //     let article: Article | undefined;
    //     article = articleList.value.find((Article: Article) => Article.articleId === articleUUID);
    //
    //     let organization = organizationList.value.find(organization => organization.organizationId === updatedArticle.organizationId);
    //     if (article != undefined) {
    //         Object.assign(organization, updatedArticle);
    //     } else {
    //         organizationList.value.push(updatedArticle);
    //     }
    // }

    /**
     *
     * Not using Currently
     *
     * */
    // function updateArticle(updatedArticle: Article) {
    //     axios
    //         .put("https://api-s01.dev.qeeping.net/PortalAPI/rest/v2/persons/" + updatedArticle.organizationId, updatedArticle)
    //         .then((organizationResponse: any) => {
    //             if (organizationResponse.status == 200) {
    //                 let organization = organizationList.value.find(organization => organization.organizationId === updatedArticle.organizationId);
    //                 if (organization != undefined) {
    //                     Object.assign(organization, updatedArticle);
    //                     const mqttMessage = {
    //                         clientId: $mqtt.clientId(),
    //                         entityType: "organization",
    //                         entity: updatedOrganization
    //                     };
    //                     $mqtt.publish('/entity', JSON.stringify(mqttMessage), 'Fnr');
    //                 } else {
    //                     organizationList.value.push(updatedArticle);
    //                 }
    //             }
    //         });
    // }

    function setTenantId(id) {
        console.log(id);
        tenantId.value = id;
    }

    function getArticleByUUID(articleUUID: string) {
        let article: Article | undefined;
        article = articleList.value.find((Article: Article) => Article.articleId === articleUUID);
        let gridVersion = article?.gridVersion;

        if (typeof article == undefined && gridVersion == undefined || gridVersion) {
            axios
                .get("https://api-s01.dev.qeeping.net/PortalAPI/rest/v2/articles/" + articleUUID)
                .then((response: any) => {
                    console.log(response);
                });
        }

        return (article);
    }
    /**
     *
     * Not using Currently
     *
     * */
    // function deleteArticle(articleUUID: string) {
    //     console.log(articleUUID);
    //     /*
    //     for (let i=0; i <= organizationList.value.length; i++) {
    //       if (organizationList.value[i].organizationId == organizationUUID) {
    //         organizationList.splice(i,1);
    //         break;
    //       }
    //     }*/
    // }

    getData();

    return {
        articleList,
        getArticleByUUID,
        setTenantId
    };
});