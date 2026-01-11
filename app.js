document.getElementById("bookingForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  // Collect form data
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());

  try {
    const res = await fetch("http://localhost:5001/book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    // 🔴 IMPORTANT: handle non-JSON responses safely
    if (!res.ok) {
      throw new Error("Server responded with status " + res.status);
    }

    const result = await res.json();
    console.log("Booking response:", result);

    if (result.success === true) {
      alert("Booking confirmed successfully");
      e.target.reset(); // optional: clear form
    } else {
      alert("Booking failed");
    }

  } catch (err) {
    console.error("Booking error:", err);
    alert("Booking failed");
  }
});
