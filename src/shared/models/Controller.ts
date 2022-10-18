import User from "./User";
import {reactive} from "vue";

export class Controller {
    private m_user: User | any  = reactive(new User());


    get user(): User {
        return this.m_user;
    }

    set user(p_user: User) {
        this.m_user = p_user;
    }

    // Method used for async functions
    public init(){
        this.m_user.getProfile().finally(() => {

        })
    }
}
const appController = reactive( new Controller);
appController.init()
export default appController;
