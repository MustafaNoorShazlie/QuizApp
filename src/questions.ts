export const questions =[
    {
        questionNumber: "question1",
        questionContent: "What does CSS stand for?",
        questionOptions: { 
            "option1":"Colorful Style Sheets",
            "option2":"Cascading Style Sheets",
            "option3":"Creative Style Sheets",
            "option4":"Computer Style Sheets",
        },
        correctOptions: ["option2"],
        inputType: "radio",
    },
    {
        questionNumber: "question2",
        questionContent: "How to refer to an element in CSS?",
        questionOptions: {
            "option1":"#id{}",
            "option2":"[tag name]{}",
            "option3":".class{}",
            "option4":"name{}",
        },
        correctOptions: ["option1", "option3"],
        inputType: "checkbox",
    },
    {
        questionNumber: "question3",
        questionContent: "Make a \"div\" element have a 30px border radius (semicolons \";\" are necessary)",
        questionOptions: {"option1":"div{border-radius:30px}"},
        correctOptions : "div{border-radius:30px;}",
        inputType: "textarea",
    },
];


