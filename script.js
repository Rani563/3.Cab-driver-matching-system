// ==========================================
// CAB DRIVER MATCHING SYSTEM
// ==========================================


// Driver data

let drivers = [

    {
        id: 1,
        name: "Ravi",
        cab: "AP 21 AB 1234",
        x: 2,
        y: 3,
        available: true
    },

    {
        id: 2,
        name: "Suresh",
        cab: "AP 21 CD 5678",
        x: 7,
        y: 5,
        available: true
    },

    {
        id: 3,
        name: "Kiran",
        cab: "AP 21 EF 9012",
        x: 4,
        y: 8,
        available: true
    },

    {
        id: 4,
        name: "Prakash",
        cab: "AP 21 GH 3456",
        x: 10,
        y: 2,
        available: false
    },

    {
        id: 5,
        name: "Anil",
        cab: "AP 21 IJ 7890",
        x: 1,
        y: 6,
        available: true
    }

];


// ==========================================
// DISTANCE CALCULATION
// ==========================================

// Euclidean distance

function calculateDistance(
    x1,
    y1,
    x2,
    y2
) {

    const dx = x1 - x2;

    const dy = y1 - y2;

    return Math.sqrt(
        dx * dx + dy * dy
    );
}


// ==========================================
// FIND NEARBY DRIVERS
// ==========================================

function findDrivers() {

    const passengerX =
        Number(
            document.getElementById(
                "passengerX"
            ).value
        );


    const passengerY =
        Number(
            document.getElementById(
                "passengerY"
            ).value
        );


    if (
        isNaN(passengerX) ||
        isNaN(passengerY)
    ) {

        alert(
            "Please enter passenger coordinates."
        );

        return;
    }


    // Only available drivers

    let availableDrivers =
        drivers
            .filter(
                driver =>
                    driver.available
            )
            .map(
                driver => {

                    const distance =
                        calculateDistance(
                            passengerX,
                            passengerY,
                            driver.x,
                            driver.y
                        );


                    return {

                        ...driver,

                        distance:
                            distance

                    };

                }
            );


    // Sort by distance

    availableDrivers.sort(
        (a, b) =>
            a.distance -
            b.distance
    );


    displayDrivers(
        availableDrivers
    );


    // Match nearest driver

    if (
        availableDrivers.length === 0
    ) {

        document.getElementById(
            "matchResult"
        ).innerHTML =

            "❌ No available drivers.";

        return;
    }


    const nearest =
        availableDrivers[0];


    document.getElementById(
        "matchResult"
    ).innerHTML = `

        <strong>🚕 Driver Matched!</strong>

        <br><br>

        Driver:
        ${nearest.name}

        <br>

        Cab:
        ${nearest.cab}

        <br>

        Distance:
        ${nearest.distance.toFixed(2)}
        km

        <br><br>

        <button onclick="bookDriver(${nearest.id})">
            Book Driver
        </button>

    `;

}


// ==========================================
// DISPLAY DRIVERS
// ==========================================

function displayDrivers(
    driverArray = drivers
) {

    const container =
        document.getElementById(
            "driverList"
        );


    container.innerHTML = "";


    if (
        driverArray.length === 0
    ) {

        container.innerHTML =
            "<p>No drivers found.</p>";

        return;
    }


    driverArray.forEach(
        driver => {

            const div =
                document.createElement(
                    "div"
                );


            div.className =
                "driver";


            div.innerHTML = `

                <h3>
                    🚕 ${driver.name}
                </h3>

                <p>
                    <strong>Cab:</strong>
                    ${driver.cab}
                </p>

                <p>
                    Location:
                    (${driver.x},
                    ${driver.y})
                </p>

                ${
                    driver.distance !== undefined
                    ?
                    `<p>
                        Distance:
                        ${driver.distance.toFixed(2)}
                        km
                    </p>`
                    :
                    ""
                }

                <p class="${
                    driver.available
                    ? "available"
                    : "busy"
                }">

                    ${
                        driver.available
                        ? "● Available"
                        : "● Busy"
                    }

                </p>

            `;


            container.appendChild(
                div
            );

        }
    );

}


// ==========================================
// BOOK DRIVER
// ==========================================

function bookDriver(
    driverId
) {

    const driver =
        drivers.find(
            d =>
                d.id === driverId
        );


    if (!driver) {

        return;
    }


    if (!driver.available) {

        alert(
            "Driver is already busy."
        );

        return;
    }


    driver.available = false;


    document.getElementById(
        "matchResult"
    ).innerHTML = `

        <strong>
            ✅ Cab Booked Successfully!
        </strong>

        <br><br>

        Driver:
        ${driver.name}

        <br>

        Cab:
        ${driver.cab}

        <br><br>

        Driver is now unavailable.

    `;


    displayDrivers();

}


// ==========================================
// ADD NEW DRIVER
// ==========================================

function addDriver() {

    const name =
        document.getElementById(
            "driverName"
        ).value.trim();


    const cab =
        document.getElementById(
            "cabNumber"
        ).value.trim();


    const x =
        Number(
            document.getElementById(
                "driverX"
            ).value
        );


    const y =
        Number(
            document.getElementById(
                "driverY"
            ).value
        );


    if (
        name === "" ||
        cab === "" ||
        isNaN(x) ||
        isNaN(y)
    ) {

        alert(
            "Please enter all driver details."
        );

        return;
    }


    const newDriver = {

        id:
            drivers.length + 1,

        name:
            name,

        cab:
            cab,

        x:
            x,

        y:
            y,

        available:
            true

    };


    drivers.push(
        newDriver
    );


    alert(
        "Driver added successfully!"
    );


    // Clear inputs

    document.getElementById(
        "driverName"
    ).value = "";

    document.getElementById(
        "cabNumber"
    ).value = "";

    document.getElementById(
        "driverX"
    ).value = "";

    document.getElementById(
        "driverY"
    ).value = "";


    displayDrivers();

}


// Display drivers when page loads

displayDrivers();