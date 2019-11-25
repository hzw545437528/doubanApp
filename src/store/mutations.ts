import { MutationTree } from "vuex";

const mutations: MutationTree<any> = {
    SET_ISHOME(state: any, isHome: Boolean): void {
        state.isHome = isHome
    },
    SET_HOTMOVIES(state: any, hotMovies: any): void {
        state.hotMovies = hotMovies
    },
    SET_UPCOMINGMOVIES(state: any, upComingMovies: any): void {
        state.upComingMovies = upComingMovies
    },
    SET_AUDIOPAGETAB(state: any, audioPageTab: any): void {
        state.audioPageTab = audioPageTab
    },

}

export default mutations;