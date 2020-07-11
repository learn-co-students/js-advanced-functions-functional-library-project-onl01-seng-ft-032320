const fi = (function() {
  let outerContext = this
  return {
    libraryMethod: function() {
      return 'Start by reading https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0'
    },

    each: function(collection, callback) {
        if (typeof(collection) != "object") {
            for (let i = 0; i < collection.length; i++) {
                callback(collection[i], i, collection)
            }
        } else {
            let keys = Object.keys(collection);
            for (let i = 0; i < keys.length; i++) {
                callback(collection[keys[i]], keys[i], collection)
            }
        }
        return collection
    },

    map: function(col, cbFunc) {
        let returnArr = []
        if (typeof(col) != "object") {
            for (let i = 0; i < col.length; i++) {
                returnArr.push(cbFunc(col[i], i, col))
            }
        } else {
            let keys = Object.keys(col);
            for (let i = 0; i < keys.length; i++) {
                returnArr.push(cbFunc(col[keys[i]], keys[i], col))
            }
        }
        return returnArr
    },

    reduce: function(col, cbFunc, acc = 0) {
        for (let i = 0; i < col.length; i++) {
          acc = cbFunc(acc, col[i], col);
        }
        return acc
    },

    find: function(col, cbFunc) {
        for (let i = 0; i < col.length; i++) {
          if (cbFunc(col[i])) {
              return col[i];
          }
        }
    },

    filter: function(col, cbFunc) {
        let matchList = [];
        for (let i = 0; i < col.length; i++) {
            if (cbFunc(col[i])) {
                matchList.push(col[i]);
            }
        }
        return matchList
    },

    size: function(col) {
        return Object.keys(col).length
    },

    first: function(col, n = 0) {
        let results = [];
        if (n > 0){
          for (let i = 0; i < n; i++) {
            results.push(col[i]);
          }
        } else {
          return (col[0])
        }
        return results
    },

    last: function(col, n = 0) {
      let results = [];
      if (n > 0){
        for (let i = n; i > 0; i--) {
          results.push(col[col.length - i]);
        }
      } else {
        return (col[col.length - 1])
      }
      return results
    },

    compact: function(col) {
        let comp = []
        fi.each(col, (x => {if (x) comp.push(x)}))
        return comp
    },

    sortBy: function(col, cbFunc) {
        let sortedCol = [...col],
            done = false;
            while (!done){
              done = true;
              for (let i = 0; i < sortedCol.length - 1; i++){
                if(cbFunc(sortedCol[i]) > cbFunc(sortedCol[i+1])) {
                  let holder = sortedCol[i+1];
                  sortedCol[i+1] = sortedCol[i];
                  sortedCol[i] = holder
                  done = false;
                }
              }
            }
            return sortedCol
    },

    flatten: function(array, shallow){

      const flattenOneLevel = function(){
        let newArray = [];

        for(let i=0; i<this.length; i++){

          let index = this[i]
          if(Array.isArray(index)){

            for(let j=0; j<index.length; j++){
              newArray.push(index[j])
            }
          }
          else {
            newArray.push(index)
          }
        };

        return newArray
      }

      const hasArray = function(){

        let has = false;
        for(var i=0; i<this.length; i++){
          if( Array.isArray(this[i]) ){
            has = true;
            break;
          }
        }
        return has;
      }

      let flatArray = [...array]

      while (hasArray.call(flatArray)){
        flatArray = flattenOneLevel.call(flatArray)
        if(shallow === true){ break; };
      }

      return flatArray;
    },

    uniq: function(col, isSorted, cbFunc) {
        let transArray = [];

        if(cbFunc){
          for (let i = 0; i < col.length; i++) {
            transArray.push(cbFunc(col[i]))
          }
        } else {
          transArray = [...col]
        }

        let uniqs = [],
            returnArr = [];

        for (let i = 0; i < transArray.length; i++) {
          if (uniqs.indexOf(transArray[i]) === -1) {
            uniqs.push(transArray[i])
            returnArr.push(col[i])
          }
        }

        if (isSorted) {
          return returnArr
        } else {
          return fi.sortBy(returnArr, (a,b) => {a-b})
        }
    },

    keys: function(obj) {
        let keys = [];
        for (let key in obj) {
          keys.push(key)
        }
        return keys
    },

    values: function(obj) {
      let values = [];
      for (let key in obj) {
        values.push(obj[key])
      }
      return values
    },

    functions: function(obj) {
        let funcNames = [];
        for (let key in obj) {
          if (typeof obj[key] === "function") {
              funcNames.push(key)
          }
        }
        return fi.sortBy(funcNames, (a,b) => {a-b})
    },


  }
})()

fi.libraryMethod()
