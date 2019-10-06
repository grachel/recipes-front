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

export function errorMessage(errorCode) {
  switch (errorCode) {
    case 'auth/requires-recent-login':
      return "Sesja wygasła. Zaloguj się ponownie."  
    case 'auth/weak-password':
      return "Podane hasło jest zbyt słabe"
    default:
      return errorCode
  }
}