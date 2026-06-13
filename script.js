// =========================
// Scroll To Top Button
// =========================

const topBtn = document.getElementById("topBtn");

if (topBtn) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            topBtn.style.display = "block";
        } else {
            topBtn.style.display = "none";
        }
    });

    topBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}


// =========================
// Dark Mode Toggle
// =========================

const darkModeBtn = document.getElementById("darkModeBtn");

if (darkModeBtn) {
    darkModeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        // Change Icon
        const icon = darkModeBtn.querySelector("i");

        if (document.body.classList.contains("dark-mode")) {
            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");
        } else {
            icon.classList.remove("fa-sun");
            icon.classList.add("fa-moon");
        }
    });
}


// =========================
// Typing Animation
// =========================

const typingText = document.querySelector(".typing-text");

const textArray = [
    "Passionate CSE Student",
    "Aspiring Full-Stack Developer",
    "Creative App Developer",
    "Tech Enthusiast"
];

let textIndex = 0;
let charIndex = 0;

function typeEffect() {

    if (charIndex < textArray[textIndex].length) {

        typingText.textContent += textArray[textIndex].charAt(charIndex);

        charIndex++;

        setTimeout(typeEffect, 100);

    } else {

        setTimeout(eraseEffect, 1500);
    }
}

function eraseEffect() {

    if (charIndex > 0) {

        typingText.textContent =
            textArray[textIndex].substring(0, charIndex - 1);

        charIndex--;

        setTimeout(eraseEffect, 50);

    } else {

        textIndex++;

        if (textIndex >= textArray.length) {
            textIndex = 0;
        }

        setTimeout(typeEffect, 500);
    }
}

document.addEventListener("DOMContentLoaded", () => {

    if (textArray.length) {
        setTimeout(typeEffect, 1000);
    }
});


// =========================
// Navbar Active Link
// =========================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});


// =========================
// Reveal Animation On Scroll
// =========================

const revealElements = document.querySelectorAll(
    ".card, .project-card, .hero-text, .hero-image"
);

window.addEventListener("scroll", revealOnScroll);

function revealOnScroll() {

    const windowHeight = window.innerHeight;

    revealElements.forEach(element => {

        const revealTop = element.getBoundingClientRect().top;

        if (revealTop < windowHeight - 100) {

            element.classList.add("show");
        }
    });
}


// =========================
// Contact Form Alert
// =========================

const form = document.querySelector("form");

if (form) {
    form.addEventListener("submit", async (e) => {
        e.preventDefault(); // Prevent page reload

        const actionUrl = form.getAttribute("action");

        // Check if user has updated the Formspree URL
        if (!actionUrl || actionUrl.includes("YOUR_FORM_ID")) {
            alert("Please replace the Formspree URL in index.html to send emails!");
            return;
        }

        const formData = new FormData(form);

        try {
            const response = await fetch(actionUrl, {
                method: "POST",
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                alert("Message Sent Successfully!");
                form.reset();
            } else {
                alert("Oops! There was a problem sending your message.");
            }
        } catch (error) {
            alert("Oops! Network error. Please try again later.");
        }
    });
}

// =========================
// AI Chatbot Logic
// =========================
const aiChatToggle = document.getElementById("ai-chat-toggle");
const aiChatBox = document.getElementById("ai-chat-box");
const aiChatClose = document.getElementById("ai-chat-close");
const aiChatInput = document.getElementById("ai-chat-input-field");
const aiChatSend = document.getElementById("ai-chat-send");
const aiChatMessages = document.getElementById("ai-chat-messages");

if (aiChatToggle) {
    aiChatToggle.addEventListener("click", () => {
        aiChatBox.classList.remove("hidden");
    });

    aiChatClose.addEventListener("click", () => {
        aiChatBox.classList.add("hidden");
    });

    function addMessage(text, sender) {
        const msgDiv = document.createElement("div");
        msgDiv.classList.add("message");
        msgDiv.classList.add(sender === "user" ? "user-message" : "ai-message");
        msgDiv.textContent = text;
        aiChatMessages.appendChild(msgDiv);
        aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
    }

    function getAIResponse(userText) {
        const text = userText.toLowerCase();

        if (text.includes("hello") || text.includes("hi") || text.includes("hey")) {
            return "Hello! I am Fayaz's AI portfolio assistant. How can I help you?";
        } else if (text.includes("project") || text.includes("work")) {
            return "Fayaz has built several projects like Shop Ease (e-commerce), KindMeals App (food donation platform), and a Carbon Footprint Calculator. Check out the Projects section!";
        } else if (text.includes("skill") || text.includes("tech") || text.includes("know")) {
            return "Fayaz is skilled in Java, Python, C, HTML, CSS, JavaScript, Firebase, Android Development, MySQL, and more!";
        } else if (text.includes("contact") || text.includes("email") || text.includes("phone")) {
            return "You can reach Fayaz at +91 6305138534 or through the contact form at the bottom of the page.";
        } else if (text.includes("education") || text.includes("study") || text.includes("student")) {
            return "Fayaz is currently pursuing a B.Tech in Computer Science at Srinivasa Ramanujan Institute of Technology (2024 - 2028).";
        } else if (text.includes("about") || text.includes("who")) {
            return "Fayaz is a passionate Computer Science and Engineering student with a strong interest in software development, building innovative apps, and solving real-world challenges.";
        } else if (text.includes("intership") || text.includes("intership")) {
            return "I'm a 3rd Year B.Tech CSE student actively seeking internship opportunities where I can contribute, grow, and gain real-world experience. I'm available for both remote and on-site internships.";
        }
        else {
            return "That's interesting! If you want to know more about my skills, projects, or education, just ask. Otherwise, feel free to use the contact form to reach out to Fayaz directly!";
        }
    }

    function handleSend() {
        const text = aiChatInput.value.trim();
        if (text === "") return;

        addMessage(text, "user");
        aiChatInput.value = "";

        // Simulate AI thinking
        setTimeout(() => {
            const response = getAIResponse(text);
            addMessage(response, "ai");
        }, 600);
    }

    aiChatSend.addEventListener("click", handleSend);
    aiChatInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") handleSend();
    });
}

// =========================
// Scroll Progress Bar
// =========================
window.addEventListener("scroll", () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const scrollProgress = document.getElementById("scroll-progress");
    if (scrollProgress) {
        scrollProgress.style.width = scrolled + "%";
    }
});

// =========================
// Custom Cursor
// =========================
const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");

window.addEventListener("mousemove", (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    if (cursorDot && cursorOutline) {
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    }
});

const interactives = document.querySelectorAll("a, button, input, textarea, .card");
interactives.forEach(el => {
    el.addEventListener("mouseenter", () => {
        if (cursorOutline) {
            cursorOutline.style.width = "50px";
            cursorOutline.style.height = "50px";
            cursorOutline.style.backgroundColor = "rgba(79, 70, 229, 0.25)";
        }
    });
    el.addEventListener("mouseleave", () => {
        if (cursorOutline) {
            cursorOutline.style.width = "30px";
            cursorOutline.style.height = "30px";
            cursorOutline.style.backgroundColor = "transparent";
        }
    });
});

// =========================
// Firebase Integration (Optional Cloud Save)
// =========================
// To enable live saving to the cloud for all visitors:
// 1. Create a Firebase project at console.firebase.google.com
// 2. Add a Web App, copy its config below
// 3. Set up Realtime Database in your Firebase project (using 'Start in Test Mode' or set read/write rules to true)
// 4. Fill in your databaseURL and other config properties below!
const firebaseConfig = {
    apiKey: "AIzaSyDGYiauwyEbvyiTJvwydqv52C9JxwkmtUY",
    authDomain: "my-portfolio-662a5.firebaseapp.com",
    databaseURL: "https://my-portfolio-662a5-default-rtdb.firebaseio.com/",
    projectId: "my-portfolio-662a5",
    storageBucket: "my-portfolio-662a5.firebasestorage.app",
    messagingSenderId: "583696101996",
    appId: "1:583696101996:web:14e5206a1043598c4f9e49",
    measurementId: "G-9VQY34G4L9"
};

// Initialize Firebase Realtime Database if configured
let db = null;
if (typeof firebase !== 'undefined' && firebaseConfig.apiKey !== "YOUR_API_KEY" && firebaseConfig.databaseURL !== "YOUR_DATABASE_URL") {
    try {
        firebase.initializeApp(firebaseConfig);
        db = firebase.database();
        console.log("✅ Firebase connected successfully!");
    } catch (e) {
        console.error("Firebase initialization failed:", e);
    }
}

const editableSections = ["home", "about", "interests", "education", "skills", "technical-skills", "projects", "certificates", "services", "achievements", "internship", "contact", "footer"];

// Load from LocalStorage as initial quick fallback
loadFromLocalStorage();

// If Firebase is initialized, fetch the latest live sections and overwrite
if (db) {
    db.ref("portfolio/sections").once("value").then(snapshot => {
        const data = snapshot.val();
        if (data) {
            editableSections.forEach(id => {
                if (data[id]) {
                    const section = document.getElementById(id);
                    if (section) {
                        section.innerHTML = data[id];
                        // Cache it in localStorage for offline/fast load
                        localStorage.setItem(`saved_section_${id}`, data[id]);
                    }
                }
            });
        }
    }).catch(err => {
        console.error("Failed to fetch from Firebase, using localStorage:", err);
    });
}

function loadFromLocalStorage() {
    editableSections.forEach(id => {
        const savedHtml = localStorage.getItem(`saved_section_${id}`);
        if (savedHtml) {
            const section = document.getElementById(id);
            if (section) section.innerHTML = savedHtml;
        }
    });
}

// Activate editing if logged in
if (localStorage.getItem("portfolio_admin") === "true") {
    let isPreviewActive = false;
    // 1. Change Login Nav Link to Logout and add Edit Resume Link
    const navLinksList = document.querySelectorAll("nav a");
    navLinksList.forEach(link => {
        if (link.textContent.includes("LOGIN")) {
            // Create Edit Resume Link
            const editResume = document.createElement("a");
            editResume.innerHTML = '<i class="fa-solid fa-file-pen"></i> EDIT RESUME';
            editResume.href = "resume.html";
            editResume.style.color = "var(--primary)";
            editResume.style.marginRight = "15px";
            link.parentNode.insertBefore(editResume, link);

            link.innerHTML = '<i class="fa-solid fa-right-from-bracket"></i> LOGOUT';
            link.style.color = "#ff4d4d";
            link.href = "#";
            link.addEventListener("click", (e) => {
                e.preventDefault();
                localStorage.removeItem("portfolio_admin");
                window.location.reload();
            });
        }
    });

    // 2. Make elements editable and add (+) button
    editableSections.forEach(id => {
        const section = document.getElementById(id);
        if (section) {
            // Give visual feedback that it's editable
            section.style.border = "2px dashed rgba(79, 70, 229, 0.5)";
            section.style.borderRadius = "10px";
            section.style.position = "relative";

            // Add an 'Edit Mode' badge to each section
            const badge = document.createElement("div");
            badge.textContent = "✎ Edit Mode";
            badge.style.position = "absolute";
            badge.style.top = "0";
            badge.style.right = "0";
            badge.style.background = "var(--primary)";
            badge.style.color = "white";
            badge.style.padding = "2px 10px";
            badge.style.fontSize = "12px";
            badge.style.borderBottomLeftRadius = "10px";
            badge.classList.add("edit-badge");
            section.appendChild(badge);

            // Make text elements editable
            const textElements = section.querySelectorAll("h1, h2, h3, p, span, li, b, .card, .project-card, .timeline-content");
            textElements.forEach(el => {
                el.setAttribute("contenteditable", "true");
                el.style.outline = "none";
                el.addEventListener("focus", () => el.style.background = "rgba(255, 255, 255, 0.1)");
                el.addEventListener("blur", () => el.style.background = "transparent");
            });

            // Helper to make images and icons editable
            function makeMediaEditable(rootNode) {
                // Images
                const images = rootNode.querySelectorAll("img");
                images.forEach(img => {
                    img.style.cursor = "pointer";
                    img.title = "Click to upload an image or take a selfie";
                    img.addEventListener("click", () => {
                        if (isPreviewActive) return;
                        if (confirm("Click OK to Upload from Gallery / Take Photo. Click Cancel to enter a Web URL instead.")) {
                            const fileInput = document.createElement("input");
                            fileInput.type = "file";
                            fileInput.accept = "image/*";
                            fileInput.style.display = "none";

                            fileInput.addEventListener("change", (e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    // Protect localStorage limits (2MB max)
                                    if (file.size > 2 * 1024 * 1024) {
                                        alert("File is too large! Please choose an image under 2MB so it can be saved in your browser.");
                                        return;
                                    }
                                    const reader = new FileReader();
                                    reader.onload = function (event) {
                                        img.src = event.target.result; // Base64 string
                                    };
                                    reader.readAsDataURL(file);
                                }
                            });

                            document.body.appendChild(fileInput);
                            fileInput.click();
                            document.body.removeChild(fileInput);
                        } else {
                            const newUrl = prompt("Enter new image Web URL:", img.src);
                            if (newUrl) img.src = newUrl;
                        }
                    });
                });

                // FontAwesome Icons
                const icons = rootNode.querySelectorAll("i.fa-solid, i.fa-brands, i.fa-regular");
                icons.forEach(icon => {
                    if (icon.classList.contains("fa-trash") || icon.classList.contains("fa-plus")) return;
                    icon.style.cursor = "pointer";
                    icon.title = "Click to change FontAwesome icon";
                    icon.addEventListener("click", () => {
                        if (isPreviewActive) return;
                        const newClass = prompt("Enter new FontAwesome classes (e.g. 'fa-solid fa-laptop'):", icon.className);
                        if (newClass) icon.className = newClass;
                    });
                });
            }

            // Apply to existing content
            makeMediaEditable(section);

            // Add a Remove Button function
            function addRemoveButton(element) {
                if (element.querySelector(".delete-btn")) return;

                element.style.position = "relative"; // Ensure relative positioning
                const delBtn = document.createElement("button");
                delBtn.innerHTML = "<i class='fa-solid fa-trash'></i>";
                delBtn.classList.add("delete-btn", "edit-badge"); // edit-badge ensures it gets removed on save
                delBtn.style.position = "absolute";
                delBtn.style.top = "10px";
                delBtn.style.right = "10px";
                delBtn.style.background = "#ef4444"; // Solid Red
                delBtn.style.color = "white"; // White trash icon
                delBtn.style.border = "none";
                delBtn.style.borderRadius = "50%"; // Circular button
                delBtn.style.width = "30px";
                delBtn.style.height = "30px";
                delBtn.style.display = "flex";
                delBtn.style.alignItems = "center";
                delBtn.style.justifyContent = "center";
                delBtn.style.cursor = "pointer";
                delBtn.style.zIndex = "10";
                delBtn.style.boxShadow = "0 2px 8px rgba(0,0,0,0.2)";
                delBtn.style.transition = "transform 0.2s ease, background-color 0.2s ease";
                delBtn.title = "Remove this item";

                delBtn.addEventListener("mouseover", () => {
                    delBtn.style.transform = "scale(1.15)";
                    delBtn.style.background = "#dc2626";
                });
                delBtn.addEventListener("mouseout", () => {
                    delBtn.style.transform = "scale(1)";
                    delBtn.style.background = "#ef4444";
                });

                delBtn.addEventListener("click", (e) => {
                    e.stopPropagation();
                    if (confirm("Are you sure you want to remove this item?")) {
                        element.remove();
                    }
                });

                element.appendChild(delBtn);
            }

            // Add an 'Add Item' button if the section has a list/grid container
            const container = section.querySelector('.skill-box, .project-container, .timeline');
            if (container) {
                // Add remove buttons to existing items
                const existingItems = container.querySelectorAll('.card, .timeline-item, .project-card');
                existingItems.forEach(item => addRemoveButton(item));

                const addBtn = document.createElement("button");
                addBtn.innerHTML = "<i class='fa-solid fa-plus'></i> Add New Data";
                addBtn.style.display = "block";
                addBtn.style.margin = "20px auto 0";
                addBtn.style.padding = "10px 25px";
                addBtn.style.background = "var(--primary)";
                addBtn.style.color = "white";
                addBtn.style.border = "none";
                addBtn.style.borderRadius = "50px"; // Rounded pill shape
                addBtn.style.fontWeight = "bold";
                addBtn.style.cursor = "pointer";
                addBtn.style.boxShadow = "0 4px 10px rgba(79, 70, 229, 0.2)";
                addBtn.style.transition = "all 0.3s ease";
                addBtn.classList.add("edit-badge"); // Ensure it gets removed before saving

                addBtn.addEventListener("mouseover", () => {
                    addBtn.style.background = "var(--primary-light)";
                    addBtn.style.transform = "translateY(-2px)";
                    addBtn.style.boxShadow = "0 6px 15px rgba(79, 70, 229, 0.35)";
                });
                addBtn.addEventListener("mouseout", () => {
                    addBtn.style.background = "var(--primary)";
                    addBtn.style.transform = "translateY(0)";
                    addBtn.style.boxShadow = "0 4px 10px rgba(79, 70, 229, 0.2)";
                });

                addBtn.addEventListener("click", () => {
                    // Find the items inside the container
                    const items = container.querySelectorAll('.card, .timeline-item, .project-card');
                    if (items.length > 0) {
                        const lastItem = items[items.length - 1];
                        const clone = lastItem.cloneNode(true);

                        // Clear text contents in the clone
                        const textEls = clone.querySelectorAll("h3, p, span, b, li");
                        textEls.forEach(t => t.textContent = "New Data");

                        // Make the cloned text editable
                        textEls.forEach(el => {
                            el.setAttribute("contenteditable", "true");
                            el.style.outline = "none";
                            el.addEventListener("focus", () => el.style.background = "rgba(255, 255, 255, 0.1)");
                            el.addEventListener("blur", () => el.style.background = "transparent");
                        });

                        makeMediaEditable(clone);

                        // Remove cloned delete button and attach a fresh one
                        const oldDel = clone.querySelector(".delete-btn");
                        if (oldDel) oldDel.remove();
                        addRemoveButton(clone);

                        if (container.classList.contains("timeline")) {
                            container.insertBefore(clone, container.firstChild);
                        } else {
                            container.appendChild(clone);
                        }
                    }
                });
                section.appendChild(addBtn);
            }
        }
    });

    // 3. Create Admin Control Panel Container
    const adminPanel = document.createElement("div");
    adminPanel.style.position = "fixed";
    adminPanel.style.bottom = "120px"; // Above Chatbot
    adminPanel.style.left = "30px";
    adminPanel.style.zIndex = "9999";
    adminPanel.style.display = "flex";
    adminPanel.style.flexDirection = "column";
    adminPanel.style.gap = "10px";
    adminPanel.style.background = "rgba(15, 23, 42, 0.9)";
    adminPanel.style.backdropFilter = "blur(10px)";
    adminPanel.style.border = "1px solid rgba(255, 255, 255, 0.15)";
    adminPanel.style.padding = "15px";
    adminPanel.style.borderRadius = "15px";
    adminPanel.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.3)";
    adminPanel.style.color = "white";
    adminPanel.style.fontFamily = "'Poppins', sans-serif";
    adminPanel.style.width = "220px";

    const panelTitle = document.createElement("div");
    panelTitle.innerHTML = "<strong><i class='fa-solid fa-user-gear'></i> Admin CMS Panel</strong>";
    panelTitle.style.fontSize = "14px";
    panelTitle.style.marginBottom = "8px";
    panelTitle.style.textAlign = "center";
    panelTitle.style.color = "#818cf8"; // Light Indigo
    adminPanel.appendChild(panelTitle);

    // Save Button
    const saveBtn = document.createElement("button");
    saveBtn.innerHTML = "<i class='fa-solid fa-floppy-disk'></i> Save All Edits";
    saveBtn.style.width = "100%";
    saveBtn.style.background = "#0b782c";
    saveBtn.style.color = "white";
    saveBtn.style.border = "none";
    saveBtn.style.padding = "10px 15px";
    saveBtn.style.fontSize = "14px";
    saveBtn.style.fontWeight = "bold";
    saveBtn.style.borderRadius = "8px";
    saveBtn.style.cursor = "pointer";
    saveBtn.style.transition = "0.3s";
    saveBtn.addEventListener("mouseover", () => saveBtn.style.background = "#085c21");
    saveBtn.addEventListener("mouseout", () => saveBtn.style.background = "#0b782c");
    adminPanel.appendChild(saveBtn);

    // Preview Mode / Hide Edit Options Button
    const previewBtn = document.createElement("button");
    previewBtn.innerHTML = "<i class='fa-solid fa-eye-slash'></i> Hide Edit Options";
    previewBtn.style.width = "100%";
    previewBtn.style.background = "#4b5563"; // gray-600
    previewBtn.style.color = "white";
    previewBtn.style.border = "none";
    previewBtn.style.padding = "10px 15px";
    previewBtn.style.fontSize = "14px";
    previewBtn.style.fontWeight = "bold";
    previewBtn.style.borderRadius = "8px";
    previewBtn.style.cursor = "pointer";
    previewBtn.style.transition = "0.3s";
    adminPanel.appendChild(previewBtn);

    // Edit Resume Link Button
    const editResumeBtn = document.createElement("button");
    editResumeBtn.innerHTML = "<i class='fa-solid fa-file-pen'></i> Edit Resume";
    editResumeBtn.style.width = "100%";
    editResumeBtn.style.background = "#3b82f6";
    editResumeBtn.style.color = "white";
    editResumeBtn.style.border = "none";
    editResumeBtn.style.padding = "10px 15px";
    editResumeBtn.style.fontSize = "14px";
    editResumeBtn.style.fontWeight = "bold";
    editResumeBtn.style.borderRadius = "8px";
    editResumeBtn.style.cursor = "pointer";
    editResumeBtn.style.transition = "0.3s";
    editResumeBtn.addEventListener("click", () => window.open("resume.html", "_blank"));
    adminPanel.appendChild(editResumeBtn);

    // Logout Button
    const logoutBtn = document.createElement("button");
    logoutBtn.innerHTML = "<i class='fa-solid fa-right-from-bracket'></i> Logout";
    logoutBtn.style.width = "100%";
    logoutBtn.style.background = "#ef4444";
    logoutBtn.style.color = "white";
    logoutBtn.style.border = "none";
    logoutBtn.style.padding = "10px 15px";
    logoutBtn.style.fontSize = "14px";
    logoutBtn.style.fontWeight = "bold";
    logoutBtn.style.borderRadius = "8px";
    logoutBtn.style.cursor = "pointer";
    logoutBtn.style.transition = "0.3s";
    logoutBtn.addEventListener("mouseover", () => logoutBtn.style.background = "#dc2626");
    logoutBtn.addEventListener("mouseout", () => logoutBtn.style.background = "#ef4444");
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("portfolio_admin");
        window.location.reload();
    });
    adminPanel.appendChild(logoutBtn);

    document.body.appendChild(adminPanel);

    // Preview mode visibility update function
    function updateEditControlsVisibility() {
        editableSections.forEach(id => {
            const section = document.getElementById(id);
            if (section) {
                // Toggle borders
                if (isPreviewActive) {
                    section.style.border = "none";
                    section.style.borderRadius = "";
                } else {
                    section.style.border = "2px dashed rgba(79, 70, 229, 0.5)";
                    section.style.borderRadius = "10px";
                }

                // Toggle contenteditable
                const textElements = section.querySelectorAll("h1, h2, h3, p, span, li, b, .card, .project-card, .timeline-content");
                textElements.forEach(el => {
                    el.setAttribute("contenteditable", isPreviewActive ? "false" : "true");
                });

                // Toggle images and icons pointers
                const images = section.querySelectorAll("img");
                images.forEach(img => {
                    if (isPreviewActive) {
                        img.style.cursor = "";
                        img.removeAttribute("title");
                    } else {
                        img.style.cursor = "pointer";
                        img.title = "Click to upload an image or take a selfie";
                    }
                });

                const icons = section.querySelectorAll("i.fa-solid, i.fa-brands, i.fa-regular");
                icons.forEach(icon => {
                    if (icon.classList.contains("fa-trash") || icon.classList.contains("fa-plus")) return;
                    if (isPreviewActive) {
                        icon.style.cursor = "";
                        icon.removeAttribute("title");
                    } else {
                        icon.style.cursor = "pointer";
                        icon.title = "Click to change FontAwesome icon";
                    }
                });

                // Toggle visibility of delete buttons and badges
                const cmsElements = section.querySelectorAll(".edit-badge, .delete-btn");
                cmsElements.forEach(el => {
                    el.style.display = isPreviewActive ? "none" : "";
                });
            }
        });

        // Update preview button styling
        if (isPreviewActive) {
            previewBtn.innerHTML = "<i class='fa-solid fa-eye'></i> Show Edit Options";
            previewBtn.style.background = "#3b82f6"; // Indigo/blue when active
        } else {
            previewBtn.innerHTML = "<i class='fa-solid fa-eye-slash'></i> Hide Edit Options";
            previewBtn.style.background = "#4b5563"; // Gray
        }
    }

    previewBtn.addEventListener("click", () => {
        isPreviewActive = !isPreviewActive;
        updateEditControlsVisibility();
    });

    saveBtn.addEventListener("click", () => {
        const updates = {};
        let activeElementsCount = 0;

        editableSections.forEach(id => {
            const section = document.getElementById(id);
            if (section) {
                // Create a clone of the section so we can clean up CMS controls without affecting current editing session
                const clone = section.cloneNode(true);

                // Remove the edit badges and add/delete buttons from the clone
                const badges = clone.querySelectorAll(".edit-badge, .delete-btn");
                badges.forEach(b => b.remove());

                // Remove contenteditable attributes
                const editableNodes = clone.querySelectorAll("[contenteditable]");
                editableNodes.forEach(n => {
                    n.removeAttribute("contenteditable");
                    n.style.outline = "";
                    n.style.background = "";
                });

                // Clear inline styles we added for edit mode
                clone.style.border = "";

                const cleanHtml = clone.innerHTML;
                localStorage.setItem(`saved_section_${id}`, cleanHtml);
                updates[id] = cleanHtml;
                activeElementsCount++;
            }
        });

        if (db && activeElementsCount > 0) {
            db.ref("portfolio/sections").update(updates)
                .then(() => {
                    alert("All edits saved to Firebase Cloud! Your changes are now live for everyone.");
                    window.location.reload();
                })
                .catch(err => {
                    alert("Failed to save to cloud: " + err.message + "\nYour changes have been saved to local browser storage only.");
                    window.location.reload();
                });
        } else {
            alert("All edits saved successfully on your local browser! (Connect Firebase in script.js to make it live for other devices)");
            window.location.reload();
        }
    });

    document.body.appendChild(saveBtn);
}