import { GetterTree } from "vuex";

const getters: GetterTree<any, any> = {
    isHome(state: any): Boolean {
        return state.isHome
    },
    hotMovies(state: any): any {
        return state.hotMovies
    },
    upComingMovies(state: any): any {
        return state.upComingMovies
    },
    audioPageTab(state: any): any {
        return state.audioPageTab
    },
}

export default getters;