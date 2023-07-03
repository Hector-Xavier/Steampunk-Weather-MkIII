//===========================================================================
// Steampunk weather widget 3.0.1
// Inspired by: Bogdan Irimia (bogdan@digitair.ro) whose digistation widget was the original code source.
// Steampunked by: Dean Beedell with serious code suggestions by Harry Whitfield (original code by Bogdan Irimia now replaced)
// Dean.beedell@lightquick.co.uk
//
// functions.js - include for general functions that are common to all my widgets
//
//===========================================================================
//

//===========================================
// this function opens the online help file
//===========================================
inlinehelp.onMouseExit = function (event) {
    inlinehelp.opacity = 0;
    inlinehelp.visible = false;
}


//===========================================
// this function opens the online help file
//===========================================
clocksurround.onMouseDown = function (event) {
    inlinehelp.opacity = 0;
    inlinehelp.visible = false;
}

//===========================================
// this function resizes
//===========================================
bk.onMouseWheel = function (event) {
    var size = Number(preferences.maxWidthPref.value),
        maxLength = Number(preferences.maxWidthPref.maxLength),
        minLength = Number(preferences.maxWidthPref.minLength),
        ticks = Number(preferences.maxWidthPref.ticks),
        step = Math.round((maxLength - minLength) / (ticks - 1));

    inlinehelp.opacity = 0;
    inlinehelp.visible = false;
    
    //if (system.event.ctrlKey) {
	    if (system.event.scrollDelta > 0) {
	        size += step;
	        if (size > maxLength) {
	            size = maxLength;
	        }
	    } else if (system.event.scrollDelta < 0) {
	        size -= step;
	        if (size < minLength) {
	            size = minLength;
	        }
	    }
	    preferences.maxWidthPref.value = String(size);

	    resizethermometer();
	//}
};
//=====================
//End function
//=====================





//===========================================
// this function opens the online help file
//===========================================
function widgethelp() {
    //alertstr2 =  "This button opens a browser window and connects to the help page for this widget. Do you wish to proceed";
    //var answer = alert("This button opens a browser window and connects to the help page for this widget. Do you wish to proceed?", "Open Browser Window", "No Thanks");
    var answer = alert(bf("_alertstr2"), bf("_Open_Browser_Window"), bf("_No_Thanks"));
    if (answer === 1) {
        openURL("http://lightquick.co.uk/instructions-for-the-steampunk-weather-gauge-mkii.html");
    }
}
//=====================
//End function
//=====================


//===========================================
// this function opens other widgets URL
//===========================================
function otherwidgets() {
    //alertstr3 =  "This button opens a browser window and connects to the Steampunk widgets page on my site. Do you wish to proceed";
    //var answer = alert(bf("_alertstr3") + "?", bf("_Open Browser Window"), bf("_No Thanks"));
    var answer = alert(bf("_alertstr3"), bf("_Open_Browser_Window"), bf("_No_Thanks"));
    //var answer = alert("_This button opens a browser window and connects to the Steampunk widgets page on my site. Do you wish to proceed", "Open Browser Window", "No Thanks");
    if (answer === 1) {
        openURL("http://lightquick.co.uk/steampunk-widgets.html?Itemid=264");
    }
}
//=====================
//End function  
//=====================

//===========================================
// this function opens the URL for paypal
//===========================================
function donate() {
    var answer = alert(bf("_alertstr4"), bf("_Open_Browser_Window"), bf("_No_Thanks"));
    //var answer = alert(bf("_Help support the creation of more widgets like this, send us a beer! (This button opens a browser window and connects to the Paypal donate page for this widget). Will you be kind and proceed?"), "Open Browser Window", "No Thanks");
    if (answer === 1) {
                openURL("https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=info@lightquick.co.uk&currency_code=GBP&amount=2.50&return=&item_name=Donate%20a%20Beer");
    }
}
//=====================
//End function
//=====================

//===========================================
// this function opens my Amazon URL wishlist
//===========================================
function amazon() {
    var answer = alert(bf("_alertstr5"), bf("_Open_Browser_Window"), bf("_No_Thanks"));
    //var answer = alert(bf("_Help support the creation of more widgets like this. Buy me a small item on my Amazon wishlist! (This button opens a browser window and connects to my Amazon wish list page). Will you be kind and proceed?"), "Open Browser Window", "No Thanks");
    if (answer === 1) {
        openURL("http://www.amazon.co.uk/gp/registry/registry.html?ie=UTF8&id=A3OBFB6ZN4F7&type=wishlist");
    }
}
//=====================
//End function
//=====================

//===========================================
// this function opens the rocketdock URL
//===========================================
function rocketdock() {
    var answer = alert(bf("_alertstr6"), bf("_Open_Browser_Window"), bf("_No_Thanks"));
    //var answer = alert(bf("_Log in and vote for the widget on Rocketdock (This button opens a browser window and connects to the Rocketdock page where you can give the widget a 5 star rating...). Will you be kind and proceed?"), "Open Browser Window", "No Thanks");
    if (answer === 1) {
        openURL("http://rocketdock.com/addon/misc/39753");
    }
}
//=====================
//End function
//=====================

//===========================================
// this function opens the download URL
//===========================================
function update() {
    var answer = alert(bf("_alertstr7"), bf("_Open_Browser_Window"), bf("_No_Thanks"));
    //var answer = alert(bf("_Download latest version of the widget (this button opens a browser window and connects to the widget download page where you can check and download the latest zipped .WIDGET file). Proceed?"), "Open Browser Window", "No Thanks");
    if (answer === 1) {
        openURL("http://lightquick.co.uk/downloads/steampunk-weather-widget-MkII.html?Itemid=264");
    }
}
//=====================
//End function
//=====================

//===========================================
// this function opens the browser at the contact URL
//===========================================
function contact() {
    var answer = alert(bf("_alertstr8"), bf("_Open_Browser_Window"), bf("_No_Thanks"));
    //var answer = alert(bf("_Visiting the support page (this button opens a browser window and connects to our contact us page where you can send us a support query or just have a chat). Proceed?"), "Open Browser Window", "No Thanks");
    if (answer === 1) {
        openURL("http://lightquick.co.uk/contact.html?Itemid=3");
    }
}
//=====================
//End function
//=====================

//===========================================
// this function opens the browser at the contact URL
//===========================================
function facebookChat() {
    var answer = alert("Visiting the Facebook chat page - this button opens a browser window and connects to our Facebook chat page.). Proceed?", "Open Browser Window", "No Thanks");
    if (answer === 1) {
        openURL("http://www.facebook.com/profile.php?id=100012278951649");
    }
}
//=====================
//End function
//=====================

//===========================================
// this function allows a spacer in the menu
//===========================================
function nullfunction() {}
//=====================
//End function
//=====================



//=========================================================================
// this function assigns translations to preference descriptions and titles
//=========================================================================
function setmenutitles() {
          var items = [], mItem, cdMenuItem,
          infoItems = [];
  
          mItem = new MenuItem();
          mItem.title = bf("_Online_Help");
          mItem.onSelect = function () {
              widgethelp();
          };
          items.push(mItem);
  
  
          mItem = new MenuItem();
          mItem.title = bf("_Change_your_location");
          mItem.onSelect = function () {
              searchWindowVisible();
          };
          items.push(mItem);


         mItem = new MenuItem();
         mItem.title = bf("_Refresh_Metar_feed");
         mItem.onSelect = function() {
        if (debug == 1) { print("%setmenutitles _Refresh_Metar_feed")};
           if (preferences.foreCastType.value == "metar") {
              getData(preferences.icao.value);
           } else {
              getTafData(preferences.icao.value);
           }        
        };
        items.push(mItem);

         mItem = new MenuItem();
         mItem.title = "";
         mItem.onSelect = function() {
            nullfunction();
        };
        items.push(mItem);

        mItem = new MenuItem();
        mItem.title = "Copy current weather to clipboard";
        mItem.onSelect = function() {
                copyWeather();
        };
        items.push(mItem);

         mItem = new MenuItem();
         mItem.title = "";
         mItem.onSelect = function() {
            nullfunction();
        };
        items.push(mItem);

         mItem = new MenuItem();
         mItem.title = bf("_Donate_with_Paypal");
         mItem.onSelect = function() {
            donate();
        };
        items.push(mItem);

         mItem = new MenuItem();
         mItem.title = bf("_Donate_with_Amazon");
         mItem.onSelect = function() {
            amazon();
        };
        items.push(mItem);

         mItem = new MenuItem();
         mItem.title = bf("_Vote_on_Rocketdock");
         mItem.onSelect = function() {
            rocketdock();
        };
        items.push(mItem);

         mItem = new MenuItem();
         mItem.title = "";
         mItem.onSelect = function() {
            nullfunction();
        };
        items.push(mItem);

         mItem = new MenuItem();
         mItem.title = bf("_See_More_Steampunk_Widgets");
         mItem.onSelect = function() {
            otherwidgets();
        };
        items.push(mItem);

         mItem = new MenuItem();
         mItem.title = bf("_Contact_Support");
         mItem.onSelect = function() {
            contact();
        };
        items.push(mItem);

         mItem = new MenuItem();
         mItem.title = bf("_Display_Licence_Agreement");
         mItem.onSelect = function() {
            displayLicence();
        };
        items.push(mItem);

         mItem = new MenuItem();
         mItem.title = bf("_Download_Latest_Version");
         mItem.onSelect = function() {
            update();
        };
        items.push(mItem);

         mItem = new MenuItem();
         mItem.title = "";
         mItem.onSelect = function() {
            nullfunction();
        };
        items.push(mItem);

         mItem = new MenuItem();
         mItem.title = bf("_chat_about_steampunk_widgets_on_facebook");
         mItem.onSelect = function() {
            facebookChat();
        };
        items.push(mItem);

         mItem = new MenuItem();
         mItem.title = "";
         mItem.onSelect = function() {
            nullfunction();
        };
        items.push(mItem);

         mItem = new MenuItem();
        if (system.platform === "windows") {
            mItem.title = bf("_reveal_widget_win");
        } else {
            mItem.title = bf("_reveal_widget_mac");
        }
        items.push(mItem);

         mItem.onSelect = function() {
            findWidget();
        };

         mItem = new MenuItem();
         mItem.title = "";
         mItem.onSelect = function() {
            nullfunction();
        };
        items.push(mItem);

         mItem = new MenuItem();
         mItem.title = bf("_reload_widget");
         mItem.onSelect = function() {
                reloadWidget();
        };
        items.push(mItem);

        mainWindow.contextMenuItems = items;

        mItem = new MenuItem();
        mItem.title = "Copy METAR data to clipboard";
        mItem.onSelect = function() {
                copyWeather();
        };
        infoItems.push(mItem);

        infoWindow.contextMenuItems = infoItems;

}
//=====================
//End function
//=====================

//===========================================
// this function turns the sound on/off
//===========================================
function copyWeather() {
    system.clipboard = tooltipText.data;
}
//=====================
//End function
//=====================

//===========================================
// this function turns the sound on/off
//===========================================
function togglesound() {

    if (preferences.soundpref.value === "false") {
        preferences.soundpref.value = "enable";
        soundlamp.src = "Resources/green.png";
    } else {
        preferences.soundpref.value = "false";
        soundlamp.src = "Resources/red.png";
    }
    if (preferences.soundpref.value === "enable") {
        play(pop, false);
    }
    if (debug == 1) { log("%preferences.soundpref.value " + preferences.soundpref.value)};
}
//=====================
//End function
//=====================



//=================================
// timer to fade the inline help
//=================================
widgetHelpTimer.onTimerFired = function () {
	inlinehelp.opacity = inlinehelp.opacity - 3;
	if (inlinehelp.opacity <= 0) {
          widgetHelpTimer.ticking = false;
          if (preferences.soundpref.value == "enable") {play(pop,false)};
        }

};
//=====================
// timer ends
//=====================


//=================================
// timer to fade the search window
//=================================
searchFadeTimer.onTimerFired = function () {
	searchWindow.opacity = searchWindow.opacity - 10;
	if (searchWindow.opacity <= 0) {
          searchFadeTimer.ticking = false;
          if (preferences.soundpref.value == "enable") {play(pop,false)}
          searchWindow.visible = false;
          searchWindow.opacity = 255;

        }
};
//=====================
// timer ends
//=====================


//==============================
// 
//==============================
clocksurround.onclick = function () {
//	if (!mainWindow.locked) {
		mainWindow.locked = true;

                preferences.hoffsetpref.value = mainWindow.hoffset;
        	preferences.voffsetpref.value = mainWindow.voffset;

		preferences.widgetLockPref.value = "1";
		if (debug == 1) { log ( "pin.hOffset ",pin.hOffset)};
		if (debug == 1) { log ( "pin.vOffset ",pin.vOffset)};
                pin.hOffset = system.event.hOffset - 5;
		pin.vOffset = system.event.vOffset - 5;
		// store the pin position in the original unscaled amount
                preferences.pinhOffsetPref.value = pin.hOffset / gaugeScale;
		preferences.pinvOffsetPref.value = pin.vOffset / gaugeScale;
		pin.opacity = 255;



//	}

	if (preferences.soundpref.value === "enable") {
		play(lock, false);
	}
};
//==============================
//
//==============================


//==============================
// pins the widget in place
//==============================
pin.onMouseDown = function () {
	if (mainWindow.locked) {
                mainWindow.locked = false;
	        // this does not work yet
                pin.opacity = 0;
		preferences.widgetLockPref.value = "0";

                preferences.hoffsetpref.value = 0;
        	preferences.voffsetpref.value = 0;

	}
	if (preferences.soundpref.value === "enable") {
		play(lock, false);
	}
};
//==============================
//
//==============================


//===========================================
// this function causes explorer to be opened and the file selected
//===========================================
function findWidget() {

 var widgetName = "Steampunk Weather MkII.widget";
 // temporary development version of the widget
 //var widgetName = "magnifier2.widget";
 var widgetFullPath = convertPathToPlatform(system.userWidgetsFolder + "/" + widgetName);
 var alertString = "The widget folder is: \n";
 alertString += system.userWidgetsFolder + " \n\n";
 alertString += "The widget name is: \n";
 alertString += widgetName+".\n ";
 var answer = alert(alertString, "Open the widget's folder?", "No Thanks");
 if (answer === 1) {
            if (filesystem.itemExists(widgetFullPath) )   {
              //dosCommand = "Explorer.exe /e, /select,E:\\Documents and Settings\\Dean Beedell\\My Documents\\My Widgets\\mars 2.widget";
              //dosCommand = "Explorer.exe /e, /select," + widgetFullPath;
              //print("%dosCommand "+dosCommand);
              //var explorerExe = runCommand(dosCommand, "bgResult");
              filesystem.reveal(widgetFullPath);
            }
 }
}
//=====================
//End function
//=====================

//==============================
// removes the help window
//==============================
inlinehelp.onMouseDown = function () {
     inlinehelp.opacity = 0;
     inlinehelp.visible = false;
};
//==============================
//
//==============================


//================================================
// this function sets translations to tooltip text
//================================================
function setGeneralTooltips() {
    helpknob.tooltip = bf("_Click_on_me_to_open_the_glass");
    weatherglasshelp.tooltip = bf("_Click_on_me_to_close_the_glass");
    
    //print("%setGeneralTooltips: " + bk.myTooltip);
    
    logo.tooltip = bf("_Click_here_to_view_meteorological_site");
    temperatureknob.tooltip = bf("_toggle_centigrade_fahrenheit_here");
    popupknob.tooltip = bf("_click_here_to_raise_the_weather_popup");
    btn_ok.tooltip = bf("_Click_here_to_select");
    btn_cancel.tooltip = bf("_Click_here_to_cancel");
    helpknob.tooltip = bf("_Click_on_me_to_mute_or_unmute_sounds");
    soundlamp.tooltip = bf("_Click_on_me_to_mute_or_unmute_sounds");
    animationlamp.tooltip = bf("_Click_on_me_to_stop_or_start_animations");
    clocksurround.tooltip = bf("_lock_widget");
    chain2.tooltip = bf("_Click_on_me_to_show_the_widget_preferences");
    chain.tooltip = bf("_Click_on_me_to_open_the_glass");
    imagelinktransparency.tooltip = bf("_Click_on_me_to_visit_the_on-line_help_page");

    //print("%setGeneralTooltips: " + bk.myTooltip);
    clockknob.tooltip = bf("_set_new_location");
    slider.tooltip = bf("_set_to_use_icao_or_location");
    knob2.tooltip = bf("_set_to_use_icao_or_location");

    preceding.tooltip = bf("_press_to_show_previous_days_forecast");
    following.tooltip = bf("_press_to_show_next_days_forecast");
}
//=====================
//End function
//=====================
//=========================================================================
// this function assigns translations to preference descriptions
//=========================================================================
function setprefdescriptions() {
    preferences.maxWidthPref.description = bf("_Decreases_the_total_size_of_the_weather_gauge");
    preferences.clockpref.description = bf("_Change_the_appearance_of_the_24hr_clock");
    preferences.soundpref.description = bf("_Enable_or_disable_sound_as_you_require");
    preferences.animationpref.description = bf("_Enable_or_disable_animation_as_you_require");
    preferences.langpref.description = bf("_Add_your_own_language_here");
    preferences.langpref2.description = bf("_Do_not_change_this_code");
    preferences.tempUnit.description = bf("_Select_the_temperature_unit");
    preferences.metarpref.description = bf("_Select_codes_or_locations");
    preferences.intervalValuePref.description = bf("_This_is_the_timer_interval");
    preferences.getDataPingPref.description = bf("_Check_this_box_if_you_want");
    preferences.widgetLockPref.description = bf("_This_option_locks_the_widget");
    preferences.imperialMetricPref.description = bf("_Select_the_cloud_height_unit");
    preferences.popupPanel.description = bf("_Shows_the_weather_pop_up_panel");
    preferences.permanentPanel.description = bf("_Shows_the_weather_panel_permanently");
    preferences.miniClock.description = bf("_Enables_the_mini_clock");
    preferences.popupPanelFont.description = bf("_Enter_the_name_of_any_of_your_installed_fonts");
    preferences.popupPanelFontSizePref.description = bf("_Choose_the_font_size_of_the_popup_text");
    preferences.alertPref.description = bf("_disable_this_to_ignore_any_failures");
}
//=====================
//End function
//=====================
//=========================================================================
// this function assigns translations to preference titles
//=========================================================================
function setpreftitles() {
    preferences.maxWidthPref.title = bf("_Widget_Size");
    preferences.clockpref.title = bf("_Clock_Style");
    preferences.soundpref.title = bf("_Sound_Control");
    preferences.animationpref.title = bf("_Animation_Control");
    preferences.langpref.title = bf("_Language_Selection");
    preferences.tempUnit.title = bf("_Temperature_unit");
    preferences.getDataPingPref.title = bf("_Ting_when_collecting_data");
    preferences.intervalValuePref.title = bf("_data_timer");
    preferences.widgetLockPref.title = bf("_widget_locked");
    preferences.imperialMetricPref.title = bf("_metric_or_imperial");
    preferences.metarpref.title = bf("_metar_search");
    preferences.langpref2.title = bf("_language_code");
    preferences.langpref.title = bf("_language_selection");   
 
    preferences.popupPanel.title = bf("_weather_pop_up");
    preferences.permanentPanel.title = bf("_weather_panel");
    preferences.miniClock.title = bf("_mini_clock");
    preferences.popupPanelFont.title = bf("_pop_up_font");
    preferences.popupPanelFontSizePref.title = bf("_pop_up_panel_text_size");
    preferences.alertPref.title = bf("_alerts");
}
//=====================
//End function
//=====================
//==============================================================
// this function reloads the widget when preferences are changed
//==============================================================
function changePrefs() {
    if (debug == 1) { log("%preferences Changed")};
    savePreferences();				/// <<<<<<<<<<<<<
    sleep(1000);
    reloadWidget();
    //startup();
}
//=====================
//End function
//=====================

//==============================================================
// this function changes given text to sentence case
//==============================================================
String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};
//=====================
//End function
//=====================



//=================================
// Function to open a file
//=================================
busy.onMouseDown= function () {
	busyStop();

}
//=================================
// end function
//=================================
