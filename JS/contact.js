emailjs.init({
    publicKey: "vTiBoPb2HE35MdoE_"
});

const emailForm = document.getElementById("emailForm");
const formStatus = document.getElementById("formStatus");
const sendButton = document.getElementById("sendButton");

emailForm.addEventListener("submit", async function(event){
    event.preventDefault();

    const formData = new FormData(emailForm);

    for(const field of ["from_name", "from_email", "subject", "message"]) {
        if (!String(formData.get(field) || "").trim()){
            formStatus.textContent = "Please fill in all fields.";
            formStatus.style.color = "red";
            return;
        }
    }

    sendButton.disabled = true;
    sendButton.textContent = "Sending...";

    formStatus.textContent = "";


    try {
        await emailjs.sendForm(
            "service_tf1ypyj",
            "template_75z02ex",
            emailForm
        );

        formStatus.textContent =
            "Message sent successfully! Thank you for contacting me.";
        formStatus.style.color = "green";
        emailForm.reset();
    } catch(error){
        console.error("EmailJS Error:", error);

        formStatus.textContent = 
            "Unable to send your message. Please try again.";
        formStatus.style.color = "red";


    }  finally {
        sendButton.disabled = false;
        sendButton.textContent = "Send Message";
    }
})