import axios from 'axios';


//private helper functions:
var validateLocation = function (current, checkin) {
  const MIN_DIST = 200; // acceptable distance between ambit loc and checkin loc

  var rad = function(x) {
    return x * Math.PI / 180;
  };
  //calculate the distance btw two points.
  var getDistance = function(p1, p2) {
    var R = 6378137; // Earth’s mean radius in meter
    var dLat = rad(p2.latitude - p1.latitude);
    var dLong = rad(p2.longitude - p1.longitude);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(rad(p1.latitude)) * Math.cos(rad(p2.latitude)) *
      Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return Math.round(d); // returns the distance in meter
  };

  if (getDistance(current, checkin) < MIN_DIST) {
    return true;
  } else {
    return false;
  }
};

//calculate ambit frequency and process for display
const daysOftheWeek = function(boolArr) {
  var days = {
    0:'Su',
    1:'M',
    2:'Tu',
    3:'W',
    4:'Thu',
    5:'Fri',
    6:'Sa'
  };
  var result ='';
  var displayDays = boolArr.map((b, i) => {
    b ? days.i : b;
  }).filter(d => (!!d)).forEach((day, i, a) => {
    if(i === a.length) {
      result += day;
    } else {
      result += day + '/';
    }
  });
  return result;
};

//Decorate ambits for client side
const decorateAmbits = function(ambits) {
  ambits.forEach(ambit => {
    if(ambit.weekdays.every(day => day === true)) {
      ambit.frequency = 'Daily';
    } else {
      ambit.frequency = 'Weekly - '+ daysOftheWeek(ambit.weekdays);
    }
    //TODO: clean the server side check.
    //check if the user is already checked in for the day:
    //TODO: make the date time specific.
    var now = (new Date()).toDateString();
    var recentCheckin = new Date(ambit.checkIns[ambit.checkIns.length - 1]);
    if(recentCheckin && recentCheckin.toDateString() === now) {
      ambit.checkedIn = true;
    } else {
      ambit.checkedIn = false;
    }
  });
  return ambits;
};

const url = '';

//public functions:
export const postCheckin = function (ambitId, callback) {
  axios({
    method:'post',
    url:'/ambits/' + ambitId,
    contentType: 'application/json'
    }).then(function(response){
      callback();
    }).catch(function(err){
      throw err;
    });
};

export const deleteAmbit = function (ambitId, callback) {
  axios({
    method:'delete',
    url:'/ambits/' + ambitId,
    contentType: 'application/json'
    }).then(function(response){
      callback();
    }).catch(function(err){
      throw err;
    });
};

export const postAmbit = function (ambit, callback){
  axios({
    method:'post',
    url:'/ambits',
    contentType: 'application/json',
    data: {ambit: ambit}
    }).then(function(response){
      callback(response, null);
    }).catch(function(error) {
      callback(null, error);
    });
};

export const getAllAmbits = function(callback) {
  axios({
    method: 'get',
    url: url + '/ambits',
    contentType: 'application/json',
  }).then(function(response) {
    //testing comment out
    // response.data.push( {
    //     refId: 1234,
    //     name: 'Gym',
    //     coords: {
    //       latitude: 37.784,
    //       longitude: -122.40903
    //     },
    //     weekdays:[true,true,true,true,true,true,true],
    //     startDate:'2016-12-12',
    //     checkIns:[]
    //     });
    // response.data.push( {
    //     refId: 1234,
    //     name: 'Work at WeWork',
    //     coords: {
    //       latitude: 37.784,
    //       longitude: -122.40903
    //     },
    //     weekdays:[true,true,true,true,true,true,true],
    //     startDate:'2016-12-12',
    //     checkIns:[]
    //     });
    callback(decorateAmbits(response.data));
  }).catch(function(error){
    throw error;
  });
};


export const checkinAmbit = function(ambit, successCb,errorCb) {
  //get current location
  if (navigator.geolocation) {
  /* geolocation is available */
  navigator.geolocation.getCurrentPosition(function(position) {
    // console.log(position.coords);
    var coordinates = position.coords;
    if(validateLocation(ambit.coords, coordinates)) {
      console.log('valid');
      successCb();
    } else {
      //inform user that it is not a valid checkin attempt
      //cheating
      errorCb();
    }
  }, function(err) {
    throw err;
  }, {timeout: 10000});
 } else {
  //device does not support geolocation:
  console.log('your device does not support geolocation :(');
 }
};

export const convertDate = (date) => ((date.getUTCMonth() + 1) + '/' + date.getUTCDate() + '/' + date.getUTCFullYear());

export const convertTime = (time) => {
  var pretty;
  if (time.getHours() > 12) {
    var mins = time.getMinutes();
    pretty = (time.getHours() - 12)  + ':' + ((mins < 10) ? '0' + mins : mins) + ' pm';
  } else {
    var mins = time.getMinutes();
    pretty = time.getHours() + ':' + ((mins < 10) ? '0' + mins : mins) + ' am';
  }
  return pretty;
};
