/*
//===========================================================================
// Steampunk weather widget 3.0.1
// Inspired by: Bogdan Irimia (bogdan@digitair.ro) whose digistation widget was the original code source.
// Steampunked by: Dean Beedell with serious code suggestions by Harry Whitfield (original code by Bogdan Irimia 90% now replaced)
// Dean.beedell@lightquick.co.uk
//
// Changes involve a lot of modifications and improvements. Changes to the look and feel, changes to the code to cater for an entirely
// new data source, reduced cpu usage, improved the structure, resizing and addition of 24hr clock, addition of 'vitality' to the dock
// icon, sound added, pop-up display, support for non-YWE! languages, the list goes on...
//
//  Example ICAO codes:
//
//  EGKA 	Shoreham
//  EGKB 	Biggin Hill
//  EGTK 	Oxford / Kidlington existing airport for which no weather information is provided
//  EG23 	Greenham Common (Closed airport for which no weather information is provided)
//  KBWI        Baltimore Washington International USA (MD)
//  KBGR        Bangor USA (MAINE)
//  KBTR        Baton rouge Ryan Field USA
//
//  The icao_data.dat file originates from this site : //  http://openflights.org/data.html
//  The data resides on git hub and is updated regularly.
//  https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports.dat

//  The file is named airports.dat, you'll need to pull down a copy to keep it up to date and place it in the
//  resources folder in place of the current version. Keep the old one just in case the data format changes.
//
//  http://ourairports.com/data/ is another location for a similar file but in a different format
//  that will not operate with this widget unless the data is massaged...

//===========================================================================
//
 TBD

 // on device sleep/wake up - run the busy timer?
 //
 // test with all weather codes
 // create new icons for exotic weather types...
 // sometimes the cloud cover does not clear unless the widget is restarted, I think a variable needs to be cleared.
 // pull a new icao data file from the source on request - that is never going to happen as it is 10,000 entries plus
 //      a fairly big file so a download/lookup would be very, very slow, it also could not integrate the new data into 
 //      a flattened widget, it would have to reside in a user file area away from the original datafile - more complication

 // add TAFs forecast for five days ahead
    require a separate read from an alternative location - done
    issue_time
    forecast
      use existing fields
        wind_speed_kt
        wind_dir_degrees
        visibility_statute_mi
        altim_in_hg
        wx_string
        sky_condition
        temperature
      new fields to be read and handled
        Min temp - NOTE: temperatures are not provided by aviationweather.gov
        Max temp
        change_indicator
        probability
 */

// 3.0.1

// added wind direction to the outer ring and pointer in prefs and code
// temperature gauge animations now occur at the right time
// wind direction now indicated by the outer ring pointer
// new outer ring called 'wind' based on the metal ring.
// improve the readability of the small temperature gauge
// added haze additional layered icon
// added smoke additional layered icon
// added TAF button icons
// added fade in code for TAF buttons
// added fade out code for TAF buttons
// added date and time to background tooltip
// added date and time to pop up window text
// added icon images to the following and preceding TAF icons
// added translation text to the following and preceding TAF icons
// revised functions to make the TAF icons visible using fadeanimations
// resized the preceding and following TAF icons
// fixed a bug with some alerts still occurring even though they were disabled in preferences.
// made smoke icon transparent and added flecks of spark
// added automatic re-sizing of the TAF icons on the gauge face

// 3.0.0

// added connection to aviation-weather TAF data
// added formatting of TAF data
// tested formatting and display of data using current methods
// added busy rotator to show when collecting data
// changed startup order to allow busy blur animations to display

// 2.0 series

// .10 changed the weather feed to aviationweather.gov
// .10 changed the icao lookup to a local data file rather than a http request
// .10 changed the city lookup to a local data file rather than a http request
// .10 added raw metar data read (partially implemented and tested, currently unused)
// .10 added day/night script to test the sunset/sunrise
// .10 added read of XML data instead of raw metar data
// .10 added various alerts on icao input failures
// .10 added length check for input icao codes
// .10 added humidity calculation
// .10 added calculation of wx weather codes
// .10 added decode of cloud cover information
// .10 expanded the tooltip information displayed, cloud, windspeed and precipitation
// .10 added facebook menu option
// .10 added F5 to refresh
// .10 added animation to data generation to make it clearer that an update has occurred
// .10 added the hands animation when the feed has updated
// .10 added the search for secondary metar sky_condition attributes
// .10 removed trailing spaces from copy/pasted icao codes longer than 4 characters
// .10 improved the structure, created metar.js and functions.js, filled them...
// .10 when an empty icao code is entered it searches... it should not - fixed
// .10 added logic to handle the wx weather data instead of just receiving the weather codes
// .10 added handling of second cloud layer in tooltip reporting
// .10 added the test for light or heavy conditions
// .10 added weather type to the tooltip
// .10 use night and day boolean to change the icon
// .10 added consideration of three cloud layers rather than just one
// .10 take into account all the weather icons and adjust weather logic
// .10 hail and snow - add logic to display the icon
// .10 create new icons for thunderstorms
// .10 add sentence case to location text
// .10 added showers in the vicinity translation of wx codes
// .10 fog add the bars , 1 2 and 3 as a separate icon on top of the cloud icon
// .10 add exotic icon on top of the current icon if wind strong
// .10 add wind icon on top of the current icon if wind strong
// .10 add wind direction
// .10 added wind report using the beaufort scale
// .10 fixed an valid city search on an icao code search returning no data alert issues
// .10 added pop-up for weather
// .10 added options for the weather pop-up for hover or permanent display.
// .10 added options for the weather pop-up for display of the time
// .10 added handling of rain showers
// .10 add switch from imperial to metric measurements - note: ft/knots are not imperial
// .10 romanian tooltip translations added to lang files
// .10 css errors on the tooltip corrected
// .10 provide romanian translations for preferences descriptions
// .10 provide romanian translations for preferences titles
// .10 fixed a problem in XP handling of SSL certificates by simply removing the https XML request
// .10 removed the advanced tooltip functionality, only required by Macs and hat engine is now defunct
// .10 allowed the locking pin to display on top of the gauge rim
// .10 fixed the resize and stopped the mini clock from resizing too.
// .10 sort the tooltip creation, spacing &c
// .10 added link to aviationweather.gov
// .10 romanian tooltip weather translations enable, rain and clouds
// .10 change the time shown on the watch to the last weather update time

// .09 added more error checks to a data feed failure
// .09 added language translations for latest error text

// .08 added alternative tooltip to the main glass
// .08 icao code not sticking beyond the initial selection
// .08 icao code now displays in the tooltip
// .08 certain feeds do not round their temperatures, add rounding
// .08 fixed the data GET from running twice
// .08 reduced the pop up pause
// .08 help glass - left chain description corrected
// .08 Added dblclick on surround
// .08 Added tooltips option and preference

// .07 location selection background - added cogs and wheels to the underside to make it more 'real'
// .07 corrected the help text on the glass cover
// .07 change the font on the location finder
// .07 moved the location menu from the top of the page (windows) to the top of the pushbutton
// .07 add method for handling language files that aren't handled by the YWE! by default
// .07 create language files for Romanian
// .07 create language files for English
// .07 added language option to preferences
// .07 improve the clarity of the numbers on the mini gauges
// .07 organise and sort the code, remove unwanted functions
// .07 fix the romanian translation bug on tooltips
// .07 sort the % on macs bunching, changed it to a popup
// .07 fix missing resizing of two elements
// .07 added the option to increase the size of the widget
// .07 sort the language text on the prefs
// .07 use an additional input box to select the alternative language file
// .07 sort the language text on the prefs
// .07 rejigged the main context menu to allow translation to occur
// .07 allow meta codes to be typed in directly
// .07 add slider switching from codes to locations
// .07 add final translations
// .07 added images to the group icons in the preferences

// .06 Added second chain to call the preferences.
// .06 Changed the surround code to remove separate objects, instead calls distinct images, simpler.
// .06 Changed the functionality of the right hand knob from switching surround to instead causing the pop-up to call the location box.
// .06 Improved the chain pull animation times.
// .06 Centralised the clock surrounds to make the whole thing look prettier.
// .06 Added code to the top knobs to toggle both sound and animation.
// .06 Reskinned the location selection box
// .06 Added Set button and buzzer sound to location selection box

// .05 Added function to move the main_window onto the main screen
// .05 Added a third selection of base surrounds.
// .05 Removed specific language text.
// .05 Added preferences and front end toggles for controlling sound
// .05 Added preferences and front end toggles for controlling animation
// .05 Added green/amber lamps for sound preference setting
// .05 Added green/amber lamps for animation preference setting
// .05 Added metallic surround
// .05 Added long chain and pull animation
// .05 Added menu item that opens the rocketdock URL
// .05 Added menu item that allows a spacer in the menu
// .05 Added menu item that opens my Amazon URL wishlist
// .05 Added menu item that opens other widgets URL
// .05 Added menu item that opens the online help file
// .05 Added check on startup to set lamp state to green/amber
// .05 Added new "about us", giving some credit to Harry

// .04  Added sounds to the pointers and other items

// .03  Added restart to preferences change
// .03  Added tooltip translation routine
// .03  Added setclocksurround to startup
// .03  Added setcentigradefahrenheit to startup
// .03  Added settooltips to startup
// .03  Added setclocksurround to startup

// .02  Added animation to the swapping of the temperature gauge
// .02  Added resizing of the latest graphic additions
// .02  Added red version of the graphic clock surround
// .02  Added text tooltip to clock

// .01  Changed all the calculations of the pointer angles to use simpler calculations saving cpu time.
// .01  Separated the .kon file and .js
// .01  Gave all elements a steampunk 'look and feel'
// .01  Caused the pointers to count down on startup.
// .01  Added 24hr clock to the outer rim
// .01  Added code to allow widget to be resized
// .01  Fixed some translations
// .01  Changed the default location to London Heathrow
//

/*global mainWindow, soundlamp, animationlamp, chain, hinge, imagelinktransparency,
 weatherglasshelp, resizingknob, helpknob, temperatureknob, clockknob, thermometerhole,
 thermometerpart1, thermometerpart2, thermometerpart3, clocksurround, clock_hand, bk,
 icon, fahrenheit, ac_presiune, ac_manual, temperature, humidity, logo, roMap,
 setclocksurround, resizethermometer, setcentigradefahrenheit, rotategauges, settooltips,
 setprefdescriptions, searchWindow, getMetarDescription, buildVitality, txtSearchCity,
 btn_ok, btn_pushed, btn_cancel, txt_results, txtSearching, imgBtnSearch, txt_search,
 imgCmbResults, clockTimer, TOOLTIP, chain2, hinge2, bf, getSearchResults, getData,
 setManual, slider, knob2onClick, knob2, changePrefs, saveLoc, changeLoc, mainScreen,
 setpreftitles, setmenutitles, widgethelp, nullfunction, donate, amazon, rocketdock,
 otherwidgets, update, contact,


 animationlampheightDefault, animationlamphoffsetDefault,
 animationlampvoffsetDefault,
 animationlampwidthDefault, chainheightDefault, chainhoffsetDefault,
 chainvoffsetDefault, chainwidthDefault, clockknobheightDefault,
 clockknobhoffsetDefault, clockknobvoffsetDefault, clockknobwidthDefault,
 helpknobheightDefault, helpknobhoffsetDefault, helpknobvoffsetDefault,
 helpknobwidthDefault, hingeheightDefault, hingehoffsetDefault, hingevoffsetDefault,
 hingewidthDefault, imagelinktransparencyheightDefault,
 imagelinktransparencyhoffsetDefault, imagelinktransparencyvoffsetDefault,
 imagelinktransparencywidthDefault, mainWindowheightDefault, mainWindowwidthDefault,
 resizingknobheightDefault, resizingknobhoffsetDefault, resizingknobvoffsetDefault,
 resizingknobwidthDefault, soundlampheightDefault, soundlamphoffsetDefault,
 soundlampvoffsetDefault, soundlampwidthDefault, temperatureknobheightDefault,
 temperatureknobhoffsetDefault, temperatureknobvoffsetDefault,
 temperatureknobwidthDefault, thermometerholeheightDefault,
 thermometerholehoffsetDefault, thermometerholevoffsetDefault,
 thermometerholewidthDefault, thermometerpart1heightDefault,
 thermometerpart1hoffsetDefault, thermometerpart1voffsetDefault,
 thermometerpart1widthDefault, weatherglasshelpheightDefault,
 weatherglasshelphoffsetDefault, weatherglasshelpvoffsetDefault,
 weatherglasshelpwidthDefault
*/

/*properties
    CC, Tooltip, animationpref, cc, clockpref, contextMenuItems, country, data,
    description, display, duration, end_angle, event, floor, getHours,
    getLocalizedString, getMilliseconds, getMinutes, getSeconds, getTime,
    hOffset, hRegistrationPoint, height, hoffset, icao, interval, key,
    keyString, langpref, langpref2, languages, lastPres, lastTooltip,
    lastUpdated, length, match, maxWidthPref, metarpref, milliseconds, onClick,
    onContextMenu, onKeyPress, onMouseDown, onMouseEnter, onMouseExit,
    onPreferencesChanged, onSelect, onclick, onreadystatechange, opacity, open,
    parse, readFile, readyState, rejectKeyPress, remove, replace,
    replaceSelection, responseText, rotation, round, send, soundpref, split,
    src, start, startTime, start_angle, station, status, tempUnit, ticking,
    timeout, title, toString, toUpperCase, tooltip, vOffset, vRegistrationPoint,
    value, visible, voffset, width
*/

var roffset = 100;
var busyCounter = 1;
var analysisType = "METAR";
var analysisType2 = "/forecast";
var wind_dir_degrees = 0;
var compassDirection = "unknown";
var debugFlg = 1;
var usableObsTime = 0;

soundlamp.hOffset = 25 + roffset;
soundlamp.vOffset = 26 + roffset;

animationlamp.hOffset = 252 + roffset;
animationlamp.vOffset = 26 + roffset;

chain.hOffset = 260 + roffset;
chain.vOffset = 166 + roffset;

chain2.hOffset = 22 + roffset;
chain2.vOffset = 166 + roffset;

hinge.hOffset = 267 + roffset;
hinge.vOffset = 109 + roffset;

hinge2.hOffset = 26 + roffset;
hinge2.vOffset = 109 + roffset;

imagelinktransparency.hOffset = 310 + roffset;
imagelinktransparency.vOffset = 210 + roffset;

weatherglasshelp.hOffset = 260 + roffset;
weatherglasshelp.vOffset = 10 + roffset;

resizingknob.hOffset = 0 + roffset;
resizingknob.vOffset = 0 + roffset;

helpknob.hOffset = 0 + roffset;
helpknob.vOffset = 0 + roffset;

temperatureknob.hOffset = 107 + roffset;
temperatureknob.vOffset = 230 + roffset;

popupknob.hOffset = 137 + roffset;
popupknob.vOffset = 210 + roffset;

clockknob.hOffset = 165 + roffset;
clockknob.vOffset = 230 + roffset;

thermometerhole.hOffset = 70 + roffset;
thermometerhole.vOffset = 164 + roffset;

thermometerpart1.hOffset = 70 + roffset;
thermometerpart1.vOffset = 164 + roffset;
thermometerpart1.width = 79;
thermometerpart1.height = 78;

thermometerpart2.hOffset = 70 + roffset;
thermometerpart2.vOffset = 164 + roffset;
thermometerpart2.width = 79;
thermometerpart2.height = 78;

thermometerpart3.hOffset = 70 + roffset;
thermometerpart3.vOffset = 164 + roffset;
thermometerpart3.width = 79;
thermometerpart3.height = 78;

clocksurround.hOffset = 3 + roffset;
clocksurround.vOffset = 3 + roffset;

clock_hand.hRegistrationPoint = 145;
clock_hand.vRegistrationPoint = 145;

clock_hand.hOffset = 152 + roffset;
clock_hand.vOffset = 149 + roffset;
clock_hand.width = 290 ;
clock_hand.height = 290;

bk.hOffset = -2 + roffset;
bk.vOffset = -4 + roffset;
bk.width = 310;
bk.height = 310;

icon.hOffset = 120 + roffset;
icon.vOffset = 110 + roffset;
icon.width = 60;
icon.height = 60;

windIcon.hOffset = 110 + roffset;
windIcon.vOffset = 110 + roffset;
windIcon.width = 60;
windIcon.height = 60;

fogIcon.hOffset = 120 + roffset;
fogIcon.vOffset = 110 + roffset;
fogIcon.width = 60;
fogIcon.height = 60;

exoticIcon.hOffset = 120 + roffset;
exoticIcon.vOffset = 110 + roffset;
exoticIcon.width = 60;
exoticIcon.height = 60;

showersIcon.hOffset = 120 + roffset;
showersIcon.vOffset = 110 + roffset;
showersIcon.width = 60;
showersIcon.height = 60;

fahrenheit.hOffset = 70 + roffset;
fahrenheit.vOffset = 164 + roffset;
fahrenheit.width = 79;
fahrenheit.height = 78;

ac_presiune.hOffset = 150 + roffset;
ac_presiune.vOffset = 150 + roffset;
ac_presiune.width = 200;
ac_presiune.height = 200;
ac_presiune.hRegistrationPoint = 100;
ac_presiune.vRegistrationPoint = 100;

ac_manual.hOffset = 150 + roffset;
ac_manual.vOffset = 150 + roffset;
ac_manual.width = 200;
ac_manual.height = 200;
ac_manual.hRegistrationPoint = 100;
ac_manual.vRegistrationPoint = 100;

temperature.hOffset = 108 + roffset;
temperature.vOffset = 203 + roffset;
temperature.width = 80;
temperature.height = 80;
temperature.hRegistrationPoint = 40;
temperature.vRegistrationPoint = 40;

humidity.hOffset = 190 + roffset;
humidity.vOffset = 203 + roffset;
humidity.width = 80;
humidity.height = 80;
humidity.hRegistrationPoint = 40;
humidity.vRegistrationPoint = 40;

logo.hOffset = 135 + roffset;
logo.vOffset = 230 + roffset;
logo.width = 28;
logo.height = 21;

pin.hOffset = 20 + roffset;
pin.vOffset = 101 + roffset;
pin.width  = 20;
pin.height = 20;

inlinehelp.hOffset = -67 + roffset;
inlinehelp.vOffset = -67 + roffset;
inlinehelp.width  = 617;
inlinehelp.height = 448;


//resizing variables
var mainWindowwidthDefault = mainWindow.width;
var mainWindowheightDefault = mainWindow.height;

var clock_framehoffsetDefault = clock_frame.hOffset;
var clock_framevoffsetDefault = clock_frame.vOffset;
var clock_framewidthDefault = clock_frame.width;
var clock_frameheightDefault = clock_frame.height;


var soundlamphoffsetDefault = soundlamp.hOffset;
var soundlampvoffsetDefault = soundlamp.vOffset;
var soundlampwidthDefault = soundlamp.width;
var soundlampheightDefault = soundlamp.height;

var animationlamphoffsetDefault = animationlamp.hOffset;
var animationlampvoffsetDefault = animationlamp.vOffset;
var animationlampwidthDefault = animationlamp.width;
var animationlampheightDefault = animationlamp.height;

var chainhoffsetDefault = chain.hOffset;
var chainvoffsetDefault = chain.vOffset;
var chainwidthDefault = chain.width;
var chainheightDefault = chain.height;

var chain2hoffsetDefault = chain2.hOffset;
var chain2voffsetDefault = chain2.vOffset;
var chain2widthDefault = chain2.width;
var chain2heightDefault = chain2.height;

var hingehoffsetDefault = hinge.hOffset;
var hingevoffsetDefault = hinge.vOffset;
var hingewidthDefault = hinge.width;
var hingeheightDefault = hinge.height;

var hinge2hoffsetDefault = hinge2.hOffset;
var hinge2voffsetDefault = hinge2.vOffset;
var hinge2widthDefault = hinge2.width;
var hinge2heightDefault = hinge2.height;

var imagelinktransparencyhoffsetDefault = imagelinktransparency.hOffset;
var imagelinktransparencyvoffsetDefault = imagelinktransparency.vOffset;
var imagelinktransparencywidthDefault = imagelinktransparency.width;
var imagelinktransparencyheightDefault = imagelinktransparency.height;

var weatherglasshelphoffsetDefault = weatherglasshelp.hOffset;
var weatherglasshelpvoffsetDefault = weatherglasshelp.vOffset;
var weatherglasshelpwidthDefault = weatherglasshelp.width;
var weatherglasshelpheightDefault = weatherglasshelp.height;

var resizingknobhoffsetDefault = resizingknob.hOffset;
var resizingknobvoffsetDefault = resizingknob.vOffset;
var resizingknobwidthDefault = resizingknob.width;
var resizingknobheightDefault = resizingknob.height;

var helpknobhoffsetDefault = helpknob.hOffset;
var helpknobvoffsetDefault = helpknob.vOffset;
var helpknobwidthDefault = helpknob.width;
var helpknobheightDefault = helpknob.height;

var temperatureknobhoffsetDefault = temperatureknob.hOffset;
var temperatureknobvoffsetDefault = temperatureknob.vOffset;
var temperatureknobwidthDefault = temperatureknob.width;
var temperatureknobheightDefault = temperatureknob.height;

var popupknobhoffsetDefault = popupknob.hOffset;
var popupknobvoffsetDefault = popupknob.vOffset;
var popupknobwidthDefault = popupknob.width;
var popupknobheightDefault = popupknob.height;

var clockknobhoffsetDefault = clockknob.hOffset;
var clockknobvoffsetDefault = clockknob.vOffset;
var clockknobwidthDefault = clockknob.width;
var clockknobheightDefault = clockknob.height;

var thermometerholehoffsetDefault = thermometerhole.hOffset;
var thermometerholevoffsetDefault = thermometerhole.vOffset;
var thermometerholewidthDefault = thermometerhole.width;
var thermometerholeheightDefault = thermometerhole.height;

var thermometerpart1hoffsetDefault = thermometerpart1.hOffset;
var thermometerpart1voffsetDefault = thermometerpart1.vOffset;
var thermometerpart1widthDefault = thermometerpart1.width;
var thermometerpart1heightDefault = thermometerpart1.height;

var thermometerpart2hoffsetDefault = thermometerpart2.hOffset;
var thermometerpart2voffsetDefault = thermometerpart2.vOffset;
var thermometerpart2widthDefault = thermometerpart2.width;
var thermometerpart2heightDefault = thermometerpart2.height;

var thermometerpart3hoffsetDefault = thermometerpart3.hOffset;
var thermometerpart3voffsetDefault = thermometerpart3.vOffset;
var thermometerpart3widthDefault = thermometerpart3.width;
var thermometerpart3heightDefault = thermometerpart3.height;

var clocksurroundhoffsetDefault = clocksurround.hOffset;
var clocksurroundvoffsetDefault = clocksurround.vOffset;
var clocksurroundwidthDefault = clocksurround.width;
var clocksurroundheightDefault = clocksurround.height;

var clock_handhRegistrationPointDefault = clock_hand.hRegistrationPoint;
var clock_handvRegistrationPointDefault = clock_hand.vRegistrationPoint;

var clock_handhoffsetDefault = clock_hand.hOffset;
var clock_handvoffsetDefault = clock_hand.vOffset;
var clock_handwidthDefault = clock_hand.width;
var clock_handheightDefault = clock_hand.height;

var bkhoffsetDefault = bk.hOffset;
var bkvoffsetDefault = bk.vOffset;
var bkwidthDefault = bk.width;
var bkheightDefault = bk.height;

var iconhoffsetDefault = icon.hOffset;
var iconvoffsetDefault = icon.vOffset;
var iconwidthDefault = icon.width;
var iconheightDefault = icon.height;

var windIconhoffsetDefault = windIcon.hOffset;
var windIconvoffsetDefault = windIcon.vOffset;
var windIconwidthDefault = windIcon.width;
var windIconheightDefault = windIcon.height;

var fogIconhoffsetDefault = fogIcon.hOffset;
var fogIconvoffsetDefault = fogIcon.vOffset;
var fogIconwidthDefault = fogIcon.width;
var fogIconheightDefault = fogIcon.height;

var exoticIconhoffsetDefault = exoticIcon.hOffset;
var exoticIconvoffsetDefault = exoticIcon.vOffset;
var exoticIconwidthDefault = exoticIcon.width;
var exoticIconheightDefault = exoticIcon.height;

var showersIconhoffsetDefault = showersIcon.hOffset;
var showersIconvoffsetDefault = showersIcon.vOffset;
var showersIconwidthDefault = showersIcon.width;
var showersIconheightDefault = showersIcon.height;

var fahrenheithoffsetDefault = fahrenheit.hOffset;
var fahrenheitvoffsetDefault = fahrenheit.vOffset;
var fahrenheitwidthDefault = fahrenheit.width;
var fahrenheitheightDefault = fahrenheit.height;

var ac_presiunehoffsetDefault = ac_presiune.hOffset;
var ac_presiunevoffsetDefault = ac_presiune.vOffset;
var ac_presiunewidthDefault = ac_presiune.width;
var ac_presiuneheightDefault = ac_presiune.height;
var ac_presiunehRegistrationPointDefault = ac_presiune.hRegistrationPoint;
var ac_presiunevRegistrationPointDefault = ac_presiune.vRegistrationPoint;

var ac_manualhoffsetDefault = ac_manual.hOffset;
var ac_manualvoffsetDefault = ac_manual.vOffset;
var ac_manualwidthDefault = ac_manual.width;
var ac_manualheightDefault = ac_manual.height;
var ac_manualhRegistrationPointDefault = ac_manual.hRegistrationPoint;
var ac_manualvRegistrationPointDefault = ac_manual.vRegistrationPoint;

var temperaturehoffsetDefault = temperature.hOffset;
var temperaturevoffsetDefault = temperature.vOffset;
var temperaturewidthDefault = temperature.width;
var temperatureheightDefault = temperature.height;
var temperaturehRegistrationPointDefault = temperature.hRegistrationPoint;
var temperaturevRegistrationPointDefault = temperature.vRegistrationPoint;

var humidityhoffsetDefault = humidity.hOffset;
var humidityvoffsetDefault = humidity.vOffset;
var humiditywidthDefault = humidity.width;
var humidityheightDefault = humidity.height;
var humidityhRegistrationPointDefault = humidity.hRegistrationPoint;
var humidityvRegistrationPointDefault = humidity.vRegistrationPoint;

var logohoffsetDefault = logo.hOffset;
var logovoffsetDefault = logo.vOffset;
var logowidthDefault = logo.width;
var logoheightDefault = logo.height;

var pinhoffsetDefault = pin.hOffset;
var pinvoffsetDefault = pin.vOffset;
var pinwidthDefault = pin.width ;
var pinheightDefault = pin.height;

var inlinehelphoffsetDefault = inlinehelp.hOffset;
var inlinehelpvoffsetDefault = inlinehelp.vOffset;
var inlinehelpwidthDefault = inlinehelp.width ;
var inlinehelpheightDefault = inlinehelp.height;

var precedinghoffsetDefault = preceding.hOffset;
var precedingvoffsetDefault = preceding.vOffset;
var precedingwidthDefault = preceding.width;
var precedingheightDefault = preceding.height;

var followinghoffsetDefault = following.hOffset;
var followingvoffsetDefault = following.vOffset;
var followingwidthDefault = following.width;
var followingheightDefault = following.height;

if (debug == 1) { log ("init - 1 inlinehelp.hOffset " + inlinehelp.hOffset)};
if (debug == 1) { log ("init - 1 inlinehelphoffsetDefault " + inlinehelphoffsetDefault)};

var curAngle= 0;

var uc = false;
var s = false;
var temperaturevalue = 0;
var presiune = 760;
var locTranslation;

var electricDrone = "Resources/electricDrone.mp3";
var pop = "Resources/pop.mp3";
var steam = "Resources/steamsound.mp3";
var TingingSound = "Resources/ting.mp3";
var crank1 = "Resources/crank1.mp3";
var crank4 = "Resources/crank4.mp3";
var clunk = "Resources/newclunk.mp3";
var buzzer = "Resources/buzzer.mp3";
var steam = "Resources/steamsound.mp3";
var lock = "Resources/lock.mp3";
var useAlternative = false;

var $measureType="imperial";
var $metarname = "";
var $wxInfo = new Array();

//------------------- SEARCH -------------------
var resultItems;
var selectedIcao;
var icaoData;
var debug = 1;

var gaugeScale = Number(preferences.maxWidthPref.value) / 100;
var icaoLocation1 = "";
var icaoLocation2 = "";
var icaoLocation3 = "";
var icaoLocation4 = "";
var icaoLocation5 = "";

var temperatureVal = 0;
var humidityVal = 0;
var pressureVal = 0;
var skyClarityString = "";
var icaoArray = new Array();


//=================================
// widget inline help timer setup
//=================================
var widgetHelpTimer = new Timer();
widgetHelpTimer.ticking = false;
widgetHelpTimer.interval = 0.1;
//=================================
// widget inline help timer setup
//=================================
var searchFadeTimer = new Timer();
searchFadeTimer.ticking = false;
searchFadeTimer.interval = 0.01;

var busyTimer = new Timer();
busyTimer.interval = 0.1;
busyTimer.ticking=false;

var main_timer = new Timer();
main_timer.ticking=true;
main_timer.interval = preferences.intervalValuePref.value;

//move this to a function
if (debug == 1) { print("%init - default system.languages: " + preferences.langpref.value)};

if (preferences.langpref.value === "alternative") {
    var data = filesystem.readFile("Resources/" + preferences.langpref2.value + "/Localizable.strings");
    var useAlternative = true;
    var ro = roMap(data);
    if (debug == 1) { print("%init - widget will use the language code " + preferences.langpref2.value)};
} else {
    if (debug == 1) { print("%init - default system.languages: " + system.languages)};
}
var gCity,
    gTemp; // for vitality

var theClock = null;
//=====================
//End
//=====================

//===========================================
// this function runs on startup - main
//===========================================
function startup() {
    //busyWindow.hoffset = mainWindow.hoffset + 240;
    //busyWindow.voffset = mainWindow.voffset + 240;
    print("%startup - busyTimer started");
    busyTimer.ticking=true;

    theClock = new SPclock(infoWindow, 35, 95, 1, 0.4);
    theClock.displayTime(new Date());

    if (preferences.animationpref.value === "enable") {
        animationlamp.src = "Resources/green.png";
    } else {
        animationlamp.src = "Resources/red.png";
    }
    if (preferences.soundpref.value === "enable") {
        soundlamp.src = "Resources/green.png";
    } else {
        soundlamp.src = "Resources/red.png";
    }
    if (preferences.soundpref.value === "enable") {
        play(clunk, false);
    }
    updateTime();
    setclocksurround();

    resizethermometer();
    mainWindow.visible = true;
    mainScreen();
    setcentigradefahrenheit();

    // set the widget lock status if pinned
    if (preferences.widgetLockPref.value === "1") {
		mainWindow.locked = true;
		if (debug == 1) { log ( "startup - Setting the locking pin ",pin.hOffset)};
		pin.opacity = 255;
		pin.hOffset = preferences.pinhOffsetPref.value * gaugeScale ;
		pin.vOffset = preferences.pinvOffsetPref.value * gaugeScale ;
		pin.visible = true;
    }

    // this does a search through the icao data table
    if (preferences.icao.value != "") {
       var checkIcao = searchIcaoFile(preferences.icao.value);
    }

    var checkCity = "London";

    updateTooltip();

    if (preferences.metarpref.value === "location") {
        txtSearchCity.data = bf("_Search_city") + ":";
        knob2.hOffset = 130;
    } else {
        txtSearchCity.data = bf("_Search_ICAO") + " :";
        knob2.hOffset = 185;
    }

    setGeneralTooltips();
    setprefdescriptions();
    setpreftitles();
    setmenutitles();
    if (preferences.soundpref.value === "enable") {
        play(pop, false);
    }
    weatherglasshelp.visible = true;
    if (preferences.permanentPanel.value === "enabled") {
        infoWindow.visible = true;
    } else {
        infoWindow.visible = false;
    }
    if (preferences.miniClock.value === "enabled") {
        clock_frame.visible = true;
        textBckgnd.src="resources/background.png";
    } else {
        clock_frame.visible = false;
        textBckgnd.src="resources/background2.png";
    }
    sethoverTextFont();
    // create the licence window
    createLicence(mainWindow);
    
        // get the data
    if (preferences.icao.value != "") {
       //set the getdata timer to user set interval, default 600 secs
       main_timer.interval = 2;
       //do_the_business () ;//getData(preferences.icao.value);
    } else {
       searchWindowVisible();
    }

}
//=====================
//End function
//=====================

//=================================================
// this function sets the scale to higher pressures
//=================================================
function setPresNorm(val) {
    var min = 700,
        max = 820,
        angle;
    bk.src = "Resources/scale.png";
    angle = (val - min) / (max - min) * 360;
    //  print("%****** angle: " + angle);
    ac_presiune.rotation = angle;
}
//=====================
//End function
//=====================

//=====================================================
// this function sets the scale to the middle pressures
//=====================================================
function setPresMed(val) {
    var min = 640,
        max = 760,
        angle;
    bk.src = "Resources/scale_med.png";
    angle = (val - min) / (max - min) * 360;
    ac_presiune.rotation = angle;
}
//=====================
//End function
//=====================

//====================================================
// this function sets the scale to the lower pressures
//====================================================
function setPresRed(val) {
    var min = 580,
        max = 700,
        angle;
    bk.src = "Resources/scale_altitude.png";
    angle = (val - min) / (max - min) * 360;
    ac_presiune.rotation = angle;
}
//=====================
//End function
//=====================
//===========================================================================================
// this function sets which pressure screen should be shown according to the current pressure
//===========================================================================================
function setPres(val, animate) {
    presiune = val;
    if (val > 730) {
        setPresNorm(val, animate);
    } else if (val > 670) {
        setPresMed(val, animate);
    } else {
        setPresRed(val, animate);
    }
}
//=====================
//End function
//=====================

//=========================================================================
// this function moves the manual pointer from the last position to the new
//=========================================================================
function setManual(val, animate) {
    var min = 580,
        max = 700,
        angle,
        lastVal,
        x;
    if (val) {
        lastVal = preferences.lastPres.value;
        preferences.lastPres.value = val;
        savePreferences();
    }
    switch (bk.src) {
    case 'Resources/scale_med.png':
        min = 640;
        max = 760;
        break;
    case 'Resources/scale.png':
        min = 700;
        max = 820;
        break;
    }
    if (val < min) {
        val = min;
    }
    if (val > max) {
        val = max;
    }
    angle = (val - min) / (max - min) * 360;
    if (animate === "true") {
        log ("angle " + angle);
        if (lastVal < min) {
            lastVal = min;
        }
        if (lastVal > max) {
            lastVal = max;
        }
        x = new CustomAnimation(1, updateMe);
        x.duration = 350;
        x.start_angle = (lastVal - min) / (max - min) * 360;
        x.end_angle = angle;
        animator.start(x);
    } else {
        ac_manual.rotation = angle;
    }
}
//=====================
//End function
//=====================
//=================================================
// this function sets the temperature pointer angle
//=================================================
function setTemp(val) {
    var min = -50,
        max = 70,
        angle;
    temperaturevalue = val;
    if (preferences.tempUnit.value === "F") {
        val = val * 1.8 + 32;
        min = -45;
        max = 135;
        fahrenheit.opacity = 255;
        if (debug == 1) { print("%setTemp - " + String(val) + " F")};
    } else {
        fahrenheit.opacity = 0;
        if (debug == 1) { print("%setTemp - " + String(val) + " C")};
    }
    angle = (val - min) / (max - min) * 360;
    if (preferences.soundpref.value === "enable" && preferences.getDataPingPref.value === "1") {
        play(TingingSound, false);
    }
    temperature.rotation = angle;
}
//=====================
//End function
//=====================
//==============================================
// this function sets the humidity pointer angle
//==============================================
function setHumidityPointer(val) {
    var min = -25,
        max = 125,
        angle = (val - min) / (max - min) * 360;
    humidity.rotation = angle;
}
//=====================
//End function
//=====================
//==========================================================================
// this function provides a text version of when the data was last collected
//==========================================================================
function nice_format_interval(duration) {
    var hours = Math.floor(duration / 3600),
        minutes = Math.floor((duration - hours * 3600) / 60),
        res;
    if (hours > 72) {
        //print("%Update " + String(hours) + " hours and " + String(minutes) + " minutes ago");
        return bf('_No_recent_data_available') + '!';
    }
    if (hours > 0) {
        res = bf('_Updated');
        if (hours === 1) {
            res += ' ' + bf('_one_hour');
        } else {
            res += ' ' + String(hours) + ' ' + bf('_hours');
        }
        if (minutes === 1) {
            res += ' ' + bf('_and_one_minute');
        } else if (minutes > 1) {
            res += ' ' + bf('_and') + ' ' + String(minutes) + ' ' + bf('_minutes');
        }
        return res + ' ' + bf('_ago');
    }
    if (minutes > 0) {
        if (minutes === 1) {
            return bf('_Updated_one_minute_ago');
        }
        return bf('_Updated') + ' ' + String(minutes) + ' ' + bf('_minutes_ago');
    }
    if (duration === 1) {
        return bf('_Updated_one_second_ago');
    }
    return bf('_Updated') + ' ' + String(duration) + ' ' + bf('_seconds_ago');
}
//=====================
//End function
//=====================

//========================================================
// function to update the background tooltip every 60 secs
//========================================================
function updateTooltip() {
    //print("%Updating tooltip...");
    var theDate = new Date(),
        secsDif = parseInt(theDate.getTime() / 1000, 10) - parseInt((preferences.lastUpdated.value) / 1000, 10);
        difString = nice_format_interval(secsDif);
        if (debug == 1) { print("%updateTooltip - difString " + difString)};

        bk.Tooltip = preferences.lastTooltip.value + "\n"  + difString;
        bk.Tooltip += " \n " + bf("_Double_tap_on_me_to_get_new_weather");
}
//=====================
//End function
//=====================

//==============================
// places the help window
//==============================
function resizeHelpWindow() {
   // places the help window in the right place as the help window is a separate window from mainWindow and needs
   // to be located each time the widget is moved and the mouseDown event called.

    var gaugeScale = Number(preferences.maxWidthPref.value) / 100;

    //inlinehelp.hOffset = (inlinehelphoffsetDefault.hOffset - (70) * gaugeScale);
    //inlinehelp.vOffset = (inlinehelpvoffsetDefault.vOffset - (67) * gaugeScale);

    
    if (debug == 1) { print ("%resizethermometer -  inlinehelp.hOffset " +  clocksurround.hOffset)};
    //inlinehelp.hOffset = inlinehelphoffsetDefault * gaugeScale;
    //inlinehelp.vOffset = inlinehelpvoffsetDefault * gaugeScale;
    
    print("inlinehelp.width "+inlinehelp.width);
    print("inlinehelp.height "+inlinehelp.height);
    
    inlinehelp.opacity = 255;
    inlinehelp.visible = true;

};
//==============================
//End function
//==============================

//===========================================
// this function updates the time
//===========================================
function updateTime() {
    var time,
        hr,
        mn,
        sc,
        ms;
    clockTimer.ticking = false;
    time = new Date();
    hr = time.getHours();
    mn = time.getMinutes();
    sc = time.getSeconds();
    ms = time.getMilliseconds();
    clockTimer.interval = 60 * (4 * Math.floor((mn + 4) / 4) - mn) - sc - 0.001 * ms;
    clockTimer.ticking = true;
    if (mn < 10) {
        mn = "0" + mn;
    }
    clock_hand.rotation = (15 * hr + Math.round(0.25 * mn) + 180) % 360;
    clock_hand.tooltip = bf("_The_current_time_is") + " - " + hr + ":" + mn + " ";

    set_the_pointer();

    //print("%rotation: " + (clock_hand.rotation + 180) % 360 + "  interval: " + clockTimer.interval);
}
//=====================
//End function
//=====================
//===================================================
// this function changes the displayed clock surround
//===================================================
function setclocksurround() {
    clock_hand.visible = true;
    clocksurround.opacity = 255;
    if (preferences.clockpref.value === "gold") {
        clocksurround.src = "Resources/clock-surround3.png";
        if (debug == 1) { print("%setclocksurround - setclocksurround toggled to gold")};
    } else if (preferences.clockpref.value === "disabled") {
        if (debug == 1) { print("%setclocksurround - setclocksurround toggled to disabled")};
        clocksurround.opacity = 1;
        clock_hand.visible = false;
    } else if (preferences.clockpref.value === "metal") {
        if (debug == 1) { print("%setclocksurround - setclocksurround toggled to metal")};
        clocksurround.src = "Resources/clock-surround.png";
    } else if (preferences.clockpref.value === "red") {
        if (debug == 1) { print("%setclocksurround - setclocksurround toggled to red")};
        clocksurround.src = "Resources/clock-surround2.png";
    } else if (preferences.clockpref.value === "wind") {
        if (debug == 1) { print("%setclocksurround - setclocksurround toggled to wind")};
        clocksurround.src = "Resources/wind-ring.png";
    }
}
//=====================
//End function
//=====================
//===========================================
// this function toggles between measurement units
//===========================================
function togglecentigradefahrenheit() {
    if (preferences.tempUnit.value === "C") {
        preferences.tempUnit.value = "F";
        if (debug == 1) { print("%togglecentigradefahrenheit - displaying the temperature in Fahrenheit")};
        setcentigradefahrenheit();
    } else {
        preferences.tempUnit.value = "C";
        if (debug == 1) { print("%togglecentigradefahrenheit - displaying the temperature in Celsius")};
        setcentigradefahrenheit();
    }
}
//=====================
//End function
//=====================

//====================================================
// this function animates the measurement unit change
//====================================================
function setcentigradefahrenheit() {
    if (preferences.tempUnit.value === "F") {
        if (debug == 1) { print("%animate? " + preferences.animationpref.value)};
        if (preferences.animationpref.value === "enable") {
            if (debug == 1) { print("%setcentigradefahrenheit - preferences.animationpref.value= " + preferences.animationpref.value)};
            preferences.tempUnit.value = "F";
            //log ("displaying the temperature in Fahrenheit");
            temperature.opacity = 0;
            sleep(1000);
            if (preferences.soundpref.value === "enable") {
                play(pop, false);
            }
            thermometerpart2.opacity = 255;
            sleep(1000);
            if (preferences.soundpref.value === "enable") {
                play(crank4, false);
            }
            thermometerpart2.opacity = 0;
            thermometerpart3.opacity = 255;
            sleep(1000);
            if (preferences.soundpref.value === "enable") {
                play(crank4, false);
            }
            thermometerpart3.opacity = 0;
            thermometerpart1.opacity = 255;
            sleep(1000);
            if (preferences.soundpref.value === "enable") {
                play(crank4, false);
            }
            thermometerhole.opacity = 255;
            thermometerpart1.opacity = 0;
            sleep(1000);
            if (preferences.soundpref.value === "enable") {
                play(crank4, false);
            }
            thermometerhole.opacity = 0;
            thermometerpart1.opacity = 255;
            sleep(1000);
            if (preferences.soundpref.value === "enable") {
                play(crank4, false);
            }
            thermometerpart1.opacity = 0;
            thermometerpart3.opacity = 255;
            sleep(1000);
            thermometerpart3.opacity = 0;
            thermometerpart2.opacity = 255;
            sleep(1000);
            thermometerpart2.opacity = 0;
            fahrenheit.opacity = 255;
            if (preferences.soundpref.value === "enable") {
                play(steam, false);
            }
            sleep(1000);
            temperature.opacity = 255;
        }
        setTemp(temperaturevalue);
    } else {
        preferences.tempUnit.value = "C";
        if (preferences.animationpref.value === "enable") {
            //log ("displaying the temperature in Centigrade");
            fahrenheit.opacity = 0;
            temperature.opacity = 0;
            sleep(1000);
            if (preferences.soundpref.value === "enable") {
                play(pop, false);
            }
            thermometerpart2.opacity = 255;
            sleep(1000);
            if (preferences.soundpref.value === "enable") {
                play(crank4, false);
            }
            thermometerpart2.opacity = 0;
            thermometerpart3.opacity = 255;
            sleep(1000);
            if (preferences.soundpref.value === "enable") {
                play(crank4, false);
            }
            thermometerpart3.opacity = 0;
            thermometerpart1.opacity = 255;
            sleep(1000);
            if (preferences.soundpref.value === "enable") {
                play(crank4, false);
            }
            thermometerpart1.opacity = 0;
            thermometerhole.opacity = 255;
            sleep(1000);
            if (preferences.soundpref.value === "enable") {
                play(crank4, false);
            }
            thermometerhole.opacity = 0;
            thermometerpart1.opacity = 255;
            sleep(1000);
            if (preferences.soundpref.value === "enable") {
                play(crank4, false);
            }
            thermometerpart1.opacity = 0;
            thermometerpart3.opacity = 255;
            sleep(1000);
            thermometerpart3.opacity = 0;
            thermometerpart2.opacity = 255;
            sleep(1000);
            thermometerpart2.opacity = 0;
            if (preferences.soundpref.value === "enable") {
                play(steam, false);
            }
            sleep(1000);
            temperature.opacity = 255;
        }
        //    if (preferences.soundpref.value === "enable") {play(TingingSound,false)}
        setTemp(temperaturevalue);
    }
}
//=====================
//End function
//=====================

//===========================================
// this function turns the animation on/off
//===========================================
function toggleanimation() {
    if (preferences.soundpref.value === "enable") {
        play(TingingSound, false);
    }
    if (preferences.animationpref.value === "disable") {
        preferences.animationpref.value = "enable";
        animationlamp.src = "Resources/green.png";
    } else {
        preferences.animationpref.value = "disable";
        animationlamp.src = "Resources/red.png";
    }
}
//=====================
//End function
//=====================

//===========================================
// this function sets the surround type
//===========================================
function toggle24hrclock() {
    if (preferences.soundpref.value === "enable") {
        play(clunk, false);
    }
    if (debug == 1) { print("%toggle24hrclock - preferences =  " + preferences.clockpref.value)};
    if (preferences.clockpref.value === "disabled") {
        preferences.clockpref.value = "metal";
    } else if (preferences.clockpref.value === "metal") {
        preferences.clockpref.value = "red";
    } else if (preferences.clockpref.value === "red") {
        preferences.clockpref.value = "gold";
    } else if (preferences.clockpref.value === "gold") {
        preferences.clockpref.value = "disabled";
    }
    setclocksurround();
}
//=====================
//End function
//=====================

//======================================================================================
// Function to capture a pref change
//======================================================================================
widget.onPreferencesChanged = function() {
    if (preferences.metarpref.value === "location") {
        txtSearchCity.data = bf("_Search_city") + ":";
    } else {
        txtSearchCity.data = bf("_Search_ICAO") + " :";
    }
    changePrefs(); // DAEB added to resize
};
//=====================
//End function
//=====================

//======================================================================================
// Function to move the main_window onto the main screen
//======================================================================================
function mainScreen() {
    // if the widget is off screen then move into the viewable window

    if (mainWindow.hOffset + 100 < 0) {
        mainWindow.hOffset = -100; // allowing for the extra space around the gauge face
    }
    if (mainWindow.vOffset + 100 < 32) {
        mainWindow.vOffset = -100; // allowing for the extra space around the gauge face
    }
    if (debug == 1) { print("%mainScreen - mainWindow.hOffset =  " + mainWindow.hOffset)};
    if (debug == 1) { print("%mainScreen - screen.width =  " + screen.width)};

    if (mainWindow.hOffset + 190 > screen.width ) {   // puts it back on screen on the right
        mainWindow.hOffset = screen.width - mainWindow.width + 300;
    }
    if (mainWindow.vOffset > screen.height - 350) {
        mainWindow.vOffset = screen.height - (mainWindow.height) + 150;
    }
    

    if (preferences.hoffsetpref.value > 0) {
        mainWindow.hOffset = parseInt(preferences.hoffsetpref.value, 10);
    }
    if (preferences.voffsetpref.value > 0) {
        mainWindow.vOffset = parseInt(preferences.voffsetpref.value, 10);
    }

}
//=====================
//End function
//=====================

//======================================================================================
// Function to read language localisation file
//======================================================================================
function roMap(data) {
    var lookFor1 = /"(\w+)"\s*\=\s*"([^"]+)";/g,
        lookFor2 = /"(\w+)"\s*\=\s*"([^"]+)";/,
        found = data.match(lookFor1),
        i,
        def,
        fnd,
        map = {};
    if (found !== null) {
        for (i = 0; i < found.length; i += 1) {
            def = found[i];
            fnd = def.match(lookFor2);
            if (fnd !== null) {
                map[fnd[1]] = fnd[2];
            }
        }
    }
    return map;
}
//=====================
//End function
//=====================

//===============================
// function to resize all layers
//===============================
function resizethermometer() {
    var gaugeScale = Number(preferences.maxWidthPref.value) / 100;
    if (debug == 1) { print("%resizethermometer - Resizing: preferences.maxWidthPref.value: " + preferences.maxWidthPref.value)};
    if (debug == 1) { print("%resizethermometer - Scale: " + gaugeScale)};
    mainWindow.width = mainWindowwidthDefault * gaugeScale;
    mainWindow.height = mainWindowheightDefault * gaugeScale;
    
    clock_frame.hOffset = clock_framehoffsetDefault * gaugeScale;
    clock_frame.vOffset = clock_framevoffsetDefault * gaugeScale;
    clock_frame.width = clock_framewidthDefault * gaugeScale;
    clock_frame.height = clock_frameheightDefault * gaugeScale;

    soundlamp.hOffset = soundlamphoffsetDefault * gaugeScale;
    soundlamp.vOffset = soundlampvoffsetDefault * gaugeScale;
    soundlamp.width = soundlampwidthDefault * gaugeScale;
    soundlamp.height = soundlampheightDefault * gaugeScale;
    animationlamp.hOffset = animationlamphoffsetDefault * gaugeScale;
    animationlamp.vOffset = animationlampvoffsetDefault * gaugeScale;
    animationlamp.width = animationlampwidthDefault * gaugeScale;
    animationlamp.height = animationlampheightDefault * gaugeScale;
    chain.hOffset = chainhoffsetDefault * gaugeScale;
    chain.vOffset = chainvoffsetDefault * gaugeScale;
    chain.width = chainwidthDefault * gaugeScale;
    chain.height = chainheightDefault * gaugeScale;
    chain2.hOffset = chain2hoffsetDefault * gaugeScale;
    chain2.vOffset = chain2voffsetDefault * gaugeScale;
    chain2.width = chain2widthDefault * gaugeScale;
    chain2.height = chain2heightDefault * gaugeScale;
    hinge.hOffset = hingehoffsetDefault * gaugeScale;
    hinge.vOffset = hingevoffsetDefault * gaugeScale;
    hinge.width = hingewidthDefault * gaugeScale;
    hinge.height = hingeheightDefault * gaugeScale;
    hinge2.hOffset = hinge2hoffsetDefault * gaugeScale;
    hinge2.vOffset = hinge2voffsetDefault * gaugeScale;
    hinge2.width = hinge2widthDefault * gaugeScale;
    hinge2.height = hinge2heightDefault * gaugeScale;
    imagelinktransparency.hOffset = imagelinktransparencyhoffsetDefault * gaugeScale;
    imagelinktransparency.vOffset = imagelinktransparencyvoffsetDefault * gaugeScale;
    imagelinktransparency.width = imagelinktransparencywidthDefault * gaugeScale;
    imagelinktransparency.height = imagelinktransparencyheightDefault * gaugeScale;
    weatherglasshelp.hOffset = weatherglasshelphoffsetDefault * gaugeScale;
    weatherglasshelp.vOffset = weatherglasshelpvoffsetDefault * gaugeScale;
    weatherglasshelp.width = weatherglasshelpwidthDefault * gaugeScale;
    weatherglasshelp.height = weatherglasshelpheightDefault * gaugeScale;
    resizingknob.hOffset = resizingknobhoffsetDefault * gaugeScale;
    resizingknob.vOffset = resizingknobvoffsetDefault * gaugeScale;
    resizingknob.width = resizingknobwidthDefault * gaugeScale;
    resizingknob.height = resizingknobheightDefault * gaugeScale;
    helpknob.hOffset = helpknobhoffsetDefault * gaugeScale;
    helpknob.vOffset = helpknobvoffsetDefault * gaugeScale;
    helpknob.width = helpknobwidthDefault * gaugeScale;
    helpknob.height = helpknobheightDefault * gaugeScale;
    popupknob.hOffset = popupknobhoffsetDefault * gaugeScale;
    popupknob.vOffset = popupknobvoffsetDefault * gaugeScale;
    popupknob.width = popupknobwidthDefault * gaugeScale;
    popupknob.height = popupknobheightDefault * gaugeScale;
    temperatureknob.hOffset = temperatureknobhoffsetDefault * gaugeScale;
    temperatureknob.vOffset = temperatureknobvoffsetDefault * gaugeScale;
    temperatureknob.width = temperatureknobwidthDefault * gaugeScale;
    temperatureknob.height = temperatureknobheightDefault * gaugeScale;
    clockknob.hOffset = clockknobhoffsetDefault * gaugeScale;
    clockknob.vOffset = clockknobvoffsetDefault * gaugeScale;
    clockknob.width = clockknobwidthDefault * gaugeScale;
    clockknob.height = clockknobheightDefault * gaugeScale;
    thermometerhole.hOffset = thermometerholehoffsetDefault * gaugeScale;
    thermometerhole.vOffset = thermometerholevoffsetDefault * gaugeScale;
    thermometerhole.width = thermometerholewidthDefault * gaugeScale;
    thermometerhole.height = thermometerholeheightDefault * gaugeScale;
    thermometerpart1.hOffset = thermometerpart1hoffsetDefault * gaugeScale;
    thermometerpart1.vOffset = thermometerpart1voffsetDefault * gaugeScale;
    thermometerpart1.width = thermometerpart1widthDefault * gaugeScale;
    thermometerpart1.height = thermometerpart1heightDefault * gaugeScale;
    thermometerpart2.hOffset = thermometerpart2hoffsetDefault * gaugeScale;
    thermometerpart2.vOffset = thermometerpart2voffsetDefault * gaugeScale;
    thermometerpart2.width = thermometerpart2widthDefault * gaugeScale;
    thermometerpart2.height = thermometerpart2heightDefault * gaugeScale;
    thermometerpart3.hOffset = thermometerpart3hoffsetDefault * gaugeScale;
    thermometerpart3.vOffset = thermometerpart3voffsetDefault * gaugeScale;
    thermometerpart3.width = thermometerpart3widthDefault * gaugeScale;
    thermometerpart3.height = thermometerpart3heightDefault * gaugeScale;
    clocksurround.hOffset = clocksurroundhoffsetDefault * gaugeScale;
    clocksurround.vOffset = clocksurroundvoffsetDefault * gaugeScale;
    clocksurround.width = clocksurroundwidthDefault * gaugeScale;
    clocksurround.height = clocksurroundheightDefault * gaugeScale;
    clock_hand.hOffset = clock_handhoffsetDefault * gaugeScale;
    clock_hand.vOffset = clock_handvoffsetDefault * gaugeScale;
    clock_hand.width = clock_handwidthDefault * gaugeScale;
    clock_hand.height = clock_handheightDefault * gaugeScale;
    clock_hand.hRegistrationPoint = clock_handhRegistrationPointDefault * gaugeScale;
    clock_hand.vRegistrationPoint = clock_handvRegistrationPointDefault * gaugeScale;
    bk.hOffset = bkhoffsetDefault * gaugeScale;
    bk.vOffset = bkvoffsetDefault * gaugeScale;
    bk.width = bkwidthDefault * gaugeScale;
    bk.height = bkheightDefault * gaugeScale;
    icon.hOffset = iconhoffsetDefault * gaugeScale;
    icon.vOffset = iconvoffsetDefault * gaugeScale;
    icon.width = iconwidthDefault * gaugeScale;
    icon.height = iconheightDefault * gaugeScale;
    windIcon.hOffset = windIconhoffsetDefault * gaugeScale;
    windIcon.vOffset = windIconvoffsetDefault * gaugeScale;
    windIcon.width = windIconwidthDefault * gaugeScale;
    windIcon.height = windIconheightDefault * gaugeScale;
    fogIcon.hOffset = fogIconhoffsetDefault * gaugeScale;
    fogIcon.vOffset = fogIconvoffsetDefault * gaugeScale;
    fogIcon.width = fogIconwidthDefault * gaugeScale;
    fogIcon.height = fogIconheightDefault * gaugeScale;
    exoticIcon.hOffset = exoticIconhoffsetDefault * gaugeScale;
    exoticIcon.vOffset = exoticIconvoffsetDefault * gaugeScale;
    exoticIcon.width = exoticIconwidthDefault * gaugeScale;
    exoticIcon.height = exoticIconheightDefault * gaugeScale;
    showersIcon.hOffset = showersIconhoffsetDefault * gaugeScale;
    showersIcon.vOffset = showersIconvoffsetDefault * gaugeScale;
    showersIcon.width = showersIconwidthDefault * gaugeScale;
    showersIcon.height = showersIconheightDefault * gaugeScale;
    fahrenheit.hOffset = fahrenheithoffsetDefault * gaugeScale;
    fahrenheit.vOffset = fahrenheitvoffsetDefault * gaugeScale;
    fahrenheit.width = fahrenheitwidthDefault * gaugeScale;
    fahrenheit.height = fahrenheitheightDefault * gaugeScale;
    ac_presiune.hOffset = ac_presiunehoffsetDefault * gaugeScale;
    ac_presiune.vOffset = ac_presiunevoffsetDefault * gaugeScale;
    ac_presiune.width = ac_presiunewidthDefault * gaugeScale;
    ac_presiune.height = ac_presiuneheightDefault * gaugeScale;
    ac_presiune.hRegistrationPoint = ac_presiunehRegistrationPointDefault * gaugeScale;
    ac_presiune.vRegistrationPoint = ac_presiunevRegistrationPointDefault * gaugeScale;
    ac_manual.hOffset = ac_manualhoffsetDefault * gaugeScale;
    ac_manual.vOffset = ac_manualvoffsetDefault * gaugeScale;
    ac_manual.width = ac_manualwidthDefault * gaugeScale;
    ac_manual.height = ac_manualheightDefault * gaugeScale;
    ac_manual.hRegistrationPoint = ac_manualhRegistrationPointDefault * gaugeScale;
    ac_manual.vRegistrationPoint = ac_manualvRegistrationPointDefault * gaugeScale;
    temperature.hOffset = temperaturehoffsetDefault * gaugeScale;
    temperature.vOffset = temperaturevoffsetDefault * gaugeScale;
    temperature.width = temperaturewidthDefault * gaugeScale;
    temperature.height = temperatureheightDefault * gaugeScale;
    temperature.hRegistrationPoint = temperaturehRegistrationPointDefault * gaugeScale;
    temperature.vRegistrationPoint = temperaturevRegistrationPointDefault * gaugeScale;
    humidity.hOffset = humidityhoffsetDefault * gaugeScale;
    humidity.vOffset = humidityvoffsetDefault * gaugeScale;
    humidity.width = humiditywidthDefault * gaugeScale;
    humidity.height = humidityheightDefault * gaugeScale;
    humidity.hRegistrationPoint = humidityhRegistrationPointDefault * gaugeScale;
    humidity.vRegistrationPoint = humidityvRegistrationPointDefault * gaugeScale;
    logo.hOffset = logohoffsetDefault * gaugeScale;
    logo.vOffset = logovoffsetDefault * gaugeScale;
    logo.width = logowidthDefault * gaugeScale;
    logo.height = logoheightDefault * gaugeScale;

    inlinehelp.hOffset = inlinehelphoffsetDefault * gaugeScale  ;
    inlinehelp.vOffset = inlinehelpvoffsetDefault * gaugeScale  ;
    inlinehelp.width = inlinehelpwidthDefault * gaugeScale;
    inlinehelp.height = inlinehelpheightDefault * gaugeScale;

    preceding.hOffset = precedinghoffsetDefault * gaugeScale  ;
    preceding.vOffset = precedingvoffsetDefault * gaugeScale  ;
    preceding.width = precedingwidthDefault * gaugeScale;
    preceding.height = precedingheightDefault * gaugeScale;

    following.hOffset = followinghoffsetDefault * gaugeScale  ;
    following.vOffset = followingvoffsetDefault * gaugeScale  ;
    following.width = followingwidthDefault * gaugeScale;
    following.height = followingheightDefault * gaugeScale;

// resize the TAFicons to be smaller
    preceding.width = preceding.width * .8;
    preceding.height = preceding.height * .8;
    following.width = following.width * .8;
    following.height = following.height * .8;

    pin.width = pinwidthDefault * gaugeScale;
    pin.height = pinheightDefault * gaugeScale;

// set the widget lock status if pinned
    if (preferences.widgetLockPref.value === "1") {
		mainWindow.locked = true;
                pin.opacity = 255;
                pin.hOffset = preferences.pinhOffsetPref.value * gaugeScale ;
		pin.vOffset = preferences.pinvOffsetPref.value * gaugeScale ;
    } else {
                pin.opacity = 0;
    }
}
//=====================
//End function
//=====================


//===============================
// function to rotate gauges
//===============================
function rotategauges() {
    var angle = 250;
        //TingingSound = "Resources/ting.mp3";
    if (preferences.soundpref.value === "enable") {
        play(TingingSound, false);
    }
    humidity.rotation = angle;
    temperature.rotation = angle;
    sleep(500);
    angle = 200;
    if (preferences.soundpref.value === "enable") {
        play(TingingSound, false);
    }
    humidity.rotation = angle;
    temperature.rotation = angle;
    sleep(500);
    angle = 150;
    if (preferences.soundpref.value === "enable") {
        play(TingingSound, false);
    }
    humidity.rotation = angle;
    temperature.rotation = angle;
    sleep(500);
    angle = 100;
    if (preferences.soundpref.value === "enable") {
        play(TingingSound, false);
    }
    humidity.rotation = angle;
    temperature.rotation = angle;
    sleep(500);
    angle = 50;
    if (preferences.soundpref.value === "enable") {
        play(TingingSound, false);
    }
    humidity.rotation = angle;
    temperature.rotation = angle;
    sleep(500);
}
//=====================
//End function
//=====================

//===========================================
// this function rotates the pointer
//===========================================
function updateMe() {
    var now = animator.milliseconds,
        t = now - this.startTime,
        percent = t / this.duration,
        angle = this.start_angle + (this.end_angle - this.start_angle) * percent;
    ac_manual.rotation = angle;
    if (animator.milliseconds >= (this.startTime + this.duration)) {
        angle = this.end_angle;
        ac_manual.rotation = angle;
        return false; // we're done
    }
    return true; // keep going
}
//=====================
//End function
//=====================

//===========================================
// this function fades the search window 
//===========================================
function fadeSearchWindow() {

    searchFadeTimer.ticking= true; // starts the fade timer
    if (preferences.soundpref.value === "enable") {
        play(steam, false);
    }
 }
//=====================
//End function
//=====================

//===========================================
// this function makes the search window visible
//===========================================
function searchWindowVisible() {
      if (preferences.soundpref.value == "enable") {play(clunk,false)}
      keyPressCount = 0;
      searchWindow.visible = true;
      txt_results.data = "";
      txt_search.data = "" ;
      txtSearching.data = " " ;
 }
//=====================
//End function
//=====================

//===========================================
// this function animates the clock hand pointer
//===========================================
function rotateHand() {
   set_the_pointer ();
   curAngle = clock_hand.rotation;
   print("curAngle "+ curAngle);
   var a = new RotateAnimation( clock_hand, curAngle-360, 1300, animator.kEaseOut, rotateHandEnd );
   animator.start( a );
}
//=====================
//End function
//=====================

//===========================================
// this function ends the clock hand pointer animation
//===========================================
function rotateHandEnd() {
   clock_hand.rotation = curAngle ;
}
//=====================
//End function
//=====================


//=====================
// set the font for the information pop ups
//=====================
function sethoverTextFont () {
  tooltipText.font = preferences.popupPanelFont.value ;
  tooltipText.style.fontSize = preferences.popupPanelFontSizePref.value   + "px";

  log("%sethoverTextFont - preferences.popupPanelFontSizePref.value ",preferences.popupPanelFontSizePref.value);
}
//=====================
// function ends
//=====================



//=====================
// Toggle the pop up
//=====================
function togglePopUp() {
    if (preferences.soundpref.value === "enable") {
        play(steam, false);
    }
      if (preferences.permanentPanel.value === "enabled") {
        infoWindow.visible = false;
        preferences.permanentPanel.value = "disabled"
    } else {
        infoWindow.visible = true;
        preferences.permanentPanel.value = "enabled"
    }
}
//=====================
//End function
//=====================


//=====================
// the busy timer changes the busy icon
//=====================
busyTimer.onTimerFired = function () {
       busy.visible = true;
       busyBlur.visible = true;
       busyCounter = busyCounter + 1 ;
       if (busyCounter >= 7) {busyCounter = 1};
       busy.src = "Resources/busy-F" + busyCounter + "-32x32x24.png";
       //print("busyCounter " + busyCounter);
};
//=====================
//End function
//=====================


//=====================
// the main timer that does the business
//=====================
main_timer.onTimerFired = function () {
       print("main_timer - %main_timer triggered");
       do_the_business ();
       main_timer.interval = preferences.intervalValuePref.value;
};
//=====================
//End function
//=====================

//=====================
//  starts the busy timer and gets the weather data
//=====================
function do_the_business () {
       busyTimer.ticking=true;

       if (preferences.foreCastType.value == "metar") {
          getData(preferences.icao.value);
       } else {
          getTafData(preferences.icao.value);
       }

}
//=====================
//End function
//=====================


//=================================
//  sets the wind pointer direction
//=================================
function set_the_pointer () {
    if (preferences.clockpref.value === "wind") {
        //wind_dir_degrees  = 360;
        clock_hand.rotation = parseInt(wind_dir_degrees) + 180;
        //clock_hand.rotation = 180;
        clock_hand.tooltip = bf("_the_current_wind_direction_is") + " - " + wind_dir_degrees + " degrees or " + compassDirection;
        
    }
}
//=====================
//End function
//=====================

//===============================================
// function to handle a background double-click
//===============================================
bk.onMultiClick = function () {
       if ( system.event.clickCount == 2 ) {
                setTemp( temperaturevalue );
                busyTimer.ticking=true;
                 if (preferences.foreCastType.value == "metar") {
                    getData(preferences.icao.value);
                 } else {
                    getTafData(preferences.icao.value);
                 }
                inlinehelp.opacity = 0;
                inlinehelp.visible = false;
      }
}
//=====================
//End function
//=====================

//======================================================================================
// function to make the TAFicons visible when the mouse is over the face
//======================================================================================
bk.onMouseEnter = function() {
    //if (debugFlg == 1) {print ("%-I-INFO, bk.onMouseEnter")};
    if (preferences.popupPanel.value === "enabled") {
        infoWindow.visible = true;
    }

    fadeInTafIcons ();
};
//=====================
//End function
//=====================

//======================================================================================
// function to make the TAFicons invisible when the mouse leaves the face
//======================================================================================
bk.onMouseExit= function() {
    //if (debugFlg == 1) {print ("%-I-INFO, bk.onMouseExit")};

    // this is required
    //preceding.opacity= 255;
    //following.opacity= 255;
    fadeOutTafIcons();

    if (preferences.popupPanel.value === "enabled" && preferences.permanentPanel.value != "enabled") {
        infoWindow.visible = false;
    }
};
//=====================
//End function
//=====================


//======================================================================================
// function to make the TAFicons visible when the mouse is over the face
//======================================================================================
function fadeInTafIcons() {
    // this is required
    preceding.opacity= 1;
    following.opacity= 1;

    var a = new FadeAnimation( preceding, 255, 3000, animator.kEaseOut );
    var b = new FadeAnimation( following, 255, 3000, animator.kEaseOut );
    animator.start( new Array( a, b ) );
};
//=====================
//End function
//=====================

//======================================================================================
// function to fade the TAFicons  - can be called as required
//======================================================================================
function fadeOutTafIcons() {

    var a = new FadeAnimation( preceding, 1, 3000, animator.kEaseOut );
    var b = new FadeAnimation( following, 1, 3000, animator.kEaseOut );
    animator.start( new Array( a, b ) );
};
//=====================
//End function
//=====================

//======================================================================================
// function to make the TAFicons invisible when the mouse leaves the face
//======================================================================================
following.onMouseDown= function() {
    if (debugFlg == 1) {print ("%-I-INFO, following.onMouseDown")};

    if (following.opacity <= 1 ) {
       fadeInTafIcons();
    } else {
       fadeOutTafIcons();
    }

    // temporary method for showing TAF data
    // move the day forward by one

    //dayNo = dayNo + 1;
    //if (dayNo >= 7) {dayNo = 1}

    // read the TAF data for chosen day
    // display the TAF data using same structures
};
//=====================
//End function
//=====================

//======================================================================================
// function to make the TAFicons invisible when the mouse leaves the face
//======================================================================================
preceding.onMouseDown= function() {
    if (debugFlg == 1) {print ("%-I-INFO, preceding.onMouseDown")};

    if (following.opacity <= 1 ) {
       fadeInTafIcons();
    } else {
       fadeOutTafIcons();
    }

};
//=====================
//End function
//=====================










