let isAdmin = false;

// Navigation
function showLogin() {
  hideAll();
  document.getElementById("userLoginPage").classList.remove("hidden");
}

function showAdminLogin() {
  hideAll();
  document.getElementById("adminLoginPage").classList.remove("hidden");
}

function hideAll() {
  document.querySelectorAll(".container").forEach(c => c.classList.add("hidden"));
}

// ---------------- USER LOGIN ----------------
function sendUserOTP() {
  const mobile = document.getElementById("userMobile").value;
  if (!/^\d{10}$/.test(mobile)) return alert("Enter valid 10-digit number");

  const otp = Math.floor(1000 + Math.random() * 9000);
  localStorage.setItem("userOTP", otp);
  alert("OTP Sent: " + otp);

  document.getElementById("userLoginPage").classList.add("hidden");
  document.getElementById("userOTPPage").classList.remove("hidden");
}

function verifyUserOTP() {
  const entered = document.getElementById("userOTPInput").value;
  const actual = localStorage.getItem("userOTP");
  if (entered === actual) {
    alert("✅ Verified");
    isAdmin = false;
    showMainApp();
  } else {
    alert("❌ Incorrect OTP");
  }
}

// ---------------- USER APP ----------------
function showMainApp() {
  hideAll();
  isAdmin
    ? document.getElementById("adminHomePage").classList.remove("hidden")
    : document.getElementById("userHome").classList.remove("hidden");
}

function showBookingForm() {
  hideAll();
  document.getElementById("bookingFormPage").classList.remove("hidden");
}

function submitBooking() {
  const gas = document.getElementById("gasType").value;
  const date = document.getElementById("bookingDate").value;
  if (!gas || !date) return alert("Enter all fields");

  const bookings = JSON.parse(localStorage.getItem("userBookings")) || [];
  bookings.push({ gas, date, status: "Pending" });
  localStorage.setItem("userBookings", JSON.stringify(bookings));

  document.getElementById("bookingFormPage").classList.add("hidden");
  document.getElementById("userHome").classList.remove("hidden");

  const msg = document.getElementById("bookingConfirm");
  msg.classList.remove("hidden");
  setTimeout(() => msg.classList.add("hidden"), 3000);
}

function showHistory() {
  hideAll();
  const bookings = JSON.parse(localStorage.getItem("userBookings")) || [];
  const list = document.getElementById("historyList");
  list.innerHTML = "";

  bookings.forEach((b, i) => {
    list.innerHTML += `
      <div class="booking-card">
        <strong>#${i + 1}</strong><br/>
        Gas: ${b.gas}<br/>
        Date: ${b.date}<br/>
        Status: ${b.status}
      </div>`;
  });

  document.getElementById("historyPage").classList.remove("hidden");
}

function requestExtraCylinder() {
  const mobile = document.getElementById("userMobile").value || "User";
  const requests = JSON.parse(localStorage.getItem("extraRequests")) || [];
  requests.push({ user: mobile, requestDate: new Date().toLocaleDateString(), approved: false });
  localStorage.setItem("extraRequests", JSON.stringify(requests));
  alert("Extra cylinder request sent.");
}

function backToHome() {
  showMainApp();
}

// ---------------- ADMIN LOGIN ----------------
function validateAdmin() {
  const u = document.getElementById("adminUsername").value;
  const p = document.getElementById("adminPassword").value;
  if (u === "admin" && p === "admin123") {
    const otp = Math.floor(1000 + Math.random() * 9000);
    localStorage.setItem("adminOTP", otp);
    alert("Admin OTP: " + otp);

    document.getElementById("adminLoginPage").classList.add("hidden");
    document.getElementById("adminOTPPage").classList.remove("hidden");
  } else {
    alert("Wrong admin credentials");
  }
}

function verifyAdminOTP() {
  const entered = document.getElementById("adminOTPInput").value;
  const actual = localStorage.getItem("adminOTP");
  if (entered === actual) {
    isAdmin = true;
    showMainApp();
  } else {
    alert("Incorrect OTP");
  }
}

// ---------------- ADMIN FUNCTIONS ----------------
function viewAllBookings() {
  hideAll();
  const bookings = JSON.parse(localStorage.getItem("userBookings")) || [];
  const list = document.getElementById("adminBookingList");
  list.innerHTML = "";

  bookings.forEach((b, i) => {
    list.innerHTML += `
      <div class="booking-card">
        <strong>#${i + 1}</strong><br/>
        Gas: ${b.gas}<br/>
        Date: ${b.date}<br/>
        Status: ${b.status}
      </div>`;
  });

  document.getElementById("allBookingsPage").classList.remove("hidden");
}

function viewExtraRequests() {
  hideAll();
  const requests = JSON.parse(localStorage.getItem("extraRequests")) || [];
  const list = document.getElementById("adminExtraList");
  list.innerHTML = "";

  requests.forEach((r, i) => {
    list.innerHTML += `
      <div class="booking-card">
        #${i + 1} - ${r.user} - ${r.requestDate}
        ${r.approved ? "✅ Approved" : `<button onclick="approveExtra(${i})">Approve</button>`}
      </div>`;
  });

  document.getElementById("extraRequestsPage").classList.remove("hidden");
}

function approveExtra(index) {
  const requests = JSON.parse(localStorage.getItem("extraRequests")) || [];
  requests[index].approved = true;
  localStorage.setItem("extraRequests", JSON.stringify(requests));
  viewExtraRequests();
}

function viewBookingStatus() {
  hideAll();
  const bookings = JSON.parse(localStorage.getItem("userBookings")) || [];
  const confirmed = bookings.filter(b => b.status === "Confirmed").length;
  const pending = bookings.filter(b => b.status === "Pending").length;

  document.getElementById("bookingStatusList").innerHTML = `
    <p>✅ Confirmed: ${confirmed}</p>
    <p>⌛ Pending: ${pending}</p>
    <p>📦 Total: ${bookings.length}</p>
  `;
  document.getElementById("statusPage").classList.remove("hidden");
}

function backToAdmin() {
  showMainApp();
}
