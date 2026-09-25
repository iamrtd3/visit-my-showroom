// Vehicle Dataset matching provided images
const vehiclesData = [
    {
        id: "bmw-m5",
        name: "BMW M5 Sports Sedan",
        category: "car",
        price: "₹1,98,00,000",
        image: "images/bmwm5car1.jpg",
        engine: "4.4L Twin-Turbo V8",
        power: "600 HP @ 6000 rpm",
        torque: "750 Nm",
        transmission: "8-Speed Automatic (M Steptronic)",
        seating: "5 Seater",
        fuel: "Petrol"
    },
    {
        id: "dodge-challenger",
        name: "Dodge Challenger SRT",
        category: "car",
        price: "₹85,00,000",
        image: "images/srtcar2.jpg",
        engine: "5.7L HEMI V8",
        power: "375 HP @ 5150 rpm",
        torque: "556 Nm",
        transmission: "8-Speed Automatic / 6-Speed Manual",
        seating: "5 Seater",
        fuel: "Petrol"
    },
    {
        id: "toyota-86",
        name: "Toyota 86 / Subaru BRZ",
        category: "car",
        price: "₹48,00,000",
        image: "images/superacar3.jpg",
        engine: "2.4L Naturally Aspirated Boxer-4",
        power: "228 HP @ 7000 rpm",
        torque: "250 Nm",
        transmission: "6-Speed Manual / Automatic",
        seating: "4 Seater (2+2)",
        fuel: "Petrol"
    },
    {
        id: "royal-enfield-hunter",
        name: "Royal Enfield Hunter 350",
        category: "bike",
        price: "₹1,70,000",
        image: "images/royalbike1.jpg",
        engine: "349 cc Single Cylinder Air-Oil Cooled",
        power: "20.2 HP @ 6100 rpm",
        torque: "27 Nm",
        transmission: "5-Speed Manual",
        seating: "2 Seater",
        fuel: "Petrol"
    },
    {
        id: "triumph-daytona",
        name: "Triumph Daytona 675",
        category: "bike",
        price: "₹11,50,000",
        image: "images/Kawasaki _Ninja_H2Rbike2.jpg",
        engine: "675 cc Inline 3-Cylinder",
        power: "126 HP @ 12500 rpm",
        torque: "74 Nm",
        transmission: "6-Speed Manual",
        seating: "2 Seater",
        fuel: "Petrol"
    },
    {
        id: "ducati-superleggera",
        name: "Ducati Superleggera V4",
        category: "bike",
        price: "₹1,12,00,000",
        image: "images/Superleggera_V4bike3.jpg",
        engine: "998 cc Desmosedici Stradale R V4",
        power: "234 HP @ 15250 rpm",
        torque: "119 Nm",
        transmission: "6-Speed Manual (Ducati Quick Shift)",
        seating: "1 Seater (Single Track)",
        fuel: "Petrol"
    }
];

// Display vehicles in showroom.html
function displayVehicles(filterCategory = "all", searchQuery = "") {
    const container = document.getElementById("vehicleContainer");
    if (!container) return;

    container.innerHTML = "";

    const filtered = vehiclesData.filter(v => {
        const matchesCategory = filterCategory === "all" || v.category === filterCategory;
        const matchesSearch = v.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
        container.innerHTML = "<p>No vehicles found matching your criteria.</p>";
        return;
    }

    filtered.forEach(vehicle => {
        const card = document.createElement("div");
        card.className = `vehicle-card ${vehicle.category}`;
        card.innerHTML = `
            <img src="${vehicle.image}" alt="${vehicle.name}">
            <h2>${vehicle.name}</h2>
            <p>${vehicle.price}</p>
            <button class="btn" onclick="viewVehicle('${vehicle.id}')">View Details</button>
        `;
        container.appendChild(card);
    });
}

function viewVehicle(id) {
    const selected = vehiclesData.find(v => v.id === id);
    if (selected) {
        localStorage.setItem("selectedVehicleData", JSON.stringify(selected));
        localStorage.setItem("selectedVehicle", selected.name);
        window.location.href = "details.html";
    }
}

function filterVehicles(category) {
    const searchVal = document.getElementById("searchBox") ? document.getElementById("searchBox").value : "";
    displayVehicles(category, searchVal);
}

function searchVehicles() {
    const searchVal = document.getElementById("searchBox").value;
    const activeCategory = document.querySelector(".filter-buttons .active")?.getAttribute("data-category") || "all";
    displayVehicles(activeCategory, searchVal);
}

// Auto-run on showroom page load
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("vehicleContainer")) {
        displayVehicles();
    }
});