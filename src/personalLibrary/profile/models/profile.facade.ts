import type {UserInterface} from "@/shared/models/entities/autenticated-user.interface";
import {ProfileService} from "@/personalLibrary/profile/services/profile-api.services";
import {reactive} from "vue";
import appController from "@/shared/models/Controller";

export class ProfileFacade  {
    private _selectedUser: UserInterface;
    private apiService: ProfileService;
    private _isForOwnUser: Boolean;
    private _username: string | undefined = undefined;


     constructor() {
         this._selectedUser = {
             username: '',
             email: '',
             image: '',
             createdAt: '',
             updatedAt: '',
             id: 0,
             verified: false
         }
        this._isForOwnUser = true;
        this.apiService = new ProfileService();
    }

    get selectedUser(): UserInterface  {
        return this._selectedUser;
    }


    get username(): string | undefined {
        return this._username;
    }

    set username(value: string | undefined) {
        this._username = value;
    }

    get isForOwnUser(): Boolean {
        return this._isForOwnUser;
    }

    set isForOwnUser(value: Boolean) {
        this._isForOwnUser = value;
    }

    set selectedUser(value: UserInterface ) {
        this._selectedUser = value;
    }

    async setUserByUsername(username: string){
        this._selectedUser = await this.apiService.getProfileByUsername(username);
        console.log(this._selectedUser, 'from facade')
    }

    async updateUserPhoto(photoUrl: string): Promise<boolean>{
         const user: UserInterface = await appController.user.getUserProfile();
         user.image = photoUrl;
         return (await this.apiService.updateUserPhoto(user)).toString().startsWith('2');
    }
}
const profileFacade = reactive(new ProfileFacade());
export default profileFacade;
