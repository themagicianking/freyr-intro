// Retrieves current year for the copyright
today = new Date();
thisYear = today.getFullYear();

//Adds current year to the copyright in the footer
footer = document.querySelector("footer");
copyright = document.createElement("p");
copyright.innerHTML = "© Thane Chaves " + thisYear;
footer.appendChild(copyright);

//Resume skills
skills = ["HTML/CSS", "Javascript", "Git", "Ruby", "Python"]
softSkills = ["strong writing and reading comprehension", "animal handling", "dog grooming", "swimming and swim instruction", "receptionist skills", "interpersonal skills", "childcare and development including specializing in children with special needs", "basic first aid training"];

skillsSection = document.getElementById("skills");
skillsList = skillsSection.querySelector("ul");
addItemsToList(skillsList, skills);

function addItemsToList(listElement, list) {
  for (let i = 0; i < list.length; i++) {
    let skill = document.createElement("li");
    skill.innerHTML = list[i];
    listElement.appendChild(skill);
  };
};

experience = [{company: "Sit Means Sit", location: "Richmond, VA", position: "Dog Trainer", timeline: "September 2023 - Present"}, {company: "Whole Foods", location: "Richmond, VA", position: "Team Member", timeline: "May 2023 - September 2023"}, {company: "Dog Krazy", location: "Fredericksburg & Richmond, VA", position: "Warehouse Worker, Retail Associate, Dog Groomer", timeline: "January 2022 - April 2023"}, {company: "UPS", location: "Fredericksburg, VA", position: "Seasonal Parcel Carrier", timeline: "December 2021"}, {company: "Silverbrook Kennels", location: "Fredericksburg, VA", position: "Kennel Attendant", timeline: "March 2021 - November 2021"}, {company: "Kid's First Swim School", location: "Fredericksburg, VA", position: "Swim Instructor & Receptionist", timeline: "June 2019 - April 2020"}, {company: "Dogtopia", location: "Fredericksburg, VA", position: "Kennel Attendant", timeline: "October 2019 - March 2020"}, {company: "Starbucks", location: "Fredericksburg, VA", position: "Barista", timeline: "August 2018 - December 2018"}];

//Creates a list item for each past job
experienceSection = document.getElementById("experience");
experienceList = experienceSection.querySelector("ul");
experience.forEach((job) => {
  newExperience = document.createElement("li");
  let company = document.createElement("span");
  company.innerHTML = job.company;
  let location = document.createElement("span");
  location.innerHTML = job.location;
  let position = document.createElement("span");
  position.innerHTML = job.position;
  let timeline = document.createElement("span");
  timeline.innerHTML = job.timeline;
  newExperience.appendChild(company);
  newExperience.appendChild(location);
  newExperience.appendChild(position);
  newExperience.appendChild(timeline);
  experienceList.appendChild(newExperience);
});

//Handles user input after the form is submitted
messageForm = document.querySelector('[name="leave_message"]');
messageForm.addEventListener("submit", function () {
  event.preventDefault();

  name = event.target.usersName.value;
  email = event.target.usersEmail.value;
  message = event.target.usersMessage.value;

  //Checks for existence of submitted messages before adding the message header and correct background color and border if a message is added
  messageSection = document.getElementById("messages");
  if (messageSection.querySelector("ul").innerHTML.trim() == "") {
    messageSection.style.backgroundColor = "#463834";
    messageSection.style.border = "thick #81726A solid";
    messageHeader = document.createElement("h1");
    messageHeader.innerHTML = "Messages";
    messageSection.prepend(messageHeader);
  };

  //Creates a new list item for message to be appended to
  messageList = messageSection.querySelector("ul");
  newMessage = document.createElement("li");
  newMessage.setAttribute("class", "messages");
  
  mailLink = document.createElement("a");
  mailLink.innerHTML = name;
  mailLink.href = `mailto:${email}`;
  mailLink.style.color = "#81726A";

  messagePadding = document.createElement("span");
  messagePadding.innerHTML = " wrote: "
  messagePadding.style.color = "#463834";

  messageDisplay = document.createElement("span");
  messageDisplay.innerHTML = message;
  messageDisplay.style.color = "#463834";

  newMessage.appendChild(mailLink);
  newMessage.appendChild(messagePadding);
  newMessage.appendChild(messageDisplay);

  //Adds edit button to each new message
  editButton = document.createElement("button");
  editButton.innerText = "edit";
  editButton.type = "button";

  //Edit button edits the message it has been appended to
  editButton.addEventListener("click", function () {
    self = this;
    currentMessage = self.parentNode.querySelector("li > span:nth-of-type(2)").textContent;
    editedMessage = prompt("Please edit your message:", `${currentMessage}`);
    if (editedMessage == null) {
      editedMessage = currentMessage;
    };
    self.parentNode.querySelector("li > span:nth-of-type(2)").innerHTML = editedMessage;
  });
  
  //Adds remove button to each new message
  removeButton = document.createElement("button");
  removeButton.innerText = "remove";
  removeButton.type = "button";

  //Remove button removes the message it has been appended to from the DOM
  removeButton.addEventListener("click", function () {
    self = this;
    entry = self.parentNode;
    entry.remove();
    if (messageSection.querySelector("ul").innerHTML.trim() == "") {
      messageHeader.remove();
      messageSection.style.backgroundColor = "#D9F9A5";
      messageSection.style.border = "none";
    };
  });

  //Adds buttons and message to the new list item then adds the new list item to the list
  newMessage.appendChild(editButton);
  newMessage.appendChild(removeButton);
  messageList.appendChild(newMessage);

  messageForm.reset();
});

//Portfolio projects
portfolioProjects = ["calculator-two", "etch-a-sketch-two", "hangman", "landing-page-2", "mastermind-2", "tic-tac-toe-three"];

//Fetch GitHub repositories
fetch("https://api.github.com/users/themagicianking/repos?per_page=100")
  .then(response => response.json())
  .then(data => {
    repositories = data;
    console.log(repositories);
    projectSection = document.getElementById("projects");
    projectList = projectSection.querySelector("ul");
    repositories.filter((repo) => portfolioProjects.includes(repo.name)).forEach((repo) => {
      project = document.createElement("li");
      projectDescription = document.createElement("span");
      projectDescription.innerText = " — " + repo.description;
      projectLink = document.createElement("a");
      projectLink.innerText = repo.name;
      projectLink.href = repo.html_url;
      project.appendChild(projectLink);
      project.appendChild(projectDescription);
      projectList.appendChild(project);
    });
  })
  .catch(error => {
    errorMessage = document.createElement("li");
    errorMessage.innerText = "There was an error loading projects.";
    projectList.appendChild(errorMessage);
  });
