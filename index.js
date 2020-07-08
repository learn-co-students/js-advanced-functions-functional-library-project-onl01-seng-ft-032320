const fi = (function() {
  return {
    libraryMethod: function() {
      return 'Start by reading https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0'
    },

    each: function(collection, callback) {
        const newCollection = (collection instanceof Array) ? collection.slice() : Object.values(collection)

        for (let i = 0; i < newCollection.length; i++)
          callback(newCollection[i])
          return collection
    },

    map: function(collection, callback) {
      let newArr = []
      if (typeof(collection) === 'object') {
        for(const el in collection) {
          newArr.push(callback(collection[el], el, collection))
        }
      } else {
        for(let i=0; i < collection.length; i++) {
          newArr.push(callback(collection[i], i, collection))
        }
      }
      return newArr
    },

    reduce: function(collection, callback, acc) {
      if(!!acc) {
        for(const el of collection) {
          acc = callback(acc, el, collection)
        }
      } else {
        acc = collection[0]
        for(const el of collection.slice(1)) {
          acc = callback(acc, el, collection)
        }
      }
      return acc;
    },

    find: function(collection, predicate) {
      for(const el of collection) {
        if (predicate(el))
          return el;
      };
      return undefined
    },

    filter: function(collection, predicate) {
      let newArr = []
      for(const el of collection) {
        if (predicate(el))
          newArr.push(el);
      };
      return newArr
    },

    size: function(collection) {
      let iter = 0;
      if (typeof collection === 'object') {
        for(const el in collection) {
          iter += 1;
        };
      } else {
        for(const el  of collection) {
          iter += 1; 
        }
      }
      return iter
    },

    first: function(array, n=1) {
      if (n === 1) 
        return array[0]
      else 
        return array.slice(0, n)
    },

    last: function(array, n=1) {
      if (n === 1) 
        return array[array.length - 1]
        return array.slice(n * -1)
    },

    compact: function(array) {
      let newArr = []
      for(const el of array) {
        if(!!el) 
        newArr.push(el)
      };
      return newArr
    },

    sortBy: function(array, callback) {
      let newArr = array.slice(0)
      newArr.sort(function(a, b) {
        let x = callback(a)
        let y = callback(b) 
        if (x < y) {return -1};
        if (x > y) {return 1};
        return 0
      })
      return newArr;
    },

    flatten: function(array, shallow=false) {
      let newArr = [] 
      let level = 0 
      function unnest(arr) {
        if (shallow) { level += 1 }
        for(const el of arr) {
          if (typeof el === 'object' && level <= 2) {
            unnest(el) 
          } else {
            newArr.push(el)
          }
        };
      };
      unnest(array) 
      return newArr
    },

    uniq: function(array, isSorted, callback) {
      let newArr = []
      let callbackArray = []
      for(const el of array) {
        let isUniq = true
        if (!!callback) {
          for(const jel of callbackArray) {
            if (jel === callback(el)) { 
              isUniq = false
            }
          };
        } else {
          for(const jel of newArr) {
            if (jel === el) { isUniq = false } 
          };
        }
        if (isUniq) { newArr.push(el) }
        if (isUniq && !!callback) { callbackArray.push(callback(el)) }
      };
      return newArr
    },

    keys: function(object) {
      let keys = []
      for(const el in object) {
        keys.push(el) 
      };
      return keys;
    },

    values: function(object) {
      let vals = []
      for(const el in object) {
        vals.push(object[el]) 
      };
      return vals;
    },

    functions: function(object) {
      let funcs = []
      for(const el in object) {
        console.log(typeof el)
        if (typeof object[el] === 'function')
          funcs.push(el)
      };
      return funcs
    },

  }
})()

fi.libraryMethod()
