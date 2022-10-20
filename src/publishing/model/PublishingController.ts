import {PublishingApiServices} from "@/publishing/service/publishing-api.services";
import {reactive} from "vue";
import type {CreatePostInterface} from "@/publishing/model/entities/createPost.interface";
import {EPostStatus} from "@/publishing/model/entities/postStatus.enum";
import type {AuthorPosts} from "@/publishing/model/entities/authorPosts.interface";

export class PublishingController {

    private apiService: PublishingApiServices;

    constructor() {
        this.apiService = new PublishingApiServices();
    }


    createNewPost(p_post: CreatePostInterface, isCreated: boolean) {
        //TODO:
        //await this.apiService.createNewPost(p_post);
        console.log({p_post});
    }

    async getPostsByAutenticatedUser(): Promise<AuthorPosts>{
        return await this.apiService.getPostByAutenticatedUser();
    }

    getPostById(postId: number) {
        const selectedPost: CreatePostInterface = {
            title: 'Las aventuras de pepe',
            description: 'Pepe y sus aventuras',
            image: 'https://www.adobe.com/express/create/cover/media_181e3d2c78f153ae7bf0e19a2faeb9a76e234da30.jpeg?width=400&format=jpeg&optimize=medium',
            hashtags: ['romance'],
            status: EPostStatus.Published,
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam facilisis pharetra condimentum. Maecenas lacinia finibus mi a semper. Fusce commodo enim elementum, volutpat libero auctor, faucibus orci. Nullam dictum, est at sagittis efficitur, augue odio dapibus sapien, et ornare purus nisi in ex. Nullam molestie mattis neque, ornare cursus enim blandit vitae. Maecenas cursus, tortor venenatis dignissim consectetur, velit elit efficitur quam, ac laoreet elit felis ut neque. Pellentesque ut dictum ex, quis scelerisque enim. Fusce a nisi tristique, finibus massa ac, varius leo. Nulla maximus tortor ut nisi facilisis, non rhoncus purus tempus.\n" +
                "\n" +
                "Nam dapibus arcu vitae egestas dignissim. Aliquam et placerat felis. Integer imperdiet orci eu aliquet accumsan. Maecenas scelerisque est vel pretium elementum. Vestibulum dapibus ornare lacus, ut elementum ligula tincidunt vel. Nam enim eros, tincidunt sit amet justo nec, mollis fringilla purus. Cras ac erat eu erat ultricies rhoncus sed at eros. Aenean fermentum hendrerit tincidunt. Fusce euismod, enim ac pharetra tincidunt, ex dui tempor diam, vel sodales mauris arcu vitae odio. Sed vitae pulvinar nisl. Praesent id purus urna. Morbi interdum libero quis mattis ullamcorper. Nulla at sem lorem. Phasellus tincidunt justo at sapien molestie egestas.\n" +
                "\n" +
                "Suspendisse potenti. Nulla facilisis volutpat nisi. Aenean elementum, lorem non efficitur sodales, mi dui dictum urna, sit amet mattis magna risus a ipsum. Vivamus rutrum dolor at laoreet pulvinar. Sed libero nibh, congue eget fringilla id, tincidunt sit amet erat. Proin non risus nulla. Cras vel placerat neque, et congue sem. Ut id luctus tellus. Fusce nisl purus, hendrerit at molestie in, vehicula sed purus. Pellentesque sed volutpat nunc. Sed facilisis sollicitudin libero in rutrum. Praesent sagittis sed turpis non vulputate. Suspendisse non est maximus, gravida elit at, eleifend odio.\n" +
                "\n" +
                "Pellentesque sem urna, tempor ut commodo ac, placerat sit amet lorem. Maecenas euismod accumsan neque, ac dignissim mi cursus ac. Quisque pulvinar est ut consectetur varius. Aliquam ex purus, cursus pellentesque accumsan vitae, auctor pretium purus. Ut nec vestibulum justo, ut ornare quam. Vestibulum at est vitae tortor facilisis efficitur eget nec diam. Maecenas quis congue dolor, a maximus urna. Pellentesque sit amet risus lorem.\n" +
                "\n" +
                "In eu turpis ipsum. Mauris vel lectus nibh. Nunc pharetra massa egestas est scelerisque, vel pulvinar diam rutrum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In volutpat elementum tellus et tincidunt. Vestibulum magna metus, fringilla eget tempor non, tempus nec risus. Vivamus maximus velit risus, quis facilisis eros finibus non. Curabitur eu diam augue. Integer semper porta nisl rutrum sodales. Nulla consectetur ex libero. Praesent et feugiat erat. Curabitur maximus varius erat in tincidunt. Suspendisse risus diam, porta ut efficitur sit amet, mattis at nulla. Phasellus convallis est ut libero porttitor aliquet. Etiam rhoncus ante a urna convallis tincidunt. Sed interdum iaculis ex dictum mollis.\n" +
                "\n" +
                "Praesent sit amet augue mattis, maximus dolor vehicula, placerat urna. Nullam fermentum eleifend velit at sollicitudin. Cras facilisis mattis dapibus. Maecenas tincidunt sem diam, a volutpat tellus tempus eu. Suspendisse consectetur nec lectus ac tempus. Vivamus blandit lectus risus. Quisque at quam in dolor accumsan auctor. Suspendisse finibus convallis sem, at aliquet turpis feugiat nec. Aenean eget mollis quam. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed consectetur, diam quis vulputate vulputate, libero velit blandit massa, eu sagittis nunc diam vitae dolor. Pellentesque fringilla urna vitae nulla aliquet, sed pretium orci mattis. Suspendisse lectus elit, lobortis vitae augue et, ullamcorper dignissim ipsum. Nullam faucibus odio ut tortor ullamcorper, at pharetra nibh placerat. Fusce sit amet leo sed diam scelerisque sollicitudin sed ut nulla. Praesent ac sapien orci.\n" +
                "\n" +
                "Aliquam tempus ut arcu et venenatis. Pellentesque fermentum efficitur ex porta fringilla. In pulvinar sed mauris ac euismod. Nam laoreet leo non sapien dapibus ultricies. Phasellus nec ornare diam. Duis nec nunc et orci egestas laoreet et nec ante. Cras congue ultrices leo, cursus fermentum libero cursus pharetra. Proin ullamcorper ligula est, id consequat magna egestas id. Curabitur finibus, sem porta dapibus suscipit, eros turpis bibendum est, non efficitur urna sem nec dolor. Quisque eget urna velit. Fusce maximus eleifend vestibulum. Curabitur semper quis felis vitae dignissim. Integer ut iaculis sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.\n" +
                "\n" +
                "Mauris porta maximus dignissim. Donec porttitor lectus a erat pellentesque, eu scelerisque arcu egestas. Suspendisse potenti. Nulla posuere nulla sed ex blandit, pulvinar fringilla odio viverra. Etiam at risus ipsum. Sed sit amet rhoncus mi. Aenean in mi vel ipsum tempus ornare id sit amet magna. Ut ac orci ullamcorper, porttitor quam ac, ultrices turpis.\n" +
                "\n" +
                "Integer ultrices odio eros, vel volutpat dolor consectetur vel. Nam at aliquet sapien. Duis porttitor lectus sem, et ornare neque tempus a. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In nunc turpis, rutrum sed nisl ut, fermentum dapibus tellus. Pellentesque blandit blandit rutrum. Aenean lorem odio, pretium vitae enim eu, vestibulum tincidunt neque. Vestibulum non scelerisque ante. Mauris sed nulla aliquam, tristique enim nec, fermentum odio. Sed finibus ligula id diam venenatis bibendum. Morbi eget turpis feugiat, scelerisque felis ac, imperdiet nulla. Donec varius pellentesque tellus, sit amet semper sem pellentesque nec. Morbi mattis pellentesque iaculis. Morbi imperdiet orci sed dui sagittis dignissim. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n" +
                "\n" +
                "Maecenas aliquam, sapien quis rhoncus pharetra, metus nunc interdum lectus, a porttitor ipsum quam eu magna. Cras vulputate at urna vel efficitur. Vivamus molestie urna sapien, id eleifend orci tincidunt nec. Ut congue, tortor non convallis dictum, ex enim facilisis sem, volutpat congue diam enim vel massa. Curabitur interdum pretium diam. Pellentesque sit amet ultrices libero. Nam vestibulum rutrum metus et aliquam. Maecenas diam dui, vestibulum ac molestie nec, tincidunt in mauris. Vivamus nulla massa, tempus dapibus elementum at, interdum eget arcu.\n" +
                "\n" +
                "Suspendisse auctor vestibulum risus id sagittis. Quisque ac diam leo. Maecenas sit amet finibus nibh, eu vestibulum dolor. Nam ut lobortis sapien, at vestibulum tortor. Nunc convallis facilisis arcu, vitae luctus sapien scelerisque eu. Aliquam porttitor augue ut enim eleifend mollis. Maecenas lacinia egestas diam, quis condimentum leo posuere vitae. In fermentum nunc quis placerat interdum. Nulla lobortis nisi non erat tincidunt accumsan. Aliquam finibus nunc erat, non iaculis orci pretium at. Vestibulum odio est, egestas a velit ut, semper dapibus est.\n" +
                "\n" +
                "Proin consectetur ultrices metus, eu pretium velit varius ut. Phasellus ultrices enim at elementum molestie. Vivamus eleifend urna ut tristique scelerisque. Maecenas aliquam ullamcorper enim, suscipit auctor libero dapibus a. Donec non dui purus. Vestibulum lacinia ligula sollicitudin nisi vestibulum placerat. Aliquam luctus congue dolor. Mauris maximus vel mauris id mollis. Donec aliquet finibus gravida. Nam tempor velit ut risus ullamcorper egestas. Donec vitae mauris in risus placerat vulputate.\n" +
                "\n" +
                "Vivamus aliquet diam eu iaculis tristique. Quisque nec cursus urna, vitae vehicula nulla. Duis libero enim, mollis et tempus sit amet, vestibulum eu dolor. Vivamus sit amet maximus libero, et consequat lorem. Fusce quis porttitor neque. Maecenas condimentum sapien justo, rutrum aliquet eros sollicitudin ut. Sed neque dolor, vestibulum ac molestie in, mattis nec magna. Nullam volutpat orci at aliquam molestie. Suspendisse ut vehicula ligula. Etiam faucibus orci in lacinia congue. Nulla scelerisque sodales erat ut scelerisque.\n" +
                "\n" +
                "Vivamus molestie mi in accumsan gravida. Nullam sagittis neque massa. Nulla leo sapien, auctor sit amet neque et, finibus pharetra est. Phasellus in risus et metus placerat efficitur. Donec libero nunc, semper et maximus a, volutpat nec libero. Aliquam sodales eu est ut ultrices. Proin tempor nibh ullamcorper, maximus tortor ac, tincidunt neque. Fusce lacinia odio id nisl vulputate, sed mattis leo pellentesque. Nunc accumsan commodo justo. Vestibulum a metus et velit molestie posuere ac quis augue. Mauris eget dui efficitur, maximus lorem a, ultrices tellus.\n" +
                "\n" +
                "Phasellus ante leo, fermentum ac rhoncus sed, pulvinar quis libero. Nullam varius magna risus, quis fermentum elit viverra sed. Sed quis posuere tortor. Phasellus velit mi, tincidunt laoreet gravida eget, viverra vitae purus. Pellentesque quis consequat augue. Mauris eu neque felis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec eget lacinia dui. Sed at dolor pellentesque, luctus orci et, convallis diam. Donec eros purus, pellentesque ac interdum vel, accumsan eu justo. Morbi gravida turpis ac erat euismod consequat. Duis ut mauris ornare, finibus neque nec, tempor ante.\n" +
                "\n" +
                "Maecenas hendrerit metus nec risus porta scelerisque. Ut cursus nisl ut mi consectetur, quis imperdiet orci viverra. Aenean sagittis malesuada semper. Donec eleifend nisl ut venenatis tempor. Aliquam condimentum quam quis urna bibendum, vel pellentesque orci hendrerit. Phasellus in scelerisque justo, id mollis ligula. Vivamus a bibendum justo. Aliquam a nulla pellentesque, consequat tellus eu, molestie dolor.\n" +
                "\n" +
                "Aliquam felis massa, tincidunt ut eros nec, facilisis posuere libero. Mauris auctor, diam vitae ullamcorper lacinia, dui tortor gravida tortor, in bibendum mi ex id diam. Aliquam erat volutpat. Donec ac efficitur augue, at molestie lorem. Praesent vitae nunc facilisis, posuere justo at, eleifend augue. Suspendisse fringilla fermentum commodo. Vivamus et nisl id felis euismod viverra ut at odio. In fermentum viverra turpis, nec vehicula ipsum eleifend sed. Sed rhoncus tincidunt elit et dignissim. Praesent non eros nisi. Maecenas sit amet lacus in enim ultrices suscipit quis vitae nibh. Donec ultrices leo eu mauris tempus varius vel at dolor. In mi metus, imperdiet quis felis a, sodales ullamcorper nulla. Sed hendrerit tortor vitae justo molestie, a fermentum libero gravida. Donec blandit sagittis mollis. Curabitur aliquam mollis est vitae interdum.\n" +
                "\n" +
                "Morbi ac tincidunt est. Maecenas tempus, neque sollicitudin rhoncus consectetur, augue quam venenatis neque, at mattis urna nunc eget est. Morbi laoreet justo ut mi egestas pharetra. Etiam tincidunt ac risus a ullamcorper. Suspendisse hendrerit facilisis eros, ac maximus arcu fermentum a. Etiam nec tincidunt sapien, non dictum nisl. Donec quam nibh, venenatis vitae accumsan a, laoreet sed augue.\n" +
                "\n" +
                "Cras aliquet bibendum metus, ac suscipit turpis dignissim eu. Fusce at arcu non lectus convallis eleifend convallis sed elit. Integer venenatis laoreet est, non tristique quam luctus vitae. Duis id lobortis turpis. Proin varius hendrerit leo sed volutpat. Nullam in porta velit. In nec ante ullamcorper, viverra nunc id, lobortis elit. Nullam eu vehicula justo. Aenean aliquam consectetur odio, commodo iaculis leo pretium ut. Aenean ut sodales tortor. Nulla vitae posuere urna. Cras blandit scelerisque nunc, ut pretium massa volutpat id. Nullam ligula mi, interdum quis erat eget, porta porta neque. Fusce eu laoreet nulla, quis egestas metus. Aliquam eleifend sapien eget dui ullamcorper dapibus id in risus.\n" +
                "\n" +
                "Mauris bibendum pellentesque metus, sit amet pellentesque ligula imperdiet ac. Praesent venenatis urna augue, nec iaculis elit mollis ut. Aliquam pharetra, sem ac consequat lobortis, magna elit elementum ligula, at suscipit urna metus at elit. Pellentesque non libero a felis viverra euismod. Sed dui augue, laoreet sit amet iaculis vulputate, gravida a dui. Maecenas ex nisi, egestas quis ligula eget, sollicitudin laoreet nunc. Ut maximus non sapien quis porttitor. Etiam fringilla est sed orci dignissim, in convallis mi bibendum."
        }

        return selectedPost;
    }
}

const publishingController = reactive(new PublishingController());
export default publishingController;
