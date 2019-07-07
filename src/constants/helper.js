export function snapshotToArray(snapshot) {
  var returnArr = [];

  snapshot.forEach(function(childSnapshot) {
    var item = childSnapshot.val();
    item.key = childSnapshot.key;

    returnArr.push(item);
  });

  return returnArr;
}

export function anyIncludes(source, searchArray) {  
  let ret = false;
  const txt = source.toLowerCase().replace("\n", " ");
  searchArray.forEach(function(search) {
    const srch = search.trim();
    if(srch.length > 0 && txt.includes(srch)){
      ret = true;
    }
  });

  return ret;
}
