const app = new Vue({
  el: '#app',
  data: {
    lang: null,
    texts,
    screens,
    levels,
    globalVars,
    selectedLevel: levels[0]
  },
  methods: {
    detectNavigatorLanguage: function() {
      const langStr = window.navigator.language;
      //On détecte la langue de l'appareil
      if(langStr.substr(0, 2) == 'fr'){
          this.lang = 'fr';
      }
      else{
          this.lang = 'en';
      }
    },
    initTabs: function() {
      let elem = document.querySelector('.tabs'); 
      let instance = M.Tabs.init(elem, {});
    },
    initSelects: function(){
      const elems = document.querySelectorAll('select');
      const instances = M.FormSelect.init(elems, {});
    },
    filterLevels: function(){
      if(this.globalVars.version.id === 0){
        this.levels = this.levels.filter(level => level.inLite === true);
      }
    },
    orderLevels: function() {
      this.levels.sort(this.compareLevels);
    },
    compareLevels: function( a, b ) {
      if ( a.orderId < b.orderId ){
        return -1;
      }
      if ( a.orderId > b.orderId ){
        return 1;
      }
      return 0;
    },
  },
  beforeMount(){
    initSounds();
    this.detectNavigatorLanguage();
    this.filterLevels();
    this.orderLevels();
    this.selectedLevel = this.levels[0];
  },
  mounted(){
    this.initTabs();
    this.initSelects();
  }
});
   
 