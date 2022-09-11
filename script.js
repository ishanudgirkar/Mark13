function reverseStr(str) {
  var listOfChars = str.split('');
  var reverseListOfChar = listOfChars.reverse();
  var reversedStr = reverseListOfChar.join('');
  return reversedStr;

}

function isPalindrome(str) {
  var reverse = reverseStr(str);

  if (str === reverse) {
    return true;
  } else {
    return false;
  }
}

function convertDateToStr(date) {

  var dateStr = { day: '', month: '', year: '' };

  if (date.day < 10) {
    dateStr.day = '0' + date.day;
  } else {
    dateStr.day = date.day.toString();
  }

  if (date.month < 10) {
    dateStr.month = '0' + date.month;
  } else {
    dateStr.month = date.month.toString();
  }

  dateStr.year = date.year.toString();

  return dateStr;

}

function getAllDateFormats(date) {
  var dateStr = convertDateToStr(date);

  var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];

}

function checkPalindromeForAllDateFormats(date) {
  var listOfPalindromes = getAllDateFormats(date);

  var flag = false;

  for (var i = 0; i < listOfPalindromes.length; i++) {
    if (isPalindrome(listOfPalindromes[i])) {
      flag = true;
      break;
    }
  }

  return flag;
}

function isLeapYear(year) {
  if (year % 400 === 0) {
    return true;
  }
  if (year % 100 === 0) {
    return false;
  }
  if (year % 4 === 0) {
    return true;
  }
  return false;
}

function getNextDate(date) {
  var day = date.day + 1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  // check for february
  if (month === 2) {
    // check for leap year
    if (isLeapYear(year)) { // 2020 => true
      if (day > 29) { // false
        day = 1;
        month++;  // increment the month
      }
    }
    else {
      if (day > 28) {
        day = 1;
        month++;  // increment the month
      }
    }
  }
  // check for other months
  else {
    //  check if the day exceeds the max days in month
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;  // increment the month
    }
  }

  // increment the year if month is greater than 12
  if (month > 12) {
    month = 1;
    year++;
  }

  return {
    day: day,
    month: month,
    year: year
  };
}

function getNextPalindromeDate(date) {
  var ctr = 0;
  var nextDate = getNextDate(date);

  while (1) {
    ctr++;
    var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
    if (isPalindrome) {
      break;
    }
    nextDate = getNextDate(nextDate);
  }
  return [ctr, nextDate];
}

function getPreviousPalindromeDate(date) {

  var previousDate = getPreviousDate(date);
  var ctr = 0;

  while (1) {
    ctr++;
    var isPalindrome = checkPalindromeForAllDateFormats(previousDate);
    if (isPalindrome) {
      break;
    }
    previousDate = getPreviousDate(date);
  }
  return [ctr, previousDate];
}

function getPreviousDate(date) {
  var day = date.day - 1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (day === 0) {
    month--;

    if (month === 2) {
      if (isLeapYear(year)) {
        day = 29;
      } else {
        day = 28;
      }
    }

    else if (month === 0) {
      month = 12;
      day = 31;
      year--;
    }

    else {
      day = daysInMonth[month - 1];
    }

  }

  return
  {
    day: day, month: month, year: year;
  }
}



var dateInputRef = document.querySelector('#bday-input');
var showBtnRef = document.querySelector('#show-btn');
var resultRef = document.querySelector('#result');

function clickHandler(e) {
  if (dateInputRef.value) {
    var bdayStr = dateInputRef.value; // 2020-10-11

    if (bdayStr !== '') { //we will work only if string is not empty
      var listOfDate = bdayStr.split('-'); // ['2020', '10', '11']

      var date = {
        day: Number(listOfDate[2]),
        month: Number(listOfDate[1]),
        year: Number(listOfDate[0])
      };

      var isPalindrome = checkPalindromeForAllDateFormats(date);

      if (isPalindrome) {
        resultRef.innerText = 'Yay! your birthday is a palindrome!! 🥳🥳';
      }
      else {
        var [ctr, nextDate] = getNextPalindromeDate(date);

        resultRef.innerText = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${ctr} days! 😔`;
      }
    }
  } else {
    resultRef.innerText = `Please Enter your birthday first 😑`;
  }
}

showBtnRef.addEventListener('click', clickHandler);

