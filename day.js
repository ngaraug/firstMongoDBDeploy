function dayOfWeek(){
    var date = new Date();
    var today  = date.toLocaleString("en-US", {day: "numeric" ,weekday: "long", month: "long", year: "numeric" })
    return today;
}

function sayHello(){
    return "Hello from another module!"
}

export {dayOfWeek, sayHello};