<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>The Coordinator's Interactive Playbook</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
    rel="stylesheet"
  />
  <style>
    @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Oswald:wght@500;700&display=swap");

    body {
      font-family: "Montserrat", sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      background-color: #f9f9f9;
      color: #1a1a1a;
    }

    .brand-title {
      font-family: "Oswald", sans-serif;
      letter-spacing: 0.05em;
    }

    .gold-text {
      color: #d4af37;
    }
    @supports (-webkit-background-clip: text) {
      .gold-text {
        background: -webkit-linear-gradient(45deg, #d4af37, #f7e08b, #d4af37);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }

    .phase-header {
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
    .phase-content {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.5s ease-out;
    }
    .phase-content.open {
      max-height: 2000px;
    }
    .modal-backdrop {
      transition: opacity 0.3s ease;
    }
    .modal-content {
      transition: transform 0.3s ease;
    }
    .playbook-btn {
      transition: transform 0.2s ease, background-color 0.2s ease;
    }
    .playbook-btn:hover {
      transform: scale(1.03);
    }
    .template-pre {
      white-space: pre-wrap;
      word-wrap: break-word;
      font-family: "Montserrat", sans-serif;
    }
  </style>
</head>
<body class="text-gray-800">
  <div class="container mx-auto max-w-5xl p-4 sm:p-6 md:p-8">
    <header class="text-center mb-10 pt-4">
      <h1 class="brand-title text-3xl sm:text-4xl md:text-5xl font-bold uppercase gold-text">
        The Coordinator's Playbook
      </h1>
      <p class="mt-3 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
        Your step-by-step guide to launching successful partners.
      </p>
    </header>

    <!-- Phases get injected here -->
    <div id="phases" class="space-y-5"></div>
  </div>

  <div
    id="playbookModal"
    class="fixed inset-0 bg-black bg-opacity-70 modal-backdrop flex justify-center items-center p-4 hidden"
  >
    <div
      class="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl modal-content transform scale-95"
    >
      <div class="flex justify-between items-center mb-4">
        <h2 id="modalTitle" class="text-xl font-bold text-gray-800">Playbook</h2>
        <button id="closeModalBtn" class="text-gray-400 hover:text-gray-600 text-3xl">
          &times;
        </button>
      </div>
      <div
        id="modalContent"
        class="bg-gray-50 p-4 rounded-lg border border-gray-200 max-h-[60vh] overflow-y-auto"
      >
        <pre class="template-pre text-sm text-gray-800"></pre>
      </div>
      <div class="mt-6 flex justify-end">
        <button
          id="copyBtn"
          class="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg flex items-center space-x-2"
        >
          <i class="fas fa-copy"></i>
          <span>Copy Template</span>
        </button>
      </div>
    </div>
  </div>

  <script>
    const templates = {
      "View Welcome Email Playbook": {
        title: "Welcome Email Template",
        content: `Subject: Welcome to WISE Financial Partners, [Partner Name]!

Hi [Partner Name],

On behalf of Glenn and the entire team, a huge welcome! We are so excited to have you on board.

To get you started on the right foot, here are your first few steps:

1.  **Licensing Intake:** Please fill this out ASAP: [Link to Intake Form]
2.  **Fast Start Meeting:** Schedule your initial strategy call with Glenn here: [Link to Scheduler]

We're here to support you every step of the way. Let's get started!

Best,
Saifur`,
      },
      "View \"Gentle Nudge\" Playbook": {
        title: "Gentle Nudge Template",
        content: `Hey [Partner Name]! Just doing a quick check-in. Have you had a chance to get your exam scheduled yet? The goal is to have it booked by Day 7 to keep the momentum high. Let me know if you hit any snags!`,
      },
      "View \"Friday Wins\" Playbook": {
        title: "Friday Wins Template",
        content: `✨ FRIDAY WINS! ✨

A huge shoutout to our partners who are crushing it this week and taking action!

🎉 [Partner Name] for passing their license exam! Welcome to the licensed team!
🚀 [Partner Name] for scheduling their Fast Start meeting and getting their business off the ground!

Let's keep the momentum going into the weekend! #WISEWINS`,
      },
      "View At-Risk Report Playbook": {
        title: "At-Risk Report Template",
        content: `TO: Glenn
SUBJECT: Weekly At-Risk Briefing

Hi Glenn, here is this week's list of at-risk partners needing your direct intervention.

🔴 RED ALERT:

- **Partner:** [Partner Name]
- **Issue:** [e.g., Day 14, exam not passed, unresponsive to messages.]
- **Recommendation:** A direct call from you to check in, uncover the roadblock, and reset expectations.`,
      },
    };

    const buildPhase = (emoji, title, subtitle, steps) => {
      return `
      <div class="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
        <div class="phase-header flex justify-between items-center p-5 sm:p-6 hover:bg-gray-100">
          <div class="flex items-center space-x-4">
            <span class="text-2xl sm:text-3xl">${emoji}</span>
            <div>
              <h2 class="text-xl sm:text-2xl font-bold text-gray-800">${title}</h2>
              <p class="text-sm sm:text-base text-gray-500">${subtitle}</p>
            </div>
          </div>
          <i class="fas fa-chevron-down text-xl sm:text-2xl text-gray-400 transition-transform"></i>
        </div>
        <div class="phase-content">
          <div class="p-4 sm:p-6 border-t border-gray-200 space-y-6">
            ${steps}
          </div>
        </div>
      </div>`;
    };

    const buildStep = (stepTitle, description, buttonText, color) => {
      return `
        <div class="bg-gray-50 p-5 rounded-lg">
          <h3 class="font-bold text-lg sm:text-xl mb-3 text-gray-800">${stepTitle}</h3>
          <p class="text-gray-600 mb-4 text-sm sm:text-base">${description}</p>
          <button class="playbook-btn w-full ${color} text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90">${buttonText}</button>
        </div>`;
    };

    const phases = document.getElementById("phases");
    phases.innerHTML =
      buildPhase(
        "🏁",
        "PHASE 1: THE FIRST 10 DAYS",
        "Licensing & Launch",
        buildStep(
          "Step 1: 🚀 The Welcome Protocol",
          "Send the Welcome Email within 12 hours and introduce them in Telegram to create instant connection.",
          "View Welcome Email Playbook",
          "bg-indigo-600"
        ) +
          buildStep(
            "Step 2: 🎯 The Licensing Push",
            "By Day 5, check if their exam is booked. If not, give a friendly, firm nudge.",
            "View \"Gentle Nudge\" Playbook",
            "bg-amber-500"
          )
      ) +
      buildPhase(
        "🏆",
        "PHASE 2: THE WEEKLY RHYTHM",
        "Engagement & Accountability",
        buildStep(
          "Step 3: 📣 Friday Wins & Recognition",
          "Every Friday, celebrate wins publicly. Recognition builds culture.",
          "View \"Friday Wins\" Playbook",
          "bg-green-500"
        )
      ) +
      buildPhase(
        "🚨",
        "PHASE 3: LEADERSHIP BRIEFING",
        "Coaching Glenn",
        buildStep(
          "Step 4: ⚠️ The At-Risk Report",
          "Every Sunday, send Glenn a report on off-track partners for intervention.",
          "View At-Risk Report Playbook",
          "bg-red-600"
        )
      );

    document.querySelectorAll(".phase-header").forEach((header) => {
      header.addEventListener("click", () => {
        const content = header.nextElementSibling;
        const icon = header.querySelector("i");
        const isOpen = content.classList.contains("open");
        document.querySelectorAll(".phase-content.open").forEach((c) => {
          c.classList.remove("open");
          c.previousElementSibling.querySelector("i").classList.remove("rotate-180");
        });
        if (!isOpen) {
          content.classList.add("open");
          icon.classList.add("rotate-180");
        }
      });
    });

    document.querySelectorAll(".playbook-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const text = e.target.textContent;
        const template = templates[text];
        if (template) {
          document.getElementById("modalTitle").textContent = template.title;
          document.querySelector("#modalContent pre").textContent = template.content;
          document.getElementById("copyBtn").dataset.content = template.content;
          document.getElementById("playbookModal").classList.remove("hidden");
          setTimeout(() => {
            document.querySelector(".modal-content").classList.remove("scale-95");
          }, 10);
        }
      });
    });

    document.getElementById("closeModalBtn").addEventListener("click", () => {
      document.querySelector(".modal-content").classList.add("scale-95");
      setTimeout(() => {
        document.getElementById("playbookModal").classList.add("hidden");
      }, 300);
    });

    document.getElementById("copyBtn").addEventListener("click", (e) => {
      const content = e.currentTarget.dataset.content;
      const textArea = document.createElement("textarea");
      textArea.value = content;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      alert("Template copied to clipboard!");
    });
  </script>
</body>
</html>
