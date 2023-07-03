Steampunk weather widget 2.0
Inspired by: Bogdan Irimia (bogdan@digitair.ro) whose digistation widget was the original code source.
Steampunked by: Dean Beedell with serious code suggestions by Harry Whitfield (original code by Bogdan Irimia 90% now replaced)
Dean.beedell@lightquick.co.uk

Changes involve a lot of modifications and improvements. Changes to the look and feel, changes to the code to cater for an entirely
new data source, reduced cpu usage, improved the structure, resizing and addition of 24hr clock, addition of 'vitality' to the dock
icon, sound added, pop-up display, support for non-YWE! languages, the list goes on...

The icao_data.dat file originates from this site : // http://ourairports.com/data/
The file is named airports.dat, you'll need to pull down a copy to keep it up to date and rename it accordingly.
This is the help file and full instructions for the Steampunk Weather Gauge  MkII (version 2.0). A Yahoo Widget that can be downloaded here .

It is our second steampunk contribution to weather reporting - this time the MKII version. The Steampunk weather widget is based on our previous Digistation widget but now with a completely new feed and logic.

The old widget took a feed from the meteorological centre in Rumania. That feed occasionally goes off-line and recently went down for over a week. To cater for this eventuality I created an alternative widget with an alternative feed. This new widget takes its feed from http://aviationweather.gov/

The two feeds are unfortunately quite different and not interchangeable so it has required totally new logic and therefore a new widget. The old weather widget is here .

Why is this feed needed? The answer is that the weather information (Metar data) is provided by various organisations throughout the world by airports, weather stations each of which has its own icao code. If there is Metar data feed near you and the widget can find it - then your local weather will be displayed dynamically.

Some example codes:

EGKA     Shoreham
EGKB     Biggin Hill
KBWI     Baltimore Washington International USA KBGR     Bangor USA (MAINE)
KBTR     Baton rouge Ryan Field USA

However, just because it has a valid icao code does not mean it is providing valid metar data, some metars just don't produce data, eg:

EGTK     Oxford / Kidlington existing airport for which no weather information is provided
EG23     Greenham Common (Closed airport for which no weather information is provided)

If you don't know your local metar icao code then you should simply switch the widget to 'location', then enter the name of a city or an airport near you. There are 10,000 icao codes so there should be one nearby.

The default location is London Heathrow EGLL. It can be easily changed to a weather feed near you.

The widget in operation
Installation Instructions

This Widget will install and run on Windows XP/Win7/Win8 and 10 and also Mac OS/X prior to El Kapitan. Download Yahoo widgets and install it. You must have Yahoo widgets installed in order to run the widget as that is how the widget has been designed (all programs require a runtime engine and Yahoo widgets is the runtime engine that allows these javascrript widgets to be displayed on your desktop).

Simply download and install the Yahoo widget engine and run it.

When this is done, download the widget. Your computer will know what to do with the widget and it will install automatically.
You will  need Yahoo widgets for this widget to run. Get Yahoo widgets here.      yahoo-widgets-logo.png     This widget is written in Javascript and XML, two web technologies, which are used by the Yahoo widget runtime engine to display on your desktop. There are other engines but this widget is capable of running under the Yahoo widget engine only.     
 
Widget Startup

When the weather widget starts it will search via the internet for the default feed selected. If found, the Widget will display the weather information. The default location is London Heathrow. There may be a wait for 15-30 seconds whilst the widget first pulls in the weather feed. Note: if you do not have an internet connection the weather widget cannot obtain weather information.

Instructions for use

The weather indicators and controls of your widget are as shown above. The widget has a number of graphical controls. You can identify the function of each working component by hovering the mouse over each. A pop-up will show giving you a description.
Choosing the Metar data location

When you select to change your location a pop-up will appear giving you the option to type your location. Choose a location near to you that will be providing METAR weather data. For example in the South Coast of the UK you might choose Gatwick Airport. If you choose a local airport or aerodrome you are most likely to find a METAR weather feed.  If you know your nearest ICAO code then flick the location/ICAO switch to allow you to enter the four-letter code manually.

Once you are done click the SET switch or the magnifying glass, it will search for the icao code and if found return the possible locations. If you use a common location name then it is quite likely that a number of possible locations will be returned.

 
Right Click Menu

If you perform a right click on the widget it will show a pop up a menu that allows access to some extra functions that are not available on the graphical version of the widget. For example, you can access online help from this link as well as visit other links to allow satisfied users to kindly donate...

The Change Your Location option has already been described. The refresh option simply tells the widget to go away and get the latest weather data.

The Widget Preferences link shows the preferences screen allowing you to select show more configuration options. Some of the configuration changes that can be made can be made at both the front end (graphical) and back ends (preferences).

The about us link gives you a small graphical pop-up listing the designers.

The other links are generally self-explanatory, they will open pages on my website where you can obtain new versions of the widget, obtain assistance or help from the developer &c. You can reload the widget with an F5 keypress or reveal the widget's actual file location on disc.


 
 
Widget Preferences  - Settings

There is code behind the steampunk thermometer that allows the yahoo widget to be resized. It can now be made significantly smaller than the standard large size and it looks rather sweet in small form.

You can enable or disable  the 24hr clock or set the outer clock skin so that the widget's appearance suits your desktop.

The widget does make a sound or two when in operation. If you want to mute the sounds simply disable the sound. The Sound can be disabled on the front end by clicking on the sound control knob.

The widget does have a few simple animations when in operation. If you want to disable the animations simply use the drop-down to control it. The animation can also be enabled/disabled on the front end by clicking on the animation control knob.

The widget has tooltips on each object to provide a description of the item function. When you hove over the main glass a tooltip will pop up giving you a text summary of the weather. This tooltip can be configured to use the standard windows tooltips (smart but use the default font and are quite small to view) or the advanced tooltips which are bigger with a yellow post-it-style background.

When you have made the appropriate changes then click save or cancel. If you click the save button, the settings will be saved, the widget will then be restarted with the new settings.

  
Widget Preferences  - Pop-up Panel

The pop-up panel shows a summary of the current weather in text form, it can appear when you hover over the central widget area or it can permanently display as part of the widget. The pop-up panel font is best displayed using the Chanticleer Roman font which you can obtain here:

The panel can be embellished with a clock, chain and clipboard or you can have the simple panel by itself. The panel is moveable by itself.

 
Widget Preferences  - General

This section is for other settings. The interval between polling for new data, whether the widget makes a noise as it collects data (it has a visual prompt too) and a method for unlocking the widget should the locking pin not appear for some reason. 

 
Widget Preferences  - Language

There is code behind the steampunk thermometer that allows the yahoo widget text to be translated. We have supplied a Rumanian translation file and when the alternative language is selected the majority of the widget will be translated into the chosen language, in this case Romanian. Why Rumanian? The first version of this widget was written by Bogdan Irimia from the Rumanian Meteorological service. The subsequent versions have almost dispensed with Bogdan's original code but the translation remains.

The Yahoo widget engine has support for 15 languages built-in but it does not have support any more languages than the core 15. We have added support for further languages, all that is needed are the language translations for the English text contained within a file called Localizable.strings.

If you create a folder beneath \Resources with a two-digit name eg. fr and put your new language file in that folder, change the language selection code to 'fr' then that language will be displayed instead of the default language. The menus shown here show the translation file for Romanian in action. As you can see some of the menu options are not translate. These are the core widget menu options which cannot be translated except using the YWE! core languages.

All the translations have been sourced from the Google Translate service so please excuse any inaccuracies. Please feel free to amend the current Romanian language file and to provide any language files for alternative languages. We would welcome any assistance that you have to provide especially with language translation.


 
Widget Preferences  - Metar

Select the temperature unit, either fahrenheit or celsius as you require.

You can search by ICAO code or by location. If you know the ICAO codes for your location then you will need to set the Metar search switch to ICAO to allow codes to be entered instead of locations. Normal operation is to search for a city/location.

Note that regardless of the selection of imperial or metric measurements the windspeed will still be displayed in knots. Knots are 'not' an imperial measurement but a result of calculating angles of longitude. The end result is similar to a mile so it was called a nautical mile but has no actual relationship to an imperial mile.

  
Window Settings

The window level determines whether your widget sits on the desktop beneath your apps or on top as required.

Other settings like the ignore mouse  setting should be ignored.

The prevent dragging is a useful feature if you want the widget to occupy a permament space on your desktop.

The opacity setting causes the widget to become transparent, this has the effect of reducing the widget's impact on your desktop. It is a lovely effect that can allow the widget to blend into a desktop theme.

When you have made the appropriate changes then click save or cancel. If you click the save button, the settings will be saved, the widget will then be restarted with the new settings.

 

How does the Widget work?

The answer is that the weather information (Metar data) is provided by various organisations throughout the world by airports, weather stations &c. If there is Metar data feed near you and the widget can find it then your local weather will be displayed dynamically.

METAR is a format for reporting weather information. A METAR weather report is predominantly used by pilots in fulfillment of a part of a pre-flight weather briefing, and by meteorologists, who use aggregated METAR information to assist in weather forecasting.

Raw METAR is the most popular format in the world for the transmission of weather data. It is highly standardized through International Civil Aviation Organization (ICAO), which allows it to be understood throughout most of the world.

When an aerodrome completes a weather observation it is sent via AFTN to that country's collecting point. AFTN is a elderly worldwide steampunk-weather-gauge'teleprinter' messaging system mostly with a PC front ending it but in some parts of the world it will still be a teleprinter. The system automatically sends the information so it is displayed at airfield controller positions. As an example at Luton Airport (UK) the collecting point is either Heathrow CACC or the Met Office at Exeter. Here it is put into a Global Opmet bulletin and sent out again via AFTN (this bulletin contains several aerodromes together in the same bulletin). It is only at this point that it gets put onto the internet.

The information is published on the internet at several points by different providers, some charge for this service and for some it is free. It is regularly updated and can be relied upon to provide an accurate weather report. We use one of the free feeds. The report is provided in this format:

  <response xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XML-Schema-instance" version="1.2" xsi:noNamespaceSchemaLocation="http://aviationweather.gov/adds/schema/metar1_2.xsd",
  <request_index,207691845</request_index,
  <data_source name="metars" /,
  <request type="retrieve" /,
  <errors /,
  <warnings /,
  <time_taken_ms,5</time_taken_ms,
  <data num_results="1",

   <METAR,
      <raw_text,EGLL 181120Z AUTO 20005KT 140V270 9999 NCD 25/13 Q1022</raw_text,
      <station_id,EGLL</station_id,
      <observation_time,2016-07-18T11:20:00Z</observation_time,
      <latitude,51.48</latitude,
      <longitude,-0.45</longitude,
      <temp_c,25.0</temp_c,
      <dewpoint_c,13.0</dewpoint_c,
      <wind_dir_degrees,200</wind_dir_degrees,
      <wind_speed_kt,5</wind_speed_kt,
      <visibility_statute_mi,6.21</visibility_statute_mi,
      <altim_in_hg,30.177166</altim_in_hg,
      <quality_control_flags,
        <auto,TRUE</auto,
      </quality_control_flags,
      <sky_condition sky_cover="CLR" /,
      <flight_category,VFR</flight_category,
      <metar_type,METAR</metar_type,
      <elevation_m,24.0</elevation_m,
    </METAR,
  </data,
</response,

The widget regularly visits the feed to see if there is a new report. If there is then it downloads the information and interprets it and then displays it in the form you see above.
Reviews

I really hope you enjoy this widget, a lot of work has gone into it and it has given me great pleasure to provide a Steampunk widget that would be usable to a lot of other people. I don't ask for donations but can I please ask you to leave some positive feedback at yahoo widgets? Tens of thousands of people have downloaded and installed this widget but only a very few can be bothered to give feedback. By doing so, you make a lonely developer very happy!


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

 TBD
 // test with all weather codes
 // create new icons for exotic weather types
 // add TAFs
 //
 // romanian tooltip weather translations enable, rain and clouds
 // sometimes the cloud cover does not clear unless the widget is restarted, I think a variable needs to be cleared.
 */