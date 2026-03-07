const allTab = document.getElementById("all-button");
const openTab = document.getElementById("open-button");
const closedTab = document.getElementById("closed-button");

const loadIssues = (type) => {
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((response) => response.json())
    .then((json) => displayIssues(json.data, type));
};

const displayIssues = (datas, type) => {
  const issueContainer = document.getElementById("issue-container");
  issueContainer.innerHTML = "";
  
  allTab.classList.remove("btn-primary");
  openTab.classList.remove("btn-primary");
  closedTab.classList.remove("btn-primary");

  (type === "all") ? allTab.classList.add("btn-primary") : (type === "open") ? openTab.classList.add("btn-primary") : (type === "closed") ? closedTab.classList.add("btn-primary") : "";

  let issueCount = 0;

  datas.forEach((data) => {
    if (
      (type === "open" && data.status !== "open") ||
      (type === "closed" && data.status !== "closed")
    ) {
      return;
    }

    const issueBlock = `
        <div
          class="flex flex-col bg-white rounded-md border-t-4 border-solid border-${data.status === "open" ? "green" : "violet"}-600 p-4 md:max-w-3xs shadow-xl"
        >
          <div class="flex flex-row items-center justify-between">
            <img
              src="./assets/${data.status}-status.png"
              alt="${data.status} Status icon"
              class="w-6 h-6"
            />
            <div class="badge badge-soft ${data.priority === "low" ? "badge-primary" : data.priority === "medium" ? "badge-warning" : "badge-error"} font-medium text-xs">${data.priority.toUpperCase()}</div>
          </div>
          <h2 class="font-semibold text-sm pt-3">
            ${data.title}
          </h2>
          <p class="text-xs text-[#64748B] pt-2">
            ${data.description}
          </p>
          <div class="flex flex-${["enhancement", "documentation", "good first issue", "help wanted"].some((label) => data.labels.includes(label)) ? "col" : "row"} gap-2 pt-3 pb-2">
            ${data.labels
              .map(
                (label) =>
                  `<div class="badge badge-soft ${label === "bug" ? "badge-error" : label === "help wanted" ? "badge-warning" : "badge-success"} font-medium">
                    <span class="mr-1">${label === "bug" ? `<i class="fa-solid fa-bug"style="color: rgb(232, 0, 0)"></i>` : label === "help wanted" ? `<i class="fa-solid fa-handshake-angle" style="color: rgb(252, 152, 0)"></i>` : label === "documentation" ? `<i class="fa-regular fa-clipboard" style="color: rgb(44, 208, 17);"></i>` : label === "good first issue" ? `<i class="fa-solid fa-ranking-star" style="color: rgb(44, 208, 17);"></i>` : `<i class="fa-solid fa-gears" style="color: rgb(44, 208, 17);"></i>`}</span> ${label}
                </div>`,
              )
              .join("")}
          </div>
          <div
            class="bg-white rounded-b-md border-t-2 border-solid border-gray-300 p-4 md:max-w-3xs"
          >
            <p class="text-[#64748B] pb-2 text-xs">#${data.id} by ${data.author}</p>
            <p class="text-[#64748B] text-xs">${new Date(data.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
        `;

    issueContainer.innerHTML += issueBlock;
    issueCount++;
  });

  document.getElementById("issue-count").innerText = issueCount;
};

document.addEventListener("DOMContentLoaded", (e) => {
  loadIssues("all");
});
