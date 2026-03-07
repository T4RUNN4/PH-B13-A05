const loadIssues = (type) => {
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((response) => response.json())
    .then((json) => displayIssues(json.data, type));
};

const displayIssues = (datas, type) => {
  const issueContainer = document.getElementById("issue-container");
  issueContainer.innerHTML = "";

  let issueCount=0;

  datas.forEach((data) => {

    if((type === "open" && data.status !== "open") || (type === "closed" && data.status !== "closed")) {
        return;
    }

    const issueBlock = `
        <div
          class="flex flex-col bg-white rounded-md border-t-4 border-solid border-${data.status === "open" ? "green" : "violet"}-600 p-4 max-w-3xs shadow-xl"
        >
          <div class="flex flex-row items-center justify-between">
            <img
              src="./assets/${data.status}-status.png"
              alt="${data.status} Status icon"
              class="w-6 h-6"
            />
            <p
              class="bg-${data.priority === "low" ? "violet" : data.priority === "medium" ? "orange" : "red"}-100 text-${data.priority === "low" ? "violet" : data.priority === "medium" ? "orange" : "red"}-400 p-2 rounded-full font-medium text-xs w-20 text-center"
            >
              ${data.priority.toUpperCase()}
            </p>
          </div>
          <h2 class="font-semibold text-sm pt-3">
            ${data.title}
          </h2>
          <p class="text-xs text-[#64748B] pt-2">
            ${data.description}
          </p>
          <div class="flex flex-${data.labels[0] === "enhancement" || data.labels[0] === "documentation" ? "col" : "row"} gap-2 pt-3 pb-2">
            ${data.labels
              .map(
                (label) =>
                  `<p class="bg-${label === "bug" ? "red" : label === "help wanted" ? "yellow" : "green"}-100 border border-solid border-${label === "bug" ? "red" : label === "help wanted" ? "yellow" : "green"}-200 text-${label === "bug" ? "red" : label === "help wanted" ? "yellow" : "green"}-500 p-2 rounded-full font-medium text-xs text-center">
                    <span class="mr-2">${label === "bug" ? `<i class="fa-solid fa-bug"style="color: rgb(232, 0, 0)"></i>` : label === "help wanted" ? `<i class="fa-solid fa-handshake-angle" style="color: rgb(252, 152, 0)"></i>` : label === "documentation" ? `<i class="fa-regular fa-clipboard" style="color: rgb(44, 208, 17);"></i>` : label === "good first issue" ? `<i class="fa-solid fa-ranking-star" style="color: rgb(44, 208, 17);"></i>` : `<i class="fa-solid fa-gears" style="color: rgb(44, 208, 17);"></i>`}</span> ${label}</p>`,
              )
              .join("")}
          </div>
          <div
            class="bg-white rounded-b-md border-t-2 border-solid border-gray-300 p-4 max-w-3xs"
          >
            <p class="text-[#64748B] pb-2 text-xs">#${data.id} by ${data.author}</p>
            <p class="text-[#64748B] text-xs">${new Date(data.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
        `;

    issueContainer.innerHTML += issueBlock;
    issueCount ++;
  });

  document.getElementById("issue-count").innerText = issueCount;
};

document.addEventListener("DOMContentLoaded", (e) => {
  loadIssues("all");
});
