//===========================================================================
// Steampunk weather widget 3.0.1
// Inspired by: Bogdan Irimia (bogdan@digitair.ro) whose digistation widget was the original code source.
// Steampunked by: Dean Beedell with serious code suggestions by Harry Whitfield (original code by Bogdan Irimia now replaced)
// Dean.beedell@lightquick.co.uk
//
// The functions in this code are unused in the widget, it is kept here as a reference source for interpreting the metar data
// it was partially converted from PHP to javascript and the debugging was started, curently incomplete as
// alternative XML sources for the weather feed were found.
//
//===========================================================================
//
//----------------------------------------------------------------------
//This function directs the examination of each group of the
//METAR. The problem with a METAR is that not all the groups have
//to be there. Some groups could be missing. Fortunately, the
//groups must be in a specific order. (This function also assumes that a
//METAR is well-formed, that is, no typographical mistakes.) This
//function uses a function variable to organize the sequence in which to
//decode each group. Each function checks to see if it can decode
//the current METAR part. If not, then the group pointer is advanced for
//the next function to try. If yes, the function decodes that part of
//the METAR and advances the METAR pointer and group pointer. (If the
//function can be called again to decode similar information, then the
//group pointer does not get advanced.)
//http://aviationweather.gov/adds/metars/?station_ids=egkk&std_trans=standard&chk_metars=on&hoursStr=most+recent+only&submitmet=Submit
//
//Aviation Digital Data Service (ADDS)
//Output produced by METARs form (1502 UTC 22 September 2013)
//found at http://aviationweather.gov/adds/metars/
//
//EGKK 261450Z 11004KT 070V150 CAVOK Q1017
//
/*
ereg - check the logic of $
global
static
array
pow
round
integer
strlen
strstr
PHPsubstr
' to "
multi-dimensional arrays removed
*/

  //var debug = 1;
  var $metar = 0;
  var $metarPtr = 0;
  var $group = 0;
  var $metarParts = explode(' ',$metar);
  var $speed;

//=====================================================================================
// this function is the one that calls the processes that deal with the metar data
//=====================================================================================
function display_metar($metarname)
{
  //update value
  $wxInfo["STATION"] = $metarname;
  $wxInfo["CONDITIONS"] = "";
  $wxInfo["AGE"] = "";

  process_metar($metarname,$wxInfo);

  if (empty($wxInfo["CONDITIONS"])) {
      $observed = ucwords($wxInfo["CLOUDS"]); }
        else {
      $observed = ucwords($wxInfo["CONDITIONS"]); }

  if ($wxInfo["TEMPONLY"] > 80) {
      $wxInfo["TEMP"] += " HI: " + $wxInfo["HEAT INDEX"]; }
  
  if ($wxInfo["TEMPONLY"] < 51 && $wxInfo["WIND"] != "calm") {
      $wxInfo["TEMP"] += " WC: " + $wxInfo["WIND CHILL"]; }
  
  if ($wxInfo["AGE"] < 120 && $wxInfo["AGE"] > -50) {
  //$metarlongnames[$metarname] + "\n" + $observed + "\n" +
  $wxInfo["TEMP"] + "\n" +
  $wxInfo["HUMIDITY"] + " RH\n" +
  $wxInfo["BAROMETER"] + "\n" +
  "Wind: " + $wxInfo["WIND"] + "\n" +
  $wxInfo["OBSERVED"] + "\n" +
  $wxInfo["AGE"] + " min ago" + chr(10); }

}


//=====================================================================================
// this function is the one that calls the processes that deal with the metar data
//=====================================================================================
function process_metar($metar, $wxInfo)
{
  if ($metar != "")
  {
    $metarParts = explode(' ',$metar);
    var part = $metarParts[$metarPtr];
    if (debug == 1) { print("%process_metar - $metarParts " +$metarParts)};
    if (debug == 1) { print("%process_metar - part " +part)};

    get_station(part,$wxInfo);
    //$metarPtr++;  // this is needed if get
    get_time(part ,$wxInfo);
    if (debug == 1) { print("%$wxInfo "+ $wxInfo)};
    get_station_type(part ,$wxInfo);
    if (debug == 1) { print("%$wxInfo "+ $wxInfo)};
    get_wind(part ,$wxInfo);
    if (debug == 1) { print("%$wxInfo "+ $wxInfo)};
    get_var_wind(part ,$wxInfo);
    get_visibility(part ,$wxInfo);
    get_runway(part ,$wxInfo);
    get_conditions(part ,$wxInfo);
    get_cloud_cover(part ,$wxInfo);
    get_temperature(part ,$wxInfo);
    get_altimeter(part ,$wxInfo);
  }
  else
    $wxInfo["ERROR"] = "Data not available";
}
//=====================
//End function
//=====================
//=====================================================================================
// Ignore station code. Script assumes this matches requesting
// $station. This function is never called. It is here for
// completeness of documentation.
//=====================================================================================
function get_station(part, $wxInfo)
{
  //EGKK 261450Z 11004KT 070V150 CAVOK Q1017
  //EGKK
  part = $metarParts[$metarPtr];
  if (debug == 1) { print("%get_station - part " +part)};
  if (strlen(part) == 4 && $group == 0)
  {
    $group++;
    $metarPtr++;
     if (debug == 1) { print("%get_station - station found and processed")};
  } else {
     if (debug == 1) { print("%get_station - station not found in the raw data - skipping to the next field")};
  }
}
//=====================
//End function
//=====================

//=====================================================================================
// function to get time - does nothing with it. It is here for
// completeness of documentation.
//=====================================================================================
function get_time(part,   $wxInfo)
{
  //EGKK 261450Z 11004KT 070V150 CAVOK Q1017
  //     221450Z
// Ignore observation time. This information is found in the
// first line of the NWS file.
// Format is ddhhmmZ where dd = day, hh = hours, mm = minutes
// in UTC time.
  part = $metarParts[$metarPtr];
  if (debug == 1) { print("%get_time - part " +part)};
  if (PHPsubstr(part,-1) == "Z")
  {
     //gmmktime(14, 10, 2, 2, 1, 2008)
     $utc = gmmktime ( PHPsubstr(part, 2, 2), PHPsubstr(part, 4, 2), 0, gmdate("m") ,PHPsubstr(part, 0, 2), gmdate("Y"));

     if (debug == 1) { print("%PHPsubstr(part, 2, 2) " + PHPsubstr(part, 2, 2))};
     if (debug == 1) { print("%$utc " + $utc)};

     //set_time_data($utc,$wxInfo);
     $metarPtr++;
     $group++;
     if (debug == 1) { print("%get_time - found and processed")};
  } else {
     if (debug == 1) { print("%get_time - time not found in the raw data - skipping to the next field")};
  }
}
//=====================
//End function
//=====================

//=====================================================================================
//  function to get the station type
//=====================================================================================
function get_station_type(part,   $wxInfo)
{
  // Ignore station type if present.
  part = $metarParts[$metarPtr];
  if (debug == 1) { print("%get_station_type - part " +part)};
  if (part == "AUTO" || part == "COR")
  {
    $metarPtr++;
    if (debug == 1) { print("%get_station_type - found and ignored")};
  } else {
    if (debug == 1) { print("%get_station_type - station type not found in the raw data, not needed - skipping to the next field ")};
  }
  $group++;
}
//=====================
//End function
//=====================

//=====================================================================================
//  function to get the wind direction and speed
//=====================================================================================
function get_wind(part,$wxInfo)
{
  //EGKK 261450Z 11004KT 070V150 CAVOK Q1017
  //             23004KT
// search for VRB (variable wind <6 knots) or directional wind > 7knots
// Format is dddssKT where ddd = degrees from North, ss = speed,
// KT for knots  or dddssGggKT where G stands for gust and gg = gust
// speed. (ss or gg can be a 3-digit number.)
// KT can be replaced with MPS for meters per second or KMH for
// kilometers per hour.

  var $direction = "";
  var $pieces = new Array();
  part = $metarParts[$metarPtr];
  if (debug == 1) { print("%get_wind - part " +part)};
  //if (ereg('^([0-9G]{5,10}|VRB[0-9]{2,3})(KT|MPS|KMH)$',part,$pieces))
  var exp = /^([0-9G]{5,10}|VRB[0-9]{2,3})(KT|MPS|KMH)$/gi;

  if (part.match(exp))
  {
    if (debug == 1) { print("%get_wind - found and processed")}
    $unit = part.match(/(KT|MPS|KMH)$/gi);      // get the unit

    if (debug == 1) { print("%get_wind - $unit " +$unit)};

    if (part == "00000")
    {
      $wxInfo["WIND"] = "calm";  // no wind
    } else {
      //ereg('([0-9]{3}|VRB)([0-9]{2,3})G?([0-9]{2,3})?',part,$pieces);
      //check for wind variability
      var exp = /([0-9]{3}|VRB)([0-9]{2,3})G?([0-9]{2,3})?/;
      var exp = /([0-9]{2,3})?/;
      //23004
      if (part.match(exp))
      {
        //first three digits direction in degrees
        var exp = /(VRB)/;
        if (part.match(exp))
        {
          if (debug == 1) { print("%get_wind - part " +part)};
          $direction = "varies";
          if (debug == 1) { print("%get_wind - $direction " +$direction)};
        } else {
          if (debug == 1) { print("%get_wind - no wind direction found")};
        }
        //three potential digits before the units is the speed
        var unitLocation = part.indexOf($unit);
        if (debug == 1) { print("%get_wind_speed - unitLocation " +unitLocation)};
        if (part.match(exp))
        {
          if (debug == 1) { print("%get_wind_speed - part " +part)};
          //if unit start KT position >= 8 indicates gust speed greater than 100mph
          if (unitLocation >= 8) {
            $speed = part.substring(3,6);
          } else {
            $speed = part.substring(3,5);
          }

          if (debug == 1) { print("%get_wind_speed - $speed " +$speed)};
        }

        var exp = /(G?)/;
        if (part.match(exp))
        {
          //if unit start KT position >= 9 indicates gust speed greater than 100mph
          if (unitLocation >= 9) {
           $speed = part.substring(6,9);
          } else {
           $speed = part.substring(6,8);
          }
          if (debug == 1) { print("%get_wind_gust - part " +part)};
          $gust = part.substring(3,5);
          if (debug == 1) { print("%get_wind_gust - $gust " +$gust)};
        }

      } else {
        if (debug == 1) { print("%here 2 ")};
        $angle = part.substring(0,3);
        if (debug == 1) { print("%get_wind - $angle " +$angle)};

        $compass = array("N","NNE","NE","ENE","E","ESE","SE","SSE",
                         "S","SSW","SW","WSW","W","WNW","NW","NNW");
        $direction = $compass[Math.round($angle / 22.5) % 16];
      }
      if ($gust == 0)
      {
        $gust = "";
      } else {
        $gust = ", gusting to " + speed($pieces[3], $unit);
      }
      $wxInfo["WIND"] = speed($speed, $unit) + " " + $direction + $gust;

    }
    $metarPtr++;
  } else {
    if (debug == 1) { print("%get_wind - wind type not found in the raw data - skipping to the next field ")};
  }
  $group++;
}
//=====================
//End function
//=====================

//=====================================================================================
//  function to Convert wind speed into miles per hour.
//=====================================================================================
  function speed($fff, $unit)
  {
  //EGKK 261450Z 11004KT 070V150 CAVOK Q1017

    // Convert wind speed into miles per hour.
    // Some other common conversion factors (to 6 significant digits):
    //   1 mi/hr = 1.15080 knots  = 0.621371 km/hr = 2.23694 m/s
    //   1 ft/s  = 1.68781 knots  = 0.911344 km/hr = 3.28084 m/s
    //   1 knot  = 0.539957 km/hr = 1.94384 m/s
    //   1 km/hr = 1.852 knots  = 3.6 m/s
    //   1 m/s   = 0.514444 knots = 0.277778 km/s
    if (debug == 1) { print ("***** speed " + $fff)};

    if ($unit == "KT")
    {
      $speed = 1.1508 * $fff;    // from knots
    } else if ($unit == "MPS") {
      $speed = 2.23694 * $fff;   // from meters per second
    } else {
      $speed = 0.621371 * $fff;  // from km per hour
    }
    if (debug == 1) { print ("***** speed " + $speed)};
    $speedkph = $speed / 0.621371;
    if ($measureType=="imperial")
    {
      $speed ="" + Math.round($speed) + " mph";
    } else {
      $speed = "" + Math.round($speedkph) + " km/h";
    }
    if (debug == 1) { print("%speed - being processed")};
    if (debug == 1) { print("%speed - "+$speed )};
    return $speed;
  }
//=====================
//End function
//=====================
//=====================================================================================
//  function to find wind direction
//=====================================================================================
function get_var_wind(part,   $wxInfo)
{
  // Ignore variable wind direction information if present.
  // Format is fffVttt where V stands for varies from fff
  // degrees to ttt degrees.
    part = $metarParts[$metarPtr];

  //if (ereg('([0-9]{3})V([0-9]{3})',part,$pieces))
  var exp = /([0-9]{3})V([0-9]{3})/;
  if((part.match(exp)))
  {
    $pieces = part.match(exp);
    $metarPtr++;
    if (debug == 1) { print("%get_var_wind - found and processed")};
  }
  $group++;
  if (debug == 1) { print("%get_var_wind - part " +part)};
}
//=====================
//End function
//=====================
//=====================================================================================
//  function to get visibility information
//=====================================================================================
function get_visibility(part,   $wxInfo) {
// This function will be called a
// second time if visibility is limited to an integer mile plus a
// fraction part.
// Format is mmSM for mm = statute miles, or m n/dSM for m = mile
// and n/d = fraction of a mile, or just a 4-digit number nnnn (with
// leading zeros) for nnnn = meters.
  part = $metarParts[$metarPtr];
  var $integerMile = "";
  var exp = "/^([0-9]{4})$/";
  if (strlen(part) == 1)
  {
    // visibility is limited to a whole mile plus a fraction part
    $integerMile = part + " ";
    $metarPtr++;
  }
  else if (PHPsubstr(part,-2) == "SM")
  {
    // visibility is in miles
    part = PHPsubstr(part,0,part.length()-2);
    if (PHPsubstr(part,0,1) == "M")
    {
      $prefix = "less than ";
      part = PHPsubstr(part, 1);
    }
    else
      $prefix = "";

    if ($measureType == "imperial")
    {
      //if (($integerMile == '' && ereg('[/]',part,$pieces)) || part == '1')
      var exp = "/[/]/";
      if(($integerMile == "" && (part.match(exp)))  || part == "1")
      {
        $unit = " mile";
      } else {
        $unit = " miles";
      }
      $pieces = part.match(exp);
    }
    $kmVis = Math.round( part * 1.6 );
    if ($measureType=="imperial")
    {
      $wxInfo["VISIBILITY"] = $prefix + $integerMile +
                              " part $unit ($kmVis km)";
    } else {
      $wxInfo["VISIBILITY"] = "$kmVis km";
    }
    $metarPtr++;
    $group++;
  }
  else if (PHPsubstr(part,-2) == "KM")
  {
    // unknown (Reported by NFFN in Fiji)
    $metarPtr++;
    $group++;
  }
  //else if (ereg('^([0-9]{4})$',part,$pieces))
  else if ((part.match(exp)))
  {
    $pieces = part.match(exp);
    // visibility is in meters
    $distance = Math.round(part/ 621.4, 1);      // convert to miles
    if ($distance > 5) {
      $distance = Math.round($distance);
    }
    if ($distance <= 1)  {
      $unit = " mile";
    } else {
      $unit = " miles";
    }
    $wxInfo["VISIBILITY"] = $distance + $unit;
    $metarPtr++;
    $group++;
  }
  else if (part == "CAVOK")
  {
    // good weather
    $wxInfo["VISIBILITY"] = "greater than 7 miles";  // or 10 km
    $wxInfo["CONDITIONS"] = "";
    $wxInfo["CLOUDS"] = "clear skies";
    $metarPtr++;
    $group += 4;  // can skip the next 3 groups
  } else {
    $group++;
  }
  if (debug == 1) { print("%get_visibility - part " +part)};
}
//=====================
//End function
//=====================
//=====================================================================================
//  function to find and Ignore runway information if present
//=====================================================================================
function get_runway(part,   $wxInfo)
{
  // Ignore runway information if present. Maybe called a second time.
  // Format is Rrrr/vvvvFT where rrr = runway number and
  // vvvv = visibility in feet.
  part = $metarParts[$metarPtr];
  if (PHPsubstr(part,0,1) == "R" && PHPsubstr(part,0,2) != "RA" )
  {
    $metarPtr++;
    if (debug == 1) { print("% - found and processed")};
  } else {
    $group++;
    if (debug == 1) { print("% - found and processed")};
  }
  if (debug == 1) { print("%get_runway - part " +part)};
}
//=====================
//End function
//=====================

//=====================================================================================
//  function to decode current weather conditions
//=====================================================================================
function get_conditions(part,   $wxInfo)
{
// This function maybe called several
// times to decode all conditions. To learn more about weather condition
// codes, visit section 12.6.8 - Present Weather Group of the Federal
// Meteorological Handbook No. 1 at
// www.nws.noaa.gov/oso/oso1/oso12/fmh1/fmh1ch12.htm
  part = $metarParts[$metarPtr];
  var $wxCode = new Array();
   $wxCode.VC = "nearby",
   $wxCode.MI = "shallow",
   $wxCode.PR = "partial",
   $wxCode.BC = "patches of",
   $wxCode.DR = "drifting",
   $wxCode.BL = "blowing",
   $wxCode.SH = "showers",
   $wxCode.TS = "thunderstorm",
   $wxCode.FZ = "freezing",
   $wxCode.DZ = "drizzle",
   $wxCode.RA = "rain",
   $wxCode.SN = "snow",
   $wxCode.SG = "snow grains",
   $wxCode.IC = "ice crystals",
   $wxCode.PE = "ice pellets",
   $wxCode.GR = "hail",
   $wxCode.GS = "small hail",  // and/or snow pellets
   $wxCode.UP = "unknown",
   $wxCode.BR = "mist",
   $wxCode.FG = "fog",
   $wxCode.FU = "smoke",
   $wxCode.VA = "volcanic ash",
   $wxCode.DU = "widespread dust",
   $wxCode.SA = "sand",
   $wxCode.HZ = "haze",
   $wxCode.PY = "spray",
   $wxCode.PO = "dustdevils",
   $wxCode.SQ = "strong winds",
   $wxCode.FC = "tornado",
   $wxCode.SS = "sandstorm/duststorm";
    //a dollar sign ($) at the end of a regular expression means that it must match the end of the string
    //if (ereg('^(-|\+|VC)?(TS|SH|FZ|BL|DR|MI|BC|PR|RA|DZ|SN|SG|GR|GS|PE|IC|UP|BR|FG|FU|VA|DU|SA|HZ|PY|PO|SQ|FC|SS|DS)+$',part,$pieces)) {
    var exp = "/^(TS|SH|FZ|BL|DR|MI|BC|PR|RA|DZ|SN|SG|GR|GS|PE|IC|UP|BR|FG|FU|VA|DU|SA|HZ|PY|PO|SQ|FC|SS|DS)+$/";
    if (part.match(exp))
    {
        $pieces = part.match(exp);
        if ($wxInfo["CONDITIONS"].length == 0) {
          $join = "";
        } else {
          $join = " && ";
        }
        if (PHPsubstr(part,0,1) == "-") {
            $prefix = "light ";
            part = PHPsubstr(part,1);
        } else if (PHPsubstr(part,0,1) == "+") {
            $prefix = "heavy ";
            part = PHPsubstr(part,1);
        } else {
          $prefix = "";  // moderate conditions have no descriptor
        }
        $wxInfo["CONDITIONS"] += $join + $prefix;
        // The 'showers' code 'SH' is moved behind the next 2-letter code to make the English translation read better.
        if (PHPsubstr(part,0,2) == "SH")
        {
                 part = PHPsubstr(part,2,2) + PHPsubstr(part,0,2)+ PHPsubstr(part, 4);
        }
        while ($code = PHPsubstr(part,0,2))
        {
            if (PHPsubstr(part,0,4) == "TSRA") {
                $wxInfo["CONDITIONS"] += "thunderstorm" + " ";
                part = PHPsubstr(part,4);
            } else {
                $wxInfo["CONDITIONS"] += $wxCode[$code] + " ";
                part = PHPsubstr(part,2);
            }
            $metarPtr++;
            if (debug == 1) { print("% - found and processed")};            
        }
    } else {
        $group++;
    }
  if (debug == 1) { print("%get_conditions - part " +part)};
}
//=====================
//End function
//=====================

//=====================================================================================
//  function to decode cloud cover information
//=====================================================================================
function get_cloud_cover(part,   $wxInfo)
{
// Decodes cloud cover information. This function maybe called several times
// to decode all cloud layer observations. Only the last layer is saved.
// Format is SKC or CLR for clear skies, or cccnnn where ccc = 3-letter
// code and nnn = altitude of cloud layer in hundreds of feet. 'VV' seems
// to be used for very low cloud layers. (Other conversion factor:
// 1 m = 3.28084 ft)
  part = $metarParts[$metarPtr];

  var $cloudCode = new Array();
    $cloudCode.SKC = "clear skies",
    $cloudCode.CLR = "clear skies",
    $cloudCode.FEW = "partly cloudy",
    $cloudCode.SCT = "scattered clouds",
    $cloudCode.BKN = "mostly cloudy",
    $cloudCode.OVC = "overcast",
    $cloudCode.VV  = "vertical visibility";
    //CAVOK
//    (1) there are no clouds below 5000 feet above aerodrome level (AAL) or minimum sector altitude (whichever is higher) and no cumulonimbus or towering cumulus; (2) visibility is at least 10 kilometres (6 statute miles) or more; and (3) no current or forecast significant weather such as precipitation, thunderstorms, shallow fog or low drifting snow

  if (part == "SKC" || part == "CLR")
  {
    $wxInfo["CLOUDS"] = $cloudCode[part];
    $metarPtr++;
    $group++;
    if (debug == 1) { print("% - found and processed")};
  }
  else
  {
    //if (ereg('^([A-Z]{2,3})([0-9]{3})',part,$pieces))
    var exp = "/^([A-Z]{2,3})([0-9]{3})/";
    if((part.match(exp)))
    {
      $pieces = part.match(exp);
      // codes for CB and TCU are ignored
      $wxInfo["CLOUDS"] = $cloudCode[$pieces[1]];
      if ($pieces[1] == "VV")
      {
        $altitude = parseInt( 100 * $pieces[2]);  // units are feet
        $wxInfo["CLOUDS"] += " to $altitude ft";
      }
      $metarPtr++;
    }
    else
    {
      $group++;
    }
    if (debug == 1) { print("% - found and processed")};
  }
  if (debug == 1) { print("%get_cloud_cover - part " +part)};
}
//=====================
//End function
//=====================

//=====================================================================================
//  function to decode temperature information
//=====================================================================================
//-------------------------------------------------------------------------
// Decodes temperature and dew point information. Relative humidity is
// calculated. Also, depending on the temperature, Heat Index or Wind
// Chill Temperature is calculated.
// Format is tt/dd where tt = temperature and dd = dew point temperature.
// All units are in Celsius. A 'M' preceeding the tt or dd indicates a
// negative temperature. Some stations do not report dew point, so the
// format is tt/ or tt/XX.
function get_temperature(part,   $wxInfo)
{
  part = $metarParts[$metarPtr];

  //if (ereg('^(M?[0-9]274)/(M?[0-9]274|[X]274)?$',part,$pieces))
  var exp = "/^(M?[0-9]274)/(M?[0-9]274|[X]274)?$/";
  if(part.match(exp))
  {
    $tempC = parseInt( strtr($pieces[1], "M", "-"));
    $tempF = Math.round(1.8 * $tempC + 32);
    $wxInfo["TEMPONLY"] = $tempF;
    $wxInfo["TEMP"] = $tempF + "°F";
    get_wind_chill($tempF, $wxInfo);
    if ($pieces[2].length != 0 && $pieces[2] != "XX")
    {
      $dewC = parseInt( strtr($pieces[2], "M", "-"));
      $dewF = Math.round(1.8 * $dewC + 32);
      if ($measureType == "imperial")
          $wxInfo["DEWPT"] = $dewF + "F (" + $dewC + "C)";
      else
          $wxInfo["DEWPT"] = $dewC + "C";
      $rh = Math.round(100 * Math.pow((112 - (0.1 * $tempC) + $dewC) /
                                                (112 + (0.9 * $tempC)), 8));
      $wxInfo["HUMIDITY"] = $rh + "%";
      get_heat_index($tempF, $rh, $wxInfo);
    }
    $metarPtr++;
    $group++;
  }
  else
  {
    $group++;
  }
  if (debug == 1) { print("%get_temperature - part " +part)};
}
//=====================
//End function
//=====================

//=====================================================================================
//  function to Calculate Heat Index based on temperature
//=====================================================================================
  function get_heat_index($tempF, $rh, $wxInfo)
  {
    // Calculate Heat Index based on temperature in F and relative
    //humidity (65 = 65%)
  part = $metarParts[$metarPtr];
    if ($tempF > 79)
    {
      $hiF = -42.379 + 2.04901523 * $tempF + 10.14333127 *
             $rh - 0.22475541 * $tempF * $rh;
      $hiF += -0.00683783 * Math.pow($tempF, 2) - 0.05481717 * Math.pow($rh, 2);
      $hiF += 0.00122874 * Math.pow($tempF, 2) * $rh + 0.00085282 * $tempF
             * Math.pow($rh, 2);
      $hiF += -0.00000199 * Math.pow($tempF, 2) * Math.pow($rh, 2);
      $hiF = Math.round($hiF);
      if ($hiF < $tempF) { $hiF = $tempF; }
      $wxInfo["HEAT INDEX"] = $hiF+ "°F";
    }
      if (debug == 1) { print("%get_heat_index - part " +part)};
  }
//=====================
//End function
//=====================

//=====================================================================================
//  function to Calculate Wind Chill Temperature based on temperature and wind speed
//=====================================================================================
  function get_wind_chill($tempF, $wxInfo)
  {
  part = $metarParts[$metarPtr];

    // Calculate Wind Chill Temperature based on temperature in F and
    // wind speed in miles per hour
    if ($tempF < 51 && $wxInfo["WIND"] != "calm")
    {
      $pieces = explode(' ', $wxInfo['WIND']);
      //var myarr = $wxInfo["WIND"].split(" ");
      //var $pieces = myarr[myarr.length-2] + ":" + myarr[myarr.length-1];

      $windspeed = parseInt( $pieces[0]); // wind speed must be in mph

        $chillF = 35.74 + 0.6215 * $tempF - 35.75 * Math.pow($windspeed, 0.16) +
                  0.4275 * $tempF * Math.pow($windspeed, 0.16);
        $chillF = Math.round($chillF);
        if ($chillF > $tempF) { $chillF = $tempF; }
        $wxInfo["WIND CHILL"] = $chillF + "°F";

    }
    if (debug == 1) { print("%get_wind_chill - part " +part)};
  }
//=====================
//End function
//=====================

//=====================================================================================
//  function to decode altimeter or barometer information.
//=====================================================================================
function get_altimeter(part,   $wxInfo)
{
// Format is Annnn where nnnn represents a real number as nn.nn in
// inches of Hg,
// or Qpppp where pppp = hectoPascals.
// Some other common conversion factors:
//   1 millibar = 1 hPa
//   1 in Hg = 0.02953 hPa
//   1 mm Hg = 25.4 in Hg = 0.750062 hPa
//   1 lb/sq in = 0.491154 in Hg = 0.014504 hPa
//   1 atm = 0.33421 in Hg = 0.0009869 hPa
//
  part = $metarParts[$metarPtr];
  //if (ereg('^(A|Q)([0-9]{4})',part,$pieces))
  var exp = "/^(A|Q)([0-9]{4})$/";
  if((part.match(exp)))
  {
    $pieces = part.match(exp);
    if ($pieces[1] == "A")
    {
      $pressureIN = PHPsubstr($pieces[2],0,2) + "." + PHPsubstr($pieces[2],2);
      // units are inches Hg, converts to hectoPascals
      $pressureHPA = Math.round($pressureIN / 0.02953);
    }
    else
    {
      $pressureHPA = parseInt( $pieces[2]);        // units are hectoPascals
      $pressureIN = Math.round(0.02953 * $pressureHPA,2);  // convert to inches Hg
    }
    $wxInfo["BAROMETER"] = "$pressureIN in.";
    $metarPtr++;
    $group++;
  }
  else
  {
    $group++;
  }
  if (debug == 1) { print("%get_altimeter - part " +part)};
}
//=====================
//End function
//=====================

//=====================================================================================
//  function to provide gmdate function in javascript
//=====================================================================================
function gmdate (format, timestamp) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // +   input by: Alex
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // -    depends on: date
  // *     example 1: gmdate('H:m:s \\m \\i\\s \\m\\o\\n\\t\\h', 1062402400); // Return will depend on your timezone
  // *     returns 1: '07:09:40 m is month'
  var dt = typeof timestamp === "undefined" ? new Date() : // Not provided
      typeof timestamp === "object" ? new Date(timestamp) : // Javascript Date()
      new Date(timestamp * 1000); // UNIX timestamp (auto-convert to int)
  timestamp = Date.parse(dt.toUTCString().slice(0, -4)) / 1000;
  if (debug == 1) { print(timestamp)};
  return this.Date(format, timestamp);
}
//=====================
//End function
//=====================


//=====================================================================================
//  function to provide PHP substr function in javascript
//=====================================================================================
function PHPsubstr (str, start, len) {
  // Returns part of a string
  //
  // version: 909.322
  // discuss at: http://phpjs.org/functions/substr
  // +     original by: Martijn Wieringa
  // +     bugfixed by: T.Wild
  // +      tweaked by: Onno Marsman
  // +      revised by: Theriault
  // +      improved by: Brett Zamir (http://brett-zamir.me)
  // %    note 1: Handles rare Unicode characters if 'unicode.semantics' ini (PHP6) is set to 'on'
  // *       example 1: substr('abcdef', 0, -1);
  // *       returns 1: 'abcde'
  // *       example 2: substr(2, 0, -6);
  // *       returns 2: false
  // *       example 3: ini_set('unicode.semantics',  'on');
  // *       example 3: substr('a\uD801\uDC00', 0, -1);
  // *       returns 3: 'a'
  // *       example 4: ini_set('unicode.semantics',  'on');
  // *       example 4: substr('a\uD801\uDC00', 0, 2);
  // *       returns 4: 'a\uD801\uDC00'
  // *       example 5: ini_set('unicode.semantics',  'on');
  // *       example 5: substr('a\uD801\uDC00', -1, 1);
  // *       returns 5: '\uD801\uDC00'
  // *       example 6: ini_set('unicode.semantics',  'on');
  // *       example 6: substr('a\uD801\uDC00z\uD801\uDC00', -3, 2);
  // *       returns 6: '\uD801\uDC00z'
  // *       example 7: ini_set('unicode.semantics',  'on');
  // *       example 7: substr('a\uD801\uDC00z\uD801\uDC00', -3, -1)
  // *       returns 7: '\uD801\uDC00z'
  // Add: (?) Use unicode.runtime_encoding (e.g., with string wrapped in "binary" or "Binary" class) to
  // allow access of binary (see file_get_contents()) by: charCodeAt(x) & 0xFF (see https://developer.mozilla.org/En/Using_XMLHttpRequest ) or require conversion first?
  var i = 0,
    allBMP = true,
    es = 0,
    el = 0,
    se = 0,
    ret = '';
  str += '';
  var end = str.length;

  // BEGIN REDUNDANT
  this.php_js = this.php_js || {};
  this.php_js.ini = this.php_js.ini || {};
  // END REDUNDANT
  switch ((this.php_js.ini['unicode.semantics'] && this.php_js.ini['unicode.semantics'].local_value.toLowerCase())) {
  case 'on':
    // Full-blown Unicode including non-Basic-Multilingual-Plane characters
    // strlen()
    for (i = 0; i < str.length; i++) {
      if (/[\uD800-\uDBFF]/.test(str.charAt(i)) && /[\uDC00-\uDFFF]/.test(str.charAt(i + 1))) {
        allBMP = false;
        break;
      }
    }

    if (!allBMP) {
      if (start < 0) {
        for (i = end - 1, es = (start += end); i >= es; i--) {
          if (/[\uDC00-\uDFFF]/.test(str.charAt(i)) && /[\uD800-\uDBFF]/.test(str.charAt(i - 1))) {
            start--;
            es--;
          }
        }
      } else {
        var surrogatePairs = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
        while ((surrogatePairs.exec(str)) != null) {
          var li = surrogatePairs.lastIndex;
          if (li - 2 < start) {
            start++;
          } else {
            break;
          }
        }
      }

      if (start >= end || start < 0) {
        return false;
      }
      if (len < 0) {
        for (i = end - 1, el = (end += len); i >= el; i--) {
          if (/[\uDC00-\uDFFF]/.test(str.charAt(i)) && /[\uD800-\uDBFF]/.test(str.charAt(i - 1))) {
            end--;
            el--;
          }
        }
        if (start > end) {
          return false;
        }
        return str.slice(start, end);
      } else {
        se = start + len;
        for (i = start; i < se; i++) {
          ret += str.charAt(i);
          if (/[\uD800-\uDBFF]/.test(str.charAt(i)) && /[\uDC00-\uDFFF]/.test(str.charAt(i + 1))) {
            se++; // Go one further, since one of the "characters" is part of a surrogate pair
          }
        }
        return ret;
      }
      break;
    }
    // Fall-through
  case 'off':
    // assumes there are no non-BMP characters;
    //    if there may be such characters, then it is best to turn it on (critical in true XHTML/XML)
  default:
    if (start < 0) {
      start += end;
    }
    end = typeof len === 'undefined' ? end : (len < 0 ? len + end : len + start);
    // PHP returns false if start does not fall within the string.
    // PHP returns false if the calculated end comes before the calculated start.
    // PHP returns an empty string if start and end are the same.
    // Otherwise, PHP returns the portion of the string from start to end.
    return start >= str.length || start < 0 || start > end ? !1 : str.slice(start, end);
  }
  return undefined; // Please Netbeans
}
//=====================
//End function
//=====================

//=====================================================================================
//  function to decode altimeter or barometer information.
//=====================================================================================
function strtr (str, from, to) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // +      input by: uestla
  // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +      input by: Alan C
  // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +      input by: Taras Bogach
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // +      input by: jpfle
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // -   depends on: krsort
  // -   depends on: ini_set
  // *     example 1: $trans = {'hello' : 'hi', 'hi' : 'hello'};
  // *     example 1: strtr('hi all, I said hello', $trans)
  // *     returns 1: 'hello all, I said hi'
  // *     example 2: strtr('äaabaåccasdeöoo', 'äåö','aao');
  // *     returns 2: 'aaabaaccasdeooo'
  // *     example 3: strtr('ääääääää', 'ä', 'a');
  // *     returns 3: 'aaaaaaaa'
  // *     example 4: strtr('http', 'pthxyz','xyzpth');
  // *     returns 4: 'zyyx'
  // *     example 5: strtr('zyyx', 'pthxyz','xyzpth');
  // *     returns 5: 'http'
  // *     example 6: strtr('aa', {'a':1,'aa':2});
  // *     returns 6: '2'
  var fr = '',
    i = 0,
    j = 0,
    lenStr = 0,
    lenFrom = 0,
    tmpStrictForIn = false,
    fromTypeStr = '',
    toTypeStr = '',
    istr = '';
  var tmpFrom = [];
  var tmpTo = [];
  var ret = '';
  var match = false;

  // Received replace_pairs?
  // Convert to normal from->to chars
  if (typeof from === 'object') {
    tmpStrictForIn = this.ini_set('phpjs.strictForIn', false); // Not thread-safe; temporarily set to true
    from = this.krsort(from);
    this.ini_set('phpjs.strictForIn', tmpStrictForIn);

    for (fr in from) {
      if (from.hasOwnProperty(fr)) {
        tmpFrom.push(fr);
        tmpTo.push(from[fr]);
      }
    }

    from = tmpFrom;
    to = tmpTo;
  }

  // Walk through subject and replace chars when needed
  lenStr = str.length;
  lenFrom = from.length;
  fromTypeStr = typeof from === 'string';
  toTypeStr = typeof to === 'string';

  for (i = 0; i < lenStr; i++) {
    match = false;
    if (fromTypeStr) {
      istr = str.charAt(i);
      for (j = 0; j < lenFrom; j++) {
        if (istr == from.charAt(j)) {
          match = true;
          break;
        }
      }
    } else {
      for (j = 0; j < lenFrom; j++) {
        if (str.substr(i, from[j].length) == from[j]) {
          match = true;
          // Fast forward
          i = (i + from[j].length) - 1;
          break;
        }
      }
    }
    if (match) {
      ret += toTypeStr ? to.charAt(j) : to[j];
    } else {
      ret += str.charAt(i);
    }
  }

  return ret;
}
//=====================
//End function
//=====================

function count (mixed_var, mode) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +      input by: Waldo Malqui Silva
  // +   bugfixed by: Soren Hansen
  // +      input by: merabi
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // +   bugfixed by: Olivier Louvignes (http://mg-crea.com/)
  // *     example 1: count([[0,0],[0,-4]], 'COUNT_RECURSIVE');
  // *     returns 1: 6
  // *     example 2: count({'one' : [1,2,3,4,5]}, 'COUNT_RECURSIVE');
  // *     returns 2: 6
  var key, cnt = 0;

  if (mixed_var === null || typeof mixed_var === 'undefined') {
    return 0;
  } else if (mixed_var.constructor !== Array && mixed_var.constructor !== Object) {
    return 1;
  }

  if (mode === 'COUNT_RECURSIVE') {
    mode = 1;
  }
  if (mode != 1) {
    mode = 0;
  }

  for (key in mixed_var) {
    if (mixed_var.hasOwnProperty(key)) {
      cnt++;
      if (mode == 1 && mixed_var[key] && (mixed_var[key].constructor === Array || mixed_var[key].constructor === Object)) {
        cnt += this.count(mixed_var[key], 1);
      }
    }
  }

  return cnt;
}


function empty (mixed_var) {
  // Checks if the argument variable is empty
  // undefined, null, false, number 0, empty string,
  // string "0", objects without properties and empty arrays
  // are considered empty
  //
  // http://kevin.vanzonneveld.net
  // +   original by: Philippe Baumann
  // +      input by: Onno Marsman
  // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +      input by: LH
  // +   improved by: Onno Marsman
  // +   improved by: Francesco
  // +   improved by: Marc Jansen
  // +      input by: Stoyan Kyosev (http://www.svest.org/)
  // +   improved by: Rafal Kukawski
  // *     example 1: empty(null);
  // *     returns 1: true
  // *     example 2: empty(undefined);
  // *     returns 2: true
  // *     example 3: empty([]);
  // *     returns 3: true
  // *     example 4: empty({});
  // *     returns 4: true
  // *     example 5: empty({'aFunc' : function () { alert('humpty'); } });
  // *     returns 5: false
  var undef, key, i, len;
  var emptyValues = [undef, null, false, 0, "", "0"];

  for (i = 0, len = emptyValues.length; i < len; i++) {
    if (mixed_var === emptyValues[i]) {
      return true;
    }
  }

  if (typeof mixed_var === "object") {
    for (key in mixed_var) {
      // TODO: should we check for own properties only?
      //if (mixed_var.hasOwnProperty(key)) {
      return false;
      //}
    }
    return true;
  }

  return false;
}
function ucwords (str) {
  // http://kevin.vanzonneveld.net
  // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
  // +   improved by: Waldo Malqui Silva
  // +   bugfixed by: Onno Marsman
  // +   improved by: Robin
  // +      input by: James (http://www.james-bell.co.uk/)
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // *     example 1: ucwords('kevin van  zonneveld');
  // *     returns 1: 'Kevin Van  Zonneveld'
  // *     example 2: ucwords('HELLO WORLD');
  // *     returns 2: 'HELLO WORLD'
  return (str + '').replace(/^([a-z\u00E0-\u00FC])|\s+([a-z\u00E0-\u00FC])/g, function ($1) {
    return $1.toUpperCase();
  });
}


function chr (codePt) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: chr(75);
  // *     returns 1: 'K'
  // *     example 1: chr(65536) === '\uD800\uDC00';
  // *     returns 1: true
  if (codePt > 0xFFFF) { // Create a four-byte string (length 2) since this code point is high
    //   enough for the UTF-16 encoding (JavaScript internal use), to
    //   require representation with two surrogates (reserved non-characters
    //   used for building other characters; the first is "high" and the next "low")
    codePt -= 0x10000;
    return String.fromCharCode(0xD800 + (codePt >> 10), 0xDC00 + (codePt & 0x3FF));
  }
  return String.fromCharCode(codePt);
}


function strlen (string) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Sakimori
  // +      input by: Kirk Strobeck
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   bugfixed by: Onno Marsman
  // +    revised by: Brett Zamir (http://brett-zamir.me)
  // %        note 1: May look like overkill, but in order to be truly faithful to handling all Unicode
  // %        note 1: characters and to this function in PHP which does not count the number of bytes
  // %        note 1: but counts the number of characters, something like this is really necessary.
  // *     example 1: strlen('Kevin van Zonneveld');
  // *     returns 1: 19
  // *     example 2: strlen('A\ud87e\udc04Z');
  // *     returns 2: 3
  var str = string + '';
  var i = 0,
    chr = '',
    lgth = 0;

  if (!this.php_js || !this.php_js.ini || !this.php_js.ini['unicode.semantics'] || this.php_js.ini['unicode.semantics'].local_value.toLowerCase() !== 'on') {
    return string.length;
  }

  var getWholeChar = function (str, i) {
    var code = str.charCodeAt(i);
    var next = '',
      prev = '';
    if (0xD800 <= code && code <= 0xDBFF) { // High surrogate (could change last hex to 0xDB7F to treat high private surrogates as single characters)
      if (str.length <= (i + 1)) {
        throw 'High surrogate without following low surrogate';
      }
      next = str.charCodeAt(i + 1);
      if (0xDC00 > next || next > 0xDFFF) {
        throw 'High surrogate without following low surrogate';
      }
      return str.charAt(i) + str.charAt(i + 1);
    } else if (0xDC00 <= code && code <= 0xDFFF) { // Low surrogate
      if (i === 0) {
        throw 'Low surrogate without preceding high surrogate';
      }
      prev = str.charCodeAt(i - 1);
      if (0xD800 > prev || prev > 0xDBFF) { //(could change last hex to 0xDB7F to treat high private surrogates as single characters)
        throw 'Low surrogate without preceding high surrogate';
      }
      return false; // We can pass over low surrogates now as the second component in a pair which we have already processed
    }
    return str.charAt(i);
  };

  for (i = 0, lgth = 0; i < str.length; i++) {
    if ((chr = getWholeChar(str, i)) === false) {
      continue;
    } // Adapt this line at the top of any loop, passing in the whole string and the current iteration and returning a variable to represent the individual character; purpose is to treat the first part of a surrogate pair as the whole character and then ignore the second part
    lgth++;
  }
  return lgth;
}


function explode (delimiter, string, limit) {

  if ( arguments.length < 2 || typeof delimiter === 'undefined' || typeof string === 'undefined' ) return null;
  if ( delimiter === '' || delimiter === false || delimiter === null) return false;
  if ( typeof delimiter === 'function' || typeof delimiter === 'object' || typeof string === 'function' || typeof string === 'object'){
    return { 0: '' };
  }
  if ( delimiter === true ) delimiter = '1';

  // Here we go...
  delimiter += '';
  string += '';

  var s = string.split( delimiter );


  if ( typeof limit === 'undefined' ) return s;

  // Support for limit
  if ( limit === 0 ) limit = 1;

  // Positive limit
  if ( limit > 0 ){
    if ( limit >= s.length ) return s;
    return s.slice( 0, limit - 1 ).concat( [ s.slice( limit - 1 ).join( delimiter ) ] );
  }

  // Negative limit
  if ( -limit >= s.length ) return [];

  s.splice( s.length + limit );
  return s;
}


function gmmktime () {
  //  discuss at: http://locutus.io/php/gmmktime/
  // original by: Brett Zamir (http://brett-zamir.me)
  // original by: mktime
  //   example 1: gmmktime(14, 10, 2, 2, 1, 2008)
  //   returns 1: 1201875002
  //   example 2: gmmktime(0, 0, -1, 1, 1, 1970)
  //   returns 2: -1

  var d = new Date()
  var r = arguments
  var i = 0
  var e = ['Hours', 'Minutes', 'Seconds', 'Month', 'Date', 'FullYear']

  for (i = 0; i < e.length; i++) {
    if (typeof r[i] === 'undefined') {
      r[i] = d['getUTC' + e[i]]()
      // +1 to fix JS months.
      r[i] += (i === 3)
    } else {
      r[i] = parseInt(r[i], 10)
      if (isNaN(r[i])) {
        return false
      }
    }
  }

  // Map years 0-69 to 2000-2069 and years 70-100 to 1970-2000.
  r[5] += (r[5] >= 0 ? (r[5] <= 69 ? 2e3 : (r[5] <= 100 ? 1900 : 0)) : 0)

  // Set year, month (-1 to fix JS months), and date.
  // !This must come before the call to setHours!
  d.setUTCFullYear(r[5], r[3] - 1, r[4])

  // Set hours, minutes, and seconds.
  d.setUTCHours(r[0], r[1], r[2])

  var time = d.getTime()

  // Divide milliseconds by 1000 to return seconds and drop decimal.
  // Add 1 second if negative or it'll be off from PHP by 1 second.
  return (time / 1e3 >> 0) - (time < 0)
}