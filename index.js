const fi = (function() {
  return {
    libraryMethod: function() {
      return 'Start by reading https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0'
    },

    each: function(collection, callback) {
      if(Array.isArray(collection)){
        for(let i = 0; i < collection.length; i++){
          callback(collection[i], i, collection)
        }
      } else if (typeof(collection) === "object"){
        for(let i = 0; i < Object.keys(collection).length; i++){
          callback(collection[Object.keys(collection)[i]], Object.keys(collection)[i], i)
        }
      }
      return collection
    },





    map: function(collection, callback) {
      let newCollection = [];
      if(Array.isArray(collection)){
        for(let i = 0; i < collection.length; i++){
          newCollection.push(callback(collection[i], i, collection));
        }
      } else if(typeof(collection) === "object"){
        let keys = Object.keys(collection);
        for(let i = 0; i < keys.length; i++){
          newCollection.push(callback(collection[keys[i]], keys[i], collection))
        }
      }
      return newCollection;
    },





    reduce: function(collection, callback, acc = 0) {
      for(let i = 0; i < collection.length; i++){
        acc = callback(acc, collection[i], collection)
      }
      return acc
    },




    find: function(collection, callback) {
      for(let i = 0; i < collection.length; i++){
        if(callback(collection[i])){
          return collection[i];
        }
      }
      return undefined;
    },


    filter: function(collection, callback){
      let matches = [];
      for(let i = 0; i < collection.length; i++){
        if(callback(collection[i])){
          matches.push(collection[i]);
        }
      }
      return matches
    },


    size: function(collection){
      if(Array.isArray(collection)){
        return collection.length;
      } else if (typeof(collection) === "object"){
        return Object.keys(collection).length
      }
    },

    first: function(collection, num = 1){
      if(num === 1){
        return (collection[0]);
      }
      return collection.slice(0, num);
    },

    last: function(collection, num = 1){
      if (num === 1){
        return collection[collection.length - 1]
      }
      return collection.slice(collection.length - num, collection.length)
    },

    compact: function(collection){
      let compacted = [];
      for(let i = 0; i < collection.length; i++){
        if(collection[i]){
          compacted.push(collection[i]);
        }
      }
      return compacted;
    },


    sortBy: function(collection, callback){
      let newCollection = [...collection]
      let sortProgress = [-1]
      while(fi.find(sortProgress, e => e === -1)){
        for(let i = 0; i < newCollection.length - 1; i++){
          if(callback(newCollection[i]) > callback(newCollection[i+1])){
            let hold = newCollection[i+1]
            newCollection[i+1] = newCollection[i]
            newCollection[i] = hold
            sortProgress[i] = -1
          } else {
            sortProgress[i] = 0
          }
        }
      }
      return newCollection
    },



    flatten: function(collection, oneLevel = false){
      let result = [];

      if (oneLevel === true){
        collection.forEach(elementLvl1 => {
          if (Array.isArray(elementLvl1)) {
  
            elementLvl1.forEach(elementLvl2 => {
                result.push(elementLvl2)
              })
              
     
          } else {
            result.push(elementLvl1)
          }
  
        });
      }else {
        collection.forEach(elementLvl1 => {
          if (Array.isArray(elementLvl1)) {
            elementLvl1.forEach(elementLvl2 => {
              if (Array.isArray(elementLvl2)) {
                elementLvl2.forEach(elementLvl3 => {
                  if (Array.isArray(elementLvl3)) {
                    elementLvl3.forEach(elementLvl4 => {
                      result.push(elementLvl4)
                    })
                  } else {
                    result.push(elementLvl3)
                  }
                  
                })
              } else  {
                result.push(elementLvl2)
              }
              
            }) 
          } else {
            result.push(elementLvl1)
          }
  
        });
      }

      return result
    },





    uniqSorted: function(collection, iteratee) {
      const sorted = [collection[0]]
      for (let idx = 1; idx < collection.length; idx++) {
        if (sorted[idx-1] !== collection[idx])
          sorted.push(collection[idx])
      }
      return sorted
    },

    uniq: function(collection, sorted=false, iteratee=false) {
      if (sorted) {
        return fi.uniqSorted(collection, iteratee)
      } else if (!iteratee) {
        return Array.from(new Set(collection))
      } else {
        const modifiedVals = new Set()
        const uniqVals = new Set()
        for (let val of collection) {
          const moddedVal = iteratee(val)
          if (!modifiedVals.has(moddedVal)) {
            modifiedVals.add(moddedVal)
            uniqVals.add(val)
          }
        }
        return Array.from(uniqVals)
      }
    },

    keys: function(obj) {
      // Using for loop
      const keys = []
      for (let key in obj){
        keys.push(key)
      }
      return keys
    },

    values: function(obj) {
      // Using for loop
      const values = []
      for (let key in obj){
        values.push(obj[key])
      }
      return values

      // Using the custom 'map' method from above
      // return this.map(obj, (value) => value)

    },

    functions: function(obj) {
      const functionNames = []

      for (let key in obj) {
        if (typeof obj[key] === "function"){
          functionNames.push(key)
        }
      }

      return functionNames.sort()
    },


















  }
})()

fi.libraryMethod()

const objA = {a: 1, b: 2}
const objB = objA
const objC = {c: 3, d: 4}
//fi.uniq([objA, objC, objB])
fi.uniq([1, 1, 2, 3, 2, 4, 5, 6, 1])














