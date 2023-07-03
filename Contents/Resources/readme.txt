//  This widget takes its feed from http://aviationweather.gov/
//  It takes its data on request as an XML file.
//
//  In addition, it uses a local data file to perform a lookup for icao data.
//  The icao_data.dat file originates from this site : //  http://openflights.org/data.html
//  The data resides on git hub and is updated regularly.
//
//  https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports.dat
//
//  The file is named airports.dat, you'll need to pull down a copy to keep it up to date and place it in the
//  resources folder in place of the current version. Keep the old one just in case the data format changes.
//
//  http://ourairports.com/data/ is another location for a similar file but in a different format
//  that will not operate with this widget unless the data is massaged...