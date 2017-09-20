(function() {
 var questions = [{
    question: "Which of the following selector matches a element based on its id?",
    type: "single",
    choices: ["The Id Selector","The Universal Selector","The Descendant Selector","The Class Selector"]
    
},
{
    question: "Which of the following defines a measurement as a percentage relative to another value, typically an enclosing element?",
    type: "multiple",
    choices: ["%","cm","percentage","ex"]
    
},
{
    question: "Which of the following property is used to set the background color of an element?",
    type: "single",
    choices: ["background-color","background-image","background-repeat","background-position"]

},
{
    question: "Which of the following is a true about CSS style overriding?",
    type: "multiple",
    choices: ["Any inline style sheet takes highest priority. So, it will override any rule defined in tags or rules defined in any external style sheet file.",
    "Any rule defined in tags will override rules defined in any external style sheet file.",
    "Any rule defined in external style sheet file takes lowest priority, and rules defined in this file will be applied only when above two rules are not applicable."
    ]
}];

  
  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object
  
  // Display initial question
  displayNext();
  
  // Click handler for the 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();
    
    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {        
      return false;
    }
    choose();
    
    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
      alert('Please make a selection!');
    } else {
      questionCounter++;
      displayNext();
      highlight();
    }
  });
  
  // Click handler for the 'prev' button
  $('#prev').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
    highlight();
  });
  
  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    highlight();
    $('#start').hide();
  });
  
// Click handler for the list elements
  $("li").on("click",function(e){
   highlight();
  });

function highlight(){
     //toggling background color while clicking, to show the user that the option is clicked
  $('#quiz li:first-child').click("click",function(){
        $(this).addClass("highlight");
           $(this).siblings().each(function(){
        $(this).removeClass('highlight') ;

    });
        
    });
    
    
    $('#quiz li:nth-child(2)').click(function(){
        $(this).addClass("highlight");
           $(this).siblings().each(function(){
        $(this).removeClass('highlight') ;

    });
    });
    
    $('#quiz li:nth-child(3)').click(function(){
        $(this).addClass("highlight");
           $(this).siblings().each(function(){
        $(this).removeClass('highlight') ;

    });
    });
    
    $('#quiz li:nth-child(4)').click(function(){
        $(this).addClass("highlight");
           $(this).siblings().each(function(){
        $(this).removeClass('highlight') ;

    });
    });
  }
  

  // Animates buttons on hover
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });
  
  // Creates and returns the div that contains the questions and 
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });
    
    var header = $('<h2 style="color:red">Question ' + (index + 1) + ':</h2>');
    qElement.append(header);
    
    var question = $('<p style="color:green">').append(questions[index].question);
    qElement.append(question);
    
    var radioButtons = createRadios(index);
    qElement.append(radioButtons);
    
    return qElement;
  }
  
  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {

     if(questions[index].type=="single"){
		      item = $('<li style="padding-top:10px">');
		      input = '<input type="radio" name="answer" value=' + i + ' />';
		      input += questions[index].choices[i];
		      item.append(input);
		      radioList.append(item);
		    }
	
		
		else{
			item = $('<li style="padding-top:10px">');
		      input = '<input type="checkbox" name="answer" value=' + i + ' />';
		      input += questions[index].choices[i];
		      item.append(input);
		      radioList.append(item);
		}
	}

		return radioList;

    
  }
  
  
  // Reads the user selection and pushes the value to an array
  function choose() {
      selections[questionCounter] = +$('input[name="answer"]:checked').val();
    
  }
  
  // Displays next requested element
  function displayNext() {

    quiz.fadeOut(function() {
      $('#question').remove();
      
      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }
        
        // Controls display of 'prev' button
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){
          
          $('#prev').hide();
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide()
;        $('#start').show();
      }
      highlight();
    });
  }
  
  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $('<p>',{id: 'question'});
    
        score.append('We are processing your answers, you will get a mail!');
    return score;
  }
})();

