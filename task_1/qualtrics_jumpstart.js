Qualtrics.SurveyEngine.addOnload(function()
{
    // Paste test data in between BEGIN CSV & END CSV in csv format
    // Supports Headers, and first column should be "ChoiceID". Defaults to row#
    var csv_data = `a,b,c`;
    // Possible conditions: reveal_once, reveal_multiple, reveal_always
    var condition = "reveal_multiple";
        // true  false
    var randomize_rows = false;
    var randomize_cols = false;

    // Does the CSV data include headers?
    var includes_headers = true;

    // Should there be a None of the Above button?
    var none_of_the_above = true;

    // Button text for None of the above
    var nota_text = "Neither";
    
    // Field Seperator  
    //      ','  = COMMA
    //      '\t' = TAB
    //      '|'  = PIPE
    //      ' '  = SPACE
    var fs = ','

    // Options are 'hover' OR 'click'
    var activate_on = 'click'

    // Zero or less turns off HIDE 
    var seconds_before_hide = 10;
  
    var ed_field_name = 'events_1';
    //Don't touch below

    var loopNumber = "${lm://CurrentLoopNumber}";
    var correctAnswer = "${lm://Field/2}"; 

    Wharton.conjointTracker.beginTracking(loopNumber, correctAnswer, this);
});

Qualtrics.SurveyEngine.addOnReady(function()
{
    /*Place your JavaScript here to run when the page is fully displayed*/

});

Qualtrics.SurveyEngine.addOnUnload(function()
{
    /*Place your JavaScript here to run when the page is unloaded*/

});