// reveal_once, reveal_multiple, reveal_always

var Wharton = {};

Wharton.conjointTracker = {};

Wharton.pad = function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

//  Returns new array, original is unmodified
//  Sattolo shuffle: https://rosettacode.org/wiki/Sattolo_cycle
Wharton.shuffle = function shuffle(source_arr){
  var result_arr = source_arr.slice();

  for(i = result_arr.length; i-- > 1; ){
    j = Math.round(Math.random() * i);
    var tmp = result_arr[i];    
     result_arr[i] = result_arr[j];
     result_arr[j] = tmp;
  }
  return result_arr;
}

// Closure of load time. Returns offset in seconds
var LoadTime_clos = (new Date()).getTime()
Wharton.rel_time = function rel_time(curr){
    return  Wharton.pad(curr - LoadTime_clos, 6, '0');
}

// The choiceID field can have any text, even single/double quotes and spaces, which corrupts the id string
Wharton.attributeSanitization = function attributeSanitization(source){
  var result = source;
  var apos = new RegExp("'", 'ig')
  var space = new RegExp(" ", 'ig')

  result = result.replace(apos, '')
  result = result.replace(space, '_')

  return result;
}

Wharton.processChoices = function processChoices(csv_data,
                        useHeaders,
                        id_name_field,
                        field_seperator,
                        line_seperator,
                        comment_tag){

  // DO NOT TOUCH
  var lines = csv_data.split(line_seperator);
  var line_count = lines.length;
  var id_field = new RegExp(id_name_field, 'i');
  var any_fields =  new RegExp(field_seperator);
  var is_comment =  new RegExp('^\s*' + comment_tag);
  var result = [];
  var headers = [];
  var data = [];
  var data_line_count = 0;
  
  
  for (i = 0; i < line_count; i++) {
  
    if(is_comment.test(lines[i]) || ! any_fields.test(lines[i])) {
      //Contains no field seperator, skip
      continue;
    }
  
    if(useHeaders && headers.length < 1){
      //Header line
      headers = lines[i].split(field_seperator);
    }
    else
    {
      //Data Line
      data_line_count++;
      data.push(lines[i].split(field_seperator));
    }
  }
  
  var has_id_field = false;
  if (useHeaders && headers.length > 0  && id_field.test(headers[0])){
    // Has a column for choice names
    has_id_field = true;
  }
  
  // Create JS object from headers, and data 
  for(i = 0; i < data_line_count; i++){
    var temp_object =  {};
    // Default to choice_N for ids, unless overridden in header
    var id = 'choice_' + (1 + i) ;
    offset = 0;
  
    if (has_id_field){
      id = data[i][0];
      offset = 1;
    } 
  
    temp_object.choice_id = id;
  
    // Each header create a field and populate
    for(var j = offset; j < data[0].length; j++) {
      if(useHeaders && headers.length > 0){
        temp_object[headers[j] ] = data[i][j];
        continue;    
      } 
      // We have no headers, so just call them value    
      temp_object['value_' + (1 + j)] =  data[i][j];
    }
    // Add this choice to the result array.
    result.push(temp_object);
  }

  return result;
}

Wharton.conjointTracker.beginTracking = function(loopNumber, correctAnswer, qualtrics) {
    var _ = jQuery;
    var qc = _(qualtrics.getQuestionContainer());
    var htmlTableString = "";
    var seconds_before_hide = 0;
    var questionName =  _(qualtrics.getQuestionTextContainer()).text();
    var aChar = 65;
    var str = _('div.QuestionBody table tr label span').first().text()
    var switches = 0;
    var t0 =  Wharton.rel_time((new Date).getTime())
    var currAnswer = "None"

    var additional_css = 
    ['<style> </style>'].join('\n');
    
    // Override some Bootstrap
    htmlTableString += additional_css
    qc.append(htmlTableString);

    // STRING, TIME SPENT, TIMES SWITCHED, ACCURACY, COMPLETED


    _('div.QuestionBody table tr td input[type=radio]').click(function(e){
          currAnswer = _(e.target).siblings('label').find('span').text();
          switches++;
    });

    if(seconds_before_hide > 0 ){
        window.setTimeout(function() {
            _('thead, tbody').addClass('hidden');
            _('tfoot').removeClass('hidden');
            _('div#choose-msg').removeClass('hidden');
        }, (seconds_before_hide * 1000) );
    } 
    else {
        qualtrics.showNextButton();
        qc.append("<div class='QuestionText'>You may skip questions if you wish.</div>");
    }

    _('#NextButton').click(function(e){
        var t1 = Wharton.rel_time((new Date).getTime());
        var t = (t1 - t0)/1000.0;
        var currAns = (currAnswer==="Yes") ? 1 : (currAnswer==="No")? 0 : -1;
        if (currAns == -1) {
          _(qc).siblings().find('div input[type=text]').val(str+","+t+","+switches+",0,0");
        } else {
          var a = currAns == correctAnswer ? 1 : 0;
          _(qc).siblings().find('div input[type=text]').val(str+","+t+","+switches+","+a+",1");
        }
    });

    _('td [id^=choose]').click(function(e) {
        current_events_data = _(e.target).closest('button').attr('log-text') + "|" + Wharton.rel_time((new Date).getTime()) + "|" + current_events_data; 
        current_events_data = questionName + '|' + current_events_data; 
        _('#contab').addClass('hidden');
        _('div#continue-msg').removeClass('hidden');
        _('div#choose-msg').addClass('hidden');
        qualtrics.setChoiceValue('TEXT', current_events_data);
        qualtrics.showNextButton();
    });

}