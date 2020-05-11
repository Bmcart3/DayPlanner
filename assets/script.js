$(document).ready(function () {
    //Sets the current date at the top of the scheduler
    var currentDate = Date(Date.now());
    $("#currentDay").text(currentDate);

    //This function will be checking the current time against the time blocks to determine if it is past present or future and coloring the boxes accordingly.
    //new Date().getHours() gives the current military hour as a number.
    //This loops once for each textarea element based on its description class.
    //It compares value of the data attribute data-milTime against the current military hour.
    //depending on the outcome, it adds or removes a class to show the correct color.
    function hourUpdater() {
        var currentHour = new Date().getHours();
        $(".description").each(function () {
            if ($(this).attr("data-milTime") < currentHour) {
                $(this).addClass("past");
            } else if ($(this).attr("data-milTime") > currentHour) {
                $(this).removeClass("past");
                $(this).addClass("future");
            } else {
                $(this).removeClass("past");
                $(this).removeClass("future");
                $(this).addClass("present");
            }
        })
    };
    //calls the hourUpdater function first.
    //set on an interval to update once per minute.
    hourUpdater();
    setInterval(hourUpdater, 60000);


    //click event on the save button
    //creates variable chores which is equal to the value of the textarea (the user input) which was grabbed through the sibling of the savebtn. This becomes the value for localstorage.
    //creates variable hour which is equal to the id value of the parent of the savebtn which is the div. This becomes the key for localstorage.
    //Can then store the users input and associate it to a specific specific textarea.
    $(".saveBtn").on("click", function () {
        var chores = $(this).siblings(".description").val();
        var hour = $(this).parent().attr("id");
        localStorage.setItem(hour, chores);
    })

    //retrieves data from local storage. first selector is for textarea associated with hour-n div and it will be populated with the value of the key hour-n.

    for (let i = 9; i < 18; i++) {
        var getter = "hour-" + [i];
        console.log($("#hour-" + [i] + " .description"));
        $("#hour-" + [i] + " .description").val(localStorage.getItem(getter));
    }
});