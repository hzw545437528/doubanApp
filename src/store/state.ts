const state: any = {
    isHome: false,
    isSafari: localStorage.getItem('isSafari') === '1' ? 1 : 0,
    hotMovies: null,
    upComingMovies: null,
    audioPageTab: 0
}

export default state