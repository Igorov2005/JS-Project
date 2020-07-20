'use strict';

import "@babel/polyfill";
import 'nodelist-foreach-polyfill';
import elementClosest from 'element-closest';
elementClosest(window);
import 'formdata-polyfill';
import 'es6-promise';
import 'fetch-polyfill';



import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import tabs from './modules/tabs';
import slider from './modules/slider';
import livePhotos from './modules/livePhotos';
import calc from './modules/calc';
import sendForm from './modules/sendForm';



//Timer
countTimer('23 jule 2020');

//menu
toggleMenu();

//popup
togglePopUp();

//Tabs 
tabs();

//slaider
slider();

//command foto
livePhotos();

//calculator
calc(100);

//send -ajax-form
sendForm();
