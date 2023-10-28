const buildURI = ({
  uri, database, username, password, host
}) => {
  let uriAll = uri
  let errorMsg = ''

  if (!uri) errorMsg += "Database URI, "
  if (!database) errorMsg += "Database name, "
  if (!username) errorMsg += "Database username, "
  if (!password) errorMsg += "Database password, "

  if (errorMsg) {
    throw new Error(`\n*** ERROR ***\nThe environment variables ${errorMsg}are not configured in the .env file.\nMake sure that the .env file contains the necessary configuration.\n***\n`)
  }
  
  uriAll = uriAll.replace('<username>', username)
  uriAll = uriAll.replace('<password>', password)
  uriAll = uriAll.replace('<database>', database)
  if (host) {
    uriAll = uriAll.replace('<host>', host)
  }
  
  return uriAll
}

module.exports = { buildURI }