function submitAnswers(){
	var total = 1;
	var score = 0;

	// get user input
	var q1 = document.forms["quizForm"]["q1"].value;
	var results = document.getElementById('results');

	// Validation


	for (var i = 1; i <= total; i++){
		if( eval('q' + i) == null || eval('q' + i) == '') {
			results.innerHTML = '<h3>You missed question' + i + '</h3>';
			return false;
		}		
	}


	// set correct answers;

	var answers = ["a"]

	
	// check answers

	for (var i = 1; i <= total; i++){
		if (eval('q' + i) == answers[i - 1]){
			score++;
		}
	}

	//

	results.innerHTML = '<h3>You scored <span>' + score + '</span> out of <span>' + total + '</span></h3>';

	return false;



}