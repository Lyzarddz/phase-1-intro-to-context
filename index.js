

 function createEmployeeRecord([str1, str2, str3, num]){

    let obj = {
        firstName : str1,
        familyName : str2,
        title: str3,
        payPerHour : num,
        timeInEvents: [],
        timeOutEvents: []
    }

    return obj;
}


 function createEmployeeRecords(arrayOfArrays){         //Go Over Logic of this function
     
    let newArr = [];
        for(const array of arrayOfArrays){
            newArr.push(createEmployeeRecord(array))
        }
        return newArr;
 }

 
 function createTimeInEvent(employeeRecord, dateStamp){

    const d = dateStamp.split(" ");                 //must put space between quotes

    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(d[1]),
        date: d[0]
    })

    return employeeRecord;
}


function createTimeOutEvent(employeeRecord, dateStamp){

    const d = dateStamp.split(" ");

    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(d[1]),
        date: d[0]
    })
    return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, dateStamp){

    let timeIn = employeeRecord.timeInEvents.find(r =>{
        return r.date === dateStamp;
    })

    let timeOut = employeeRecord.timeOutEvents.find(r => {
        return r.date === dateStamp;
    })

    const result = timeOut.hour - timeIn.hour;
    return result/ 100;

}

function wagesEarnedOnDate(employeeRecord, dateStamp){

    let hoursworked = hoursWorkedOnDate(employeeRecord, dateStamp);
    let pay = employeeRecord.payPerHour;

    return (hoursworked * pay);
}

function allWagesFor(employeeRecord){
    
    let workDates = employeeRecord.timeInEvents.map(e =>{        // creates array of dates worked 
        return e.date;
    })

    let total = workDates.reduce((acc, dataStamp) => {                 //don't understand this whole function *study .reduce() 
        return acc + wagesEarnedOnDate(employeeRecord, dataStamp)
    }, 0)

    return total;
}

function calculatePayroll(employeeRecordArr){
    
    let pay = employeeRecordArr.reduce((acc, employeeRecord) => {
        return acc + allWagesFor(employeeRecord)
    }, 0)

    return pay;

}
