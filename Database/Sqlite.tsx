import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';
import { Asset } from 'expo-asset';


// this function is used to open the sqlite database, 
//it first checks if the database already exists, if not it creates a new one
export default async function InitDatabase(pathToDatabaseFile: string = "../assets/app.db"): Promise<SQLite.SQLiteDatabase> {

    // checks if the sqlite database already exists (on the phone (expo environment))
  if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
    await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');   // makes database if it doesn't exist
  }

  try{
    console.log(pathToDatabaseFile);
    const asset = Asset.fromModule(require("./app.db"));
    console.log("BB\n\n\n\n\n\n\n\n\nnpx " + asset);

    // downloads the database from the project
    await FileSystem.downloadAsync(
    asset.uri,                                          //source
    FileSystem.documentDirectory + 'SQLite/app.db');  //destination


    return SQLite.openDatabase('app.db');


  } catch (error) {
    console.log(error.message);
  }
  // returns the opened database
}
