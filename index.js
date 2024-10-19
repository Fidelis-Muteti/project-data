const baseUrl = "http://localhost:3000/Dogs"
 document.addEventListener("DOMContentLoaded", () => {
    let dogDiv = document.getElementById("dogs");
    
    
    fetch(baseUrl)  
        .then(response => response.json())
        .then(data => {
            data.forEach(dog => {
                displayDogs(dog)
            })
                
        })   
        .catch(error => console.log(error)); 
    
    let form = document.querySelector("#add-form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let formData =new FormData(e.target)
        let dogObj = {
            breed:formData.get("breed"),
            image_url: formData.get("image"),
            price: parseInt(formData.get("price")),
            description: formData.get("description"),
        }
        fetch(baseUrl,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dogObj)
        })
        .then(res => res.json())
        .then(data => {
            alert(`${data.breed} created successfully`)
        })
        .catch(err => console.log(err))
    })
        form.reset(); 
});
function displayDogs(dogs) {
        let dogDiv = document.getElementById("dogs");
        let newDogDiv = document.createElement("div");
        newDogDiv.classList.add("dogs") 
        newDogDiv.setAttribute("data-id", dogs.id);
        
        
        newDogDiv.innerHTML = `
        <img id="image" src= "${dogs.image_url}"alt="Image of ${dogs.breed}" />
        <p>Breed: ${dogs.breed}</p>
        <p>Price: ${dogs.price}</p>
        <p>Description: ${dogs.description}</p>
           
        
       
        <button class="delete-btn">Delete</button>
        `;
        dogDiv.appendChild(newDogDiv);
        let deleteButton = newDogDiv.querySelector(".delete-btn");
        deleteButton.addEventListener("click", () => {
            deleteDog(dogs.id, newDogDiv); 
        });
}   
    
    
    function deleteDog(id, dogElement){
        fetch(`${baseUrl}/${id}`,{
            method: "DELETE",
        })
        .then(res => res.json())
        .then(() => {
            alert("Deleted Successfully")
            dogElement.remove();
        })
        .catch(err => console.log(err))
    }
    function editDog(e, form, id){
        e.preventDefault()
        let formData = new FormData(form)
            let dogObject = {
                breed:formData.get("breed"),
                image_url: formData.get("image"),
                price: parseInt(formData.get("price")),
                description:formData.get("description"),
            }
            fetch(`${baseUrl}/${id}`,{
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dogObject)
            })
            .then(res => res.json())
            .then(data => {
                alert(`${data.breed} updated successfully`);
                document.getElementById("dogs").innerHTML = "";
        fetchDogs();
            })
            .catch(err => console.log(err))
        }