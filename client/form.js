Template.form.helpers({
    form: function () {

        var _milestones
        return {
            id: "whatever",
            fields: [
                {text: true, label: "Text example", name: "textExample", dbField: "textExample"},
                {table: true, label: "", name: "milestones", dbField: "milestones", generatedRows: true,
                    headers: [
                        {label: ""},
                        {label: "Milestones or Short Term Objectives/Dates Expected"},
                        {label: "Comments/Progress Notes/Dates Achieved"}
                    ],
                    fields: [
                        {button: true, name: "delete", callFunction: "remove"},
                        {text: true, label: "", name:"milestone", dbField: "milestone"},
                        {text: true, label: "", name: "comments", dbField: "comments"}
                    ]
                }
            ]
        }

    }
});


Template.formField.rendered = function() {
    console.log("This in formField", this);
}
// table
// iterate over values.. like when you add milestones on goal page



//{
//    table: true, label: "Person(s) responsible for services", headers: [
//    {label: "#", width: "4%"},
//    {label: "Date", width: "48%"}
//],
//    rows: [
//        {}
//    ]
//}