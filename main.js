// first we want to store the details that we given in the forms

// so first create an empty array to store data. so it stores id,name and email as object.

let contacts=[];  // when each time we add data that will push into this array  


// after we enter data that details should display on the contact list. 
// create a function to display current list of contact on page

//each time contact array changes,this function will refresh the display by clearing it and re-adding details.

function readAll(){
    // we want to access the html element of  of the div that show the contact details

    const contactList=document.getElementById('contactsList');
    contactList.innerHTML='';  // clear previous data in the contactlist

    //create a loop for contacts array and create a div to hold the informations of  the contact details

    contacts.forEach((contact,index)=>{

        //we want to insery a html structure inside contact list
        const contactCard=document.createElement('div');

        //create a card to display details
        contactCard.classList.add('contact-card')
        contactCard.innerHTML=`
        <h3>${contact.name}</h3>
        <div class="contact-info">
           <p><strong>ID:</strong> <span>${contact.id}</span></p>
           <p><strong>Email:</strong> <span>${contact.email}</span></p>
           <p><strong>Phone Number::</strong> <span>${contact.number}</span></p>
        </div>
        <div class="contact-actions">
           <button class="btn-edit" onclick="editContact(${index})">Edit</button>
           <button class="btn-delete" onclick="deleteContact(${index})">Delete</button>
        </div>

        `;

        // then add this contact card to cardlist div

        contactList.appendChild(contactCard);

    });

}


// Function to generate a unique ID ie, automatically generating id.
function generateUniqueId() {
    return `id-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}







// we want to check the email is in correct format

function validateEmail(email){

     //^ for to check if it matches for beginning all condition small chrcra-z the capital A-z ,then numbers and special charctrs.
     // $ it checks end conditions are matching ie @gmail&.com
    const emailPattern= /^[a-zA-Z0-9.%_+-]+@gmail\.com$/; 
    return emailPattern.test(email); // test email that it satisfies the pattern or not . it maches return true. else false
}


// we want to add details when we click add contacts 

function add(){

    //prevent the form from reloading the page.ie, default action of form submission
    event.preventDefault();

   

    //generate a unique id
    const id = generateUniqueId();
     //first we want to take values from form fields

    
    const name=document.getElementById('contactName').value;
    const email=document.getElementById('contactEmail').value;
    const number=document.getElementById('contactNumber').value;

    // then we want to validate email. if it is not valid give an alert and stop the function

    if(!validateEmail(email)){
        alert('Please enter a valid Gmail address (e.g., example@gmail.com).');
        return;

    }

    // the add details should be add to contacts
    // first check all fields are filled

    if(id && name && email && number){
        // create a new object to add new contact details

        const newContact={id,name,email,number};
        //push this into contact array
        contacts.push(newContact);
        //update the contact llist display
        readAll();
        //clear form fields
        clearForm();
    }


}

//we want define clearform function
function clearForm(){

    //clear all fields
   
    document.getElementById('contactName').value='';
    document.getElementById('contactEmail').value='';
    document.getElementById('contactNumber').value='';

}


// after adding details we have two options add and delete

// function to delete a contact from contacts array by index number

function deleteContact(index){
    contacts.splice(index,1);  // delete that index position contact and count is 1
    readAll(); //update the displayed contact list
}



// function to edit contacts in thee contacts by index 


function editContact(index){
    //we want to take that contact object from specified index

    const contact= contacts[index];

    //set current name , email and phn no in form fields

   
    document.getElementById('contactName').value=contact.name;
    document.getElementById('contactEmail').value=contact.email;
    document.getElementById('contactNumber').value=contact.number;

    // add contact then changes to update contact
    //first access that button and assign to a variable

    const addButton=document.querySelector('.btn-primary');
    //change text in button

    addButton.textContent='Update';
    // then change its onclick event to cal update contact instead of add

    addButton.onclick=function(){
        updateContact(index);
    };


}

// we want define the function for update contact
//it is similar to add function

function updateContact(index){


    event.preventDefault(); // Ensure form does not submit on update

   
    const name=document.getElementById('contactName').value;
    const email=document.getElementById('contactEmail').value;
    const number=document.getElementById('contactNumber').value;

    //validate email

    if (!validateEmail(email)) {
        alert('Please enter a valid Gmail address (e.g., example@gmail.com).');
        return;
    }

    //then first check all fields are filled and then update to contact

    if( name && email && number){

        //update that specified index contact in the contacts array

        contacts[index].name=name;
        contacts[index].email=email;
        contacts[index].number=number;
        // contacts[index]= {id, name,email};
        readAll();
        clearForm();

        // after click update button the button again changes to add 

        const addButton=document.querySelector('.btn-primary');
        addButton.textContent='Submit';
        //resets its original onclick event add
        addButton.onclick=add;

        
        
    }
    
    
}

//then display the current contact when the page loads
readAll();


