angularFormsApp.factory('DataService',
	function(){
		
		var	getEmployee = function(id){
			if (id == 123){
				return {
					id: 123,
					fullName: "Milton Waddams",
					notes: "The ideal employee. Just don't touch his red staple",
					department: "Administration",
					perkCar: true,
					perkStock: false,
					perkSixWeeks: true,
					payrollType: "none",
					dateHired: "July 11 2014",
					breakTime: "Tue Jan 05 2016 15:00:00 GMT+0800 (SGT)",
					topProgrammingLanguage: "",

				};
			}
			return undefined;
		};

		var insertEmployee = function(newEmployee){
			console.log(newEmployee);
			return true;
		};

		var	updateEmployee = function(employee){
			console.log(employee);
			return true;
		};

		return {
			insertEmployee: insertEmployee,
			updateEmployee: updateEmployee,
			getEmployee: getEmployee
		}
		
	});