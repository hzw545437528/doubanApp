import { ActionTree } from "vuex";

const actions: ActionTree<any, any> = {
    setIsHome({ commit }, isHome: Boolean): void {
        commit("SET_ISHOME", isHome)
    },
    setHotMovies({ commit }, hotMovies: any): void {
        commit("SET_HOTMOVIES", hotMovies)
    },
    setUpComingMovies({ commit }, upComingMovies: any): void {
        commit("SET_UPCOMINGMOVIES", upComingMovies)
    },
    setAudioPageTab({ commit }, audioPageTab: any): void {
        commit("SET_AUDIOPAGETAB", audioPageTab)
    },
}

export default actions