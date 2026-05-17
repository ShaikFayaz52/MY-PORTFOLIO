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
        } else {
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
    if(scrollProgress) {
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
            cursorOutline.style.backgroundColor = "rgba(0, 229, 255, 0.2)";
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
// In-Line Editor (CMS) Logic
// =========================
const editableSections = ["home", "about", "interests", "education", "skills", "technical-skills", "projects", "certificates", "services", "achievements"];

// Load saved data on page load
editableSections.forEach(id => {
    const savedHtml = localStorage.getItem(`saved_section_${id}`);
    if (savedHtml) {
        const section = document.getElementById(id);
        if (section) section.innerHTML = savedHtml;
    }
});

// Activate editing if logged in
if (localStorage.getItem("portfolio_admin") === "true") {
    // 1. Change Login Nav Link to Logout
    const navLinksList = document.querySelectorAll("nav a");
    navLinksList.forEach(link => {
        if (link.textContent.includes("LOGIN")) {
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
            section.style.border = "2px dashed rgba(0, 229, 255, 0.5)";
            section.style.borderRadius = "10px";
            section.style.position = "relative";
            
            // Add an 'Edit Mode' badge to each section
            const badge = document.createElement("div");
            badge.textContent = "✎ Edit Mode";
            badge.style.position = "absolute";
            badge.style.top = "0";
            badge.style.right = "0";
            badge.style.background = "#00e5ff";
            badge.style.color = "black";
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
                                    reader.onload = function(event) {
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
                delBtn.style.background = "rgba(255, 77, 77, 0.2)";
                delBtn.style.color = "#ff4d4d";
                delBtn.style.border = "1px solid #ff4d4d";
                delBtn.style.borderRadius = "5px";
                delBtn.style.padding = "5px 8px";
                delBtn.style.cursor = "pointer";
                delBtn.style.zIndex = "10";
                delBtn.title = "Remove this item";
                
                delBtn.addEventListener("click", () => {
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
                addBtn.style.padding = "10px 20px";
                addBtn.style.background = "#00e5ff";
                addBtn.style.color = "black";
                addBtn.style.border = "none";
                addBtn.style.borderRadius = "10px";
                addBtn.style.fontWeight = "bold";
                addBtn.style.cursor = "pointer";
                addBtn.classList.add("edit-badge"); // Ensure it gets removed before saving
                
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

    // 3. Add Global Save Button
    const saveBtn = document.createElement("button");
    saveBtn.innerHTML = "<i class='fa-solid fa-floppy-disk'></i> Save All Edits";
    saveBtn.style.position = "fixed";
    saveBtn.style.bottom = "120px"; // Above Chatbot
    saveBtn.style.left = "30px";
    saveBtn.style.zIndex = "9999";
    saveBtn.style.background = "#0b782c";
    saveBtn.style.color = "white";
    saveBtn.style.border = "2px solid #00e5ff";
    saveBtn.style.padding = "15px 25px";
    saveBtn.style.fontSize = "16px";
    saveBtn.style.fontWeight = "bold";
    saveBtn.style.borderRadius = "30px";
    saveBtn.style.cursor = "pointer";
    saveBtn.style.boxShadow = "0 5px 15px rgba(0,255,0,0.3)";
    
    saveBtn.addEventListener("click", () => {
        editableSections.forEach(id => {
            const section = document.getElementById(id);
            if (section) {
                // Remove the edit badge and add buttons before saving
                const badges = section.querySelectorAll(".edit-badge");
                badges.forEach(b => b.remove());
                
                // Remove contenteditable attributes so they aren't permanent for normal visitors
                const editableNodes = section.querySelectorAll("[contenteditable]");
                editableNodes.forEach(n => {
                    n.removeAttribute("contenteditable");
                    n.style.outline = "";
                    n.style.background = "";
                });
                
                // Clear inline styles we added for edit mode
                section.style.border = "";
                
                localStorage.setItem(`saved_section_${id}`, section.innerHTML);
            }
        });
        alert("All edits saved successfully! They are now live on your browser.");
        window.location.reload(); // Reload to show saved state cleanly
    });

    document.body.appendChild(saveBtn);
}