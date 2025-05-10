const express = require('express');
const app = express();

// السماح بأي طلب
app.use(require('cors')());

app.get("/", (req, res) => {
  res.send("Hello Timestamp Microservice!");
});

// 📅 API للتاريخ
app.get("/api/:date?", (req, res) => {
  let dateInput = req.params.date;

  let date;
  if (!dateInput) {
    date = new Date(); // التاريخ الحالي
  } else if (!isNaN(dateInput)) {
    // لو الرقم عبارة عن يونكس
    date = new Date(parseInt(dateInput));
  } else {
    date = new Date(dateInput);
  }

  // التحقق من صلاحية التاريخ
  if (date.toString() === "Invalid Date") {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  }
});

// ✅ تشغيل السيرفر
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
