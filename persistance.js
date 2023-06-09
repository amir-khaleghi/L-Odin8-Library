function storageAvailable(type) {
  var storage;
  try {
    storage = window[type];
    var x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === 'QuotaExceededError' ||
        // Firefox
        e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

//Retrieve library from localStorage
function retrieveStorage() {
  let libraryParsed;
  let libraryResult = [];
  if (storageAvailable('localStorage')) {
    let libraryItem = localStorage.getItem('library');
    libraryParsed = JSON.parse(libraryItem);
    if (libraryParsed !== null) {
      //This convert libraryParsed (which is an array of unnamed objects), into an array on Book objects.
      libraryParsed.forEach((elem) => {
        book = new Book(
          elem.title,
          elem.author,
          elem.language,
          elem.publishDate,
          elem.numPages,
          elem.isRead
        );
        libraryResult.push(book);
      });
    }
  }
  return libraryResult;
}

//Populate localStorage with library pased as parameter
function populateStorage(library) {
  if (storageAvailable('localStorage')) {
    localStorage.clear();
    localStorage.setItem('library', JSON.stringify(library));
  }
}
