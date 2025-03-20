let api = 'https://v6.exchangerate-api.com/v6/5d7f41e1a09925068fe3b693/latest/USD';
const formdropdown = document.getElementById("form-currency-select");
const todropdown = document.getElementById("to-currency-select");
const result = document.getElementById("result"); // เพิ่มตัวเลือกสำหรับผลลัพธ์

// รายการสกุลเงิน (ต้องกำหนดเอง)
const currencies = [
    "AFN", "EUR", "ALL", "DZD", "USD", "AOA", "XCD", "ARS", "AMD", "AWG", "AUD",
    "AZN", "BSD", "BHD", "BDT", "BBD", "BYN", "BZD", "XOF", "BMD", "INR", "BTN",
    "BOB", "BOV", "BAM", "BWP", "NOK", "BRL", "BND", "BGN", "BIF", "CVE", "KHR",
    "XAF", "CAD", "KYD", "CLP", "CLF", "CNY", "COP", "COU", "KMF", "CDF", "NZD",
    "CRC", "CUP", "CUC", "ANG", "CZK", "DKK", "DJF", "DOP", "EGP", "SVC", "ERN",
    "SZL", "ETB", "FKP", "FJD", "XPF", "GMD", "GEL", "GHS", "GIP", "GTQ", "GBP",
    "GNF", "GYD", "HTG", "HNL", "HKD", "HUF", "ISK", "IDR", "XDR", "IRR", "IQD",
    "ILS", "JMD", "JPY", "JOD", "KZT", "KES", "KPW", "KRW", "KWD", "KGS", "LAK",
    "LBP", "LSL", "ZAR", "LRD", "LYD", "CHF", "MOP", "MKD", "MGA", "MWK", "MYR",
    "MVR", "MRU", "MUR", "XUA", "MXN", "MXV", "MDL", "MNT", "MAD", "MZN", "MMK",
    "NAD", "NPR", "NIO", "NGN", "OMR", "PKR", "PAB", "PGK", "PYG", "PEN", "PHP",
    "PLN", "QAR", "RON", "RUB", "RWF", "SHP", "WST", "STN", "SAR", "RSD", "SCR",
    "SLE", "SGD", "SBD", "SOS", "SSP", "LKR", "SDG", "SRD", "SEK", "TWD", "TJS",
    "TZS", "THB", "TOP", "TTD", "TND", "TRY", "TMT", "UGX", "UAH", "AED", "UYU",
    "UZS", "VUV", "VES", "VND", "YER", "ZMW"
];

// เติมค่าลงใน dropdown ทั้งสอง
currencies.forEach((currency) => {
    const option1 = document.createElement("option");
    option1.value = currency;
    option1.text = currency;
    formdropdown.add(option1);

    const option2 = document.createElement("option");
    option2.value = currency;
    option2.text = currency;
    todropdown.add(option2);
});

// ตั้งค่า default value
formdropdown.value = "USD";
todropdown.value = "THB";

// ฟังก์ชันแปลงค่าเงิน
let convertCurrency = () => {
    const amount = document.querySelector("#amount").value.trim(); // ตัดช่องว่าง
    const formcurrency = formdropdown.value;
    const tocurrency = todropdown.value;

    // ตรวจสอบว่ามีการป้อนจำนวนเงิน
    if (amount.length !== 0 && !isNaN(amount)) {
        fetch(api)
            .then((resp) => resp.json())
            .then((data) => {
                // ตรวจสอบว่ามีอัตราแลกเปลี่ยนสำหรับสกุลเงินที่เลือก
                if (data.conversion_rates[formcurrency] && data.conversion_rates[tocurrency]) {
                    let formExchangeRate = data.conversion_rates[formcurrency];
                    let toExchangeRate = data.conversion_rates[tocurrency];
                    const convertedAmount = (amount / formExchangeRate) * toExchangeRate;

                    // แสดงผลลัพธ์
                    result.innerHTML = `${amount} ${formcurrency} = ${convertedAmount.toFixed(2)} ${tocurrency}`;
                } else {
                    result.innerHTML = "Conversion rates not available for selected currencies.";
                }
            })
            .catch((error) => {
                console.error("Error fetching exchange rate data:", error);
                result.innerHTML = "Failed to fetch exchange rates. Please try again.";
            });
    } else {
        alert("Please enter a valid amount"); // เตือนเมื่อไม่ได้ป้อนค่าหรือป้อนค่าที่ไม่ถูกต้อง
    }
};

// เพิ่ม Event Listener ให้ปุ่ม Convert
document.querySelector("#convert").addEventListener("click", convertCurrency);

// ไม่จำเป็นต้องรัน `convertCurrency` ตอนโหลดหน้าเว็บ
