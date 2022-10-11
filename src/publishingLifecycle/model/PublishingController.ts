import {PublishingApiServices} from "@/publishingLifecycle/service/publishing-api.services";
import type {ICreatePost} from "@/publishingLifecycle/model/IPublishing";
import {reactive} from "vue";

export class PublishingController {

    private apiService: PublishingApiServices;

    constructor() {
        this.apiService = new PublishingApiServices();
    }


    createNewPost(p_post: ICreatePost){
        //TODO:
        //await this.apiService.createNewPost(p_post);
        console.log({p_post});
    }
}

const publishingController = reactive(new PublishingController());
export default publishingController;
