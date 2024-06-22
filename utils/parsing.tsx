//Returns date_time string in seconds since 1970 jan 1. (UNIX)
export function date_time_to_unix_ms(str) {
  const dateParts = str.split(" ");
  const date = new Date(`${dateParts[1]}T${dateParts[0]}:00`); // Converts the date string into the expected format.
  const seconds = Math.floor(date.getTime() / 1000); // Converts milliseconds to seconds.
  return seconds
}

export function seconds_to_NL_string(str) {
  const hours = Math.floor(str / 3600);
  const minutes = Math.floor((str % 3600) / 60);
  const seconds = str % 60;

  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  return formattedTime;
}


export function flattenObject(data) {
  const result = {};

  const recurse = (cur, prop) => {
    if (Object(cur) !== cur) {
      result[prop] = cur;
    } else if (Array.isArray(cur)) {
      for (let i = 0; i < cur.length; i++)
        recurse(cur[i], prop + "[" + i + "]");
      if (cur.length == 0)
        result[prop] = [];
    } else {
      let isEmpty = true;
      for (const p in cur) {
        isEmpty = false;
        recurse(cur[p], prop ? prop + "." + p : p);
      }
      if (isEmpty && prop)
        result[prop] = {};
    }
  };

  recurse(data, "");
  return result;
}


export function parseFilesIntoFolders(files) {
  const foldersObj = {};

  files?.forEach(file => {
    const folderName = file?.decryptedFolder;
    const content = {
      name: file?.decryptedName,
      data: file?.decryptedData,
      kind: file?.decryptedKind,
      created: new Date(Number(file.timestamp) * 1000)
    };

    if (foldersObj[folderName]) {
      foldersObj[folderName].push(content);
    } else {
      foldersObj[folderName] = [content];
    }
  });

  const foldersArray = Object.keys(foldersObj).map(folderName => ({
    folderName: folderName,
    files: foldersObj[folderName]
  }));

  return foldersArray;
}