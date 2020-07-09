const fi = (function() {
  return {
    libraryMethod: function() {
      return 'Start by reading https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0'
    },

    each: function(collection, callback) {
      for(let i in collection) callback(collection[i]);
      return collection;
    },

    map: function(collection, callback) {
      let newCollection = [];
      for(let i in collection) {
        newCollection.push(callback(collection[i]))
      };
      return newCollection;
    },

    reduce: function(collection, callback, acc) {
      if(!acc) {
        acc = collection[0];
        collection = collection.slice(1);
      };

      for(let i in collection) {
        acc = callback(acc, collection[i], collection);
      };
      return acc;
    },

    find: (collection, predicate) => {
      for(let i in collection) {
        if(predicate(collection[i])) {
          return collection[i]
        }
      }
      return undefined;
    },

    filter: (collection, predicate) => {
      let newCollection = [];
      for(let i in collection) {
        if(predicate(collection[i])) newCollection.push(collection[i])
      };
      return newCollection;
    },

    size: (collection) => {
      let vals = 0;
      for(let i in collection) vals++;
      return vals;
    },

    first: (collection, n=0) => {
      if(n > 0) {
        return collection.slice(0, n)
      } else {
        return collection[0]
      }
    },
    last: (collection, n=0) => {
      return (n) ? collection.slice(collection.length-n) : collection[collection.length-1];
    },

    compact: (arr) => {
      let newArr = [];
      let falseyVals = [false, null, 0, '', undefined, NaN]
      for(let i of arr) {
        if(!falseyVals.includes(i)) newArr.push(i)
      };
      return newArr;
    },

    sortBy: (arr, callback) => {
      let newArr = [...arr];
      return newArr.sort((a, b) => {
        return callback(a) - callback(b)
      })
    },

    unpack: (receiver, arr) => {
      for(let i in arr) {
        receiver.push(arr[i])
      }
    },

    flatten: function(collection, shallow, newArr=[]) {
      if (!Array.isArray(collection)) return newArr.push(collection)
      if (shallow) {
        for (let val of collection)
          Array.isArray(val) ? this.unpack(newArr, val) : newArr.push(val)
      } else {
        for (let val of collection) {
          this.flatten(val, false, newArr)
        }
      }
      return newArr
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
  } ,
  keys: function(obj) {
    return Object.keys(obj);
  },

  values: function(obj) {
    return Object.values(obj);
  },

  functions: function(obj) {
    let returnArray = [];
    for(const [key, val] of Object.entries(obj)) {
      if(typeof(val) === "function") {
        returnArray.push(key);
      };
    };
    return returnArray.sort();
  },


  }
})()

fi.libraryMethod()