const express = require("express");
const cors = require("cors");
const SSLCommerzPayment = require("sslcommerz-lts");
const app = express();
const store_id = "testbox";
const store_passwd = "qwerty";
const is_live = false;
const port = 3000;

app.use(cors())
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post('/pay', async (req, res) => {
  try {
    const SSLCz = new SSLCommerzPayment(
      store_id,
      store_passwd,
      is_live,
    );

    const data = {
      total_amount: 100,
      currency: "BDT",
      tran_id: Date.now().toString(),
      success_url: "http://localhost:5000/success",
      fail_url: "http://localhost:5000/fail",
      cancel_url: "http://localhost:5000/cancel",
      product_name: "React Course",
      product_category: "Education",
      product_profile: "general",
      cus_name: "Ostad Studen",
      cus_email: "student12@example.com",
      cus_add1: "Mirpur",
      // cus_add2: 'Dhaka',
      cus_city: "Dhaka",
      cus_postcode: "1207",
      cus_country: "Bangladesh",
      cus_phone: "01700000000",
      shipping_method: "NO",
    };

    const response = await SSLCz.init(data);
    res.json(response);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the payment." });
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
