# SQL-TS

This util generates JavaScript interfaces from database.

## CLI

Run npx @rmp135/sql-ts with the path of the configuration file created above.

```npx @rmp135/sql-ts -c ./mysql.json```

The file will be exported with the filename Database.ts (or with the name specified via the filename config option) at the current working directory.