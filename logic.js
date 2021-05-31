//declare variables
const giphySearchButton = document.getElementById("search");
const animalArray = ["zebra", "dogs", "pigs", "sloth", "guinea-pig", "platypus", "kangaroo", "elephant", "chipmunk"];
const animalContainer = document.getElementById("animal-images");

let input = document.querySelector("#user-input");
let resultIDs = [];

const renderBtns = () => {
    animalArray.forEach(function(item) {
        const buttons = $("<button>");
        buttons.addClass("btn-large");
        buttons.attr("data-animal", item);
        buttons.text(item);
        $("#button-holder").append(buttons);
    })
}

const addButton = (name) => {
    if (animalArray.indexOf(name) === (-1)) {
        animalArray.push(name);
        const btn = $('<button>');
        btn.addClass("btn-large");
        btn.attr("data-animal", name);
        btn.text(name);
        $("#button-holder").append(btn);
        addSearchEvent();
    } else {
        console.log("This button already exists.")
    };
}

const toggleState = function(group) {
    $('body').on('click', '.giphyImages', function (event) {
        event.stopPropagation()
        event.preventDefault();
        const i = $(this).attr('id');
        const pictureState = $(this).attr('state');
        console.log("clicking")
        //check through all objects in group and save the one where i is equal to id. then access the corresponding keys of movingImage and stillImage
        for (let item of group) {
            if (item.id === i) {
                console.log(item)
                const movingLink = item.movingImage;
                const stillLink = item.stillImage;
                if (pictureState == 'still') {
                    event.target.setAttribute('src', movingLink);
                    event.target.setAttribute('state', 'moving');
                } else if (pictureState == 'moving') {
                    event.target.setAttribute('src', stillLink);
                    event.target.setAttribute('state', 'still');
                }
            }
        }
    })
};



const displayArr = (photoArr, searchN) => {
    let imagesArr = [];
    console.log(photoArr)

    // eliminate duplicates by saving to new array
    let unique = [];
    let photoDiv = document.querySelector(".giphyImages")
    if (photoDiv !== null) {
        for (let i in photoArr) {
            if (resultIDs.indexOf(photoArr[i].id) === -1) {
                unique.push(photoArr[i])
            }
        }
    } else {
        for (let i in photoArr) {
            unique.push(photoArr[i])
        }
    }
   unique.forEach((item) => {
        const movingImage = item.images.fixed_height.url;
        const stillImage = item.images.fixed_height_still.url;
        //Giving each item a unique id
        const imageObj = { movingImage: movingImage, stillImage: stillImage, id: item.id };
        const img = `<img class="giphyImages" data-searchterm="${searchN}" id="${item.id}" src="${stillImage}" class="still"></img>`;
        $("#animal-images").append(img)
        imagesArr.push(imageObj);
        return imagesArr;
    })
    toggleState(imagesArr)
    console.log(imagesArr);
};

// event listener for search 
giphySearchButton.addEventListener("click", () => {
    $("#animal-images").empty();
    $("#find-more").empty();
    const searchReq = document.getElementById("user-input").value;
    const queryURL = `https://api.giphy.com/v1/gifs/search?q= ${searchReq} &api_key=P1UxBlMCbh1oybrMn1pVZvc7jexNd7sE&limit=10`;
    //making AJAX call
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then((result) => {
        console.log("success got data", result);
        console.log(result.data);
        const resData = result.data
// track item Ids
        resData.forEach((item) => {
            resultIDs.push(item.id)
        })
        displayArr(resData, searchReq)
        addButton(searchReq);
        addFindMore(searchReq);
        input.value = ""
    });

});

function addFindMore(buttonReq) {
    $("#find-more").empty();
    const findMore = $("<button>");
    findMore.addClass("btn-more");
    findMore.text("Add more");
    $('#find-more').append(findMore);
    $(".btn-more").click(addMore(buttonReq));
}


const addMore = (searchParam) => {
    let search2 = "https://api.giphy.com/v1/gifs/search?q=" + searchParam + "&api_key=P1UxBlMCbh1oybrMn1pVZvc7jexNd7sE&limit=15";
    $(".btn-more").click((event => {
        $.ajax({
            url: search2,
            method: "GET"
        }).then((result) => {
            const arr2 = result.data

            //add only new items
            let newItems = [];
            for (let i in arr2) {
                if (resultIDs.indexOf(arr2[i].id) === -1)
                  newItems.push(arr2[i])  
            }
            console.log(newItems);
            disable();
            displayArr(newItems, searchParam);
        })
    }))
};

const addSearchEvent = () => {
    $(".btn-large").click((event) => {

        $("#animal-images").empty();
        $("#find-more").empty();
        let buttonReq = event.target.textContent;
        let searchURL = "https://api.giphy.com/v1/gifs/search?q=" + buttonReq + "&api_key=P1UxBlMCbh1oybrMn1pVZvc7jexNd7sE&limit=5";
        //making AJAX call
        $.ajax({
            url: searchURL,
            method: "GET"
        }).then((result) => {
            console.log(result.data);
            const resData2 = result.data;
            displayArr(resData2, buttonReq);

            // Ids are stored to prevent duplicates when more are added
            resData2.forEach((item) => {
                resultIDs.push(item.id)
            })
           
                addFindMore(buttonReq) 
        });
    })
};

function disable() {
    let disBtn = document.querySelector(".btn-more")
    disBtn.disabled = true;
}


function clearInput() {
    input.value = "";
}
// create starting buttons
renderBtns();

//add event listener to animal buttons
addSearchEvent();

clearInput();